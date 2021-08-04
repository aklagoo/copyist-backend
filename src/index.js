const conf = require('./conf.json');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', (req, res) => {
  res.redirect(conf.CLIENT_URL);
});

server.listen(conf.SELF_PORT, () => {
  console.log('listening on *:' + conf.SELF_PORT);
});

io.on('connection', (socket) => {
  socket.emit('roomID', '0');
  console.log('Emitted roomID');
});