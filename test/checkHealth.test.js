/* global describe, it */
const http = require('http')
const { checkType } = require('easily-expect')
module.exports = () => {
  describe('/', (done) => {
    it('root page is open', done => {
      http.get('http://127.0.0.1:7001/', res => {
        checkType('object', res)
        checkType('number', res.statusCode)
        done()
      })
    })
  })
}
