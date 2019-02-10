const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')
const modelURL = require('./url')


describe('URL model', () => {

  const Model = modelURL(sequelize, dataTypes)
  checkModelName(Model)('url')
  
  const instance = new Model()
  const propNames = ['id', 'shortened', 'original']
  for (let name of propNames) {
    checkPropertyExists(instance)(name)
  }

  // test('new URL', () => {
  //   const originalURL = 'http://foo.bar'
  //   Model.newURL(originalURL).then(data => console.log(data))
  // })
})
