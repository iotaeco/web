/**
 * Gulp tasks for linting app with style lint.
 */
const gulp = require("gulp");
const styleLint = require("gulp-stylelint");
const path = require("path");
const asyncUtil = require("./util/async-util");
const display = require("./util/display");
const uc = require("./util/unite-config");
gulp.task("build-css-lint-app", async () => {
    display.info("Running", "StyleLint for App");
    const uniteConfig = await uc.getUniteConfig();
    return asyncUtil.stream(gulp.src(path.join(uniteConfig.dirs.www.cssSrc, `**/*.${uniteConfig.styleExtension}`))
        .pipe(styleLint({
            syntax: uniteConfig.styleExtension === "css" ? undefined : uniteConfig.styleExtension,
            reporters: [{
                formatter: "string",
                console: true
            }]
        }))
        .on("error", (err) => {
            display.error("StyleLint failed", err);
            process.exit(1);
        }));
});
// Generated by UniteJS
