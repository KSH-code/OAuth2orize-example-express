/* global passport */
const { ensureLoggedIn } = require('connect-ensure-login')
const oauth2orize = require('oauth2orize')
const util = require('./util')
const server = oauth2orize.createServer()

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
  console.log('server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {')
  console.log(client)
  console.log(redirectUri)
  console.log(user)
  console.log(ares)
  done(null, 'code ' + encodeURIComponent(redirectUri))
  // const code = util.sign({ sub: user.username, exp: 3600 })
  // db.authorizationCodes.save(code, client.clientId, redirectUri, user.username, client.scope)
  //   .then(() => done(null, code))
  //   .catch(err => done(err))
}))
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
  console.log('server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {')
  if (code.split(' ')[0] === 'code' && redirectUri === code.split(' ')[1]) {
    done(null, util.encrypt({
      redirectUri
    }), util.encrypt({
      redirectUri
    }))
  } else done(null, false)
}))

exports.authorization = [
  ensureLoggedIn('/login'),
  server.authorization((clientId, redirectUri, scope, done) => {
    done(null, { clientId, scope }, redirectUri) // serializeClient
  }), (req, res, next) => {
    if (req.query.client_id === 'client_id') {
      server.decision({ loadTransaction: false }, (serverReq, callback) => {
        callback(null, { allow: true })
      })(req, res, next)
    }
  }]

exports.decision = [ensureLoggedIn('/login'), server.decision]
global.passport = global.passport || require('passport')
exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]

server.serializeClient((client, done) => done(null, client.clientId))
