/* global describe, it, jar */
const request = require('request')
const { checkEqual } = require('easily-expect')
const queryString = require('querystring')

module.exports = () => {
  describe('/authorize', () => {
    it('Missing required parameter: response_type', done => {
      request.get('http://127.0.0.1:7001/authorize', {
        jar
      }, (err, res, body) => {
        if (err) console.error('Missing required parameter: response_type: ', err)
        checkEqual(400, res.statusCode)
        done()
      })
    })
    it('Missing required parameter: client_id', done => {
      request.get('http://127.0.0.1:7001/authorize?response_type=code', {
        jar
      }, (err, res, body) => {
        if (err) console.error('Missing required parameter: client_id: ', err)
        checkEqual(400, res.statusCode)
        done()
      })
    })
    it('Missing required parameter: ', done => {
      request.get('http://127.0.0.1:7001/authorize?response_type=code&client_id=client_id', {
        jar
      }, (err, res, body) => {
        if (err) console.error('Unable to issue redirect for OAuth 2.0 transaction: ', err)
        checkEqual(500, res.statusCode)
        done()
      })
    })
    it('Success for generate code: ', done => {
      request.get('http://127.0.0.1:7001/authorize?response_type=code&client_id=client_id&redirect_uri=http%3A%2F%2Flocalhost%3A7001%2F&state=state', {
        jar
      }, (err, res, body) => {
        if (err) console.error('Unable to issue redirect for OAuth 2.0 transaction: ', err)
        checkEqual(200, res.statusCode)
        global.code = queryString.parse(res.req.path.substr(2, res.request.path.length))
        done()
      })
    })
  })
}
