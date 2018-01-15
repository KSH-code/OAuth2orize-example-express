/* global describe, it */
const request = require('request')
const { checkEqual } = require('easily-expect')

describe('/authorize', () => {
  it('/authenticate', done => {
    request.post('http://localhost:7001/authenticate?continue=http%3A%2F%2Flocalhost%3A7001%2Fauthorize%3Fclient_id%3Dab%26redirect_uri%3Dhttp%3A%2F%2Flocalhost%3A7001%2F%26response_type%3Dcode', { form: {
      username: 'name',
      password: 'pw'
    }}, (err, res, body) => {
      if (err) console.error(err)
      checkEqual('Found. Redirecting to http://localhost:7001/authorize?client_id=ab&redirect_uri=http://localhost:7001/&response_type=code', res.body)
      done()
    })
  })
  it('/authorize', done => {
    request.get('http://localhost:7001/authorize?client_id=ab&response_type=code&scope=abcd&state=state&redirect_uri=http://localhost:7001/', (err, res, body) => {
      if (err) console.error(err)
      console.log(body)
      done()
    })
  })
})
