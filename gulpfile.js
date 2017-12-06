var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	path = require('path'),
	fs = require('fs'),
	del = require('del'),
	config = require('./config.json')
	plugins = gulpLoadPlugins();

var styles = gulp.series(less, css);
var build = gulp.series(clean, styles, gulp.parallel(html, js));
var upload = gulp.series(upload);

gulp.task('build', build);
build.description = "builds theme in the dist directory";

gulp.task('upload',upload);
upload.description = "builds theme in the dist directory and then uploads it via SFTP";

gulp.task('default', function () {
	gulp.watch(config.src + 'css/*.less', gulp.parallel(build));
});

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
		files = gulp.src(config.src + 'js/**/*.js')
					.pipe(plugins.babel())
					.pipe(plugins.uglify())
					.pipe(plugins.concat('custom.min.js'))
	return files.pipe(gulp.dest(out));
}

function less() {
	var out = config.src + 'css/';
	var	files = gulp.src(config.src + 'css/less/app.less')
		.pipe(plugins.less({ paths: [ path.join(__dirname, 'less', 'includes') ]}));
	return files.pipe(gulp.dest(out));
}
less.taskName = "gulpLess";

function css() {
	var out = config.dist + 'css',
		files = gulp.src(config.src + 'css/**/*');
	return files.pipe(gulp.dest(out));
}

function upload() {
	return gulp.src(config.dist + '**/**/**/*')
		.pipe(plugins.sftp({
			host: config.host,
			auth: 'keyMain',
			remotePath: config.remotePath + config.name
		}));
}
