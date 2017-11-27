var gulp = require('gulp');
	less = require('gulp-less'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sftp = require('gulp-sftp'),
	path = require('path'),
	fs = require('fs'),
	del = require('del'),
	config = require('./config.json')

var styles = gulp.series(gulpLess, css);
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
					.pipe(babel())
					.pipe(uglify())
					.pipe(concat('custom.min.js'))
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

function upload() {
	return gulp.src(config.dist + '**/**/**/*')
		.pipe(sftp({
			host: config.host,
			user: config.user,
			port: config.port,
			key: {
				location:config.rsa
			},
			remotePath: config.remotePath + config.name
		}));
}
