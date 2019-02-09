const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const port = process.argv[2] || 8080
const dbUrl = 'postgres://postgres:mypassword@postgres:5432/postgres'

const app = express()
app.use(bodyParser.json({ type: 'application/json' }))

const sequelize = new Sequelize(dbUrl)
sequelize.authenticate()
  .then(_ => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

app.get('/urls/:hash', (req, res) => {
  res.send({
    "id": 123,
    "shortened_url": `http://shorten.io/${req.param.hash}`,
    "original_url": "http://somewebsite.com"
  })
})

app.post('/urls', (req, res) => {
  res.send(req.body)
})

app.get(/^([A-Za-z0-9]{3}$)/, (req, res) => {
  res.redirect(`http://google.com/search?q=${req.params[0]}`)
})

app.listen(port)
console.log(`server listen to ${port}`)