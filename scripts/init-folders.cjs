const fs = require('fs');
const path = require('path');

const folders = [
  'october-2025',
  'november-2025',
  'december-2025',
  'january-2026',
  'february-2026',
  'march-2026',
  'april-2026',
  'may-2026',
  'june-2026',
  'july-2026',
  'august-2026',
  'september-2026',
  'october-2026'
];

const baseDir = path.join(__dirname, '../public/images/memories');

folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const readmePath = path.join(dirPath, 'README.txt');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(
      readmePath,
      `Place photos for ${folder} here:\n- featured.jpg (large featured photograph)\n- photo1.jpg\n- photo2.jpg\n\nOr customize photo paths in src/data/memories.js!\n`,
      'utf8'
    );
  }
});

const musicDir = path.join(__dirname, '../public/music');
if (!fs.existsSync(musicDir)) {
  fs.mkdirSync(musicDir, { recursive: true });
}

console.log('✅ All 13 memory folders and music directory successfully initialized.');
