var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var less = require('gulp-less');

gulp.task("default", ['background', "content_script", 'browser_action', 'less'], function() {
  gulp.watch(['styles/*.less'], ['less']);
  gulp.watch(['src/bg/*.js'], ['background']);
  gulp.watch(['src/cs/*.js'], ['content_script']);
  gulp.watch(['src/ba/*.js'], ['browser_action']);
});

gulp.task('less', function () {
  return gulp.src('styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('styles'));
});

gulp.task("background", function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/bg/background.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('background.js'))
    .pipe(gulp.dest('./bg/'));
});

gulp.task("content_script", function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/cs/content_script.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('content_script.js'))
    .pipe(gulp.dest('./cs/'));
});

gulp.task("browser_action", function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/ba/browser_action.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('browser_action.js'))
    .pipe(gulp.dest('./ba/'));
});
