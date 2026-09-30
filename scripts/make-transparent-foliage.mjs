import sharp from "sharp";
import fs from "fs";
import path from "path";

async function processFoliage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Create RGBA buffer (4 channels)
  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    // Checkerboard gray/white pattern detection:
    // Light gray/white pixels with r,g,b close to each other and bright (>180)
    const isGrayOrWhite = r > 175 && g > 175 && b > 175 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18;

    if (isGrayOrWhite) {
      // Make transparent
      rgba[dstIdx] = 0;
      rgba[dstIdx + 1] = 0;
      rgba[dstIdx + 2] = 0;
      rgba[dstIdx + 3] = 0;
    } else {
      // Keep original pixel
      rgba[dstIdx] = r;
      rgba[dstIdx + 1] = g;
      rgba[dstIdx + 2] = b;
      rgba[dstIdx + 3] = 255;
    }
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved transparent foliage to ${outputPath}`);
}

async function main() {
  const leftInput = "C:/Users/rahul/.gemini/antigravity-ide/brain/b60f02fb-4850-46e1-bc1e-607da9c28bf5/closing_foliage_left_hd_1790768347450.jpg";
  const rightInput = "C:/Users/rahul/.gemini/antigravity-ide/brain/b60f02fb-4850-46e1-bc1e-607da9c28bf5/closing_foliage_right_hd_1790768428186.jpg";

  const outDir = "public/assets/watercolor";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  await processFoliage(leftInput, path.join(outDir, "closing-foliage-left-hd.png"));
  await processFoliage(rightInput, path.join(outDir, "closing-foliage-right-hd.png"));
}

main().catch(console.error);
