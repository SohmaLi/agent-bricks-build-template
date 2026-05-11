require('dotenv').config();
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ─── Output directories (relative to script location) ─────────────────────────
// Script: .agents/scripts/bricks-inspector.js
// Output: .agents/images/ và .agents/logs/
const AGENTS_DIR  = path.join(__dirname, '..');
const IMAGES_DIR  = path.join(AGENTS_DIR, 'images');
const LOGS_DIR    = path.join(AGENTS_DIR, 'logs');

// ─── Viewport configs ─────────────────────────────────────────────────────────
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];

// ─── Ensure output dirs exist ─────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ─── Extract computed styles of root + all children ───────────────────────────
function extractStyles(el) {
  const style = window.getComputedStyle(el);
  return {
    display:         style.display,
    flexDirection:   style.flexDirection,
    flexWrap:        style.flexWrap,
    gap:             style.gap,
    rowGap:          style.rowGap,
    columnGap:       style.columnGap,
    padding:         style.padding,
    margin:          style.margin,
    width:           style.width,
    height:          style.height,
    minWidth:        style.minWidth,
    maxWidth:        style.maxWidth,
    fontSize:        style.fontSize,
    fontWeight:      style.fontWeight,
    lineHeight:      style.lineHeight,
    color:           style.color,
    backgroundColor: style.backgroundColor,
    backgroundImage: style.backgroundImage,
    borderRadius:    style.borderRadius,
    border:          style.border,
    position:        style.position,
    top:             style.top,
    left:            style.left,
    zIndex:          style.zIndex,
    opacity:         style.opacity,
    overflow:        style.overflow,
    justifyContent:  style.justifyContent,
    alignItems:      style.alignItems,
    alignSelf:       style.alignSelf,
    transform:       style.transform,
    maskImage:       style.webkitMaskImage || style.maskImage,
    objectFit:       style.objectFit,
  };
}

// ─── Main inspector for one viewport ─────────────────────────────────────────
async function inspectViewport(page, url, sectionId, outputName, viewport) {
  const label = viewport.name;

  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  console.log(`\n📐 [${label.toUpperCase()}] viewport: ${viewport.width}×${viewport.height}`);

  // Navigate (login already done)
  await page.goto(url, { waitUntil: 'networkidle' });

  const selector = `#brxe-${sectionId}`;
  let section;
  try {
    await page.waitForSelector(selector, { timeout: 8000 });
    section = await page.$(selector);
    console.log(`  ✅ Found by ID: ${selector}`);
  } catch {
    // Fallback: Bricks site may use auto-generated IDs — find first section element
    console.log(`  ⚠️  ID "${selector}" not found — scanning for Bricks section elements...`);
    const allIds = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[id^="brxe-"]')).map(e => ({ id: e.id, tag: e.tagName }))
    );
    console.log(`  📋 Bricks IDs on page: ${JSON.stringify(allIds.slice(0, 8))}`);
    // Try to find a section (div with brxe- ID that is a direct child of main/body area)
    section = await page.$('[id^="brxe-"]:first-of-type') || await page.$('[id^="brxe-"]');
    if (!section) throw new Error(`Không tìm thấy element: ${selector} tại viewport ${label}`);
    const foundId = await section.evaluate(el => el.id);
    console.log(`  ✅ Fallback: using first Bricks element #${foundId}`);
  }

  // ── Screenshot ──────────────────────────────────────────────────────────────
  ensureDir(IMAGES_DIR);
  const screenshotPath = path.join(IMAGES_DIR, `${outputName}-${label}.png`);
  await section.screenshot({ path: screenshotPath });
  console.log(`  📸 Screenshot → ${screenshotPath}`);

  // ── Computed styles audit ───────────────────────────────────────────────────
  const auditData = await page.evaluate((sId, getStylesFn) => {
    const root = document.querySelector(`#brxe-${sId}`);
    if (!root) return null;

    // Re-define extractStyles inside evaluate context
    const getStyles = (el) => {
      const style = window.getComputedStyle(el);
      return {
        display:         style.display,
        flexDirection:   style.flexDirection,
        flexWrap:        style.flexWrap,
        gap:             style.gap,
        rowGap:          style.rowGap,
        columnGap:       style.columnGap,
        padding:         style.padding,
        margin:          style.margin,
        width:           style.width,
        height:          style.height,
        minWidth:        style.minWidth,
        maxWidth:        style.maxWidth,
        fontSize:        style.fontSize,
        fontWeight:      style.fontWeight,
        lineHeight:      style.lineHeight,
        color:           style.color,
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        borderRadius:    style.borderRadius,
        border:          style.border,
        position:        style.position,
        top:             style.top,
        left:            style.left,
        zIndex:          style.zIndex,
        opacity:         style.opacity,
        overflow:        style.overflow,
        justifyContent:  style.justifyContent,
        alignItems:      style.alignItems,
        alignSelf:       style.alignSelf,
        transform:       style.transform,
        maskImage:       style.webkitMaskImage || style.maskImage,
        objectFit:       style.objectFit,
      };
    };

    const result = {
      id:           sId,
      tagName:      root.tagName,
      boundingBox:  root.getBoundingClientRect().toJSON(),
      computedStyle: getStyles(root),
      children:     [],
    };

    root.querySelectorAll('*').forEach(el => {
      result.children.push({
        id:           el.id || '',
        tagName:      el.tagName,
        className:    el.className,
        text:         el.innerText ? el.innerText.substring(0, 60) : '',
        boundingBox:  el.getBoundingClientRect().toJSON(),
        computedStyle: getStyles(el),
      });
    });

    return result;
  }, sectionId);

  ensureDir(LOGS_DIR);
  const auditPath = path.join(LOGS_DIR, `${outputName}-${label}-audit.json`);
  fs.writeFileSync(auditPath, JSON.stringify(auditData, null, 2));
  console.log(`  📊 Audit JSON → ${auditPath}`);

  return { screenshotPath, auditPath };
}

