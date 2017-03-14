const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

gulp.task('mocha', function () {
    return gulp.src(['./tests/*.js'], {read : false})
    .pipe(mocha({reporter : 'list'}))
    .on('error', gutil.log);
})


gulp.task('watch-mocha', ['mocha'], () => {
    gulp.watch(['./**/*.js', '!./node_modules/*'], ['mocha'])
})

gulp.task('default', ['watch-mocha']);