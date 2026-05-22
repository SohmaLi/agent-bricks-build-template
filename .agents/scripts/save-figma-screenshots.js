/**
 * save-figma-screenshots.js (v2)
 * Dùng Figma MCP server (localhost:3845) với SSE transport đúng cách.
 * Tool: get_screenshot → nhận base64 PNG → lưu ra file.
 *
 * Vấn đề của v1:
 *   - Dùng tool sai: `get_image_fill` → đổi thành `get_screenshot`
 *   - Parse response sai: POST chỉ trả 202 Accepted, kết quả đến qua SSE stream
 *   - Parse sai format: get_screenshot trả base64, không phải URL
 *
 * Usage:
 *   node .agents/scripts/save-figma-screenshots.js
 *   node .agents/scripts/save-figma-screenshots.js S3  ← chỉ chụp section S3
 *
 * Cấu hình: Sửa NODES bên dưới để thêm/bớt sections cần chụp.
 */

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ── Output directory ─────────────────────────────────────────────────────────
const DEST = path.join(__dirname, '..', 'images');
fs.mkdirSync(DEST, { recursive: true });

// ── Danh sách nodes cần chụp — sửa tại đây ──────────────────────────────────
const ALL_NODES = [
  { nodeId: '3638:10337', file: 'figma-s1-desktop.png', label: 'S1 Desktop', tags: ['S1'] },
  { nodeId: '3746:605',   file: 'figma-s1-mobile.png',  label: 'S1 Mobile',  tags: ['S1'] },
  { nodeId: '3735:3914',  file: 'figma-s3-desktop.png', label: 'S3 Desktop', tags: ['S3'] },
  { nodeId: '3746:578',   file: 'figma-s3-mobile.png',  label: 'S3 Mobile',  tags: ['S3'] },
];

// ── Lọc theo arg nếu có (ví dụ: node script.js S3) ──────────────────────────
const filterArg = process.argv[2];
const NODES = filterArg
  ? ALL_NODES.filter(n => n.tags.includes(filterArg.toUpperCase()))
  : ALL_NODES;

if (NODES.length === 0) {
  console.error(`❌ Không tìm thấy section "${filterArg}". Dùng: S1, S3, ...`);
  process.exit(1);
}

// ── Kết nối SSE, giữ stream để nhận responses ────────────────────────────────
// MCP SSE transport: POST chỉ trả 202 Accepted, kết quả JSON-RPC đến qua SSE stream
function createSSESession() {
  return new Promise((resolve, reject) => {
    const pending = new Map(); // id → { resolve, reject }
    let sessionPath = null;
    let buffer = '';

    const req = http.request(
      { host: 'localhost', port: 3845, path: '/sse', method: 'GET' },
      (sseStream) => {
        sseStream.on('data', chunk => {
          buffer += chunk.toString();

          // Parse SSE events (format: "event: xxx\ndata: xxx\n\n")
          const events = buffer.split('\n\n');
          buffer = events.pop(); // phần chưa hoàn chỉnh

          for (const event of events) {
            const lines = event.split('\n');
            let eventType = '';
            let dataStr   = '';

            for (const line of lines) {
              if (line.startsWith('event:')) eventType = line.slice(6).trim();
              else if (line.startsWith('data:')) dataStr = line.slice(5).trim();
            }

            if (eventType === 'endpoint' && dataStr) {
              // Nhận được session path, ready để POST
              sessionPath = dataStr;
              console.log(`✅ Session: ${sessionPath}`);
              resolve({ sessionPath, pending, sseStream });
            } else if ((eventType === 'message' || eventType === '') && dataStr) {
              // Nhận được JSON-RPC response
              try {
                const json = JSON.parse(dataStr);
                if (json.id !== undefined && pending.has(json.id)) {
                  const { resolve: res, reject: rej } = pending.get(json.id);
                  pending.delete(json.id);
                  if (json.error) rej(new Error(json.error.message || JSON.stringify(json.error)));
                  else res(json.result);
                }
              } catch (_) {}
            }
          }
        });

        sseStream.on('error', reject);
        sseStream.on('end', () => {
          if (!sessionPath) reject(new Error('SSE stream ended trước khi có session'));
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

// ── Gọi tool MCP qua POST, nhận kết quả qua SSE ─────────────────────────────
function callMCPTool(sessionPath, toolName, args, pending) {
  return new Promise((resolve, reject) => {
    const id   = Date.now(); // integer — float ID gây JSON-RPC error
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id,
      method: 'tools/call',
      params: { name: toolName, arguments: args },
    });

    // Đăng ký callback cho response này
    pending.set(id, { resolve, reject });

    // Timeout 30s
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`Timeout 30s chờ response từ tool "${toolName}"`));
      }
    }, 30000);

    // POST request (chỉ kích hoạt tool, response đến qua SSE)
    const req = http.request(
      {
        host: 'localhost', port: 3845, path: sessionPath, method: 'POST',
        headers: {
          'Content-Type':   'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          if (res.statusCode !== 202 && res.statusCode !== 200) {
            pending.delete(id);
            const detail = Buffer.concat(chunks).toString().substring(0, 200);
            reject(new Error(`HTTP ${res.statusCode} từ MCP POST: ${detail}`));
          }
          // 202 OK — drain xong, response đến qua SSE
        });
      }
    );

    req.on('error', err => {
      pending.delete(id);
      reject(err);
    });
    req.write(body);
    req.end();
  });
}

