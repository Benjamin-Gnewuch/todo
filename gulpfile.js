var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casperJs = require('gulp-casperjs');

gulp.task('default', function() {
  nodemon({ script: 'app.js' })
  .on('start', ['test']);
});

gulp.task('test', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('dev', ['mocha','casper'], function() {
});

gulp.task('casper', function() {
  return gulp.src('public/casper-test.js').pipe(casperJs());
});

gulp.task('mocha', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});
