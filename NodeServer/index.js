// Node server to handle Socket io connections 


// const io = require("socket.io")(8000);

// const users = {};

// io.on('connection', socket => {
//     socket.on('new-user-joined', name => {
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     }); 
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); 

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

const users = {};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'The_ChatApp.html'));
});

// Serve static files if needed (adjust if necessary)
app.use(express.static(path.join(__dirname, '..', 'public')));


io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
});


server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
