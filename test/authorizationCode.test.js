/* global describe, it, jar */
const request = require('request')
const { checkEqual, checkType } = require('easily-expect')

module.exports = () => {
  describe('/token', () => {
    it('dont send body data', done => {
      request.post('http://127.0.0.1:7001/token', {
        jar
      }, (err, res, body) => {
        if (err) console.error('dont send body data: ', err)
        checkEqual(401, res.statusCode)
        checkEqual('Unauthorized', body)
        done()
      })
    })
    it('unsupported_grant_type', done => {
      request.post('http://127.0.0.1:7001/token', {
        jar,
        form: {
          code: global.code.code,
          client_id: 'client_id',
          client_secret: 'client_secret'
        }
      }, (err, res, body) => {
        if (err) console.error('unsupported_grant_type: ', err)
        checkEqual(501, res.statusCode)
        checkEqual('unsupported_grant_type', JSON.parse(body).error)
        done()
      })
    })
    it('dont send redirect uri', done => {
      request.post('http://127.0.0.1:7001/token', {
        jar,
        form: {
          code: global.code.code,
          client_id: 'client_id',
          client_secret: 'client_secret',
          grant_type: 'authorization_code'
        }
      }, (err, res, body) => {
        if (err) console.error('unsupported_grant_type: ', err)
        checkEqual(403, res.statusCode)
        checkEqual('invalid_grant', JSON.parse(body).error)
        done()
      })
    })
    it('generate token', done => {
      request.post('http://127.0.0.1:7001/token', {
        jar,
        form: {
          code: global.code.code,
          client_id: 'client_id',
          client_secret: 'client_secret',
          grant_type: 'authorization_code',
          redirect_uri: 'http%3A%2F%2Flocalhost%3A7001%2F'
        }
      }, (err, res, body) => {
        if (err) console.error('unsupported_grant_type: ', err)
        checkEqual(200, res.statusCode)
        body = JSON.parse(body)
        checkType('string', body.access_token, body.refresh_token, body.token_type)
        done()
      })
    })
  })
}
