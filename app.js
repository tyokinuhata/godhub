const express = require('express')
const app = express()
const config = require('./.env')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = config.PORT || 7000
const fs = require('fs-extra')

app.get('/' , (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('Socket.io is 繋がってる')
  // 入室前にいたプレイヤーの情報を送信
  let db = fs.readJSONSync('./database.json')
  io.to(socket.id).emit('init', db)

  // プレイヤー情報の更新
  socket.on('message', (playerInfo) => {
    let db = fs.readJSONSync('./database.json')
    db.push(JSON.parse(playerInfo))
    fs.writeJSONSync('./database.json', db)
    io.emit('message', playerInfo)
  })
})

http.listen(PORT, () => {
  console.log('サーバ is 動いてる')
})
