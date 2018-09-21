const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 7000

app.get('/' , (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection',(socket) => {
  console.log('Socket.io is 繋がってる')
})

http.listen(PORT, () => {
  console.log('サーバ is 動いてる')
})