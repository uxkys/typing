// server.js
const express = require('express');     // Webサーバー用フレームワーク
const http = require('http');          // httpサーバー
const socketIO = require('socket.io'); // WebSocketライブラリ

const app = express();                 // Expressアプリを作成
const server = http.createServer(app); // HTTPサーバーを作る
const io = socketIO(server);           // サーバーにWebSocketを紐付け

// publicフォルダを静的ファイル配信する
app.use(express.static('public'));

// クライアントが接続してきたときの処理
io.on('connection', (socket) => {
  console.log('クライアントが接続しました:', socket.id);

  // 実験者画面から"notifyAll"イベントが来たら
  socket.on('notifyAll', () => {
    // すべてのクライアントに"notify"イベントを送る
    io.emit('notify', { message: '通知が来ました！' });
  });
});

// 3000番ポートでサーバー起動
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
