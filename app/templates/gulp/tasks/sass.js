JSON.minify = JSON.minify || require("node-json-minify");

var autoprefixer = require('gulp-autoprefixer');
var bulkSass = require('gulp-sass-bulk-import');
var cmq = require('gulp-combine-media-queries');
var csso = require('gulp-csso');
var del = require('del');
var filter = require('gulp-filter');
var fs = require('fs');
var ftp = require('gulp-ftp');
var ftpConfig = JSON.parse(JSON.minify(fs.readFileSync('./sftp-config.json', 'utf8')));
var gulp = require('gulp');
var notify = require("gulp-notify");
var rev = require('gulp-rev');
var revall = require('gulp-rev-all');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var upload = true;

gulp.task('sass_compile', function() {

  return gulp.src('./scss/*.scss')
    .pipe(bulkSass())
    //.pipe(sourcemaps.init()) // Not working w/bulkSass
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cmq({
      log: true
    }))
    //.pipe(csso()) // Uncomment for production
    //.pipe(sourcemaps.write(gulp.dest('app/css')))
    .on("error", notify.onError({
      message: "<%= error.message %>",
      title: "Error CSS"
    }))
    .pipe(gulp.dest('src/css'))
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