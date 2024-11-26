const express = require('express');
const http = require('http');
const app = require('./app');
const initializeSocket = require('./utils/socket'); // Socket 초기화 함수

// 서버 및 Socket.IO 초기화
const server = http.createServer(app);
const io = initializeSocket(server); // Socket.IO를 initializeSocket에서 반환

const PORT = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:3000');
  }
);

// Socket.IO 이벤트 처리
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // 채팅 메시지 처리
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg); // 모든 클라이언트에 메시지 전송
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
