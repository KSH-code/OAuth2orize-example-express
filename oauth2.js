const { ensureLoggedIn } = require('connect-ensure-login')
const oauth2orize = require('oauth2orize')
const util = require('./util')
const server = oauth2orize.createServer()

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
  done(null, 'code')
  // const code = util.sign({ sub: user.username, exp: 3600 })
  // db.authorizationCodes.save(code, client.clientId, redirectUri, user.username, client.scope)
  //   .then(() => done(null, code))
  //   .catch(err => done(err))
}))
server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
  if (code === 'code') {
    done(null, util.encrypt({
      redirectUri
    }), util.encrypt({
      redirectUri
    }))
  } else done(null, false)
}))

exports.authorization = [
  ensureLoggedIn(),
  server.authorization(server.authorization((clientId, redirectUri, scope, done) => {
    done(null, { clientId, scope }, redirectUri)
  })), (req, res, next) => {
    if (req.query.client_id === 'client_id') {
      server.decision({ loadTransaction: false }, (serverReq, callback) => {
        callback(null, { allow: true })
      })(req, res, next)
    }
  }]

exports.decision = [ensureLoggedIn(), server.decision]
