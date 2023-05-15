const { src, dest, parallel, series, watch } = require("gulp");

const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
// const uglify = require("gulp-uglify"); 
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
// -------- server ----------
function browsersync() {
  browserSync.init({
    server: {
      baseDir: "dist",
      notify: true,
      online: true,
    },
  });
}
// ---------- styles ------------
function styles() {
  return src("src/sass/**/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(
      rename({
        prefix: " ",
        suffix: ".min",
      })
    )
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}
// ---------- html -----------
function html() {
  return src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist/"))
    .pipe(browserSync.stream());
}
// ------------ scripts ------------
function scripts() {
  return src("src/js/**/*.js")
    .pipe(dest("dist/js"))
    // .pipe(uglify())
    .pipe(browserSync.stream());
}
//  ------------- watch ---------------
function startWatch() {
  watch(["src/*.html"], html);
  watch(["src/sass/**/*.+(scss|sass)"], styles);
  watch(["src/js/**/*.js"], scripts);
}
// ------------- task --------------
exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.startWatch = startWatch;
exports.html = html;
exports.default = parallel(styles, html, scripts, browsersync, startWatch);
