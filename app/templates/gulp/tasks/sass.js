JSON.minify = JSON.minify || require("node-json-minify");

var autoprefixer = require('gulp-autoprefixer');
var bulkSass = require('gulp-sass-bulk-import');
var csso = require('gulp-csso');
var del = require('del');
var filter = require('gulp-filter');
var fs = require('fs');
var ftp = require('gulp-ftp');
var ftpConfig = JSON.parse(JSON.minify(fs.readFileSync('./sftp-config.json', 'utf8')));
var gulp = require('gulp');
var gulpif = require('gulp-if');
var mmq = require('gulp-merge-media-queries');
var notify = require("gulp-notify");
var rev = require('gulp-rev');
var revall = require('gulp-rev-all');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var util = require('gulp-util');

var upload = true;

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
    .pipe(mmq({
      log: true
    }))
    //.pipe(csso()) // Uncomment for production
    //.pipe(sourcemaps.write()) // Uncomment for sourcemaps
    .pipe(plumber.stop())
    .pipe(gulp.dest('src/<%= cssFolder %>'))
    .pipe(notify({
      title: "CSS",
      message: "Generated: <%= file.relative %>"
    }))
  ;
});

gulp.task('sass_clean_sprites', function() {
  del(['<%= publicFolder %>/img/sprite@*.png']);
});

gulp.task('sass', ['sass_compile', 'sass_clean_sprites'], function() {
  var pngFilter = filter("**/*.png");

  return gulp.src(['src/<%= cssFolder %>/*.css', 'src/<%= imgFolder %>/*.png'], { base: 'src' })
    .pipe(revall({ ignore: ['.css'] }))
    .pipe(gulp.dest('<%= publicFolder %>'))
    .pipe(gulpif(upload, ftp({
      host: ftpConfig.host,
      port: ftpConfig.port,
      user: ftpConfig.user,
      pass: ftpConfig.password,
      remotePath: ftpConfig.remote_path
    })))
    .pipe(gulpif(upload, notify({
      title: "CSS uploaded",
      message: "Uploaded: <%= file.relative %>"
    })))
  ;
});