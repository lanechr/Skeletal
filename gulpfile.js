var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var fs = require('fs');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var vendors = {}
vendors.src = './node_modules/';
vendors.bootstrap = vendors.src + 'bootstrap/dist/js/bootstrap.js';
vendors.fancybox = vendors.src + 'fancybox/dist/js/jquery.fancybox.js';
vendors.jquery = vendors.src + 'jquery/dist/jquery.js';
vendors.jqueryUI = vendors.src + 'jquery-ui-dist/jquery-ui.js';

gulp.task('js', function() {
		gulp.src([vendors.jquery, vendors.bootstrap, vendors.fancybox, vendors.jqueryUI])
		.pipe(sourcemaps.init())
	    .pipe(concat('vendor.js'))
			.pipe(sourcemaps.write())
	    .pipe(gulp.dest('./src/js'));
});

gulp.task('less', function () {
	fs.stat('./src/css/less/app.less', function(err, stat) {
		if(err != null) {
			console.log('Error:' + err.code);
		}
	});
	gulp.src('./src/css/less/app.less')
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	}))
	.pipe(gulp.dest('./src/css/'));
});

gulp.task('default', function () {
	gulp.watch(['./src/css/less/*.less', './src/css/less/_*.less'], ['less']);
});
