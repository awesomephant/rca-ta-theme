const browserSync = require('browser-sync');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const reload = browserSync.reload

function sync(done) {
    browserSync.init({
        proxy: 'https://rca-ta.test/'
    });
    done();
}

function styles() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({ remove: false }))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
}

function watchFiles() {
    gulp.watch('./scss/**/*.scss', styles);
    gulp.watch('./templates/**/*.twig').on("change", reload);
}

gulp.task('css', gulp.series(styles));
gulp.task('default', gulp.series(sync, styles, watchFiles));