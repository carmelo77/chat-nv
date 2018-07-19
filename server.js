const express = require('express');

const app = express();

app.set('port', 3000);

let users = {};

app.get('*', (req, res) => {
  res.send('Chat init.');
});

const server = app.listen(app.get('port'), () => {
  console.log('Server ready on port 3000');
});

const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('socket connected!');

  socket.on('login', (username) => {
    if(users[username]) {
      socket.emit('USERS_EXISTS');
      return;
    }

    socket.username = username;
    users[username] = username;

    socket.emit('LOGIN', {
      username: socket.username,
      users: users
    });

    socket.broadcast.emit('USER_JOINED', {
      /*broadcast significa que emite a todos los sockets excepto al que recibe en esta funcion (login minus).
      Si quiero enviarle a todos de una vez (Recomendable para no mandar lo mismo 2 veces)
      Es preferible usar io.socket.emit */
      username: socket.username,
      users: users
    });

  });

  socket.on('newMessage', (message) => {
    socket.broadcast.emit('NEW_MESSAGE',
      {class: 'list-group-item list-group-item-secondary', message: socket.username + ': ' + message});
    socket.emit('NEW_MESSAGE', {class: 'list-group-item list-group-item-info', message: 'Yo: ' + message});
  });

  socket.on('disconnect', () => {
    if(users[socket.username]) {
      delete users[socket.username];
      socket.broadcast.emit('USER_LEFT', {
        username: socket.username,
        users
      });
    }
  });
});
