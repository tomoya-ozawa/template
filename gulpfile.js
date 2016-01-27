/*
 * gulp 設定ファイル
 */

'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('default', ['jade', 'sass', 'browserSync', 'watch', 'bs-reload']);

gulp.task('watch', function() {
    gulp.watch('src/app/styles/*.scss', ['sass', 'bs-reload']);
    gulp.watch('src/app/jade/*.jade', ['jade']);
    gulp.watch('dist/*.js', ['bs-reload']);
    gulp.watch('dist/*.html', ['bs-reload']);
    gulp.watch('dist/*.css', ['bs-reload']);
});

gulp.task('jade', function() {
    gulp.src('./src/app/jade/*.jade')
        .pipe(jade({}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
    gulp.src('./src/app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './dist/', //対象ディレクトリ
            index: 'index.html', //インデックスファイル
        }
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});