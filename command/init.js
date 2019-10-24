"use strict";
const exec = require("child_process").exec;
const co = require("co");
const prompt = require("co-prompt");
const config = require("../template");
const chalk = require("chalk");
const path = require("path");

module.exports = () => {
    co(function*() {
        let tplName = yield prompt("Project type (react-p | vue-m): ");
        let projectName = yield prompt("Project name: ");
        let projectPath = path.resolve(projectName);
        let gitUrl;
        let branch;

        if (!config.tpl[tplName]) {
            console.log(chalk.red("\n × Template does not exit!"));
            process.exit();
        }
        gitUrl = config.tpl[tplName].url;
        branch = config.tpl[tplName].branch;

        let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;

        console.log(chalk.white("\n Start..."));

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                process.exit();
            }
            process.chdir(projectPath);
            require("../lib/install");
        });
    });
};
