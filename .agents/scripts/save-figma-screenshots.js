/**
 * save-figma-screenshots.js
 * Gọi Figma MCP server (localhost:3845) qua JSON-RPC SSE để lấy screenshot
 * và lưu PNG binary ra file.
 *
 * Usage: node save-figma-screenshots.js
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const DEST = path.join(__dirname, '..', 'images');
fs.mkdirSync(DEST, { recursive: true });

const NODES = [
  { nodeId: '3638:10337', file: 'figma-s1-desktop.png', label: 'S1 Desktop' },
  { nodeId: '3746:605',   file: 'figma-s1-mobile.png',  label: 'S1 Mobile'  },
  { nodeId: '3735:3914',  file: 'figma-s3-desktop.png', label: 'S3 Desktop' },
  { nodeId: '3746:578',   file: 'figma-s3-mobile.png',  label: 'S3 Mobile'  },
];

// ── Step 1: Lấy sessionId từ Figma MCP ──────────────────────────────────────
async function getSession() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: 'localhost', port: 3845, path: '/sse', method: 'GET' },
      (res) => {
        let data = '';
        res.on('data', chunk => {
          data += chunk.toString();
          // SSE trả về: "event: endpoint\ndata: /message?sessionId=xxx\n\n"
          const m = data.match(/data:\s*(\/message\?sessionId=\S+)/);
          if (m) {
            res.destroy(); // close SSE connection
            resolve({ sessionPath: m[1], res });
          }
        });
        res.on('end', () => reject(new Error('SSE ended without sessionId')));
      }
    );
    req.on('error', reject);
    req.end();
  });
}

// ── Step 2: Gọi tool qua JSON-RPC POST ──────────────────────────────────────
async function callTool(sessionPath, toolName, args) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: { name: toolName, arguments: args },
  });

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: 'localhost',
        port: 3845,
        path: sessionPath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          try {
            const json = JSON.parse(Buffer.concat(chunks).toString());
            resolve(json);
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Step 3: Download image từ URL ────────────────────────────────────────────
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    proto.get(url, (res) => {
      // follow redirect
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔌 Connecting to Figma MCP (localhost:3845)...');
  
  let sessionPath;
  try {
    const session = await getSession();
    sessionPath = session.sessionPath;
    console.log(`✅ Session: ${sessionPath}\n`);
  } catch (e) {
    console.error('❌ Cannot connect to Figma MCP:', e.message);
    console.log('\n💡 Fallback: Using Figma REST API...');
    await fallbackFigmaAPI();
    return;
  }

  for (const node of NODES) {
    console.log(`📸 Capturing ${node.label} (${node.nodeId})...`);
    try {
      const result = await callTool(sessionPath, 'get_image_fill', {
        nodeId: node.nodeId,
        fileKey: 'AhEDYcvo9EJdheU6b4fBI8',
      });

      // Tìm URL trong response
      const content = result?.result?.content || result?.result;
      const text = JSON.stringify(content);
      const urlMatch = text.match(/https:\/\/[^\s"]+\.png[^\s"]*/);
      
      if (urlMatch) {
        const imgUrl = urlMatch[0].replace(/\\"/g, '').replace(/"/g, '');
        const destPath = path.join(DEST, node.file);
        await downloadImage(imgUrl, destPath);
        const stat = fs.statSync(destPath);
        console.log(`  ✅ Saved: ${node.file} (${(stat.size/1024).toFixed(0)}KB)`);
      } else {
        console.log(`  ⚠️  No URL in response:`, JSON.stringify(result).substring(0, 200));
      }
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
    }
  }
}

// ── Fallback: Figma REST API ─────────────────────────────────────────────────
async function fallbackFigmaAPI() {
  // Check for token in env
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.log('❌ No FIGMA_TOKEN in environment.');
    console.log('   Set it with: export FIGMA_TOKEN=figd_xxx');
    console.log('   Get from: https://www.figma.com/settings > Personal access tokens');
    return;
  }

  const fileKey = 'AhEDYcvo9EJdheU6b4fBI8';
  const nodeIds = NODES.map(n => n.nodeId).join(',');
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeIds}&format=png&scale=2`;

  console.log(`Fetching from Figma API: ${url}`);
  
  const data = await new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-Figma-Token': token } }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });

  if (data.err) { console.error('Figma API error:', data.err); return; }

  for (const node of NODES) {
    const nodeIdKey = node.nodeId.replace(':', '-');
    const imgUrl = data.images?.[node.nodeId] || data.images?.[nodeIdKey];
    if (!imgUrl) { console.log(`  ⚠️  No URL for ${node.label}`); continue; }
    
    const destPath = path.join(DEST, node.file);
    await downloadImage(imgUrl, destPath);
    const stat = fs.statSync(destPath);
    console.log(`  ✅ ${node.label}: ${node.file} (${(stat.size/1024).toFixed(0)}KB)`);
  }
}

main().catch(console.error);
