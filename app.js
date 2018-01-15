const app = require('express')()
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
app.use(expressSession({
  secret: 'askdlgnlkqwneglngkdlasjbioj235KW#JT%IEWAJFLASDGISDAJG'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
require('./passportSetting')

app.get('/', (req, res) => {
  res.status(200).end()
})
app.listen(7001, () => {
  console.log('server is running')
})
