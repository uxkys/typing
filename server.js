const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 静的ファイル (public フォルダ) を配信
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('接続:', socket.id);

  // 実験者用画面からの"notifyAll"イベントを受信
  socket.on('notifyAll', (data) => {
    // デフォルトメッセージ
    const DEFAULT_MSG = '今の感情を教えてください。';

    // data.message が空でなければそのまま使う
    // 空ならデフォルトにフォールバック
    const msg = (data && data.message) 
      ? data.message 
      : DEFAULT_MSG;

    // 被験者用画面(client.html) に送信
    io.emit('notify', { message: msg });
  });
});

server.listen(3000, () => {
  console.log('サーバー起動: http://localhost:3000');
});
