const path = require('path');
const http = require('http');
const fileSystem = require('fs');

const server = http.createServer((req, res) => {

    let viewsPath = `${__dirname}${path.sep}views`;

    switch (req.url) {

        case '/':
            res.statusCode = 200;
            viewsPath += path.sep + "index.html";
            break;
        case '/about':
            res.statusCode = 200;
            viewsPath += path.sep + "about.html";
            break;
        case '/about-me':
            res.statusCode = '301';
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            res.statusCode = 404;
            viewsPath += path.sep + "404.html";
            break;
    }

    fileSystem.readFile(viewsPath, 'utf-8', (err, data) => {

        if (err) return;
        res.write(data);
        res.end();
    })
});

server.listen(3002, 'localhost', () => {

    console.log("LISTENING TO PORT 3002")
});