/* global describe, it */
const request = require('request')
const { checkEqual } = require('easily-expect')

describe('/login', () => {
  it('success for login', done => {
    request.post('http://127.0.0.1:7001/login', {
      form: {
        username: 'name',
        password: 'pw'
      }
    }, (err, res, body) => {
      if (err) console.error(err)
      checkEqual('Found. Redirecting to /', body)
      done()
    })
  })
})
