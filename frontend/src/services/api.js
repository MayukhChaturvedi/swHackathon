import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

// api.interceptors.request.use((config) => {
// 	const token = Cookies.getItem("token");
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

export const login = async (username, password) => {
	const response = await api.post("/token/", { username, password });
	return response.data;
};

export const register = async (userData) => {
	const response = await api.post("/register/", userData);
	return response.data;
};

export default api;
