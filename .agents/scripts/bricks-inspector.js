require('dotenv').config();
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectSection(url, sectionId, outputName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // 1. Quy trình Đăng nhập WordPress
    const loginUrl = `${process.env.WP_URL}/wp-login.php`;
    console.log(`🔑 Đang đăng nhập vào: ${loginUrl}`);
    
    await page.goto(loginUrl, { waitUntil: 'networkidle' });
    
    // Kiểm tra xem có đang ở trang login không
    if (await page.$('#user_login')) {
      await page.fill('#user_login', process.env.WP_USER);
      await page.fill('#user_pass', process.env.WP_PASS);
      await page.click('#wp-submit');
      await page.waitForNavigation({ waitUntil: 'networkidle' });
      console.log('✅ Đăng nhập thành công!');
    } else {
      console.log('ℹ️ Có vẻ đã được đăng nhập hoặc không cần login.');
    }

    // 2. Truy cập URL Template/Page cần soi
    console.log(`🚀 Đang truy cập: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Đợi Bricks render xong (ID Bricks thường có tiền tố brxe-)
    const selector = `#brxe-${sectionId}`;
    await page.waitForSelector(selector, { timeout: 15000 });

    const section = await page.$(selector);
    if (!section) {
      throw new Error(`❌ Không tìm thấy element: ${selector}`);
    }

    // 3. Chụp ảnh tự động (ARI Screenshot)
    const screenshotPath = path.join(process.cwd(), 'images', `${outputName}.png`);
    if (!fs.existsSync(path.join(process.cwd(), 'images'))) {
      fs.mkdirSync(path.join(process.cwd(), 'images'));
    }
    await section.screenshot({ path: screenshotPath });
    console.log(`📸 Đã lưu screenshot: ${screenshotPath}`);

    // 4. Trích xuất Computed Style thực tế (Runtime Data)
    const auditData = await page.evaluate((sId) => {
      const root = document.querySelector(`#brxe-${sId}`);
      
      const getStyles = (el) => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          flexDirection: style.flexDirection,
          gap: style.gap,
          padding: style.padding,
          margin: style.margin,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          color: style.color,
          backgroundColor: style.backgroundColor,
          borderRadius: style.borderRadius,
          width: style.width,
          height: style.height,
          position: style.position,
          zIndex: style.zIndex,
          justifyContent: style.justifyContent,
          alignItems: style.alignItems,
          boxSizing: style.boxSizing
        };
      };

      const results = {
        id: sId,
        tagName: root.tagName,
        computedStyle: getStyles(root),
        boundingBox: root.getBoundingClientRect(),
        children: []
      };

      const elements = root.querySelectorAll('*');
      elements.forEach(el => {
        results.children.push({
          id: el.id,
          tagName: el.tagName,
          className: el.className,
          computedStyle: getStyles(el),
          boundingBox: el.getBoundingClientRect(),
          text: el.innerText ? el.innerText.substring(0, 30) : ''
        });
      });

      return results;
    }, sectionId);

    // 5. Lưu báo cáo Audit JSON
    const auditPath = path.join(process.cwd(), 'logs', `${outputName}-audit.json`);
    if (!fs.existsSync(path.join(process.cwd(), 'logs'))) {
      fs.mkdirSync(path.join(process.cwd(), 'logs'));
    }
    fs.writeFileSync(auditPath, JSON.stringify(auditData, null, 2));
    console.log(`📊 Đã lưu báo cáo Audit: ${auditPath}`);

  } catch (error) {
    console.error(`❌ Lỗi ARI Inspector: ${error.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

const [url, sectionId, outputName] = process.argv.slice(2);
if (!url || !sectionId || !outputName) {
  console.log('Sử dụng: node bricks-inspector.js [url] [sectionId] [outputName]');
  process.exit(1);
}

inspectSection(url, sectionId, outputName);
