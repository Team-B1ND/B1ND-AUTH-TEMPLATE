const fs = require("fs");
const path = require("path");

// token.ts 파일 생성 함수
function createTokenFile(projectName) {
  const tokenDir = path.join(projectName, "src/libs/token");

  // libs/token 디렉토리 생성
  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true });
  }

  const tokenManagementCode = `// token.ts
class Token {
  public getToken(key: string): string | undefined {
    let matches = document.cookie.match(
      new RegExp("(?:^|; )" + key.replace(/([\\.$?*|{}()\\[\\]\\\\/\\+^])/g, "\\\\$1") + "=([^;]*)"),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public setToken(key: string, value: string): string {
    return (document.cookie = \`\${key}=\${value}\`);
  }

  public clearToken(): string {
    return (document.cookie = "max-age=0");
  }
}

export default new Token();
`;

  // token.ts 파일 생성
  fs.writeFileSync(path.join(tokenDir, "token.ts"), tokenManagementCode.trim());
}

module.exports = createTokenFile;
