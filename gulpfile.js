var packages = require('./package.json');

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var ipfsAPI = require('ipfs-api')
var clean = require('gulp-clean');
var uglify = require("gulp-uglify");
var addsrc = require('gulp-add-src');
var concat = require("gulp-concat");
var header = require("gulp-header");
var runner = require('run-sequence');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');

var DEST = path.join(__dirname, 'dist/');

var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

// task
gulp.task('default', function () {
    runner('build');
});

gulp.task('build', function () {
  runner('clean', 'js-browserify', 'build-js', 'build-css', 'build-html', 'build-ipfs');
});

gulp.task('clean', function () {
    return gulp.src([DEST],{read: false})
    .pipe(clean());
});

gulp.task('js-browserify', function () {
  return gulp.src('src/js/app.js')
  .pipe(browserify({insertGlobals : true}))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(DEST + 'js'));
});

gulp.task('build-js', function () {
  return gulp.src([
      'node_modules/mithril/mithril.js',
      'node_modules/web3/dist/web3.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(header('/*! <%= packages.name %> <%= packages.version %> */\n', {packages: packages} ))
  .pipe(gulp.dest(DEST + 'js'));
});

gulp.task('build-css', function () {
  return gulp.src([
    'node_modules/bulma/css/bulma.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'src/css/app.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('app.css'))
  .pipe(minify({keepBreaks:false}))
  .pipe(rename({suffix: '.min'}))
  .pipe(header('/*! <%= packages.name %> <%= packages.version %> */\n', {packages: packages} ))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(DEST + 'css'));
});

gulp.task('build-html', function () {
  return gulp.src(['src/*.html'])
  .pipe(addsrc('src/fonts/**', { base: 'src'}))
  .pipe(addsrc('src/img/**', { base: 'src'}))
  .pipe(gulp.dest(DEST));
});

gulp.task('build-ipfs', function () {
  ipfs.util.addFromFs('dist', {recursive: true}, (err, result) => {
    if (err) {
      console.log("\n\nIs IPFS daemon running?\n\n");
      throw err
    }
    console.log("\n\n" + 'Access the site at: https://gateway.ipfs.io/ipfs/' + result[result.length-1]['hash'] + "\n\n");
  });
});