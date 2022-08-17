'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync'); 
const sass = require('gulp-sass')(require('sass'));  

//const del = require('del');
//const imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});


gulp.task('browser-sync', function(){
    var files = [
        './*.html', './css/*.css', './js/*.js', '/img/*.{png,jpg,gig}'
    ];
    browserSync.init(files,{               //the first param is fiels 
        server: {                           //the second is options for server
            baseDir: './'
        }
    });
});

gulp.task('default', gulp.series('browser-sync', function(){
    gulp.start('sass:watch');
}));

