/* Imports */
const conf = require('./conf.json');
const { Controller } = require('./controller');
const express = require('express');
const http = require('http');
const { Server: SocketServer } = require('socket.io');

/* Create an Express app, a socket.io server and a controller. */
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  }
});
const controller = new Controller();

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
  let roomID = socket.handshake.query.roomID;
  console.log('Received roomID: ' + socket.handshake.query.roomID);

  // Join a room and return info.
  controller.connect(roomID).then((data) => {
    // Update roomID.
    roomID = data.roomID;
    socket.join(roomID);

    // Emit connection information.
    socket.emit('connected', data);
  }).catch((err) => {
    // Send a connection error, if any.
    console.log(err);
    socket.emit('connection_error', 'Unable to connect. Internal server error.');

    // Disconnect
    socket.disconnect(true);
  });

  // Event handler
  socket.on('update', (message) => {
    // Attempt an update.
    controller.update(roomID, message).then(() => {
      console.log(message);
      // If successful, broadcast the update to the room.
      socket.to(roomID).emit('update', message);
    }).catch((err) => {
      // If failed, send an updation error.
      console.log(err);
      socket.emit('updation_error', 'Unable to update message. Internal server error.');
    });
  })
});
