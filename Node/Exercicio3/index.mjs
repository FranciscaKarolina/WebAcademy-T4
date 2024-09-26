import http from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 3001;
const publicDir = path.join(process.cwd(), 'public'); 

// Função para gerar os parágrafos 
function generateLoremIpsum(paragraphs) {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    return Array(paragraphs).fill(lorem).join('\n\n');
}

// Função para lidar com as requisições do servidor
const server = http.createServer(async (req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url; // Se for raiz, carrega o index.html
    const filePath = path.join(publicDir, url);

    try {
        if (req.url.startsWith('/lorem')) {
            const params = new URLSearchParams(req.url.split('?')[1]);
            const paragraphs = parseInt(params.get('x')) || 1; 

            const loremIpsum = generateLoremIpsum(paragraphs);
            res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
            return res.end(loremIpsum);
        }

        // Leitura de arquivos estáticos
        const data = await fs.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();

        let contentType = 'text/html';
        if (ext === '.css') contentType = 'text/css';
        if (ext === '.js') contentType = 'text/javascript';

        res.writeHead(200, { 'Content-Type': `${contentType};charset=utf-8` });
        res.end(data);
    } catch (err) {

        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('<h1>Arquivo não encontrado</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

