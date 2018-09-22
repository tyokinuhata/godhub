const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
require('dotenv').config();
const PORT = process.env.PORT || 7000
const fs = require('fs-extra')

app.get('/', (req, res) => {
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

  // こうげき
  socket.on('attack', (info) => {
    let db = fs.readJSONSync('./database.json')
    console.log(db)
    console.log(info)
    for (item of db) {
      if (item.name === info.enemy) {
        item.believer -= 5
      }
      if (item.name === info.name) {
        item.believer += 5
      }
    }
    fs.writeJSONSync('./database.json', db)
  })

  // 切断時の処理
  // socket.on('beforeClose', (id) => {
  //   console.log(id)
  //   socket.on('disconnect', () => {
  //     console.log('ユーザー is 退出した');
  //   })
  // })
})

http.listen(PORT, () => {
  console.log('サーバ is 動いてる')
})
