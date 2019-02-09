const Sequelize = require('sequelize')
const dbUrl = 'postgres://postgres:mypassword@postgres:5432/postgres'

const sequelize = new Sequelize(dbUrl)

sequelize.authenticate()
  .then(_ => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

module.exports = sequelize