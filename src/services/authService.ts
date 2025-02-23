import axios from "axios";

const API_URL = "https://chat-backend-production-6900.up.railway.app";

export const register = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};
