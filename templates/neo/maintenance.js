const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

let ready = false;

http.createServer((req, res) => {
    if (!ready) {
        res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`
            <h1>🚀 Starting...</h1>
            <script>
              setTimeout(()=>location.reload(),4000)
            </script>
        `);
    }
}).listen(3000, '0.0.0.0');

process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});