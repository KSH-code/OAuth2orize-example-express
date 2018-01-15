const app = require('express')()
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const oauth2 = require('./oauth2')

app.use(expressSession({
  saveUninitialized: true,
  resave: true,
  secret: 'asdgasdgasdgasdg',
  key: 'asdgasdgasdgasdg'
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
require('./passportSetting')

app.get('/', (req, res) => {
  console.log('hello this page is root page')
  console.log(req.query)
  res.status(200).end()
})
app.get('/login', (req, res) => {
  console.log('hello this page is login page')
})
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  const { continue: continueUri } = req.query
  if (continueUri) {
    res.redirect(302, continueUri)
  }
})
app.all('/authorize', oauth2.authorization)

app.listen(7001, () => {
  console.log('server is running')
})
