var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require("gulp-notify");
var svg2png = require('gulp-svg2png');

gulp.task('sprite', function() {
  gulp.src('./<%= imgLocation %>/sprite/svg/**/*.svg')
    .pipe(cache('sprite@1x', {optimizeMemory: true}))
    //.pipe(svgmin([{removeViewBox: true}]))
    .pipe(svg2png())
    .pipe(gulp.dest('./<%= imgLocation %>/sprite/@1x'))
    .pipe(notify({
      title: "PNG @1x",
      message: "Created: <%= file.relative %>"
    }));
  gulp.src('./<%= imgLocation %>/sprite/svg/**/*.svg')
    .pipe(cache('sprite@2x', {optimizeMemory: true}))
    //.pipe(svgmin([{removeViewBox: true}]))
    .pipe(svg2png(2))
    .pipe(gulp.dest('./<%= imgLocation %>/sprite/@2x'))
    .pipe(notify({
      title: "PNG @2x",
      message: "Created: <%= file.relative %>"
    }));
});

gulp.task('inline-image', function() {
  gulp.src('./<%= imgLocation %>/inline/svg/**/*.svg')
    .pipe(cache('inline@1x', {optimizeMemory: true}))
    //.pipe(svgmin([{removeViewBox: true}]))
    .pipe(svg2png())
    .pipe(gulp.dest('./<%= imgLocation %>/inline/@1x'))
    .pipe(notify({
      title: "PNG @1x",
      message: "Created: <%= file.relative %>"
    }));
  gulp.src('./<%= imgLocation %>/inline/svg/**/*.svg')
    .pipe(cache('inline@2x', {optimizeMemory: true}))
    //.pipe(svgmin([{removeViewBox: true}]))
    .pipe(svg2png(2))
    .pipe(gulp.dest('./<%= imgLocation %>/inline/@2x'))
    .pipe(notify({
      title: "PNG @2x",
      message: "Created: <%= file.relative %>"
    }));
});