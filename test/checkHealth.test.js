/* global describe, it */
const http = require('http')
const { checkType } = require('easily-expect')

describe('/', (done) => {
  it('root page is open', () => {
    http.get('http://127.0.0.1:7001/', res => {
      checkType('object', res)
      checkType('number', res.statusCode)
    })
  })
})
