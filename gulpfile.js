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
	var langs = getAvailableLanguagesCatalogs();
	gutil.log("Found these languages catalogs (with translation ratio >0.7): ", langs);

	//A separate gulp stream must be launched for generating html files
	//for each language.
	for(var i = 0;i<langs.length;++i) {
		(function(langCode) {

			//Open the language catalog
    		var catalog = langCode == "en" ? "" : require('./locale/' + langCode + '.json');

    		//Launch a stream for generating the .ejs file for this language
			gulp.src('src/*.ejs')
			.on('end', function() {
				gutil.log("Ended generating " + langCode + " files from .ejs sources")
			})
		    .pipe(ejs({
		    	//The EJS helper function to be used to wrap any string to be translated
		    	_: function(str) {
			    	if (catalog.hasOwnProperty(str)) {
			    		return catalog[str];
			    	}

			    	return str;
			    }
			}).on('error', gutil.log))
			.pipe(wiredep())
			.pipe(rename(function(path) {
				if (langCode !== "en") {
					path.basename += "-" + langCode;
				}
			}))
		    .pipe(gulp.dest('public'));
	   })(langs[i]);
	}
});

/**
 * Create catalog.json
 */
gulp.task('update-translation', function () {
	var allStrings = {};

	gulp.src('src/*.ejs')
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

/**
 * Return a list of language name corresponding to catalogs .json files stored
 * in locale directory, with a translation ratio that is high enough.
 */
function getAvailableLanguagesCatalogs() {
	var availableLangs = ["en"];

	fs.readdirSync('locale').forEach(function(file) {
		if (path.basename(file) === "catalog.json" ||
			path.extname(file) !== ".json")
			return;

		var ratio = getTranslatedRatio(require('./locale/' + file));
		if (ratio > 0.7) availableLangs.push(path.basename(file, ".json"));
	});

	return availableLangs;
}

/**
 * Return the total number of keys that differs from their values
 * in the specified object.
 */
function getTranslatedRatio(catalog) {
	var translatedCount = 0;
	var totalCount = 0;
	for (var p in catalog) {
		if (catalog.hasOwnProperty(p)) {
			if (p !== catalog[p]) {
				translatedCount++;
			}
			totalCount++;
		}
	}

	return translatedCount/totalCount;
}
