const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();

app.use(express.static(path.join(__dirname, '/client/')));

const messages = [];
const users = [];


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('join', (newUser) => {
    console.log('We have got new user !!' + newUser.name + 'Welcome !');
    let user = { name: '', id : ''};
    user.name = newUser.name;
    user.id = socket.id;
    users.push(user);

    let message = {author: 'ChatBot', content: `${newUser.name} has joined the conversation`};
    socket.broadcast.emit('message', message);
  });
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('ohh, socket' + socket.id + 'gary move out');
    users.forEach(user => {
      if(user.id == socket.id){
        let message = {author: 'ChatBot', content:`${user.name} has left the conversation`};
        socket.broadcast.emit('message', message);
        const userIndex = users.indexOf(user);
        users.splice(userIndex,1);
      }
    });
  });
});