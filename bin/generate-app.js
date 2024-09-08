#! /usr/bin/env node

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log(chalk.red("You have to provide a name to your app."));
  console.log("For example :");
  console.log(chalk.green("    npx create-my-boilerplate my-app"));
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = "https://github.com/Team-B1ND/b1nd-BoilerPlate";

if (projectName !== ".") {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(projectName);
      console.log(chalk.red(`The file ${projectName} already exists in the current directory, please give it another name.`));
    } else {
      console.log(chalk.red(error));
    }
    process.exit(1);
  }
}

async function main() {
  try {
    console.log(chalk.blue("Downloading files..."));
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);

    if (projectName !== ".") {
      process.chdir(projectPath);
    }

    console.log(chalk.blue("Installing dependencies..."));
    
    execSync("npm install");

    console.log(chalk.blue("Removing useless files"));
    execSync("npx rimraf ./.git");


    console.log(chalk.cyan(`b1nd-react-app ${projectName} has been created successfully.`));
  } catch (error) {
    console.log(chalk.red(error));
  }
}

main();