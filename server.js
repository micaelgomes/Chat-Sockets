var app = require('express')();
var http = require('http').Server(app);

app.get('/', (req, res) => {
    res.send("<h1>Server Start!</h1>");
});

http.listen(8082, () => {
    console.log('ouvindo na Porta 8082');
});