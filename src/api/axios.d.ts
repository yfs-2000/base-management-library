import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    config?: {
      [name: string]: any;
    };
  }
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
  }
}
