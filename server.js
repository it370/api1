const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalize the URL by removing query string, trailing slash, etc.
  let url = req.url;
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex !== -1) {
    url = url.substring(0, queryStringIndex);
  }
  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1);
  }
  
  // If URL is empty or just "/", serve index.html
  if (url === '' || url === '/') {
    url = '/index.html';
  }

  // Get the file path
  let filePath = path.join(__dirname, url);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist but could be a direct API call (e.g., /users)
      if (!path.extname(filePath)) {
        // Try serving the index.html to let client-side routing handle it
        filePath = path.join(__dirname, 'index.html');
      } else {
        // Otherwise, return 404
        res.writeHead(404);
        res.end('File not found');
        return;
      }
    }

    // Read the file
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.message}`);
        return;
      }

      // Get the content type
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'text/plain';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Try these endpoints:`);
  console.log(`- http://localhost:${PORT}/users`);
  console.log(`- http://localhost:${PORT}/users?id=3`);
  console.log(`- http://localhost:${PORT}/products`);
  console.log(`- http://localhost:${PORT}/products?category=electronics`);
}); 