// ─── Entry point ──────────────────────────────────────────────────────────────
async function run(url, sectionId, outputName) {
  const browser = await chromium.launch({ headless: true });

  try {
    // ── Login once ────────────────────────────────────────────────────────────
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    const loginUrl = `${process.env.WP_URL}/wp-login.php`;
    console.log(`🔑 Đăng nhập → ${loginUrl}`);
    await page.goto(loginUrl, { waitUntil: 'networkidle' });

    if (await page.$('#user_login')) {
      await page.fill('#user_login', process.env.WP_USER);
      await page.fill('#user_pass', process.env.WP_PASS);
      await page.click('#wp-submit');
      await page.waitForNavigation({ waitUntil: 'networkidle' });
      console.log('✅ Đăng nhập thành công!');
    } else {
      console.log('ℹ️  Đã đăng nhập sẵn.');
    }

    // ── Inspect mỗi viewport ─────────────────────────────────────────────────
    const results = {};
    for (const viewport of VIEWPORTS) {
      results[viewport.name] = await inspectViewport(page, url, sectionId, outputName, viewport);
    }

    console.log('\n✅ ARI hoàn tất!');
    console.log('─'.repeat(50));
    for (const [vp, paths] of Object.entries(results)) {
      console.log(`[${vp}]`);
      console.log(`  📸  ${paths.screenshotPath}`);
      console.log(`  📊  ${paths.auditPath}`);
    }

    await browser.close();

  } catch (err) {
    await browser.close();
    console.error(`❌ Lỗi: ${err.message}`);
    process.exit(1);
  }
}

// ─── Args validation ──────────────────────────────────────────────────────────
const [url, sectionId, outputName] = process.argv.slice(2);
if (!url || !sectionId || !outputName) {
  console.log('Cách dùng:');
  console.log('  node bricks-inspector.js [url] [sectionId] [outputName]');
  console.log('');
  console.log('Ví dụ:');
  console.log('  node bricks-inspector.js "http://localhost:8000/?bricks_preview=7581" "s1sc01" "S1-Hero"');
  console.log('');
  console.log('Output:');
  console.log('  images/S1-Hero-desktop.png');
  console.log('  images/S1-Hero-mobile.png');
  console.log('  logs/S1-Hero-desktop-audit.json');
  console.log('  logs/S1-Hero-mobile-audit.json');
  process.exit(1);
}

run(url, sectionId, outputName);
