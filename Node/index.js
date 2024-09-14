const http = require('http');

const server = http.createServer(function(red,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
    res.write("Instituto de Computação");
    res.end();
});

server.listen(3333);