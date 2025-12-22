import axios from "axios";

const API_URL = "https://hope-lfey.onrender.com/api/auth"; 
// إذا عندك baseURL مركزي أخبريني لاحقًا نعدله

export const loginAPI = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const signupAPI = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
