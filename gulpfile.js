const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-mocha')

nodemon({
  script: './app.js'
})

gulp.task('default', cb => {
})
gulp.task('test', cb => {
  return gulp.src('test/index.js', { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('end', process.exit)
    .once('error', err => err)
})
