var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var casperJs = require('gulp-casperjs');
var app = require('./app.js');

var port = 1337;
var server = app.listen(port);

gulp.task('default', ['test'], function() {
  return;
});

gulp.task('test', function() {
  gulp.src('casper-test.js').pipe(casperJs());
  return gulp.src('app.spec.js').pipe(mocha());
});

gulp.task('dev', ['casper', 'mocha'], function() {
  server.close();
});

gulp.task('casper', function() {

  return gulp.src('casper-test.js').pipe(casperJs());
});

gulp.task('mocha', function() {
  return gulp.src('app.spec.js').pipe(mocha());
});
