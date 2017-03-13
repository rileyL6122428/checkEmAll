var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var partialify = require('partialify');
var gutil = require('gulp-util');
var watchify = require('watchify');
var path = require('path');
var Karma = require('karma').Server;
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('default', ['watch-compile-scripts']);
gulp.task('js', ['compile-scripts']);
gulp.task('wjs', ['watch-compile-scripts']);
gulp.task('rt', ['run-tests']);
gulp.task('dt', ['debug-tests']);
gulp.task('scss', ['compile-sass']);
gulp.task('wscss', ['watch-compile-sass']);


gulp.task('compile-scripts', function () {
  var bundler = browserifyApp()
    .transform(babelify, { presets: ['es2015'] })
    .transform(partialify);

  bundle(bundler);
});

gulp.task('watch-compile-scripts', ['compile-scripts'], function () {
  gulp.watch('scripts/src/**/*', ['compile-scripts']);
});


gulp.task('compile-sass', function () {
  return gulp.src('./styles/site.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/main/webapp'));
});

gulp.task('watch-compile-sass',['compile-sass'], function () {
  gulp.watch('./styles/**/*.scss', ['compile-sass']);
});


gulp.task('run-tests', function(done) {
    new Karma({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        reporters: ['dots'],
    }, done).start();
});

gulp.task('debug-tests', function(done) {
    new Karma({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: false,
        browsers: ['Chrome'],
        autoWatch: false,
        reporters: ['dots'],
    }, done).start();
});


function logError(error) {
    if (error._babel) {
        gutil.log(
            gutil.colors.red(error.name)
            + ': ' + gutil.colors.yellow(error.message)
            + '\n' + error.codeFrame
        );
    } else {
        gutil.log(gutil.colors.red(error.message));
    }

    this.emit('end');
}

function browserifyApp() {
  return browserify('./scripts/src/app.js', {
    debug: true,
    paths: ['./node_modules', './scripts/src'],
  })
}

function bundle(bundler) {
  return bundler.bundle()
    .on('error', logError)

    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/main/webapp'));
}
