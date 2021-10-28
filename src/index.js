/* Imports */
const conf = require('./conf.json');
const express = require('express');
const http = require('http');
const { Server: SocketServer } = require('socket.io');

/* Create an Express app and a socket.io server. */
const app = express();
const server = http.createServer(app);
const io = SocketServer(server, {
  cors: {
    origin: "*",
  }
});

/* Redirect user to client URL. */
app.get('/', (req, res) => {
  res.redirect(conf.CLIENT_URL);
});

/* Listener */
server.listen(conf.SELF_PORT, () => {
  console.log('listening on *:' + conf.SELF_PORT);
});

/* Socket.io server setup */
io.on('connection', (socket) => {
  console.log('Received roomID: ' + socket.handshake.query.roomID);
  socket.emit('roomID', '0');
});
