import { createServer, get } from 'http';
import { Server } from 'socket.io';
import {
  getGameById,
  getAvailableLocations,
  removeUserFromLobby,
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
const allOnlineUsers = {};
const inGame = {};
const chat = [];
const roomChat = {};

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
// ON CONNECTION
io.on('connection', async (socket) => {
  console.log(`user ${socket.id} connected`);
  allOnlineUsers[socket.id] = socket.id;

  // ON DISCONNECT
  socket.on('disconnect', async () => {
    console.log(`user disconnected`);
    if (inGame[socket.id]) {
      await removeUserFromLobby(inGame[socket.id].id);
      delete inGame[socket.id];
    }
    delete allOnlineUsers[socket.id];
  });
  // ON GET CURRENT
  socket.on('update', async (room) => {
    const update = await getGameById(room);
    if (update) {
      io.to(room).emit('refreshCurrentGame', update);
    }

    //socket.broadcast.to(room).emit('refreshCurrentGame', update);
  });
  // ON JOIN
  socket.on('setCurrentRoom', (room, user) => {
    socket.join(room);
    inGame[socket.id] = user;
  });
  // ON GET AVAILABLE LOCATIONS
  socket.on('getLocations', async () => {
    const locationList = await getAvailableLocations();
    if (locationList) {
      socket.emit('setLocations', locationList);
    }
  });
  // ON LOAD CHAT
  socket.on('loadChat', function () {
    socket.emit('chatMessage', chat, null);
  });
  // ON CHAT MESSAGE
  socket.on('chatMessage', function (message, room) {
    if (room == null) {
      if (chat.length > 500) {
        chat.length = 0;
      }
      chat.push(message);
      socket.emit('chatMessage', chat, null);
      socket.broadcast.emit('chatMessage', chat, null);
    } else {
      socket.join(room);
      if (!roomChat[room]) {
        roomChat[room] = [];
      }
      roomChat[room].push(message);
      socket.emit('chaMessage', roomChat[room], room);
      io.to(room).emit('chatMessage', roomChat[room], room);
    }
  });
});

httpServer.listen(port, function () {
  console.log(`listening on *:${port}`);
});
