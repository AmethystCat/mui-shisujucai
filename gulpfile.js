var path = require('path'),
	gulp = require('gulp'),
	bs = require('browser-sync').create(),
	plumber = require('gulp-plumber'),
	less = require('gulp-less'),
	sourceMap = require('gulp-sourcemaps');

var PUBLIC = './src/public/',
	STYLE = PUBLIC + 'style/',
	LESS = [STYLE + 'less/**/*.less'],
	CSS = [STYLE + 'css/*.css'],
	PAGES = ['./src/views/**/*.html'],
	JS = ['./src/**/*.js'];

gulp.task('less', function () {
	return gulp.src(LESS)
		.pipe(plumber())
		.pipe(less())
		.pipe(sourceMap.write())
		.pipe(gulp.dest(STYLE + '/css'))
});

gulp.task('watch', function () {
	
	gulp.watch(PAGES).on('change', function (e) {
		console.log(e.path + ' changed...');
		bs.reload()
	});
	
	gulp.watch(LESS, ['less']);
	
	gulp.watch(CSS).on('change', function (e) {
		console.log(e.path + ' changed...')
		bs.reload(CSS);
	});
	
	gulp.watch(JS).on('change', function (e) {
		console.log(e.path + ' changed...')
		bs.reload();
	});
});

gulp.task('default', ['less'], function () {
	bs.init({
		server: './'
	});
	gulp.run('watch');
});
