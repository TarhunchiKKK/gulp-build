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
        src: ['src/styles/**/*.scss', 'src/styles/**/*.sass', 'src/styles/**/*.css'],
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

// уменьшение html-страниц в конечой папке
function minhtml(){
    return gulp.src(paths.pages.dest + '*')
        .pipe(htmlmin({collapseWhitespace: true}))
        //.pipe(cleanhtml)
        .pipe(gulp.dest(paths.pages.dest));
}

// обновление html-страниц (добавление)
/* НЕ  ПРОВЕРЕНО*/
function updatehtml(){
    return gulp.src(paths.pages.src)
        .pipe(newer(paths.pages.dest))
    //    .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.pages.dest));
}

// копирование и сжатие html-страниц в папку dist/pages
function pages(){
    return gulp.src(paths.pages.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.pages.dest));
}

/*------------------------------------------------------------------*/

// слияние преобразованных css-файлов без минификации
function copycss(){
    return gulp.src(paths.styles.src)
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))    
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}

// объединение css-файлов в 1
const joincss = gulp.series(
    function (){
        return gulp.src(paths.styles.dest + '*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'),{
            newLine: '\n\n\n'
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
    },
    function (){
        return del([paths.styles.dest + '*', '!dist/css/styles.min.css', '!dist/css/styles.min.css.map']);
    }
);


// минификация css-файла, находящегося в конечной папке стилей
function mincss(){
    return gulp.src(paths.styles.dest + '*')
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

function styles(){
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}

/*------------------------------------------------------------------*/


const ts = gulp.series(
    function(){
        return del([paths.scripts.dest + '**/*.ts']);
    },
    function(){
        return gulp.src(paths.scripts.src)
        //    .pipe(sourcemaps.init())
            .pipe(typescript({
                noImplicitAny: true
            }))
            .pipe(babel({
                presets: ['@babel/env']
            }))
        //    .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.scripts.dest));
    }
);


function js(){                                 // конвертирование файлов  скриптов
    return gulp.src(paths.scripts.src)                  // из источника
//    .pipe(sourcemaps.init())                            // создать карту
    .pipe(typescript({
        noImplicitAny: true,
        outFile: 'output.js'
    })).on("error", () => {})
    .pipe(babel({                                       // преобразование нового формата js
        presets: ['@babel/env']
    }))                                                 
    //.pipe(uglify())                                     // сжатие файлов скриптов
    .pipe(concat('app.min.js'))                        // слияние файлов в 1 файл
//    .pipe(sourcemaps.write('.'))                        // запись карты вместе с 
    .pipe(gulp.dest(paths.scripts.dest))                // поместить в конечную директорию
}

/*------------------------------------------------------------------*/

// сжатие и копирование изображений в папку dist/img
function img(){
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
exports.pages = pages;
exports.minhtml = minhtml;
exports.updatehtml = updatehtml;

exports.copycss = copycss;
exports.joincss = joincss;
exports.mincss = mincss;
exports.styles = styles;

exports.js = js;
exports.ts = ts;

exports.img = img;
