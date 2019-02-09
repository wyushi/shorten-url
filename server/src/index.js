let express = require('express')
let bodyParser = require('body-parser')
let port = process.argv[2] || 8080

let app = express()
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/urls/:hash', (req, res) => {
  res.send({
    "id": 1234,
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