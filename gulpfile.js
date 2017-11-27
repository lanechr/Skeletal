var gulp = require('gulp');
	less = require('gulp-less'),
	path = require('path'),
	fs = require('fs'),
	del = require('del'),
	config = require('./config.json')

function clean() {
	return del(['./dist']);
}

function html() {
	var out = config.dist + 'templates',
		files = gulp.src(config.src + 'templates/**/**/*');
	return files.pipe(gulp.dest(out));
}

function js() {
	var out = config.dist + 'js',
		files = gulp.src(config.src + 'js/**/*.js');
	return files.pipe(gulp.dest(out));
}

function gulpLess() {
	var out = config.src + 'css/';
	var	files = gulp.src(config.src + 'css/*.less')
		.pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ]}));
	return files.pipe(gulp.dest(out));
}

function css() {
	var out = config.dist + 'css',
		files = gulp.src(config.src + 'css/**/*');
	return files.pipe(gulp.dest(out));
}

exports.clean = clean;
exports.html = html;
exports.js = js;
exports.gulpLess = gulpLess;
exports.css = css;

var styles = gulp.series(gulpLess, css);
var build = gulp.series(clean, styles, gulp.parallel(html, js));

gulp.task('styles', styles);
gulp.task('build', build);

gulp.task('default', function () {
	gulp.watch(config.src + 'css/*.less', gulp.parallel(build));
});
