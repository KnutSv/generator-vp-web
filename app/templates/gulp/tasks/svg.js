var gulp = require('gulp');
var notify = require("gulp-notify");
var svg2png = require('gulp-svg2png');
var svgmin = require('gulp-svgmin');
var changed = require('gulp-changed');

gulp.task('svg1x', function () {
  return gulp.src('./img/sprite/svg/**/*.svg')
    .pipe(changed('./img/sprite/@1x', {extension: '.png'}))
    .pipe(svgmin([{removeViewBox: true}]))
    .pipe(svg2png())
    .pipe(gulp.dest('./img/sprite/@1x'))
    .pipe(notify({
      title: "PNG @1x",
      message: "Created: <%= file.relative %>"
    }));
});

gulp.task('svg2x', function () {
  return gulp.src('./img/sprite/svg/**/*.svg')
    .pipe(changed('./img/sprite/@2x', {extension: '.png'}))
    .pipe(svgmin([{removeViewBox: true}]))
    .pipe(svg2png(2))
    .pipe(gulp.dest('./img/sprite/@2x'))
    .pipe(notify({
      title: "PNG @2x",
      message: "Created: <%= file.relative %>"
    }));
});