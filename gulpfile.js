var gulp = require('gulp'),
      compass = require('gulp-compass'),
      gutil = require('gulp-util'),
      browserify = require('gulp-browserify'),
      gulpif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      minifyHTML = require('gulp-minify-html'),
      imagemin = require('gulp-imagemin'),
      pngcrush = require('imagemin-pngcrush'),
      concat = require('gulp-concat'),
      jade = require('gulp-jade'),
      express     = require('express'),
      app = express(),
      livereload = require('gulp-livereload'),
      tinylr      = require('tiny-lr'),
      server = tinylr();

var env, jsSources, stylusSources, htmlSources, outputDir, sassStyle;

env = process.env.NODE_ENV || "development";

if (env === 'development'){
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}
console.log(outputDir);

jsSources = [
      'components/scripts/main.js',
      'components/scripts/variables.js'
    ];
    sassSources = [
          'components/sass/styles.sass'
          // 'components/sass/cartstyle.scss'
    ];
htmlSources = [outputDir + '*.html'];

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(livereload()) //works with chrome extension
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(livereload())
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env==='production', minifyHTML()))
    .pipe(gulpif(env==='production', gulp.dest(outputDir)))
    .pipe(livereload())
});

gulp.task('images', function(){
  gulp.src('builds/development/images/*.png')
    .pipe(gulpif(env==='production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulpif(env==='production', gulp.dest(outputDir + 'images')))
    .pipe(livereload())
});

gulp.task('jade', function() {
  gulp.src('components/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(outputDir))
    .pipe(livereload(server))
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./builds/development')));
  app.listen(8787);
  gutil.log('Listening on port: 8787');
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.sass', ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
  gulp.watch('builds/development/images/*.png', ['images']);
  gulp.watch('builds/development/*.jade', ['jade']);
});

gulp.task('default', ['compass','html', 'js', 'jade', 'images', 'watch']);
