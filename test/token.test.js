/* global describe, it */
const request = require('request')
const { checkEqual } = require('easily-expect')

describe('/token', () => {
  it('authorization code type', done => {
    request.post('http://localhost:7001/token', { form: {
      code: 'code',
      redirect_uri: 'http://localhost:7001',
      grant_type: 'authorization_code',
      client_secret: 'secret'
    }}, (err, res, body) => {
      if (err) console.error(err)
      checkEqual('{"access_token":"1st access_token","refresh_token":"refresh_token","token_type":"Bearer"}', res.body)
      done()
    })
  })
  it('refresh token type', done => {
    request.post('http://localhost:7001/token', { form: {
      redirect_uri: 'http://localhost:7001',
      grant_type: 'refresh_token',
      refresh_token: 'refresh_token'
    }}, (err, res, body) => {
      if (err) console.error(err)
      checkEqual('{"access_token":"2nd access_token","token_type":"Bearer"}', res.body)
      done()
    })
  })
  it('resource owner password credentials type', done => {
    request.post('http://localhost:7001/token', { form: {
      redirect_uri: 'http://localhost:7001',
      grant_type: 'password',
      username: 'name',
      password: 'pw',
      scope: 'scope',
      client_id: 'client_id'
    }}, (err, res, body) => {
      if (err) console.error(err)
      checkEqual('{"access_token":"1st access_token","refresh_token":"refresh_token","token_type":"Bearer"}', res.body)
      done()
    })
  })
})
