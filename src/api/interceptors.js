import { api } from "./api";

export function setupInterceptors() {
  api.interceptors.response.use(
    res => res,
   err => Promise.reject(err.response?.data ?? { message: err.message })
  );
}