'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const fs = require('fs');


let testFiles = ['test/**/*.js'];
let appFiles = ['lib/**/*.js', './*.js'];
let eslintrcFile = JSON.parse(fs.readFileSync(__dirname + '/../.eslintrc'));

gulp.task('lint:app', () => {
  gulp.src(appFiles)
    .pipe(eslint({
      rules: eslintrcFile.rules,
      envs: eslintrcFile.envs
    }))
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  gulp.src(testFiles)
    .pipe(eslint({
      rules: eslintrcFile.rules,
      envs: eslintrcFile.envs
    }))
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lint', ['lint:app', 'lint:test']);

gulp.task('default', ['lint', 'mocha']);
