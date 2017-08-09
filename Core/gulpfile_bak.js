var gulp = require('gulp'),
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
    
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

var cnotify = notify.withReporter(function (options, callback) {  callback();  });



var uiConfigDebugTemplate = '<?xml version="1.0" encoding="utf-8"?>\r\n<!-- use either Debug or Release, it controls how the scripts and css are served (Debug = ordinary version, Release = minified version, Views are taken from Dist folder)-->\r\n<UIConfiguration>\r\n  <add key="UIConfiguration" value="Debug" />\r\n</UIConfiguration>\r\n';
var uiConfigPath = 'dist/ui.config';
var buildTime =  new Date().getTime().toString();


// Helper functions
function getFolders(dir) {
    return fs.readdirSync(dir).filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}


//=========================================================
//      DEPLOYMENT
//=========================================================

// Lib js merge
gulp.task('lib', function () {
    return merge2(gulp.src('./lib/Jquery/jquery.js').pipe(uglify()),
        gulp.src(['./lib/angular-1.5.0/angular.min.js',
        './lib/angular-1.5.0/angular-route.min.js',
        './lib/angular-1.5.0/angular-animate.min.js',
        './lib/angular-1.5.0/angular-cookies.min.js',
        './lib/angular-1.5.0/angular-resource.min.js',
        './lib/angular-1.5.0/angular-sanitize.min.js']).pipe(strip()),
        gulp.src(['./lib/recaptcha/angular-recaptcha.js']).pipe(uglify()),
        gulp.src(['./lib/angular-match-media-master/match-media.js']).pipe(uglify()),
        gulp.src(['./lib/ui-bootstrap/ui-bootstrap-tpls-1.3.1.min.js']),
        gulp.src(['./lib/ui-validate/validate.js', './lib/moment/moment.js']).pipe(uglify()),
        gulp.src(['./lib/ui-mask/mask.min.js']).pipe(strip()),
        gulp.src(['./lib/tinymce/tinymce.min.js']).pipe(strip()),
        gulp.src(['./lib/tinymce/tinymce.js']).pipe(uglify()),
        gulp.src(['./lib/tinymce/plugins/**/*.js', './lib/tinymce/themes/**/*.js']).pipe(strip()),
        gulp.src(['./lib/oidc/oidc.js', './lib/oidc/oidc_config.js']).pipe(uglify()),
        gulp.src(['./lib/google-picker/google-picker.js']).pipe(uglify()),
        gulp.src(['./lib/dropbox-picker/dropbox-picker.js']).pipe(uglify()),
        gulp.src(['./lib/angular-file-upload/angular-file-upload.js']).pipe(uglify()),
        gulp.src(['./lib/ui-grid/ui-grid.min.js',
        './lib/angular-bind-notifier/angular-bind-notifier.min.js',
        './lib/angucomplete-alt/angucomplete-alt.min.js',
        './lib/filesaver/filesaver.min.js',        
        './lib/angular-http-batch/angular-http-batch.min.js',
        './lib/angular-cache/angular-cache.min.js',        
        './lib/lodash/lodash.min.js']).pipe(strip()),
        gulp.src('lib/lodash/ng-lodash.js').pipe(uglify()))
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('dist/lib'))
    .pipe(cnotify({ message: 'CORE - Lib compile complete' }))
    .pipe(cnotify({ message: '___________________________________' }));
});






// CORE js merge
gulp.task('core', function () {
    return gulp.src([
        'uiCore/polyfills.js',
        'uiCore/globalApp.js',
        'dist/template/templates.js',
        'uiCore/globalApp-meta.js',
        'uiCore/services/*.js',
        'uiCore/factory/**/*.js',
        'uiCore/filter/*.js',
        'uiCore/controller/*.js',
        'uiCore/directive/*.js',
        'uiCore/preResolvePhase.js',
    ])
    .pipe(concat('core.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/core'))
    .pipe(cnotify({ message: 'CORE - uiCore compile complete' }))
    .pipe(cnotify({ message: '___________________________________' }));
});





// LESS compile

