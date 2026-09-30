import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const proposalIn = 'C:/Users/rahul/.gemini/antigravity-ide/brain/b60f02fb-4850-46e1-bc1e-607da9c28bf5/story_proposal_hd_1790750297051.jpg';
  const firstHelloIn = 'C:/Users/rahul/.gemini/antigravity-ide/brain/b60f02fb-4850-46e1-bc1e-607da9c28bf5/story_first_hello_hd_1790750324922.jpg';
  const chaiIn = 'C:/Users/rahul/.gemini/antigravity-ide/brain/b60f02fb-4850-46e1-bc1e-607da9c28bf5/story_chai_hd_1790750352202.jpg';

  const outDir = 'public/assets/photos';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. First Hello HD
  await sharp(firstHelloIn)
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'story-first-hello-hd.png'));
  console.log('Processed First Hello HD');

  // 2. Chai Moment HD
  await sharp(chaiIn)
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'story-chai-hd.png'));
  console.log('Processed Chai Moment HD');

  // 3. Proposal HD - Clean the bottom text rows 968-1024
  // Sample ivory tone from y: 950-960
  const patchSvg = Buffer.from(
    '<svg width="1024" height="60"><rect width="1024" height="60" fill="#F6EFDF"/></svg>'
  );

  await sharp(proposalIn)
    .composite([{ input: patchSvg, top: 966, left: 0 }])
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'story-proposal-hd.png'));
  console.log('Processed Proposal HD');
}

main().catch(console.error);
