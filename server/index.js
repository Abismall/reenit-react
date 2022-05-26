import { createServer, get } from 'http';
import { Server } from 'socket.io';
import {
  getGameById,
  getAvailableLocations,
} from './api/requests.js';
import express from 'express';

const app = express();
const httpServer = createServer(app);
const port = 5000;
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
let allOnlineUsers = {};

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
// ON CONNECTION
io.on('connection', async (socket) => {
  console.log(`user ${socket.id} connected`);
  allOnlineUsers[socket.id] = socket.id;

  // ON DISCONNECT
  socket.on('disconnect', () => {
    console.log(`user disconnected`);
    delete allOnlineUsers[socket.id];
  });
  // ON GET CURRENT
  socket.on('update', async (room) => {
    const update = await getGameById(room);
    //socket.broadcast.to(room).emit('refreshCurrentGame', update);
    io.to(room).emit('refreshCurrentGame', update);
  });
  // ON JOIN
  socket.on('setCurrentRoom', (room) => {
    socket.join(room);
  });
  // ON GET AVAILABLE LOCATIONS
  socket.on('getLocations', async () => {
    const locationList = await getAvailableLocations();
    socket.emit('setLocations', locationList);
  });
});

httpServer.listen(port, function () {
  console.log(`listening on *:${port}`);
});