var stylesPath = 'styles';
var stylesDeployPath = 'dist/styles';

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
        .pipe(gulp.dest(path.join('dist/styles/tinymce', tinyMceLiteGrayPath)));

    return gulp.src([path.join('lib/tinymce/', tinyMceLiteGrayPath, 'fonts/*.ttf'), path.join('lib/tinymce/', tinyMceLiteGrayPath, 'fonts/*.woff')])
           .pipe(chmod(666))
           .pipe(gulp.dest(path.join('dist/styles/tinymce', tinyMceLiteGrayPath, 'fonts')));
           //.pipe(cnotify({ message: 'TinyMCE styles deployed' }));
});

gulp.task('deployTelerikBootstrap', function () {
    return gulp.src('styles/core/Components/Telerik/web/Bootstrap/*.{png,gif}')
        .pipe(chmod(666))
        .pipe(gulp.dest('dist/styles/bootstrap'));
        //.pipe(cnotify({ message: 'TelerikBootstrap sprites deployed' }));
});

function mark(configuration) {
    if (configuration !== 'Debug' && configuration !== 'Release')
    {
        throw 'configuration should be one of Debug or Release';
    }

    var writeFile = false;
    var message = 'UI.config is already set to "' + configuration + '".';
    var template = uiConfigDebugTemplate;
    if (configuration === 'Release')
    {
        template = template.replace('"Debug"', '"Release"');
    }

    try {
        fs.accessSync(uiConfigPath, fs.F_OK);
        var buf = fs.readFileSync(uiConfigPath, 'utf8');
        if (buf !== template)
        {
            writeFile = true;
            message = 'Updating UI.config to "' + configuration + '" configuration.';
        }
    } catch (e) {
        writeFile = true;
        var message = 'Creating UI.config with "' + configuration + '" configuration.';
    }

    if (writeFile)
    {
        fs.writeFileSync(uiConfigPath, template);
    }
    return gulp.src(uiConfigPath)
    .pipe(cnotify({ message : message }));
}


var depFolder = 'dist/template';
gulp.task('cleanTemp', function () {
    return del([depFolder]);
});

gulp.task('cacheTemplates', ['cleanTemp'], function () {
    return gulp.src('core/globalApp/template/*.html')
        .pipe(templateCache('temp.js', {
            transformUrl: function (url) {
                return folderName + (url.replace(/\.tpl\.html$/, '.html'))
            }
        }))
        .pipe(gulp.dest(depFolder))
        .pipe(cnotify({ message: 'Templates cached' }));
});


gulp.task('combine', ['cacheTemplates'], function () {
    return merge2(gulp.src(['core/globalApp/directive/*.js', depFolder + '/temp.js']))
        .pipe(concat('combined.js'))
        .pipe(gulp.dest(depFolder))
        .pipe(cnotify({ message: 'Templates deployed' }));
}); 




gulp.task('wrapUpTemplates', function () {
    return gulp.src('uiCore/templates/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            module: 'globalApp',
            transformUrl: function (url) { return '/uiCore/templates/' + url }
        }))
        .pipe(gulp.dest('dist/template'))
        .pipe(cnotify({ message: 'Templates deployed' }))
        .pipe(cnotify({ message: '____________________________________' }));
});














gulp.task('markDebug', function () {
    return mark('Debug');
});

gulp.task('markRelease', function () {
    return mark('Release');
});

gulp.task('clean', function () {
    return del(['dist/styles', 'dist/ui', 'dist/core', 'dist/lib', 'dist/images', 'dist/views', 'dist/template']);
});

gulp.task('dev', ['clean'], function () {
    gulp.start('styles', 'markDebug');
});

gulp.task('dev-less', ['watch'], function () {
    gulp.start('styles');
});

gulp.task('release', function () {
    //runSequence('clean', 'styles', 'lib', 'core', 'markRelease', function () {
    runSequence('clean', 'wrapUpTemplates', 'lib', 'core', 'styles', function () {
            //runSequence('clean', 'lib', 'core', 'ui', 'styles', 'deployLayout', 'deployViews', 'markRelease', function () {
    });
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('styles/**/*.less', ['styles']);
});



