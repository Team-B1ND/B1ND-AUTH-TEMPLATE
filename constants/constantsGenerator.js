const fs = require("fs");
const path = require("path");

function createConstantsFile(projectName) {
  const constantsDir = path.join(projectName, "src/constants/token");

  if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir, { recursive: true });
  }

  const constantsCode = `// token.constants.ts
export const ACCESS_TOKEN_KEY = "accessToken" as const;
export const REFRESH_TOKEN_KEY = "refreshToken" as const;
export const REQUEST_TOKEN_KEY = "Authorization" as const;
  `;

  fs.writeFileSync(path.join(constantsDir, "token.constants.ts"), constantsCode.trim());
}

module.exports = createConstantsFile;
