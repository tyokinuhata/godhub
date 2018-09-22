const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
require('dotenv').config();
const PORT = process.env.PORT || 7000
const fs = require('fs-extra')
// const execSync = require('child_process').execSync
const analyze = require('./word2vec/analyze.js')

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
    analyze.analyze(info.word)

    let results = fs.readJSONSync('./word2vec/result.json')
    let damage = 0
    for (result of results) damage += result.dist
    damage = Math.ceil(damage * 3)

    let db = fs.readJSONSync('./database.json')
    for (item of db) {
      if (item.name === info.enemy) {
        item.believer -= damage
      }
      if (item.name === info.name) {
        item.believer += damage
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
