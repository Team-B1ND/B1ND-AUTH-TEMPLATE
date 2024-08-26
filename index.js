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

// React 프로젝트 생성
execSync(`npx create-react-app ${projectName} --template typescript`, { stdio: "inherit" });

// 새로운 폴더 구조 생성
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
});

createTokenFile(projectName);
createConstantsFile(projectName);
createConfigFile(projectName);
createResponseInterceptorFile(projectName);
createRequestInterceptorFile(projectName);
createCustomAxiosFile(projectName);
replaceTsConfig(projectName);
