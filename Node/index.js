const http = require('http');
const fs = require('fs')

const server = http.createServer(function(red,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
    res.write("Instituto de Computação");
    res.end();

    //Renomear o arquivo
    fs.rename('imagem1.png', 'imagem2.png', function(err){
        if(err){
            console.log('Erro ao renomear o arquivo', err);
        }else{
            console.log('Arquivo renomeado com sucesso.');
        }
    });
});



server.listen(3333);