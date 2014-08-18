var gulp = require('gulp');
var watch = require('gulp-watch');
var cache = require('gulp-cached');
var notify = require("gulp-notify");
var svg2png = require('gulp-svg2png');
var svgmin = require('gulp-svgmin');
var notify = require("gulp-notify");

gulp.task('watch', ['setWatch'], function() {
  
  gulp.watch('scss/**/*.scss', ['compass']);

  watch({glob: './<%= imgLocation %>/sprite/svg/**/*.svg'}, function(files) {
    files.pipe(cache('sprite@1x', {optimizeMemory: true}))
      .pipe(svgmin([{removeViewBox: true}]))
      .pipe(svg2png())
      .pipe(gulp.dest('./<%= imgLocation %>/sprite/@1x'))
      .pipe(notify({
        title: "PNG @1x",
        message: "Created: <%= file.relative %>"
      }));
    files.pipe(cache('sprite@2x', {optimizeMemory: true}))
      .pipe(svgmin([{removeViewBox: true}]))
      .pipe(svg2png(2))
      .pipe(gulp.dest('./<%= imgLocation %>/sprite/@2x'))
      .pipe(notify({
        title: "PNG @2x",
        message: "Created: <%= file.relative %>"
      }));
  });

  watch({glob: './<%= imgLocation %>/inline/svg/**/*.svg'}, function(files) {
    files.pipe(cache('inline@1x', {optimizeMemory: true}))
      .pipe(svgmin([{removeViewBox: true}]))
      .pipe(svg2png())
      .pipe(gulp.dest('./<%= imgLocation %>/inline/@1x'))
      .pipe(notify({
        title: "PNG @1x",
        message: "Created: <%= file.relative %>"
      }));
    files.pipe(cache('inline@2x', {optimizeMemory: true}))
      .pipe(svgmin([{removeViewBox: true}]))
      .pipe(svg2png(2))
      .pipe(gulp.dest('./<%= imgLocation %>/inline/@2x'))
      .pipe(notify({
        title: "PNG @2x",
        message: "Created: <%= file.relative %>"
      }));
  });
});