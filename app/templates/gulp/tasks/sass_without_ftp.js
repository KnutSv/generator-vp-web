var autoprefixer = require('gulp-autoprefixer');
var bulkSass = require('gulp-sass-bulk-import');
var cmq = require('gulp-combine-media-queries');
var csso = require('gulp-csso');
var del = require('del');
var filter = require('gulp-filter');
var gulp = require('gulp');
var notify = require("gulp-notify");
var rev = require('gulp-rev');
var revall = require('gulp-rev-all');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var util = require('gulp-util');

gulp.task('sass_compile', function() {

  return gulp.src('./scss/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        util.log(
          util.colors.cyan('Plumber') + util.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    .pipe(bulkSass())
    //.pipe(sourcemaps.init()) // Uncomment for sourcemaps
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cmq({
      log: true
    }))
    //.pipe(csso()) // Uncomment for production
    //.pipe(sourcemaps.write()) // Uncomment for sourcemaps
    .pipe(plumber.stop())
    .pipe(notify({
      title: "CSS",
      message: "Generated: <%= file.relative %>"
    }))
  ;
});

gulp.task('sass_clean_sprites', function() {
  del(['app/img/sprite@*.png']);
});

gulp.task('sass', ['sass_compile', 'sass_clean_sprites'], function() {
  var pngFilter = filter("**/*.png");

  return gulp.src(['src/css/*.css', 'src/img/*.png'], { base: 'src' })
    .pipe(revall({ ignore: ['.css'] }))
    .pipe(gulp.dest('app'))
  ;
});