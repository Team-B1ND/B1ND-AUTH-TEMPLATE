#!/usr/bin/env node

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const inquirer = require("inquirer");

if (process.argv.length < 3) {
  console.log(chalk.red("You must specify a project name."));
  console.log("Example:");
  console.log(chalk.green("    npx create-my-boilerplate my-app"));
  process.exit(1);
}

const currentPath = process.cwd();
let projectName = process.argv[2] || path.basename(process.cwd());
let projectPath = path.join(currentPath, projectName);

const sanitizedProjectPath = `"${projectPath}"`;

if (projectName === '.') {
    console.log(chalk.blue(`📥 Creating project in the current directory: ${currentPath}...`));
    projectPath = currentPath;
} else if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`❌ The folder '${projectName}' already exists. Please choose a different name.`));
    process.exit(1);
}

/**
 * GitHub template repository
 */
const TEMPLATE_REPO = "https://github.com/Team-B1ND/b1nd-BoilerPlate";

async function askUserOptions() {
   const answers = await inquirer.prompt([
    {
      type: "list",
      name: "bundler",
      message: "Which bundler do you want to use?",
      choices: ["Webpack (Recommended)", "Vite"],
      default: "Webpack (Recommended)",
    },
    {
      type: "list",
      name: "language",
      message: "Which language do you want to use?",
      choices: ["TypeScript", "JavaScript"],
    },
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager do you want to use?",
      choices: ["npm", "yarn", "pnpm"],
    },
  ]);
  return answers;
}

async function main() {
  try {
    const { bundler, language, packageManager } = await askUserOptions();
    const normalizedBundler = bundler.includes("Webpack") ? "webpack" : "vite";
    const templateFolder = `template/${normalizedBundler}-${language.toLowerCase()}`;

    console.log(chalk.blue(`📥 Creating project: ${projectName}...`));

    /**
     * Create project folder
     */
    if (projectName !== '.' && fs.existsSync(projectPath)) {
      console.log(chalk.red(`❌ The folder '${projectName}' already exists. Please choose a different name.`));
      process.exit(1);
    }
    if (projectName !== '.') {
      fs.mkdirSync(projectPath);
    }

    console.log(chalk.blue("📂 Downloading template..."));

    /** 
     * Download specific folder using sparse-checkout only if not in the current directory
     */

      execSync(`git clone --depth 1 --filter=blob:none --sparse ${TEMPLATE_REPO} ${sanitizedProjectPath}`, { stdio: "inherit" });
      process.chdir(projectPath);
      execSync(`git sparse-checkout set ${templateFolder}`, { stdio: "inherit" });
      execSync("git pull origin main", { stdio: "inherit" });
  
      /**
       * Move template contents to the root directory
       * and delete the 'template' folder
       */
      execSync(`mv ${templateFolder}/* ./`, { stdio: "inherit" });
      execSync(`rm -rf template`, { stdio: "inherit" });


    console.log(chalk.blue(`📦 Installing dependencies using ${packageManager}...`));
    if (packageManager === "npm") {
      execSync("npm install", { stdio: "inherit" });
    } else if (packageManager === "yarn") {
      execSync("yarn install", { stdio: "inherit" });
    } else if (packageManager === "pnpm") {
      execSync("pnpm install", { stdio: "inherit" });
    }

    console.log(chalk.green(`🎉 Project '${projectName}' has been successfully created!`));
    console.log(chalk.green(`🚀 To start: ${packageManager} dev`));
  } catch (error) {
    console.log(chalk.red("❌ Error occurred:", error));
  }
}

main();
