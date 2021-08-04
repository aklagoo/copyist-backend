const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  }
});

app.get('/', (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

server.listen(process.env.SELF_PORT, () => {
  console.log('listening on *:' + process.env.SELF_PORT);
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('roomID', '0');
});