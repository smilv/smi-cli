const which = require("which");
const chalk = require("chalk");
const childProcess = require("child_process");

function runCmd(cmd, args, fn) {
    args = args || [];
    let runner = childProcess.spawn(cmd, args, {
        stdio: "inherit"
    });

    runner.on("close", function(code) {
        if (fn) {
            fn(code);
        }
    });
}

function findNpm() {
    let npms = ["cnpm", "npm"];
    for (let i = 0; i < npms.length; i++) {
        try {
            which.sync(npms[i]);
            console.log("\n " + npms[i] + " install...");
            return npms[i];
        } catch (e) {}
    }
    throw new Error(chalk.red("please install npm"));
}

let npm = findNpm();
runCmd(which.sync(npm), ["install"], function() {
    console.log(" " + npm + " install end");
    console.log(chalk.green("\n √ successful!"));
    process.exit();
});
