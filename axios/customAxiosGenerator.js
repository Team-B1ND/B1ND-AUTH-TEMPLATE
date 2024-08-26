const fs = require("fs");
const path = require("path");

function createCustomAxiosFile(projectName) {
  const customAxiosDir = path.join(projectName, "src/libs/axios");

  // libs/token 디렉토리 생성
  if (!fs.existsSync(customAxiosDir)) {
    fs.mkdirSync(customAxiosDir, { recursive: true });
  }

  const tokenManagementCode = `
  import CONFIG from "src/config/config.json";
  import axios, { AxiosRequestConfig } from "axios";
  import requestInterceptor from "./requestInterceptor";
  import ResponseHandler from "./responseInterceptor";
  import Token from "../token/token";
  import { REQUEST_TOKEN_KEY, ACCESS_TOKEN_KEY } from "src/constants/token/token.constants";
  const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: CONFIG.server,
    headers: {
      [REQUEST_TOKEN_KEY]: \`Bearer \${Token.getToken(ACCESS_TOKEN_KEY)}\`,
    },
  };
  
  const customAxios = axios.create(axiosRequestConfig);
  
  dearAxios.interceptors.request.use(requestInterceptor as any, (err) => Promise.reject(err));
  
  dearAxios.interceptors.response.use((res) => res, ResponseHandler);
  
  export default customAxios;
  
  export const setAccessToken = (token: string) => {
    dearAxios.defaults.headers[REQUEST_TOKEN_KEY] = \`Bearer \${token}\`;
  };
`;

  // token.ts 파일 생성
  fs.writeFileSync(path.join(customAxiosDir, "customAxios.ts"), tokenManagementCode.trim());
}

module.exports = createCustomAxiosFile;
