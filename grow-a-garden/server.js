const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 8002;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.unityweb': 'application/wasm',
  '.data': 'application/octet-stream',
  '.framework.js': 'application/javascript'
};

// Determine content type based on file path
function getContentType(filePath) {
  if (filePath.endsWith('.data.br')) {
    return 'application/octet-stream';
  } else if (filePath.endsWith('.framework.js.br')) {
    return 'application/javascript';
  } else if (filePath.endsWith('.wasm.br')) {
    return 'application/wasm';
  } else {
    const extname = path.extname(filePath);
    return MIME_TYPES[extname] || 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  // Handle favicon.ico request
  if (req.url === '/favicon.ico') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Normalize URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './custom.html';
  }

  // Get content type
  const contentType = getContentType(filePath);
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File not found: ${filePath}`);
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
    
    // Set up response headers
    const headers = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    };
    
    // Handle Brotli files
    if (filePath.endsWith('.br')) {
      console.log(`Serving Brotli file: ${filePath}`);
      
      // Add Brotli content encoding
      headers['Content-Encoding'] = 'br';
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200, headers);
      fileStream.pipe(res);
    } else {
      // For WebAssembly files, add identity encoding
      if (contentType === 'application/wasm') {
        headers['Content-Encoding'] = 'identity';
      }
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200, headers);
      fileStream.pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});