const gulp = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const cached = require('gulp-cached');
const dependents = require('gulp-dependents');
const print = require('gulp-print').default;
const filter = require('gulp-filter');
const { argv } = require('yargs');
const rename = require('gulp-rename');

// Less Compiler
const lessCompiler = () => {
  const excludeBundles = argv.dev ? ['**', '!src/less/*.bundle.less'] : ['**'];
  return gulp
    .src(['src/less/*.less'])
    .pipe(cached('less'))
    .pipe(dependents())
    .pipe(filter(excludeBundles))
    .pipe(print(filepath => `compiled: ${filepath}`))
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss())
    .pipe(
      rename(path => {
        /* eslint-disable no-param-reassign */
        path.basename = path.basename.replace('.bundle', '');
      }),
    )
    .pipe(gulp.dest('dist/css/legacy'));
};

// Watch files
const lessWatcher = () => {
  gulp.watch(['src/**/*.less'], gulp.series(lessCompiler));
};

const postCssCompiler = () => {
  return gulp
    .src(['src/css/**.css'])
    .pipe(cached('post-css'))
    .pipe(postcss())
    .pipe(plumber())
    .pipe(gulp.dest('dist/css'))
    .pipe(print(filepath => `compiled: ${filepath}`));
};

const postCssWatcher = () => {
  gulp.watch(['src/css/**.css'], gulp.series(postCssCompiler));
};

exports.lessWatcher = lessWatcher;
exports.lessCompiler = lessCompiler;

exports.postcssCompiler = postCssCompiler;
exports.postcssWatcher = postCssWatcher;
