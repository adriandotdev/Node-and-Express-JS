const express = require('express');
const kill = require('kill-port');

// kill('3001', 'tcp')
// .then(console.log("KILLED"))
// .catch(console.log("NOT KILLED"));

const app = express();

app.get('/', (req, res) => {

    res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/about', (req, res) => {

    res.sendFile('./views/about.html', {root: __dirname});
});

app.get('/about-me', (req, res) => {
    res.send("ABOUT ME PO ULIT")
});

app.use((req, res) => {

    res.status(404).sendFile('./views/404.html', {root: __dirname});
});

app.listen(3001, () => console.log("Express server listening to port 3001"));