var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var siofu = require('socketio-file-upĺoad');

var clients = {};
var admin;

app.get('/', (req, res) => {
  res.send('<h1>Servidor de mensagens habilitado.</h1>');
});

//app.use(siofu.router);

io.on("connection",  (client) => {
    //var uploader = new siofu();
    //uploader.dir = "/home/micaellgoms/UFMA/Projects3th/Chat-Sockets/uploads/"
    //uploader.listen(socket);

    client.on("join", (name, time) => {
    	clients[client.id] = [name, time];
        num_clients = Object.keys(clients).length;
        console.log("Entrou: " + name + "\nNúmero de clientes: "+num_clients);
        client.emit("update", "Você entrou na Sala de bate Papo.");
        client.broadcast.emit("update", name + " entrou na Sala.");
        if(num_clients==1){
            admin = client.id;
        }
        //console.log("Name:"+clients[client.id][0]+" Time:"+clients[client.id][1]);

    });

    client.on("send", (msg) => { 
    	console.log("Message: " + msg);
        if(msg=="#desligar"){ 
            if(admin == client.id){
                console.log("Comando Desligar ativado! O servidor será desconectado em 10 segundos.")
                io.emit("update", "Server will be disconnected in 10 seconds!")
                setInterval(function(){
                    io.close();
                },10000);
            }else{
                client.emit("update","Você não é um administrador!");
            }
        }else{
            client.broadcast.emit("chat", clients[client.id][0], msg);
        }
    });

    client.on("disconnect", () => {
    	console.log("Disconnect");
        io.emit("update", clients[client.id][0] + " deixou a sala.");
        if(num_clients>1 && client.id == admin){
            var tempo = clients[admin][1];
            for(var key in clients){
                if(key != admin){
                    admin = key;
                    break;
                }
            }
            io.emit("update", "#"+clients[admin][0]+" é o novo administrador da sala!");
        }
        delete clients[client.id];
    });
});


http.listen(8082, () => {
  console.log('listening on port 8082');
});
