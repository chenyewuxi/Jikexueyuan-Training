// generated on 2016-06-01 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep');
const plumber = require('gulp-plumber');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const notify = require('gulp-notify');
const babel = require('gulp-babel');


/* gulp self-setting */
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

const htmlmin = require('gulp-htmlmin');

/* gulp self-setting */

/* CSS pre and post process */
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');
const less = require('gulp-less');
const path = require('path');
/* less process*/

gulp.task('lessStyle', () => {
    var processors = [
        autoprefixer({
            browers: ['last 4 version']
        }),
        mqpacker,
        csswring
    ];
    return gulp.src('app/styles/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(minifyCss())
        .pipe(gulp.dest('app/styles/'))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'lessStyle tasked finished!' }));
});
/* less process*/

/* CSS pre and post process */
gulp.task('styles',['lessStyle'], () => {
    
    return gulp.src('app/styles/*.css')
        .pipe($.sourcemaps.init())
        .pipe(minifyCss())
        .pipe(rev())
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 4 versions', 'Firefox ESR'] }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        //.pipe(gulp.dest('dist/styles'))
        .pipe(reload({ stream: true }))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/styles'))
        .pipe(notify({ message: 'Style tasked finished!' }));
});

gulp.task('scripts', () => {

    return gulp.src(['app/scripts/**/*.js', '!app/scripts/seajs/jquery.js', '!app/scripts/seajs/sea.js', , '!app/scripts/seajs/html5.js'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rev())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        //.pipe(gulp.dest('dist/scripts'))
        .pipe(reload({ stream: true }))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/script'))
        .pipe(notify({ message: 'Scripts tasked finished!' }));
});

gulp.task('nohintscripts', () => {

    return gulp.src(['app/scripts/**/*.js', '!app/scripts/seajs/index.js'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rev())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        //.pipe(gulp.dest('dist/scripts'))
        .pipe(reload({ stream: true }))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/nohintscript'))
        .pipe(notify({ message: 'nohintscripts tasked finished!' }));
});

function lint(files, options) {


    return gulp.src(files)
        .pipe(reload({ stream: true, once: true }))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {

    return lint('app/scripts/**/*.js', {
            fix: true
        })
        .pipe(gulp.dest('app/scripts'))
        .pipe(notify({ message: 'Lint tasked finished!' }));

});

gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js', {
            fix: true,
            env: {
                mocha: true
            }
        })
        .pipe(gulp.dest('test/spec/**/*.js'))
        .pipe(notify({ message: 'Lint:test tasked finished!' }));
});



gulp.task('images', () => {



    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{ cleanupIDs: false }]


        })))
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/image'))
        .pipe(notify({ message: 'Images tasked finished!' }));
});



gulp.task('fonts', () => {



    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('app/fonts/**/*'))
        .pipe(rev())
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/font'))
        .pipe(notify({ message: 'Fonts tasked finished!' }));
});

gulp.task('html', ['styles', 'scripts', 'nohintscripts', 'fonts', 'images'], () => {

    return gulp.src(['./rev/**/*.json', 'app/*.html'])
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({ safe: true, autoprefixer: false })))
        .pipe($.if('*.html', htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(revCollector())
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'HTML tasked finished!' }));
});

gulp.task('extras', () => {


    return gulp.src([
            'app/*.*',
            '!app/*.html'
        ], {
            dot: true
        }).pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Extras tasked finished!' }));
});




gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'rev','app/styles/index.css']));

gulp.task('serve', ['styles','lessStyle', 'scripts', 'fonts'], () => {


    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'app/*.html',
        'app/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.css', ['lessStyle']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], () => {
    browserSync({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('test/spec/**/*.js').on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap.js'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'images', 'fonts', 'html', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});
