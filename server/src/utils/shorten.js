const md5 = require('md5')
const base62 = require("base62/lib/ascii")

function hash(s) {
  return md5(s)
}

function shorten(long) {
  if (!long) return null
  if (long === '') return null

  const hex = hash(long)
  const b62 = base62.encode(parseInt(hex, 16))
  return b62.substring(0, 3)
}

module.exports = shorten