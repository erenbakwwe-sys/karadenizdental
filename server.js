const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  let decodedPath = '';
  try {
    decodedPath = decodeURIComponent(reqUrl);
  } catch (e) {
    decodedPath = reqUrl;
  }

  if (decodedPath === '/' || decodedPath === '') {
    decodedPath = '/index.html';
  }

  const baseDir = __dirname;
  const filePath = path.normalize(path.join(baseDir, decodedPath));

  // Güvenlik kontrolü (path traversal koruması)
  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('Erişim engellendi.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 sayfası
      const notFoundPath = path.join(baseDir, '404.html');
      fs.readFile(notFoundPath, (err404, data404) => {
        if (!err404) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(data404);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('404 - Sayfa Bulunamadı');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Sunucu hatası: ' + readErr.message);
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Karadeniz Diş Polikliniği Web Sitesi Yayında!`);
  console.log(`🔗 Adres: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
