const express = require('express')
const bodyParser = require('body-parser')
const attachAPI = require('./api/url')
const port = process.env.PORT || 80

const app = express()
app.use(bodyParser.json({ type: 'application/json' }))

attachAPI(app)

app.listen(port)
console.log(`server listen to ${port}`)