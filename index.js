const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = htttp.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});