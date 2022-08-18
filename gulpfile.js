'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync'); 
const sass = require('gulp-sass')(require('sass')); 

const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin')


//sass
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', gulp.series('sass'));
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

gulp.task('default', gulp.series('browser-sync', gulp.parallel('sass:watch'), 
     function(done){
    done();
}));

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('copyfonts', function(done) {
   gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   done();
});


// Images
gulp.task('imagemin', function() {
    return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/img'));
  });

 gulp.task('usemin', function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
        .pipe(usemin({
            css: [rev()], 
            html: [function(){
                return htmlmin({collapseWhitespace: true})
            }],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss:[ cleanCss(), 'concat']
        }))
        .pipe(gulp.dest('dist/'));
    }))
 }) 

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts', 'imagemin', 'usemin'), 
    function(done){
       done();
}));


  