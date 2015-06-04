var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', ['svg1x', 'svg2x'], function () {

  var spriteData1x = gulp.src('./img/sprite/@1x/*.png').pipe(spritesmith({
    imgName: 'sprite@1x.png',
    cssName: '_sprite1x.scss',
    imgPath: '../img/sprite@1x.png',
    padding: 2,
    algorithm: 'binary-tree',
    cssOpts: {
      res: '1x'
    },
    cssTemplate: './gulp/util/scss.template.mustache'
  }));

  var spriteData2x = gulp.src('./img/sprite/@2x/*.png').pipe(spritesmith({
    imgName: 'sprite@2x.png',
    cssName: '_sprite2x.scss',
    imgPath: '../img/sprite@2x.png',
    padding: 2,
    algorithm: 'binary-tree',
    cssOpts: {
      res: '2x'
    },
    cssTemplate: './gulp/util/scss.template.mustache'
  }));

  spriteData1x.img.pipe(imagemin({use: [pngquant({ quality: '65-80' })]})).pipe(gulp.dest('./src/<%= imgFolder %>/'));
  spriteData1x.css.pipe(gulp.dest('./scss/data/'));
  spriteData2x.img.pipe(imagemin({use: [pngquant({ quality: '65-80' })]})).pipe(gulp.dest('./src/<%= imgFolder %>/'));
  spriteData2x.css.pipe(gulp.dest('./scss/data/'));

});