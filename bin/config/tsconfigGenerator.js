const fs = require("fs");
const path = require("path");

function replaceTsConfig(projectName) {
  const customTsConfigPath = path.join(__dirname, "custom-tsconfig.json");
  const newTsConfig = path.join(projectName, "tsconfig.json");

  fs.copyFileSync(customTsConfigPath, newTsConfig);
}

module.exports = replaceTsConfig;
