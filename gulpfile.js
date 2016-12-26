var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var count = require('gulp-count');

var scriptSources = [
    './app.js',
    './controllers/*.js',
    './modules/*.js',
    './directives/*.js',
    './services/*.js'
];

var nodemoduleSources = [
    './node_modules/angular/angular.js',
    './node_modules/angular-animate/angular-animate.js',
    './node_modules/angular-aria/angular-aria.js',
    './node_modules/angular-messages/angular-messages.js',
    './node_modules/angular-material/angular-material.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/angular-loading-bar/build/loading-bar.min.js',
];


var cssSources = [
    './node_modules/angular-material/angular-material.css'];


gulp.task('default', ['scripts', 'jsmodules', 'cssmodules'], function () {
    // place code for your default task here
});

gulp.task('publish', ['scripts-min', 'jsmodules-min', 'cssmodules-min'], function () {
    // place code for your default task here
});


gulp.task('scripts', function () {
    watch(scriptSources, function () {
        gulp.src(scriptSources)
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./dist/'));
    });

});

gulp.task('jsmodules', function () {
    watch(nodemoduleSources, function () {
        gulp.src(nodemoduleSources)
            .pipe(concat('jsmodules.js'))
            .pipe(gulp.dest('./dist/'));
    });
});

gulp.task('cssmodules', function () {
    watch(cssSources, function () {
        gulp.src(cssSources)
            .pipe(concat('cssmodules.css'))
            .pipe(gulp.dest('./dist/'));
    });
});


gulp.task('scripts-min', function () {
    console.log('scripts');

    gulp.src(scriptSources)
        .pipe(count('## js-files selected'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/'));


});

gulp.task('jsmodules-min', function () {

    gulp.src(nodemoduleSources)
        .pipe(count('## node-files selected'))
        .pipe(concat('jsmodules.js'))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('cssmodules-min', function () {

    gulp.src(cssSources)
        .pipe(count('## css-files selected'))
        .pipe(concat('cssmodules.css'))
        .pipe(gulp.dest('./dist/'));

});