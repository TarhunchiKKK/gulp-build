// основные
const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const concat = require('gulp-concat'); 
const newer = require('gulp-newer');

// для html-файлов и изоюражений
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// для css-файлов
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

// для js-файлов
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// для ts-файлов
const typescript = require('gulp-typescript');

// крты для css- и js-файлов
const sourcemaps = require('gulp-sourcemaps');

// исходные и конечные директории
const paths = {
    pages:{
        src: 'src/pages/**/*.html',
        dest: 'dist/pages/'
    },
    styles:{
        src: 'src/styles/**/.scss',
        dest: 'dist/css/'
    },
    scripts:{
        src: ['src/scripts/**/*.ts', 'src/scripts/**/*.js'],
        dest: 'dist/js/'
    },
    images:{
        src: 'src/images/*',
        dest: 'dist/img/'
    }
};

/*------------------------------------------------------------------*/

// очистка проекта
const clean = gulp.series(cleanhtml, cleancss, cleanjs/*, cleanimg */);

// очистка папки html-файлами
function cleanhtml(){
    return del(paths.pages.dest + '*');
}

// очистка папки css-файлами
function cleancss(){
    return del(paths.styles.dest + '*');
}

// очистка папки с js-файлами
function cleanjs(){
    return del(paths.scripts.dest + '*');
}

// очистка папки с изображениями
function cleanimg(){
    return del(paths.images.dest + '*');
}

/*------------------------------------------------------------------*/


// копирование html-страниц в папку dist 
function copyhtml(){
    return gulp.src(paths.pages.src)
        .pipe(gulp.dest(paths.pages.dest));
}

// копирование и сжатие html-страниц в папку dist/pages
function pages(){
    return gulp.src(paths.pages.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.pages.dest));
}

/*------------------------------------------------------------------*/

// сжатие и копирование изображений в папку dist/img
function images(){
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin())
        .pipe(gulp.src(paths.images.dest));
}



exports.clean = clean;
exports.cleanhtml = cleanhtml;
exports.cleancss = cleancss;
exports.cleanjs = cleanjs;
exports.cleanimg = cleanimg;
exports.copyhtml = copyhtml;
exports.htmlmin = htmlmin;
exports.pages = pages;