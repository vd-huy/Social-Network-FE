// src/api/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the authorization token on each request
export function setAuthToken(token: string | undefined) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
