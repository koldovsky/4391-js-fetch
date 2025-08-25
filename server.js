import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve('.');
const port = process.env.PORT || 3000;

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.ico': 'image/x-icon',
	'.webp': 'image/webp',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'font/otf',
	'.txt': 'text/plain',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
	'.mp3': 'audio/mpeg',
	'.wav': 'audio/wav',
};

function getMimeType(filePath) {
	return mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream';
}

async function serveFile(res, filePath) {
	try {
		const data = await fs.readFile(filePath);
		res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
		res.end(data);
	} catch (err) {
		if (err.code === 'ENOENT') {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('404 Not Found');
		} else {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 Internal Server Error');
		}
	}
}

const server = createServer(async (req, res) => {
	let urlPath = decodeURIComponent(req.url.split('?')[0]);
	if (urlPath === '/') urlPath = '/index.html';
	const filePath = join(root, urlPath);

	try {
		const stat = await fs.stat(filePath);
		if (stat.isDirectory()) {
			// Try to serve index.html in directory
			return serveFile(res, join(filePath, 'index.html'));
		} else {
			return serveFile(res, filePath);
		}
	} catch {
		// Try to serve as 404
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 Not Found');
	}
});

server.listen(port, () => {
	console.log(`Static server running at http://localhost:${port}`);
});
