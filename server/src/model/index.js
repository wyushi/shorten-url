const Sequelize = require('sequelize')
const sequelize = require('../db')
const modelURL = require('./url')

const URL = modelURL(sequelize, Sequelize)

module.exports = {
  URL
}