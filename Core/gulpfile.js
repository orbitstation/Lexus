var gulp            = require('gulp'),
    fs              = require('fs'),
    path            = require('path'),
    htmlreplace     = require('gulp-html-replace'),
    del             = require('del'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    less            = require('gulp-less'),
    jshint          = require('gulp-jshint'),
    templateCache   = require('gulp-angular-templatecache'),
    merge2          = require('merge2'),
    replace         = require('gulp-replace'),
    watch           = require('gulp-watch'),
    livereload      = require('gulp-livereload'),
    chmod           = require('gulp-chmod'),
    md5File         = require('md5-file'),
    strip           = require('gulp-strip-comments'),
    runSequence     = require('run-sequence'),
    minifyHtml      = require('gulp-minify-html');

var cnotify = notify.withReporter(function (options, callback) {
    callback();
});


function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function (file) {
          return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

// Lib js merge
gulp.task('lib', function () {
    var libs = [
            { path: './lib/Jquery/jquery.js', minified: true },
            { path: './lib/angular-1.5.8/angular.min.js', minified: true },
            { path: './lib/angular-1.5.8/angular-route.min.js', minified: true },
            { path: './lib/angular-1.5.8/angular-animate.min.js', minified: true },
            { path: './lib/angular-1.5.8/angular-cookies.min.js', minified: true },
            { path: './lib/angular-1.5.8/angular-resource.min.js', minified: true },
            { path: './lib/angular-1.5.8/angular-sanitize.min.js', minified: true },
            { path: './lib/angular-load/ocLazyLoad.min.js' },
            { path: './lib/recaptcha/angular-recaptcha.js', minified: false },
            { path: './lib/angular-match-media-master/match-media.js', minified: false },
            { path: './lib/ui-bootstrap/ui-bootstrap-tpls-1.3.1.min.js', minified: true },
            //{ path: './lib/ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js', minified: true },
            { path: './lib/ui-validate/validate.js', minified: false },
            { path: './lib/moment/moment.js', minified: false },
            { path: './lib/ui-mask/mask.min.js', minified: true },
            { path: './lib/tinymce/tinymce.min.js', minified: true },
            { path: './lib/tinymce/tinymce.js', minified: false },
            { path: './lib/tinymce/plugins/**/*.js', minified: false },
            { path: './lib/tinymce/themes/**/*.js', minified: false },
            { path: './lib/oidc/oidc.js', minified: false },
            { path: './lib/oidc/oidc_config.js', minified: false },
            { path: './lib/google-picker/google-picker.js', minified: false },
            { path: './lib/dropbox-picker/dropbox-picker.js', minified: false },
            { path: './lib/angular-file-upload/angular-file-upload.js', minified: false },
            { path: './lib/ui-grid/ui-grid.min.js', minified: true },
            { path: './lib/angular-bind-notifier/angular-bind-notifier.min.js', minified: true },
            { path: './lib/angucomplete-alt/angucomplete-alt-custom.debug.js', minified: false },
            { path: './lib/filesaver/filesaver.min.js', minified: true },
            { path: './lib/angular-http-batch/angular-http-batch.min.js', minified: true },
            { path: './lib/angular-cache/angular-cache.min.js', minified: true },
            { path: './lib/ng-sticky/sticky.min.js', minified: true },
            { path: './lib/lodash/lodash.min.js', minified: true },
            { path: './lib/lodash/ng-lodash.js', minified: false },
            { path: './lib/jquery-waypoints/waypoints.min.js', minified: true },
            { path: './lib/slick-carousel/slick.min.js', minified: false },
            { path: './lib/angular-slick-master/slick.min.js', minified: false },
            { path: './lib/fastclick.js', minified: true }
    ];

    var tasks = new merge2();
    for (var i = 0; i < libs.length; i++)
    {
        if (!libs[i].minified)
        {
            // not minified - minify
            tasks.add(gulp.src(libs[i].path).pipe(uglify()));
        }
        else
        {
            // already minified - just strip comments to save build time
            tasks.add(gulp.src(libs[i].path).pipe(strip()));
        }
    }


    return tasks
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('cdn-release/unstable/lib'))
        .pipe(cnotify({ message: 'CORE - Lib compile complete' }))
        .pipe(cnotify({ message: '___________________________________' }));
});






// CORE js merge
gulp.task('coreUi', function () {
    var tasks = new merge2();

    var taskCompileCoreJs = gulp.src([
        'uiCore/polyfills.js',
        'uiCore/globalApp.js',
        //'cdn-release/unstable/template/templates.js',
        'uiCore/globalApp-meta.js',
        'uiCore/services/*.js',
        'uiCore/factory/**/*.js',
        'uiCore/filter/*.js',
        'uiCore/controller/*.js',
        'uiCore/directive/*.js',
        'uiCore/preResolvePhase.js',
    ]);
    tasks.add(taskCompileCoreJs);

    var taskCompileTemplates = gulp.src(['uiCore/templates/*.html'])
    .pipe(templateCache({
        transformUrl: function(url) { return 'https://core.ui.lexus.monster.com/uiCore/templates/' + url; },
        templateHeader: '(function(angular) { angular.module("globalApp").service("coreUiTemplateService",  ["$templateCache", function($templateCache) { return { init: function() {',
        templateFooter: '} }; }]); })(angular);'
    }));
    tasks.add(taskCompileTemplates);

    return tasks.pipe(concat('core.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('cdn-release/unstable/lib'))
    .pipe(cnotify({ message: 'CORE - uiCore compile complete' }))
    .pipe(cnotify({ message: '___________________________________' }));
});

// LESS compile
var stylesPath = 'styles';
var stylesDeployPath = 'cdn-release/unstable/styles';
gulp.task('styles', ['deployTinyMceStyles', 'deployTelerikBootstrap'], function () {
    var stylesMap = {};
    function calculateMd5(channelAlias) {
        var minifiesCssPath = './' + stylesDeployPath + '/' + channelAlias + '.min.css';
        try {
            fs.accessSync(minifiesCssPath, fs.F_OK);
        } catch (e) {
            return;
        }
        stylesMap[channelAlias] = md5File(minifiesCssPath);
        fs.writeFileSync('./' + stylesDeployPath + '/styles.json', JSON.stringify(stylesMap));
    };

    var folders = getFolders(stylesPath);
    var tasks = folders.map(function (folder) {
        gulp.src(path.join(stylesPath, folder, '/build-file.less'))
            .pipe(less({
                plugins: [cleancss]
            }))
            .pipe(rename(folder + '.min.css'))
            .pipe(chmod(666))
            .pipe(gulp.dest(stylesDeployPath));

        gulp.src(path.join(stylesPath, folder, '/kendo-web.less'))
            .pipe(less({
                plugins: [cleancss]
            }))
            .pipe(rename('kendo-web-' + folder + '.min.css'))
            .pipe(chmod(666))
            .pipe(gulp.dest(stylesDeployPath))
            .on("end", function () { calculateMd5(folder); })
            //.pipe(livereload())
            .pipe(cnotify({ message: 'Styles - ' + folder + ' compile complete' }));
    });

});
//tinymce skin path is hardcoded to use individual files; thus unable to bundle these items with other styles
var tinyMceLiteGrayPath = 'skins/lightgray';
gulp.task('deployTinyMceStyles', function () {
    var task = gulp.src([path.join('lib/tinymce/', tinyMceLiteGrayPath, 'skin.min.css'), path.join('lib/tinymce/', tinyMceLiteGrayPath, 'content.min.css')])
        .pipe(chmod(666))
        .pipe(gulp.dest(path.join('cdn-release/unstable/styles/tinymce', tinyMceLiteGrayPath)));

    return gulp.src([path.join('lib/tinymce/', tinyMceLiteGrayPath, 'fonts/*.ttf'), path.join('lib/tinymce/', tinyMceLiteGrayPath, 'fonts/*.woff')])
           .pipe(chmod(666))
           .pipe(gulp.dest(path.join('cdn-release/unstable/styles/tinymce', tinyMceLiteGrayPath, 'fonts')));
    //.pipe(cnotify({ message: 'TinyMCE styles deployed' }));
});
gulp.task('deployTelerikBootstrap', function () {
    return gulp.src('styles/core/Components/Telerik/web/Bootstrap/*.{png,gif}')
        .pipe(chmod(666))
        .pipe(gulp.dest('cdn-release/unstable/styles/bootstrap'));
    //.pipe(cnotify({ message: 'TelerikBootstrap sprites deployed' }));
});














gulp.task('clean', function () {
    return del(['cdn-release/unstable/styles', 'cdn-release/unstable/lib']);
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('styles/**/*.less', ['styles']);
});


gulp.task('release', function () {
    runSequence('clean', 'lib', 'coreUi', 'styles', function () {
    });
});

gulp.task('dev', function () {
    runSequence('clean', 'lib', 'coreUi', 'styles', function () {
    });
});

