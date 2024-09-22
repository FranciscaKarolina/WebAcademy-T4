const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv") 
const {createLink} = require('./util');

//carregar o arquivo .env
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

const PORT = process.env.PORT ?? 7878;

const directoryPath = process.argv[2];

const server = http.createServer((req,res) => {
    const filePath = path.join(directoryPath, req.url);

    //Verifica se está acessando a raiz
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
                fileList += `<a href="/${file}">${file}</a><br>\n`;
            });

            // Retorna a resposta 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.write(`<h1>Arquivos no diretorio:</h1>${directoryPath}`);
            res.write(fileList);
            return res.end();
        });
    }else{
        fs.readFile(filePath, 'utf8', (err, data) =>{
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
                res.write("Arquivo não encontrado.");
                return res.end();
            }
            //Exibir conteudo
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.write(`<a href="/">Voltar</a><br>`);
            res.write(`<pres>${data}</pres>`);
            return res.end();
        })
    } 
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});