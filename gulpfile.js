var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var wiredep = require('wiredep').stream;
var fs = require('fs');
var path = require('path');

gulp.task('default', ['sass', 'uglify', 'ejs']);

/**
 * Build styles files
 */
gulp.task('sass', function () {
    gulp.src('src/styles/main.scss')
        .pipe(sass())
  		.pipe(rename("styles.css"))
        .pipe(gulp.dest('public/styles/'));
});

/**
 * Build minified javascript files
 */
gulp.task('uglify', function () {
    gulp.src(['src/js/*.js'])
        .pipe(uglify())
  		.pipe(rename("scripts.min.js"))
        .pipe(gulp.dest('public/js'));
});

/**
 * Create HTML files from .ejs files
 */
gulp.task('ejs', function () {
	gulp.src('src/*-*.ejs')
	    .pipe(ejs({
	    	getCatalog: function(ejsFilename) {
	    		var lang = path.basename(ejsFilename);
	    		lang = lang.substring(lang.lastIndexOf("-")+1,lang.lastIndexOf("."));
	    		console.log(lang);
	    		if (lang === 'en') return {}; //All strings are already in english

	    		var catalogFile = './locale/' + lang + '.json'
	    		if (!fs.existsSync(catalogFile)) {
	    			gutil.log("No catalog file " + catalogFile + " found for " + ejsFilename);
	    			return {};
	    		}

	    		return require(catalogFile);
	    	},
	    	//The EJS helper function to be used to wrap any string to be translated
	    	translate: function(catalog, str) {
		    	if (catalog.hasOwnProperty(str)) {
		    		return catalog[str];
		    	}

		    	return str;
		    }
		}).on('error', gutil.log))
		.pipe(wiredep())
		.pipe(rename(function(path) {
			if (path.basename === "main-en") {
				path.basename = "main";
			}
		}))
	    .pipe(gulp.dest('public'));
});

/**
 * Create catalog.json
 */
gulp.task('update-translation', function () {
	var allStrings = {};

	gulp.src('public/main.ejs')
		.on('end', function() {
			fs.writeFile('locale/catalog.json', JSON.stringify(allStrings, null, 4), function(err) {
			    if(err) {
					gutil.log(err);
					return;
			    }

			    gutil.log("Catalog with all strings saved to locale/catalog.json");
			});
		})
	    .pipe(ejs({
	    	"_": function(str) {
		    	allStrings[str] = str;
		    }
		}).on('error', gutil.log));
});

/**
 * Watch changes in the src directory and launch the appropriate tasks.
 */
gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['uglify']);
    gulp.watch(['src/*.ejs', 'locale/*.json'], ['ejs']);
});
