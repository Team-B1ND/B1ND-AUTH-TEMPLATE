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

// 프로젝트 이름을 명령어 인자로 받기
let projectPath: string = "";

const handleExit = () => process.exit(0);
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

program
  .name("b1nd-react-app")
  .description("Create a new project with B1ND Boilerplate")
  .argument("<directory>", "Project directory")
  .option("--use-npm", "Use npm as package manager")
  .option("--use-yarn", "Use yarn as package manager")
  .option("--use-pnpm", "Use pnpm as package manager")
  .option("--typescript", "Use TypeScript")
  .option("--javascript", "Use JavaScript")
  .option("--bundler <bundler>", "Choose bundler: vite or webpack", "webpack")
  .action((name) => {
    projectPath = name;
  })
  .parse(process.argv);

const opts = program.opts();
const packageManager = opts.useNpm
  ? "npm"
  : opts.useYarn
  ? "yarn"
  : opts.usePnpm
  ? "pnpm"
  : getPkgManager();

/**
 * 디렉터리 복사 함수
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

  // 프로젝트 이름 유효성 검사
  if (!validateProjectName(projectName)) {
    console.log("❌ Invalid project name.");
    process.exit(1);
  }

  // 디렉터리 생성
  if (!existsSync(resolvedProjectPath)) {
    console.log(`Creating directory: ${resolvedProjectPath}`);
    mkdirSync(resolvedProjectPath, { recursive: true });
  }

  const { bundler, language } = await prompts([
    {
      type: "select",
      name: "bundler",
      message: "Which bundler do you want to use?",
      choices: [
        { title: "Webpack (Recommended)", value: "webpack" },
        { title: "Vite", value: "vite" },
      ],
      initial: opts.bundler === "vite" ? 1 : 0,
    },
    {
      type: "select",
      name: "language",
      message: "Which language do you want to use?",
      choices: [
        { title: "TypeScript", value: "typescript" },
        { title: "JavaScript", value: "javascript" },
      ],
      initial: opts.typescript ? 0 : 1,
    },
  ]);

  console.log(`📂 Creating project in ${resolvedProjectPath}...`);

  try {
    const templatePath = resolve(__dirname, "templates", `${bundler}-${language}`);
    if (!existsSync(templatePath)) {
      console.log(`❌ Template not found: ${templatePath}`);
      process.exit(1);
    }

    copyDir(templatePath, resolvedProjectPath);

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
