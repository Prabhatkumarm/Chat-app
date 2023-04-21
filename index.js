const express= require('express');
const app= express();
const http =require('http');
const server = http.createServer(app);
const path = require('path');
const socket =require('socket.io');
const io = socket(server);  //this evolves our server into a socket

const users={};

app.use('/',express.static(path.join(__dirname,'public')));

io.on('connection',(socket)=>{
    console.log(`someone got connected with id- ${socket.id}`);
    socket.on('send-msg',(data)=>{
        io.emit('received-msg',{
            msgg:data.msgg,
            id:users[socket.id]
        })
    })

    socket.on('login',(data)=>{
        users[socket.id]=data.username;
        console.log(users);
    })
})


const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`Server running on port ${port}.....`);
})