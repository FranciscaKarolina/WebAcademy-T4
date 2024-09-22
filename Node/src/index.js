const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv") 
const {createLink} = require('./util');

//carregar o arquivo .env
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

const PORT = process.env.PORT ?? 7878;

const directoryPath = path.join('C:', 'Users', 'queir', 'OneDrive', 'Documentos');

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        //Função readdir
        fs.readdir(directoryPath, (err, files) =>{
            if(err){
                res.writeHead(500, {"Content-Type":"text/html;charset=utf-8"});
                res.write("Erro ao ler o diretório.");
                return res.end();
            }
    
            // Cria a lista de links
            let fileList = '';
            files.forEach(file => {
                fileList += createLink(file);
            });
    
            // Retorna a resposta 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`<h1>Arquivos no diretorio:</h1>${fileList}`);
            return res.end();
        });
    }else{
        // Exibir conteúdo do arquivo
        const filePath = path.join(directoryPath, req.url);
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write("Arquivo não encontrado.");
                return res.end();
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<pre>${data}</pre><br><a href="/">Voltar</a>`);
            return res.end();
        });   
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});