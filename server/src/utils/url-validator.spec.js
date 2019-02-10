const validURL = require('./url-validator')


test('test null input', () => {
  expect(validURL(null)).toBeFalsy()
})

test('test empty input', () => {
  expect(validURL('')).toBeFalsy()
})

test('test valid url', () => {
  expect(validURL('http://foo.bar')).toBeTruthy()
  expect(validURL('http://foo.bar/path')).toBeTruthy()
  expect(validURL('http://foo.bar/deepper/path')).toBeTruthy()
  expect(validURL('http://foo.bar/search?q=foo')).toBeTruthy()
  expect(validURL('http://foo.bar/search?q=foo&p=bar')).toBeTruthy()
})

test('test invalid url', () => {
  expect(validURL('foobar://foo.bar')).toBeFalsy()
})
