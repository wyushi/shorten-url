const URL = require('../model/url')
const validURL = require('../utils/url-validator')

module.exports = function attach(app) {

  app.get('/urls/:hash', (req, res) => {
    const shortened = req.params.hash
    URL.findByShortURL(shortened)
      .then(url => {
        if (url === null) {
          res.status(404).send({ message: 'URL not found' })
        } else {
          url.shortened = `http://${req.headers.host}/${url.shortened}`
          res.send(url)
        }
      })
  })

  app.post('/urls', (req, res) => {
    const url = req.body.shortenURL
    if (validURL(url)) {
      URL.newURL(url).then(url => {
        url.shortened = `http://${req.headers.host}/${url.shortened}`
        res.send(url)
      })
    } else {
      res.status(400).send({ message: 'invalid URL' })
    }
  })

  app.get(/^\/([A-Za-z0-9]{3}$)/, (req, res) => {
    const shortened = req.params[0]
    URL.findByShortURL(shortened)
      .then(url => {
        if (url === null) {
          res.status(404).send({ message: 'URL not found' })
        } else {
          res.redirect(url.original)
        }
      })
  })
}