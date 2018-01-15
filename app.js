const app = require('express')()
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const oauth2orize = require('oauth2orize')
const server = oauth2orize.createServer()
app.use(expressSession({
  secret: 'askdlgnlkqwneglngkdlasjbioj235KW#JT%IEWAJFLASDGISDAJG'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
  console.log('/')
  if (req.query.code) {
    console.log(req.query)
  } else {
    console.log(req.query)
    console.log(req.body)
  }
  res.status(200).end()
})
app.post('/authenticate', (req, res, next) => {
  if (req.body.username === 'name' && req.body.password === 'pw') {
    req.session.user = req.body
    res.redirect(302, req.query.continue)
  } else res.redirect(401, req.body.continue)
})
app.all('/access_token', (req, res, next) => {
  res.status(200).end()
})

app.get('/authorize', server.authorization((clientId, redirectUri, scope, done) => {
  console.log('/authorize')
  console.log(clientId)
  console.log(redirectUri)
  console.log(scope)
  done(null, clientId, redirectUri)
}), server.decision({ loadTransaction: false }, (serverReq, callback) => {
  callback(null)
}))
server.serializeClient((client, done) => {
  console.log('serializeClient')
  console.log(client)
  done(null, client)
})
server.deserializeClient((id, done) => {
  console.log('deserializeClient')
  console.log(id)
  done(null, id)
})
server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
  console.log('authorization code type')
  console.log(client)
  console.log(redirectUri)
  console.log(user)
  console.log(ares)
  const code = 'code'
  done(null, code)
}))

server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
  done(null, '1st access_token', 'refresh_token', 3600)
}))
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
  console.log('refresh token type')
  console.log(client)
  console.log(scope)
  if (refreshToken === 'refresh_token') done(null, '2nd access_token', null, 3600)
}))
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  console.log('resource owner password credntials type')
  console.log(client)
  console.log(username)
  console.log(password)
  console.log(scope)
  if (username === 'name' && password === 'pw') done(null, '1st access_token', 'refresh_token', 3600)
}))

app.post('/token', (req, res, next) => {
  console.log('req.body.grant_type: ', req.body.grant_type)
  if (req.user === undefined) {
    console.log('req.user === undefined')
    req.user = {
      clientId: 'ab'
    }
  }
  next()
}, server.token(server))
app.listen(7001, () => {
  console.log('server is running')
})
