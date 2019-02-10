const { URL } = require('../model')
const validURL = require('../utils/url-validator')

const ws = (io) => {
  io.on('connection', (socket) => {
  
    socket.on('shorten url', (url) => {
      console.log(url)
      if (validURL(url)) {
        URL.newURL(url).then(url => socket.emit('shortened url', url))
      } else {
        socket.emit('shorten failed', { message: 'invalid URL' })
      }
    })
  })
}

module.exports = ws