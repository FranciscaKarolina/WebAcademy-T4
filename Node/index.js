const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(req,res){
    const directoryPath = path.join('C:', 'Users', 'queir', 'OneDrive', 'Documentos');

    //Função readdir
    fs.readdir(directoryPath, (err, files) =>{
        if(err){
            res.writeHead(500, {"Content-Type":"text/html;charset=utf-8"});
            res.write("Erro ao ler o diretório.");
            return res.end();
        }

        // Cria a lista de arquivos em HTML
        let fileList = '<ul>';
        files.forEach(file => {
            fileList += `<li>${file}</li>`;
        });
        fileList += '</ul>';

        // Retorna a resposta com a lista de arquivos
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<h1>Arquivos no diretorio:</h1>${fileList}`);
        return res.end();
    });
});

server.listen(3333);