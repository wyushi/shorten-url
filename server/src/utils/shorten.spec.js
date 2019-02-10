const shorten = require('./shorten')


test('test null input', () => {
  expect(shorten(null)).toBeNull()
})

test('test empty input', () => {
  expect(shorten('')).toBeNull()
})

test('test returned string length', () => {
  expect(shorten('a').length).toBe(3)
  expect(shorten('dsklhjfe').length).toBe(3)
})

test('test returned string has right chars', () => {
  const r = shorten('a')
  const regx = new RegExp(/^[A-Za-z0-9]{3}$/)
  expect(regx.test(r)).toBeTruthy()
})