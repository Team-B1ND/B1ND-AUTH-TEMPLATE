#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const createTokenFile = require("./token/token");
const createConfigFile = require("./config/configGenerator");
const createResponseInterceptorFile = require("./axios/responseInterceptorGenerator");
const createRequestInterceptorFile = require("./axios/requestInterceptorGenerator");
const createCustomAxiosFile = require("./axios/customAxiosGenerator");
const createConstantsFile = require("./constants/constantsGenerator");
const replaceTsConfig = require("./config/tsconfigGenerator");

const projectName = process.argv[2];

if (!projectName) {
  console.error("프로젝트 이름을 입력하세요.");
  process.exit(1);
}

console.log(`프로젝트 "${projectName}"를 생성하는 중...`);

execSync(`npx create-react-app ${projectName} --template typescript`, { stdio: "inherit" });

const folders = [
  "src/assets",
  "src/components",
  "src/utils",
  "src/styles",
  "src/queries",
  "src/apis",
  "src/pages",
  "src/config",
  "src/types",
  "src/hooks",
  "src/constants",
  "src/constants/token",
  "src/libs/token",
  "src/libs/axios",
];

folders.forEach((folder) => {
  const folderPath = path.join(projectName, folder);
  fs.mkdirSync(folderPath, { recursive: true });
  fs.writeFileSync(path.join(folderPath, ".gitkeep"), "", { encoding: "utf8" });
});

createTokenFile(projectName);
createConstantsFile(projectName);
createConfigFile(projectName);
createResponseInterceptorFile(projectName);
createRequestInterceptorFile(projectName);
createCustomAxiosFile(projectName);
replaceTsConfig(projectName);

execSync(`npm install axios js-cookie @types/js-cookie`, { cwd: projectName, stdio: "inherit" });
console.log(`프로젝트 ${projectName}이 성공적으로 생성되었습니다.`);
