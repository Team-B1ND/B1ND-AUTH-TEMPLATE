const fs = require("fs");
const path = require("path");

function createCustomAxiosFile(projectName) {
  const customAxiosDir = path.join(projectName, "src/libs/axios");

  if (!fs.existsSync(customAxiosDir)) {
    fs.mkdirSync(customAxiosDir, { recursive: true });
  }

  const customAxiosCode = `
import CONFIG from "src/config/config.json";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
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

customAxios.interceptors.request.use(requestInterceptor as any, (err: AxiosError) => Promise.reject(err));

customAxios.interceptors.response.use((res) => res, ResponseHandler);

export default customAxios;

export const setAccessToken = (token: string) => {
  customAxios.defaults.headers[REQUEST_TOKEN_KEY] = \`Bearer \${token}\`;
};
`;

  fs.writeFileSync(path.join(customAxiosDir, "customAxios.ts"), customAxiosCode.trim());
}

module.exports = createCustomAxiosFile;
