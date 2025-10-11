import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5053/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});