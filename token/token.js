const fs = require("fs");
const path = require("path");

function createTokenFile(projectName) {
  const tokenDir = path.join(projectName, "src/libs/token");

  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true });
  }

  const tokenManagementCode = `
import cookie from "js-cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/constants/token/token.constants.ts";

class Token {
  public getToken(key: typeof ACCESS_TOKEN_KEY | typeof REFESH_TOKEN_KEY): string | undefiend {
    return cookie.get(key);
  }
  public setToken(key: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY, value: string, options?: { [key: string]: any }): void {
    cookie.set(key, value, options);
  }
  public removeToken(key: string): void {
    cookie.remove(key);
  }
}

export default new Token();
`;

  fs.writeFileSync(path.join(tokenDir, "token.ts"), tokenManagementCode.trim());
}

module.exports = createTokenFile;
