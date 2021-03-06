// Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

// Define 'sass' task that will take care of transforming scss to css
gulp.task('scss-css', function () {
    // Return gulp path of scss file, pipe it to sass(gulp-sass) plugin to handle the sass transformation and then the result pipe it again to the desire output folder.
    return gulp.src('./build/scss/colors.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});
// Define 'minify-css' task that will take care of minifying css
gulp.task('minify-css', () => {
  return gulp.src('./build/css/*.css')
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css/min/'));
});