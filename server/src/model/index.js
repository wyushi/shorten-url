const sequelize = require('../db')
const modelURL = require('./url')

const URL = modelURL(sequelize)

module.exports = {
  URL
}