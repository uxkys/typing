const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 静的ファイル (publicフォルダ) を配信
app.use(express.static('public'));

// Socket.IOの接続待ち
io.on('connection', (socket) => {
  console.log('接続:', socket.id);

  // 実験者画面からの "notifyAll" イベントを受け取ったら
  socket.on('notifyAll', (data) => {
    console.log('notifyAll:', data);

    // dataが { message: "ユーザが入力した内容" } で来る想定
    const msg = data && data.message ? data.message : '通知があります';

    // 被験者画面に "notify" イベントを配信
    // ここで、messageキーとして通知内容を載せる
    io.emit('notify', { message: msg });
  });
});

// 3000番ポートでサーバー起動
server.listen(3000, () => {
  console.log('サーバー起動: http://localhost:3000');
});
