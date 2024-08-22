import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { REQUEST_TOKEN_KEY, ACCESS_TOKEN_KEY } from "../../constants/token.constants";
import token from "../token/token";
import requestInterceptor from "./requestInterceptor";
import ResponseHandler from "./responseInterceptor";

let baseUrl: string;

class customAxiosService {
  public static createAxiosConfig(baseURL: string): AxiosRequestConfig {
    baseUrl = baseURL;
    return {
      baseURL: baseURL,
      headers: {
        [REQUEST_TOKEN_KEY]: `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`,
      },
    };
  }
}

const customAxios = axios.create(customAxiosService.createAxiosConfig(baseUrl!));
customAxios.interceptors.request.use(requestInterceptor as any, (err) => Promise.reject(err));
customAxios.interceptors.response.use((res) => res, ResponseHandler(AxiosError as any, `${baseUrl!}/refresh`) as any);

export default customAxios;

export const setAccessToken = (token: string) => {
  customAxios.defaults.headers[REQUEST_TOKEN_KEY] = `Bearer ${token}`;
};
