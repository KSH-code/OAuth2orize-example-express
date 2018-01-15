const passport = require('passport')
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
    })
  } else done(null, false)
}))
function clientCheck (clientId, clientSecret, done) {
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
passport.use(new BasicStrategy(clientCheck))
passport.use(new ClientPasswordStrategy(clientCheck))
// verify bearer access token 
passport.use(new BearerStrategy((accessToken, done) => {
  if (JwtVerify(accessToken)) {
    done(null, accessToken)
  } else done(null, false)
}))
passport.serializeUser((user, done) => {
  done(null, user.username)
})
passport.deserializeUser((username, done) => {
  done(null, {
    username
  })
})
