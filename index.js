const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UsersService = require('./UserService');

const userService = new UsersService();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//function to support new chat user
io.on('connection', function(socket) {
    //the client listens to the chat entry message
    socket.on('join', function(name) {
        // we save the user who appeared in the application to the website holding the list of people in the chat
        userService.addUser({
            id: socket.id,
            name
        });
        // the application emits an update event which updates information about the list of users to everyone listening to the 'update' event
        io.emit('update', {
            users: userService.getAllUsers()
        });
    });
    //Support for breaking the connection with the server
    socket.on('disconnect', () => {
        userService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: userService.getAllUsers()
        });
    });
    //Support for sending messages to chat users
    socket.on('message', function(message) {
        const {name} = userService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        });
    });
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});