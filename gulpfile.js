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
    html:{
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
        dest: 'dist/images/'
    }
};

// директории для очистки
const clean_paths = ['dist/css/*', 'dist/js/*', 'dist/pages/*'];


// очистка проекта
function clean(){
    return del([
        paths.html.dest + '*',
        paths.css.dest + '*',
        paths.js.dest + '*',
        // paths.images.dest + '*'
    ]);
}

function clean_html(){
    return del(paths.html.dest + '*');
}

function clean_css(){
    return del(paths.css.dest + '*');
}

function clean_js(){
    return del(paths.js.dest + '*');
}

function clean_img(){
    return del(paths.images.dest + '*');
}




exports.clean = clean;
exports.clean_html = clean_html;
exports.clean_css = clean_css;
exports.clean_js = clean_js;
exports.clean_img = clean_img;