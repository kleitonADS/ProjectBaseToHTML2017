// add Modulos
var gulp          = require('gulp'),
    jade          = require('gulp-jade'),
    autoPrefixer  = require('gulp-autoprefixer'),
    plumber       = require('gulp-plumber'),
    sass          = require('gulp-sass'),
    clearCss      = require('gulp-clean-css'),
    gulpIf        = require('gulp-if'),
    env           = process.env.NODE_ENV || 'dev',
    uglify        = require('gulp-uglify'),
    browserSync   = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("_assents/css/*.scss")
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest("_build/css"))
    .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "_build"
    });

});

// jade task
gulp.task('jade', function(){
  gulp.src('jadeFiles/*.jade')
  .pipe(jade({
    pretty:true
  }))
  .pipe(gulp.dest('_build'))

});

// watch task
gulp.task('watch', function(){

  gulp.watch("_assents/css/*.scss", ['sass']);
  gulp.watch("jadeFiles/*.jade", ["jade"]).on('change', browserSync.reload);
  gulp.watch("_assents/js/*.js").on('change', browserSync.reload);
})


// Default Task
gulp.task('default', ['serve', 'jade', 'watch']);