var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-cssnano');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');

// clean dist directory
gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false, force: true})
    .pipe(clean());
});

// angular
gulp.task('angular', function () {
  return gulp.src('node_modules/angular/angular.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// angular-material
gulp.task('angular-material-js', function () {
  return gulp.src([
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-material/angular-material.js',
    ])
    .pipe(concat('angular-material.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('angular-material-css', function () {
  return gulp.src('node_modules/angular-material/angular-material.min.css')
    //.pipe(sourcemaps.init())
    //.pipe(minifyCss())
    //.pipe(rename({ extname: '.min.css' }))
    //.pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('angular-material', ['angular-material-js', 'angular-material-css']);

// font awesome
gulp.task('font-awesome-css', function () {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    //.pipe(sourcemaps.init())
    //.pipe(minifyCss())
    //.pipe(rename({ extname: '.min.css' }))
    //.pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('font-awesome-fonts', function () {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('font-awesome', ['font-awesome-css', 'font-awesome-fonts']);

// jquery
gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// angular ui router
gulp.task('angular-ui-router', function () {
  return gulp.src('node_modules/angular-ui-router/release/angular-ui-router.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// angular cookies
gulp.task('angular-cookies', function () {
  return gulp.src('node_modules/angular-cookies/angular-cookies.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// moment.js
gulp.task('moment', function () {
  return gulp.src('node_modules/moment/moment.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// ng-infinite-scroll.js
gulp.task('infinite-scroll', function () {
  return gulp.src('node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// angular-file-upload.js
gulp.task('angular-file-upload', function () {
  return gulp.src('node_modules/angular-file-upload/dist/angular-file-upload.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
});

// all third party libs
gulp.task('libs', [
  'angular', 
  'angular-material', 
  'font-awesome', 
  'jquery', 
  'angular-ui-router', 
  'angular-cookies', 
  'moment', 
  'infinite-scroll', 
  'angular-file-upload'
]);


// common
gulp.task('common', function () {
  return gulp.src('src/*.*')
    .pipe(gulp.dest('dist'));
});

// images
gulp.task('images', function () {
  return gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'));
});

// jade
gulp.task('jade', function () {
  var YOUR_LOCALS = {};

  return gulp.src('src/jade/index.jade')
    .pipe(jade({
      pretty: true,
      locals: YOUR_LOCALS
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

// stylus
gulp.task('stylus', function () {
  gulp.src('src/stylus/index.styl')
    //.pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('clbr.min.css'))
    //.pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'));
});

// js
gulp.task('js', function () {
  return gulp.src([
      'node_modules/auth-api-js/index.js',
      'node_modules/profiles-api-js/index.js',
      'node_modules/projects-api-js/index.js',
      'node_modules/images-api-js/index.js',
      'src/js/modules/*.js',
      'src/js/*.js',
    ])
    .pipe(concat('clbr.js'))
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(rename({ extname: '.min.js' }))
    //.pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/js'));
});

// clbr application code base and artifacts
gulp.task('clbr', ['common', 'images', 'jade', 'stylus', 'js']);


gulp.task('default', ['libs', 'clbr']);