import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5108";

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    // We will retrieve the token from zustand or localStorage
    const token = localStorage.getItem("ogrenapp_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("ogrenapp_token");
      // Optionally dispatch an event or redirect
      window.location.href = "/auth";
    }
    if (error.response?.status === 403) {
      console.error("Forbidden!");
    }
    return Promise.reject(error);
  }
);
