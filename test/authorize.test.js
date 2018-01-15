/* global describe, it */
const request = require('request')
// const { checkEqual } = require('easily-expect')

describe('/authrize', () => {
  it('success for login', done => {
    request.get('http://127.0.0.1:7001/authrize?', {
      form: {
        // username: 'name',
        // password: 'pw'
      }
    }, (err, res, body) => {
      if (err) console.error(err)
      console.log(body)
      done()
    })
  })
})
