const https = require('https');
const fs = require('fs');
const path = require('path');

const ASSETS = [
  {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    filename: 'marker-icon.png'
  },
  {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    filename: 'marker-icon-2x.png'
  },
  {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    filename: 'marker-shadow.png'
  }
];

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');

// 確保目錄存在
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

// 下載文件
ASSETS.forEach(asset => {
  const filePath = path.join(PUBLIC_IMAGES_DIR, asset.filename);
  const file = fs.createWriteStream(filePath);

  https.get(asset.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${asset.filename}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // 刪除不完整的文件
    console.error(`Error downloading ${asset.filename}:`, err.message);
  });
}); 