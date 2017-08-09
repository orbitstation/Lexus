global.gulpConfig = {
    dirname: __dirname,
    uglify: false
};


var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    htmlreplace = require('gulp-html-replace'),
    del = require('del'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    templateCache = require('gulp-angular-templatecache'),
    merge2 = require('merge2'),
    replace = require('gulp-replace'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    chmod = require('gulp-chmod'),
    md5File = require('md5-file'),
    strip = require('gulp-strip-comments'),
    runSequence = require('run-sequence'),
    requireDir = require('require-dir');

requireDir('../components/gulp-tasks');

var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

var cnotify = notify.withReporter(function (options, callback) {
    callback();
});


// Helper functions

function getFolders(dir) {
    try {
        return fs.readdirSync(dir)
          .filter(function (file) {
              return fs.statSync(path.join(dir, file)).isDirectory();
          });
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        return [];
    }
}

// Testing unused css removal
// not working with SPA templates for example: not catching ng-class classes.
//gulp.task('uncss', function () {
//    var css = 'dist/lib/coreUI/styles*.css',
//        htmlList = ['UI/**/*.html', 'core/**/*.html'],
//        ignoreList = ['.text-success'];
//    return gulp.src(css)
//        .pipe(uncss({
//            html: htmlList,
//            ignore: ignoreList
//        }))
//        .pipe(gulp.dest('./out'));
//});

//=========================================================
//      DEPLOYMENT
//=========================================================




// LESS compile

var stylesPath = 'styles';
var stylesDeployPath = 'dist/styles';
var stylesDependencies = ['deployTinyMceStyles', 'deployTelerikBootstrap'];
var stylesMap = {};

function safeMd5(path) {
    try {
        return md5File(path);
    }
    catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        return 'na';
    }
}

function calculateMd5(channelAlias) {
    var minifiesCssPath = './' + stylesDeployPath + '/' + channelAlias + '.min.css';
    try {
        fs.accessSync(minifiesCssPath, fs.F_OK);
    } catch (e) {
        return;
    }
    stylesMap[channelAlias] = safeMd5(minifiesCssPath);
    fs.writeFileSync('./' + stylesDeployPath + '/styles.json', JSON.stringify(stylesMap));
}

getFolders(stylesPath).map(function (folder) {
    if (folder != null ) folder = folder.toLowerCase();
    stylesDependencies.push('styles-' + folder);
    gulp.task('styles-' + folder, function () {
        return gulp.src([stylesPath + '/' + folder + '/build-file.less'])
            .pipe(less({
                plugins: [cleancss]
            }))
            .pipe(rename(folder + '.min.css'))
            .pipe(chmod(666))
            .pipe(gulp.dest(stylesDeployPath))
            .on("end", function () { calculateMd5(folder); });
    });

    stylesDependencies.push('styles-kendo-web-' + folder);
    gulp.task('styles-kendo-web-' + folder, function () {
        return gulp.src([stylesPath + '/' + folder + '/kendo-web.less'])
        .pipe(less({
            plugins: [cleancss]
        }))
        .pipe(rename('kendo-web-' + folder + '.min.css'))
        .pipe(chmod(666))
        .pipe(gulp.dest(stylesDeployPath))
    });
});


gulp.task('styles', stylesDependencies, function () {
});

//tinymce skin path is hardcoded to use individual files; thus unable to bundle these items with other styles
var tinyMceLiteGrayPath = 'skins/lightgray';
gulp.task('deployTinyMceStyles', function () {
    var task = gulp.src([path.join('lib/tinymce/', tinyMceLiteGrayPath, 'skin.min.css'), path.join('lib/tinymce/', tinyMceLiteGrayPath, 'content.min.css')])
        .pipe(chmod(666))
        .pipe(gulp.dest(path.join('dist/lib/coreUI/stylestinymce', tinyMceLiteGrayPath)));

    return gulp.src([path.join('lib/tinymce/', tinyMceLiteGrayPath, 'fonts/*.ttf'), path.join('lib/tinymce/', tinyMceLiteGrayPath, 'fonts/*.woff')])
           .pipe(chmod(666))
           .pipe(gulp.dest(path.join('dist/lib/coreUI/stylestinymce', tinyMceLiteGrayPath, 'fonts')))
           .pipe(cnotify({ message: 'TinyMCE styles deployed' }));
});

gulp.task('deployTelerikBootstrap', function () {
    return gulp.src('lib/coreUI/stylescore/Components/Telerik/web/Bootstrap/*.{png,gif}')
        .pipe(chmod(666))
        .pipe(gulp.dest('dist/lib/coreUI/stylesbootstrap'))
        .pipe(cnotify({ message: 'TelerikBootstrap sprites deployed' }));
});

gulp.task('clean', function () {
    return del(['dist/styles', 'dist/ui', 'dist/core', 'dist/lib', 'dist/images', 'dist/views', 'dist/scripts.min.js']);
});

gulp.task('copy-bootstrap-images', function () {
    return gulp.src(['styles/bootstrap/**/*'])
        .pipe(chmod(666))
        .pipe(gulp.dest('dist/styles/bootstrap'))
        .pipe(cnotify({ message: "Image copied from /styles/bootstrap to /dist/styles/bootstrap" }));
});

gulp.task('dev', ['clean'], function () {
    runSequence('clean', 'copy-bootstrap-images', 'styles', 'scripts', 'channels', 'ui', 'validate-js', 'deploy-views', 'markDebug', function () { });
});

gulp.task('dev-less', ['watch'], function () {
    gulp.start('styles');
});

gulp.task('release', function () {
    runSequence('clean', 'copy-bootstrap-images', 'styles', 'scripts', 'channels', 'ui', 'validate-js', 'deploy-views', 'markRelease', function () {
    });
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('styles/**/*.less', ['styles']);
});

