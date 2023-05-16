const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const messages = []; // массив сообщений
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('loadMessages', (startIndex, count, callback) => {
    // Загрузка пачки сообщений
    const newMessages = messages.slice(startIndex, startIndex + count);
    callback(newMessages);
  });
  socket.on('addMessage', (message) => {
    // Добавление нового сообщения
    messages.push(message);
    io.emit('newMessage', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
