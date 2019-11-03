const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


const pluginJsPath = ['node_modules/materialize-css/dist/js/materialize.js', 'node_modules/jquery/dist/jquery.js']

// task for compile materialize scss to css
function style() {
	return gulp.src('./src/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
}

function pluginjs() {
	return gulp.src(pluginJsPath)
	.pipe(gulp.dest('dist/plugin/js'))
	.pipe(browserSync.stream());
}

function customjs() {
	return gulp.src('./src/js/*.js')
	.pipe(concat('custom.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
}

function serve(){
	browserSync.init({
		server:{
			baseDir:'.',
			index: "index.html"
		}
	});
	gulp.watch('src/sass/**/*.scss', style);
	gulp.watch('src/js/*.js', customjs);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.pluginjs = pluginjs;
exports.customjs = customjs;
exports.serve = serve;

exports.default = serve