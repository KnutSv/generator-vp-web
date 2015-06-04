var gulp = require('gulp');

gulp.task('watch', ['setWatch'], function() {
  
  gulp.watch('scss/**/*.scss', ['sass']);

  gulp.watch('js/**/*.js', ['js']);

  gulp.watch('img/sprite/svg/**/*.svg', ['sprite']);

});