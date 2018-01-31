/**
 * Gulp tasks for karma unit testing.
 */
const fs = require("fs");
const gulp = require("gulp");
const karma = require("karma");
const minimist = require("minimist");
const path = require("path");
const runSequence = require("run-sequence");
const util = require("util");
const clientPackages = require("./util/client-packages");
const display = require("./util/display");
const envUtil = require("./util/env-util");
const jsonHelper = require("./util/json-helper");
const uc = require("./util/unite-config");

function addClientPackageTestFiles(uniteConfig, files) {
    let newFiles = [];
    const newModuleLoaders = [];
    if (files) {
        files.forEach((file => {
            if (file.includeType === "polyfill") {
                newFiles.push(file);
            }
        }));
    }
    const testPackages = clientPackages.getTestPackages(uniteConfig);
    Object.keys(testPackages).forEach(key => {
        const pkg = testPackages[key];
        const addArray = pkg.isModuleLoader ? newModuleLoaders : newFiles;
        const includeType = pkg.isModuleLoader ? "moduleLoader" : "clientPackage";
        const pkgFiles = clientPackages.getPackageFiles(uniteConfig, pkg, false);
        pkgFiles.forEach(pkgFile => {
            addArray.push({
                pattern: pkgFile,
                included: pkg.scriptIncludeMode === "notBundled" || pkg.scriptIncludeMode === "both",
                includeType
            });
        });
        const pkgTestingAdditions = clientPackages.getPackageTestingAdditions(uniteConfig, pkg);
        pkgTestingAdditions.forEach(pkgTestingAddition => {
            addArray.push({
                pattern: pkgTestingAddition,
                included: pkg.scriptIncludeMode === "notBundled" || pkg.scriptIncludeMode === "both",
                includeType
            });
        });
        const pkgAssets = clientPackages.getPackageAssets(uniteConfig, pkg);
        pkgAssets.forEach((pkgAsset) => {
            addArray.push({
                pattern: pkgAsset,
                included: false,
                includeType: "asset"
            });
        });
    });
    newFiles = newFiles.concat(newModuleLoaders);
    if (files) {
        files.forEach((file => {
            if (file.includeType === "fixed") {
                newFiles.push(file);
            }
        }));
    }
    return newFiles;
}
gulp.task("unit-run-test", async () => {
    display.info("Running", "Karma");
    const knownOptions = {
        default: {
            grep: "!(*-bundle|app-module-config|entryPoint)",
            browser: undefined,
            watch: false
        },
        string: [
            "grep",
            "browser"
        ],
        boolean: [
            "watch"
        ]
    };
    const options = minimist(process.argv.slice(2), knownOptions);
    const uniteConfig = await uc.getUniteConfig();
    try {
        const confBuffer = await util.promisify(fs.readFile)("./karma.conf.js");
        let conf = confBuffer.toString();
        const jsonMatches = (/config.set\(((.|\n|\r)*)\)/).exec(conf);
        if (jsonMatches.length === 3) {
            const configuration = jsonHelper.parseCode(jsonMatches[1]);
            configuration.files = addClientPackageTestFiles(uniteConfig, configuration.files);
            conf = conf.replace(jsonMatches[1], jsonHelper.codify(configuration));
            await util.promisify(fs.writeFile)("./karma.conf.js", conf);
        } else {
            display.error("Parsing karma.conf.js failed");
            process.exit(1);
        }
    } catch (err) {
        display.error("Parsing karma.conf.js", err);
        process.exit(1);
    }
    const karmaConf = {
        configFile: "../../../karma.conf.js",
        coverageReporter: {
            include: `${uniteConfig.dirs.www.dist}**/${options.grep}.js`
        }
    };
    if (options.browser) {
        karmaConf.singleRun = false;
        karmaConf.browsers = [];
        const overrideBrowsers = options.browser.split(",");
        const allOptions = ["Chrome", "ChromeHeadless", "Edge", "Firefox", "IE", "PhantomJS", "Safari"];
        overrideBrowsers.forEach(browser => {
            const bLower = browser.toLowerCase();
            const found = allOptions.find(option => option.toLowerCase() === bLower);
            if (found) {
                karmaConf.browsers.push(found);
            }
        });
    }
    if (options.watch) {
        karmaConf.singleRun = false;
        envUtil.set("transpileContinueOnError", true);
        gulp.watch(path.join(uniteConfig.dirs.www.unitTestSrc, `**/*.${uc.extensionMap(uniteConfig.sourceExtensions)}`), () => runSequence("unit-transpile"));
        gulp.watch(path.join(uniteConfig.dirs.www.src, `**/*.${uc.extensionMap(uniteConfig.sourceExtensions)}`), () => {
            require("./build");
            runSequence("build-src-all");
        });
        gulp.watch(path.join(uniteConfig.dirs.www.src, `**/*.${uc.extensionMap(uniteConfig.viewExtensions)}`), () => {
            require("./build");
            runSequence("build-src-view-all");
        });
        gulp.watch(path.join(uniteConfig.dirs.www.src, `**/*.${uniteConfig.styleExtension}`), () => {
            require("./build");
            runSequence("build-src-style-all");
        });
        gulp.watch(path.join(uniteConfig.dirs.www.cssSrc, `**/*.${uniteConfig.styleExtension}`), () => {
            require("./build");
            runSequence("build-src-css-all");
        });
    }
    return new Promise((resolve, reject) => {
        const server = new karma.Server(karmaConf, (exitCode) => {
            if (exitCode === 0) {
                resolve();
            } else {
                display.error(`Karma exited with code ${exitCode}`);
                process.exit(exitCode);
                reject();
            }
        });
        server.start();
    });
});
// Generated by UniteJS
