const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
  return gulp.src('src/scss/main.scss')
    .pipe(sass()) 
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', gulp.series('scripts')); 
  gulp.watch('src/scss/*/*.scss', gulp.series('styles')); 
});

gulp.task('default', gulp.parallel('styles', 'scripts'));