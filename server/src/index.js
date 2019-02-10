const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const attachAPI = require('./api/url')
const ws = require('./ws')
const port = process.env.PORT || 80

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json({ type: 'application/json' }))

attachAPI(app)
ws(io)

http.listen(port)
console.log(`server listen to ${port}`)