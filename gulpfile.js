var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch");


gulp.task("sass",function(){
    gulp.src("./index.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"))  ;
});
gulp.task("watch",function(){
  gulp.watch("./index.scss",["sass"]);
});
