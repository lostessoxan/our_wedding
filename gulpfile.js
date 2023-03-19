"use strict"

const { stream } = require('browser-sync');

// ------------------------------------------------- CONSTANTS

const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssbeautify = require('gulp-cssbeautify'),
    removeComments = require('gulp-strip-css-comments'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

// ============================================= PATH

const srcPath = '#src/'
const distPath = 'dist/'

const path = {
    build: {
        html: distPath,
        css: distPath + 'assets/css/',
        js: distPath + 'assets/js/',
        images: distPath + 'assets/images/',
        fonts: distPath + 'assets/fonts/'
    },
    src: {
        html: srcPath + '*.html',
        css: srcPath + 'assets/scss/*.scss',
        js: srcPath + 'assets/js/*.js',
        images: srcPath + 'assets/images/**/*.{jpeg,png,svg,jpg,gif,ico,webp,JPG}',
        fonts: srcPath + 'assets/fonts/**/*.{eot,ttf,woff,woff2,svg}'
    },
    watch : {
        html: srcPath + '**/*.html',
        css: srcPath + 'assets/scss/**/*.scss',
        js: srcPath + 'assets/js/**/*.js',
        images: srcPath + 'assets/images/**/*.{jpeg,png,svg,jpg,gif,ico,webp,JPG}',
        fonts: srcPath + 'assets/fonts/**/*.{eot, ttf, woff, woff2, svg}'
    },
    clean: './' + distPath
}

// ============================================= TASKS

// ------------------->>>>> html

function html() {
    return src(path.src.html, { base: srcPath })
        .pipe(plumber())

        .pipe(dest(path.build.html)) // dest

        .pipe(browserSync.reload({stream: true}))
}

// ------------------->>>>> css


function css() {
    return src(path.src.css, {base: srcPath + 'assets/scss/'})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "Error: <% error.message %>"
                })(err)
                this.emit('end')
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        
        .pipe(dest(path.build.css)) // dest

        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))

        .pipe(dest(path.build.css)) // dest
        .pipe(browserSync.reload({stream: true}))
}

// ------------------->>>>> js

function js() {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
    .pipe(plumber({
        errorHandler: function(err) {
            notify.onError({
                title: "JS Error",
                message: "Error: <% error.message %>"
            })(err)
            this.emit('end')
        }
    }))

    .pipe(dest(path.build.js)) // dest

    .pipe(uglify()) 
    .pipe(rename({
        suffix: '.min',
        extname: '.js'
    }))

    .pipe(dest(path.build.js)) // dest
    .pipe(browserSync.reload({stream: true}))
}

// ------------------->>>>> images

function images() {
    return src(path.src.images, {base: srcPath + 'assets/images/'})
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 50, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
    ]))
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({stream: true}))
}

// ------------------->>>>> fonts

function fonts() {
    return src(path.src.fonts, {base: srcPath + 'assets/fonts/'})

    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({stream: true}))
}

// ------------------->>>>> clean

function clean() {
    return del(path.clean)
}

// ------------------->>>>> watch Files

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
}

// ------------------->>>>> live Server

function serve() {
    browserSync.init({
        server: {
            baseDir: './' + distPath
        }
    })
}

// =============================================== |
// =============================================== |
// =============================================== |

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts))
const watch = gulp.parallel(build, watchFiles, serve)

// --------------------]
exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch
// --------------------]