var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var plumber = require('gulp-plumber');
var util = require('gulp-util');


gulp.task('js', function() {

  // Main JS-scrips, loaded in body footer
  gulp.src([
      'js/main.js'
    ])
    .pipe(plumber({
      errorHandler: function(error) {
        util.log(
          util.colors.cyan('Plumber') + util.colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    }))
    //.pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(plumber.stop())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('<%= publicFolder %>/<%= jsFolder %>/'));

  // For Old IE, loaded in head
  gulp.src([
      'bower_components/html5shiv/dist/html5shiv-printshiv.min.js'
    ])
    .pipe(concat('oldIE.js'))
    .pipe(gulp.dest('<%= publicFolder %>/<%= jsFolder %>/'));


  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('<%= publicFolder %>/<%= jsFolder %>/'));
});