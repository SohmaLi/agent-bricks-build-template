#!/usr/bin/env node
/**
 * figma-output-server.mjs
 * Local HTTP server nhận file từ Figma Plugin "Export Design Context"
 * Port: 3847
 *
 * Usage: node .agents/scripts/figma-output-server.mjs
 *
 * POST /save   → lưu screenshot + design files
 * GET  /status → check server đang chạy
 */

import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Config ────────────────────────────────────────────────────────────────────
const PORT = 3847
const IMAGES_DIR = path.resolve(__dirname, '..', 'images')
const OUTPUT_DIR = path.resolve(__dirname, '..', 'figma-output')

fs.mkdirSync(IMAGES_DIR, { recursive: true })
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()))
      } catch (e) {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function base64ToPng(base64Str, destPath) {
  const binary = Buffer.from(base64Str, 'base64')
  fs.writeFileSync(destPath, binary)
  return binary.length
}

function sanitize(name) {
  return (name || 'output')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── CORS headers ──────────────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

// ── Request handler ───────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  setCors(res)

  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // GET /status — health check
  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', port: PORT, imagesDir: IMAGES_DIR }))
    return
  }

  // POST /save — nhận data từ Figma plugin
  if (req.method === 'POST' && req.url === '/save') {
    try {
      const body = await parseBody(req)

      const savedFiles = []
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

      // ── 1. Screenshot PNG → .agents/images/ ──────────────────────────────
      if (body.screenshot) {
        // Ưu tiên filename từ plugin UI, fallback sang nodeName hoặc timestamp
        const baseName = body.filename
          ? sanitize(body.filename)
          : body.nodeName
            ? ('figma-' + sanitize(body.nodeName))
            : ('figma-' + timestamp)

        const pngPath = path.join(IMAGES_DIR, baseName + '.png')
        const size = base64ToPng(body.screenshot, pngPath)
        savedFiles.push(pngPath)
        console.log(`🖼️  Screenshot → ${path.basename(pngPath)} (${(size / 1024).toFixed(0)}KB)`)
      }

      // ── 2. Design JSON → .agents/figma-output/ ───────────────────────────
      if (body.designTree) {
        const jsonPath = path.join(OUTPUT_DIR, timestamp + '_design.json')
        fs.writeFileSync(jsonPath, JSON.stringify(body.designTree, null, 2))
        savedFiles.push(jsonPath)
        console.log(`📄 Design JSON → ${path.basename(jsonPath)}`)
      }

      // ── 3. Metadata XML → .agents/figma-output/ ──────────────────────────
      if (body.metadata) {
        const xmlPath = path.join(OUTPUT_DIR, timestamp + '_metadata.xml')
        fs.writeFileSync(xmlPath, body.metadata)
        savedFiles.push(xmlPath)
        console.log(`📐 Metadata XML → ${path.basename(xmlPath)}`)
      }

      // ── 4. Generated code → .agents/figma-output/ ────────────────────────
      if (body.generatedCode) {
        const codePath = path.join(OUTPUT_DIR, timestamp + '_code.jsx')
        fs.writeFileSync(codePath, body.generatedCode)
        savedFiles.push(codePath)
        console.log(`💻 Code → ${path.basename(codePath)}`)
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        ok: true,
        savedFiles: savedFiles.map(f => path.basename(f)),
        imagesDir: IMAGES_DIR,
      }))
    } catch (err) {
      console.error('❌ Save error:', err.message)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: err.message }))
    }
    return
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('╔══════════════════════════════════════════════════╗')
  console.log('║  🚀 Figma Output Server đang chạy               ║')
  console.log(`║  Port : ${PORT}                                   ║`)
  console.log(`║  Images: .agents/images/                         ║`)
  console.log('╠══════════════════════════════════════════════════╣')
  console.log('║  Từ Figma Plugin → chọn node → chạy plugin      ║')
  console.log('║  Screenshot sẽ tự lưu vào .agents/images/       ║')
  console.log('║  Ctrl+C để dừng server                           ║')
  console.log('╚══════════════════════════════════════════════════╝')
})

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} đã bị chiếm. Dừng process khác trước:\n   lsof -ti:${PORT} | xargs kill`)
  } else {
    console.error('Server error:', e)
  }
  process.exit(1)
})
