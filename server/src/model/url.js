const shorten = require('../utils/shorten')


const model = (sequelize, DataTypes) => {
  const schema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shortened: {
      type: DataTypes.STRING
    },
    original: {
      type: DataTypes.STRING
    }
  }

  let URL = sequelize.define('url', schema)

  URL.findByShortURL = (shortened) => {
    return URL.findAll({
      attributes: Object.keys(schema),
      where: { shortened }
    })
    .then(urls => {
      const url = urls.length === 0 ? null : purge(urls[0])
      return Promise.resolve(url)
    })
  }
  
  URL.findByOriginalURL = (original) => {
    return URL.findAll({
      attributes: Object.keys(schema),
      where: { original }
    })
    .then(urls => {
      const url = urls.length === 0 ? null : purge(urls[0])
      return Promise.resolve(url)
    })
  }
  
  URL.newURL = (original) => {
    return URL.findByOriginalURL(original)
      .then(url => {
        if (url !== null) {
          return Promise.resolve(url)
        }
        return newShort(original).then(shortened => {
          return URL.create({ shortened, original })
                    .then(url => Promise.resolve(purge(url)))
        })
      })
  }

  return URL
}

const newShort = (original) => {
  const short = shorten(original)
  console.log(original, '--->', short)
  return URL.findByShortURL(short).then(url => {
    if (url === null) {
      return Promise.resolve(short)
    }
    return newShort(short)
  })
}

function purge(url) {
  return {
    id: url.id,
    shortened: url.shortened,
    original: url.original
  }
}

module.exports = model
