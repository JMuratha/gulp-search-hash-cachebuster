var gulp = require('gulp');
var cachebuster = require('../index.js');

gulp.task('default', function () {

  var options = new cachebuster.CachebusterOptions();
  options.setHash('testhash');

  return gulp.src('./src/index.html')
    .pipe(cachebuster.createGulpStream(options))
    .pipe(gulp.dest('./dist'));
});
