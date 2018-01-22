/* global describe, it, jar */
const request = require('request')
const { checkEqual } = require('easily-expect')
module.exports = () => {
  describe('/login', () => {
    it('success for login', done => {
      request.post('http://127.0.0.1:7001/login?callback=http%3A%2F%2F127.0.0.1%3A7001%2Fauthorize%3Fclient_id%3Dclient_id%26state%3Dstate%26scope%3Dscope%26redriect_uri%3Dhttp%3A%2F%2F127.0.0.1%3A7001%2F', {
        form: {
          username: 'name',
          password: 'pw'
        },
        jar
      }, (err, res, body) => {
        if (err) console.error(err)
        checkEqual('Found. Redirecting to http://127.0.0.1:7001/authorize?client_id=client_id&state=state&scope=scope&redriect_uri=http://127.0.0.1:7001/', body)
        global.headers = res.headers
        done()
      })
    })
  })
}
