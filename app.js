const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 7000
const fs = require('fs-extra')

app.get('/' , (req, res) => {
  res.sendFile(__dirname + '/index.html')
  io.emit()
})

io.on('connection', (socket) => {
  console.log('Socket.io is 繋がってる')
  socket.on('message', (msg) => {
    let db = fs.readJSONSync('./database.json')
    db.push(JSON.parse(msg))
    fs.writeJSONSync('./database.json', db)
    io.emit('message', JSON.stringify(db))
  })
})

http.listen(PORT, () => {
  console.log('サーバ is 動いてる')
})