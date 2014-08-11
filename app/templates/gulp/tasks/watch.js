var gulp = require('gulp');

gulp.task('watch', ['setWatch'], function() {
  gulp.watch('scss/**/*.scss', ['compass']);
  gulp.watch('<%= imgLocation %>/sprite/svg/**/*.svg', ['sprite']);
  gulp.watch('<%= imgLocation %>/inline/svg/**/*.svg', ['inline-image']);
});