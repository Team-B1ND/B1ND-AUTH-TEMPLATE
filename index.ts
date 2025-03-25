#!/usr/bin/env node
import { Command } from "commander";
import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, copyFileSync, lstatSync } from "fs";
import { basename, join, resolve } from "path";
import { getPkgManager } from "./helpers/get-pkg-manager";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { validateProjectName } from "./helpers/validate-project-name";
import prompts from "prompts";

const program = new Command();

// Project name taken as command argument
let projectPath: string = "";

const handleExit = () => process.exit(0);
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

program
  .name("b1nd-react-app")
  .description("Create a new project with B1ND Boilerplate")
  .argument("<directory>", "Project directory")
  .option("--bundler <bundler>", "Choose bundler: default, vite or webpack", "default")
  .action((name) => {
    projectPath = name;
  })
  .parse(process.argv);

const opts = program.opts();

/**
 * Function to copy a directory from source to destination
 * @param src - Path to the source directory
 * @param dest - Path to the destination directory
 */
function copyDir(src: string, dest: string) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  readdirSync(src).forEach((file) => {
    const srcFile = join(src, file);
    const destFile = join(dest, file);
    if (lstatSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      copyFileSync(srcFile, destFile);
    }
  });
}

async function run() {
  if (!projectPath) {
    console.log("❌ Project name is required.");
    process.exit(1);
  }

  const resolvedProjectPath = resolve(process.cwd(), projectPath);
  const projectName = basename(resolvedProjectPath);

  /**
   * Validate project name
   * @param projectName - Name of the project
   */
  if (!validateProjectName(projectName)) {
    console.log("❌ Invalid project name.");
    process.exit(1);
  }

  /**
   * Check if the directory exists and is not empty
   */
  if (existsSync(resolvedProjectPath) && !isFolderEmpty(resolvedProjectPath)) {
    console.log("❌ The project directory is not empty.");
    process.exit(1);
  }

  /**
   * Create the directory if it doesn't exist
   * If the directory exists, proceed to set up the project
   */
  if (!existsSync(resolvedProjectPath)) {
    console.log(`Creating directory: ${resolvedProjectPath}`);
    mkdirSync(resolvedProjectPath, { recursive: true });
  }

  /**
   * Prompt the user to choose project settings
   */
  const { bundler, language, packageManagerChoice, useAxios } = await prompts([
    {
      type: "select",
      name: "bundler",
      message: "Which bundler do you want to use?",
      choices: [
        { title: "Default (No bundler)", value: "default" },
        { title: "Webpack (Recommended)", value: "webpack" },
        { title: "Vite", value: "vite" },
      ],
      initial: opts.bundler === "default" ? 0 : opts.bundler === "vite" ? 1 : 2,
    },
    {
      type: "select",
      name: "language",
      message: "Which language do you want to use?",
      choices: [
        { title: "TypeScript", value: "ts" },
        { title: "JavaScript", value: "js" },
      ],
      initial: 0, // Default is TypeScript
    },
    {
      type: "select",
      name: "packageManagerChoice",
      message: "Which package manager would you like to use?",
      choices: [
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
        { title: "pnpm", value: "pnpm" },
        { title: "bun", value: "bun" },
      ],
      initial: 0, // Default is npm
    },    {
        type: "select",
        name: "use axios",
        message: "Do you want to include Axios?",
        choices: [
          { title: "Yes", value: true },
          { title: "No", value: false },
        ],
        initial: 0,
      },
  ]);

  console.log(`📂 Creating project in ${resolvedProjectPath}...`);

  try {
    // Set template path based on selected bundler
    let templatePath = resolve(__dirname, "templates", bundler, language);
    if (useAxios) {
      templatePath = resolve(__dirname, "templates", `${bundler}-axios`, language);
    }

    /**
     * Set the template path according to the selected bundler
     */
    if (bundler === "default") {
      templatePath = resolve(__dirname, "templates", "default", language);
    } else if (bundler === "webpack" || bundler === "vite") {
        templatePath = resolve(__dirname, "templates", bundler, language);
    } else {
      console.log("❌ Unsupported bundler");
      process.exit(1);
    }

    if (!existsSync(templatePath)) {
      console.log(`❌ Template not found: ${templatePath}`);
      process.exit(1);
    }

    copyDir(templatePath, resolvedProjectPath);

    /**
     * Automatically detect the package manager if not chosen by the user
     * Use the selected package manager if provided, otherwise default to detected package manager
     */
    const packageManager = packageManagerChoice || getPkgManager();
    
    console.log(`📦 Installing dependencies using ${packageManager}...`);
    execSync(`${packageManager} install`, { stdio: "inherit", cwd: resolvedProjectPath });

    console.log(`🎉 Project '${projectName}' is ready! 🚀`);
    console.log(`👉 cd ${projectName}`);
    console.log(`👉 ${packageManager} dev`);
  } catch (error) {
    console.log("❌ Error occurred:", error);
    process.exit(1);
  }
}

run();
