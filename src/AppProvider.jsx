
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupInterceptors } from "./api/interceptors"; // ruta relativa a src/AppProvider.jsx

const qc = new QueryClient();
setupInterceptors();

export default function AppProviders({ children }) {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}