const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const inject = require('gulp-inject');
const rollup = require('rollup');
const image = require('gulp-image');
const typescript = require('@rollup/plugin-typescript');

const assetsPath = 'src/assets/*.{jpg,jpeg,png,webp}';
const stylesPath = './src/styles/**/*.scss';
const jsPath = './src/**/*.ts';
const htmlPath = './src/skills.html';
const distPath = './docs/';
const rollupConfig = {
    input: './src/app.ts',
    plugins: [typescript()]
}

const imageOptimizingSettings = {
    pngquant: true,
    optipng: true,
    zopflipng: true,
    mozjpeg: true,
    gifsicle: true,
    svgo: true,
    concurrent: 10,
};

/**
 * Описание задачи на сборку javascript, с помощью rollup
 */
gulp.task('rollup', async (done) => {
    const bundle = await rollup.rollup(rollupConfig);

    bundle.write({
        format: 'esm',
        file: 'docs/app.js'
    });

    done();
});

/**
* Простая задача на компиляцию scss файлов в файл style.css, ее отличие от rollup плагина rollup-plugin-scss
* в том, что файлы подключаются по маске, а в rollup они подключаются явно через import
**/
gulp.task('css', () => {
    return gulp.src(stylesPath)
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(distPath));
});

/**
* Вотчинг всех файлов которые мы
**/
gulp.task('watch', function (done) {
    gulp.watch(stylesPath, gulp.series('css'));
    gulp.watch(jsPath, gulp.series('rollup'));
    done();
});

/**
 * Копирование картинок и прочего из папки assets, картинки обжимаются с помощью наастроек imageOptimizingSettings
 */
gulp.task('assets', function () {
    return gulp.src(assetsPath)
        .pipe(image(imageOptimizingSettings))
        .pipe(gulp.dest(`${distPath}/assets/`));
});

/**
 * Описание задачи на вставку js & css файлов в наш шаблон index.html
 */
 gulp.task('html', function () {
    const target = gulp.src(htmlPath);
    const sources = gulp.src(['./docs/**/*.js', './docs/**/*.css'], { read: false });

    return target.pipe(inject(sources, { ignorePath: '../docs', relative: true, addPrefix: '.' }))
        .pipe(gulp.dest(distPath));
});

gulp.task('default', gulp.series('rollup', 'css', 'html', 'assets', 'watch'));
gulp.task('build', gulp.series('rollup', 'css', 'assets', 'html'));
