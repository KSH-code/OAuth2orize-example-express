/* global passport */
const { Strategy: LocalStrategy } = require('passport-local')
const { BasicStrategy } = require('passport-http')
const { Strategy: ClientPasswordStrategy } = require('passport-oauth2-client-password')
const { Strategy: BearerStrategy } = require('passport-http-bearer')
const { verify: JwtVerify } = require('./util')

// authenticate users based on a username and password
passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'name' && password === 'pw') {
    done(null, {
      username,
      password
    }) // serializeUser 에 들어갈 값
  } else done(null, false)
}))
function checkClient (clientId, clientSecret, done) {
  console.log('function checkClient (clientId, clientSecret, done) {', clientId, clientSecret)
  if (clientId === 'client_id' && clientSecret === 'client_secret') {
    done(null, {
      clientId,
      clientSecret
    })
  } else done(null, false)
}
// authenticate OAuth clients based on clientId and clientSecret
// clientId is client's name
// clientSecret is client's password
passport.use(new BasicStrategy(checkClient))
passport.use(new ClientPasswordStrategy(checkClient))

// verify bearer access token
passport.use(new BearerStrategy((accessToken, done) => {
  if (JwtVerify(accessToken)) {
    done(null, accessToken)
  } else done(null, false)
}))
passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user)
  done(null, user.username)
})
passport.deserializeUser((username, done) => {
  console.log('deserializeUser: ', username)
  done(null, {
    username
  })
})
