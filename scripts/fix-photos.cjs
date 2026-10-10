const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const memoriesDir = path.join(__dirname, '..', 'public', 'images', 'memories');

async function processAllPhotos() {
  const folders = fs.readdirSync(memoriesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let convertedCount = 0;
  let copiedCount = 0;

  for (const folder of folders) {
    const folderPath = path.join(memoriesDir, folder);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (file.toLowerCase() === 'readme.txt') continue;
      // Skip already clean target names if they exist alongside double-extension files
      if (['featured.jpg', 'photo1.jpg', 'photo2.jpg', 'photo3.jpg'].includes(file)) continue;

      const fullSourcePath = path.join(folderPath, file);
      const lower = file.toLowerCase();

      // Determine base role (featured, photo1, photo2, photo3)
      let targetName = null;
      if (lower.startsWith('featured')) targetName = 'featured.jpg';
      else if (lower.startsWith('photo1')) targetName = 'photo1.jpg';
      else if (lower.startsWith('photo2')) targetName = 'photo2.jpg';
      else if (lower.startsWith('photo3')) targetName = 'photo3.jpg';

      if (!targetName) continue;

      const fullTargetPath = path.join(folderPath, targetName);

      if (lower.endsWith('.heic')) {
        console.log(`[HEIC -> JPG] Converting ${folder}/${file} -> ${targetName}...`);
        const inputBuffer = fs.readFileSync(fullSourcePath);
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.92
        });
        fs.writeFileSync(fullTargetPath, Buffer.from(outputBuffer));
        convertedCount++;
      } else {
        console.log(`[FIX EXT] Copying ${folder}/${file} -> ${targetName}...`);
        fs.copyFileSync(fullSourcePath, fullTargetPath);
        copiedCount++;
      }
    }
  }

  console.log(`\nDone! Converted ${convertedCount} HEIC photos and fixed ${copiedCount} double-extension photos.`);
}

processAllPhotos().catch((err) => {
  console.error('Error processing photos:', err);
  process.exit(1);
});
