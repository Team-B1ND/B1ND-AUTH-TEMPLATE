import CONFIG from "src/config/config.json";
import axios from "axios";
import requestInterceptor from "./requestInterceptor";
import ResponseHandler from "./responseInterceptor";
import Token from "../token/token";
import { REQUEST_TOKEN_KEY, ACCESS_TOKEN_KEY } from "src/constants/token.constants";

const axiosRequestConfig = {
  baseURL: CONFIG.server,
  headers: {
    [REQUEST_TOKEN_KEY]: `Bearer ${Token.getToken(ACCESS_TOKEN_KEY)}`,
  },
};

const customAxios = axios.create(axiosRequestConfig);

customAxios.interceptors.request.use(requestInterceptor, (err) => Promise.reject(err));

customAxios.interceptors.response.use((res) => res, ResponseHandler);

export default customAxios;

export const setAccessToken = (token) => {
  customAxios.defaults.headers[REQUEST_TOKEN_KEY] = `Bearer ${token}`;
};