// ── Download ảnh từ URL (fallback REST API) ──────────────────────────────────
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file  = fs.createWriteStream(destPath);
    proto.get(url, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        file.close();
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', e => { try { fs.unlinkSync(destPath); } catch {} reject(e); });
  });
}

// ── Main: Figma MCP ──────────────────────────────────────────────────────────
async function main() {
  console.log(`🔌 Kết nối Figma MCP (localhost:3845)...`);
  console.log(`📋 Sẽ chụp ${NODES.length} node(s): ${NODES.map(n => n.label).join(', ')}\n`);

  let session;
  try {
    session = await createSSESession();
  } catch (e) {
    console.error('❌ Không kết nối được Figma MCP:', e.message);
    console.log('\n💡 Fallback: Dùng Figma REST API...');
    await fallbackFigmaAPI();
    return;
  }

  const { sessionPath, pending, sseStream } = session;
  let successCount = 0;

  for (const node of NODES) {
    console.log(`\n📸 Chụp ${node.label} (nodeId: ${node.nodeId})...`);
    try {
      // Gọi get_screenshot — trả { content: [{ type: 'image', data: '<base64>' }] }
      const result = await callMCPTool(sessionPath, 'get_screenshot', { nodeId: node.nodeId }, pending);

      const content = result?.content || [];
      let saved = false;

      for (const item of content) {
        if (item.type === 'image' && item.data) {
          const binary   = Buffer.from(item.data, 'base64');
          const destPath = path.join(DEST, node.file);
          fs.writeFileSync(destPath, binary);
          const kb = (binary.length / 1024).toFixed(0);
          console.log(`  ✅ Đã lưu: ${node.file} (${kb}KB)`);
          saved = true;
          successCount++;
          break;
        }
      }

      if (!saved) {
        // Log raw để debug
        console.log(`  ⚠️  Không tìm thấy image data trong response.`);
        console.log(`  Raw:`, JSON.stringify(result).substring(0, 300));
      }
    } catch (e) {
      console.log(`  ❌ Lỗi: ${e.message}`);
    }
  }

  // Đóng SSE stream
  sseStream.destroy();

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`🎉 Hoàn tất! ${successCount}/${NODES.length} ảnh đã lưu vào:`);
  console.log(`   ${DEST}`);
  if (successCount < NODES.length) {
    console.log(`\n💡 Nếu bị lỗi, thử fallback REST API:`);
    console.log(`   export FIGMA_TOKEN=figd_xxx && node .agents/scripts/save-figma-screenshots.js`);
  }
}

// ── Fallback: Figma REST API (cần FIGMA_TOKEN) ───────────────────────────────
async function fallbackFigmaAPI() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.log('❌ Cần FIGMA_TOKEN:');
    console.log('   export FIGMA_TOKEN=figd_xxx');
    console.log('   Lấy tại: https://www.figma.com/settings > Personal access tokens');
    return;
  }

  const fileKey = 'AhEDYcvo9EJdheU6b4fBI8';
  const nodeIds = NODES.map(n => n.nodeId).join(',');
  const apiUrl  = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(nodeIds)}&format=png&scale=2`;

  console.log('📡 Gọi Figma Images API...');
  const data = await new Promise((resolve, reject) => {
    https.get(apiUrl, { headers: { 'X-Figma-Token': token } }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });

  if (data.err) { console.error('❌ Figma API error:', data.err); return; }

  for (const node of NODES) {
    const imgUrl = data.images?.[node.nodeId] || data.images?.[node.nodeId.replace(':', '-')];
    if (!imgUrl) { console.log(`  ⚠️  Không có URL cho ${node.label}`); continue; }

    const destPath = path.join(DEST, node.file);
    console.log(`⬇️  Downloading ${node.label}...`);
    await downloadImage(imgUrl, destPath);
    const kb = (fs.statSync(destPath).size / 1024).toFixed(0);
    console.log(`  ✅ ${node.file} (${kb}KB)`);
  }

  console.log(`\n🎉 Done! Files trong: ${DEST}`);
}

main().catch(console.error);
