var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {}; 

app.get('/', function(req, res){
  res.send('<h1>Servidor de mensagens habilitado.</h1>');
});

io.on("connection", function (client) {  
    client.on("join", function(name){
    	console.log("entrou: " + name);
        clients[client.id] = name;
        client.emit("update", "Você entrou na Sala de bate Papo.");
        client.emit("update", "Nesta sala é proibido mandar Nudes");
        client.broadcast.emit("update", name + " entrou na Sala.")
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " deixou a sala.");
        delete clients[client.id];
    });
});


http.listen(8082, function(){
  console.log('listening on port 8082');
});
