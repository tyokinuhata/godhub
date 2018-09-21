const express = require('express')
const io = require('socket.io')()

const app = express()

app.get('/', (req, res) => {
  res.send('hello, world!')
})

app.listen(8080, () => {
  console.log('サーバ is 動いてる')
})