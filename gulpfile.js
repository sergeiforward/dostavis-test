
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var watch = require('gulp-watch')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css');

var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer-core');
var assets = require('postcss-assets');
var calc = require('postcss-calc');
var nested = require('postcss-nested');
var simpleVars = require('postcss-simple-vars');
var importCSS = require('postcss-import');
var mixins = require('postcss-mixins');


var mainStarter = 'main.css';


var src = {
	cssMainStarter: ['src/css/' + mainStarter],
	css: ['src/css/*.css'],
	js: [
		'src/libs/jquery/dist/jquery.js',
		'src/js/app.js'
		]
}

var publishdir = 'public/';
var dist = {
	css: publishdir + 'static/',
	js: publishdir + 'static/'
}

gulp.task('buildCSS', function(){

	gulp.src(src.cssMainStarter)
	.pipe(plumber())
	.pipe(postcss([
		importCSS({
			from: src.cssMainStarter
		}),
		mixins(),
		nested(),
		simpleVars(),
		assets(),
		autoprefixer()
	]))
	.pipe(concat('app.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest(dist.css))

});

gulp.task('buildJS', function(){

	gulp.src(src.js)
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest(dist.js))

});

gulp.task('watch', function() {

  gulp.watch([src.css], ['buildCSS']);
  gulp.watch(src.js, ['buildJS']);

})
