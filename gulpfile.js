var gulp = require("gulp");
var watch = require('gulp-watch');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var less = require('gulp-less');

gulp.task("default", ['js', 'less'], function() {
  gulp.watch(['styles/*.less'], ['less']);
 // gulp.watch(['components/*.js'], ['js']);
});

gulp.task('less', function () {
  return gulp.src('styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('styles'));
});

gulp.task("js", function () {
  return gulp.src("components/*.js")
    .pipe(concat('all.js'))
    .pipe(babel())
    .pipe(gulp.dest("components/dest"));
});
