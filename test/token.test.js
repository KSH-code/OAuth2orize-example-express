/* global describe, it */
const request = require('request')
const { checkEqual } = require('easily-expect')

describe('/token', () => {
  it('/token', done => {
    request.post('http://localhost:7001/token', { form: {
      code: 'code',
      redirect_uri: 'http://localhost:7001',
      grant_type: 'authorization_code'
    }}, (err, res, body) => {
      if (err) console.error(err)
      checkEqual('{"access_token":"token","refresh_token":"refresh_token","token_type":"Bearer"}', res.body)
      done()
    })
  })
})
