let gulp = require('gulp');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let strip = require('gulp-strip-debug');

gulp.task('uglify', async function () {
    gulp.src('./src/*.js')
        .pipe(babel({ "presets": ["@babel/preset-env"] }))
        .pipe(strip())
        .pipe(uglify())
        .pipe(gulp.dest('./build/'))
});