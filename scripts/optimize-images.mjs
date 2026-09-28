import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_ASSETS = "./public/assets";
const MANIFEST_PATH = "./src/config/imageManifest.json";

// Dimensions for multi-resolution generation where appropriate
const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600];

async function getFiles(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "frames") continue; // Keep frame animation sequence intact
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(await getFiles(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function generateBlurPlaceholder(imageBuffer) {
  try {
    const blur = await sharp(imageBuffer)
      .resize(16, 16, { fit: "inside" })
      .toFormat("webp", { quality: 20 })
      .toBuffer();
    return `data:image/webp;base64,${blur.toString("base64")}`;
  } catch (e) {
    return null;
  }
}

async function processImage(filePath, manifest) {
  const relPath = filePath.replace(/\\/g, "/").replace(/^public\//, "/");
  const parsed = path.parse(filePath);
  const buffer = fs.readFileSync(filePath);

  const metadata = await sharp(buffer).metadata();
  const width = metadata.width || 800;
  const height = metadata.height || 600;
  const aspect = width / height;

  // Generate Blur-up LQIP placeholder
  const blurDataURL = await generateBlurPlaceholder(buffer);

  // Output paths
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
  const avifPath = path.join(parsed.dir, `${parsed.name}.avif`);

  let webpSize = 0;
  let avifSize = 0;

  // Process WebP
  if (metadata.hasAlpha || parsed.ext.toLowerCase() === ".png") {
    // Lossless or high-quality lossy WebP for transparent PNGs
    const webpBuf = await sharp(buffer)
      .webp({ quality: 80, effort: 6, nearLossless: true })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuf);
    webpSize = webpBuf.length;

    const avifBuf = await sharp(buffer)
      .avif({ quality: 75, effort: 5, lossless: false })
      .toBuffer();
    fs.writeFileSync(avifPath, avifBuf);
    avifSize = avifBuf.length;
  } else {
    // Photos / JPEGs
    const webpBuf = await sharp(buffer)
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuf);
    webpSize = webpBuf.length;

    const avifBuf = await sharp(buffer)
      .avif({ quality: 72, effort: 5 })
      .toBuffer();
    fs.writeFileSync(avifPath, avifBuf);
    avifSize = avifBuf.length;
  }

  // Also compress the main source file if JPEG/PNG to reduce fallback weight
  if (parsed.ext.toLowerCase() === ".png") {
    const optPng = await sharp(buffer)
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toBuffer();
    if (optPng.length < buffer.length) {
      fs.writeFileSync(filePath, optPng);
    }
  } else if (/\.(jpg|jpeg)$/i.test(parsed.ext)) {
    const optJpg = await sharp(buffer)
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    if (optJpg.length < buffer.length) {
      fs.writeFileSync(filePath, optJpg);
    }
  }

  // Generate responsive variants for large images (width > 600)
  const variants = [];
  if (width > 600) {
    for (const targetWidth of RESPONSIVE_WIDTHS) {
      if (targetWidth >= width) continue;
      const varWebpPath = path.join(parsed.dir, `${parsed.name}-${targetWidth}w.webp`);
      const varAvifPath = path.join(parsed.dir, `${parsed.name}-${targetWidth}w.avif`);

      const varWebpBuf = await sharp(buffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer();
      fs.writeFileSync(varWebpPath, varWebpBuf);

      const varAvifBuf = await sharp(buffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .avif({ quality: 72, effort: 4 })
        .toBuffer();
      fs.writeFileSync(varAvifPath, varAvifBuf);

      variants.push({
        width: targetWidth,
        webp: varWebpPath.replace(/\\/g, "/").replace(/^public\//, "/"),
        avif: varAvifPath.replace(/\\/g, "/").replace(/^public\//, "/"),
      });
    }
  }

  manifest[relPath] = {
    width,
    height,
    aspectRatio: parseFloat(aspect.toFixed(4)),
    blurDataURL,
    webp: webpPath.replace(/\\/g, "/").replace(/^public\//, "/"),
    avif: avifPath.replace(/\\/g, "/").replace(/^public\//, "/"),
    variants,
  };

  console.log(`✓ Processed: ${relPath} (${(fs.statSync(filePath).size / 1024).toFixed(1)}KB -> WebP: ${(webpSize / 1024).toFixed(1)}KB, AVIF: ${(avifSize / 1024).toFixed(1)}KB)`);
}

async function run() {
  console.log("Starting Image Optimization...");
  const files = await getFiles(PUBLIC_ASSETS);
  const manifest = {};

  for (const file of files) {
    // Skip already generated variant files (-400w, -800w, etc)
    if (/-\d+w\.(webp|avif)$/.test(file)) continue;
    try {
      await processImage(file, manifest);
    } catch (e) {
      console.error(`Error processing ${file}:`, e.message);
    }
  }

  const manifestDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n🎉 Image optimization complete! Saved manifest to ${MANIFEST_PATH}`);
}

run();
