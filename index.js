//adapted from sean van every's in page tracking repository

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send("it begins...");
});

let watching = null;

io.sockets.on('connection', function(socket) {
  console.log(`human #${socket.id} is online`);

  socket.on('watch', function(data) {
    console.log(`watch ~ human data ${data}`);
    watching = socket;
  });

  socket.on('event', function(data) {
    console.log(`event ~ human data ${data}`);

    if (watching !== null) {
      data.socket_id = socket.id;
      watching.emit('event', data);
    }
  });

  socket.on('disconnect', function(data) {
    console.log("lost em");
  });
});
