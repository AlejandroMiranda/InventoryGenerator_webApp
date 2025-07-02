const { watch, series } = require('gulp');
const gulp = require('gulp');
let browserSync = require('browser-sync').create();

gulp.task('server', () =>{
    gulp.watch('./src/public/js/*.js').on('change', browserSync.reload);
    gulp.watch('./src/views/**/*.hbs').on('change', browserSync.reload);
    browserSync.init({
        server: '127.0.0.1:3000/'
    });
});

gulp.task('default', gulp.series("server"));

function browsersyncServer(cb){
    browserSync.init({
        proxy: '127.0.0.1:4100/'
    });
    cb();
};

function browsersyncReload(cb){
    browserSync.reload();
    cb();
};


//Watch task 
function watchTask(){
    watch(['./src/views/**/*.hbs'], browsersyncReload);
    watch(['./src/public/**/*.*'], browsersyncReload);
};

//Default gulp task
exports.default = series(
    browsersyncServer,
    watchTask
);
