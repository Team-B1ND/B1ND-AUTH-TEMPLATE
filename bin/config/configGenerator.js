const fs = require("fs");
const path = require("path");

function createConfigFile(projectName) {
  const configDir = path.join(projectName, "src/config");

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const configCode = `
{
    "server": "YOUR_API_BASE_URL"
}
  `;

  fs.writeFileSync(path.join(configDir, "config.json"), configCode.trim());
}

module.exports = createConfigFile;
