import { useState, useEffect, useCallback, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext"; // Import the AuthContext

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		token: null,
		user: null,
	});
	const [loading, setLoading] = useState(true); // Add loading state

	useEffect(() => {
		// const token =
		// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwMjQ3ODU4LCJpYXQiOjE3NDAxNjE0NTgsImp0aSI6IjFiYzkzM2M4NDVmNDQ0MTc4YzdiZDY5ZjliNDFhMzRhIiwidXNlcl9pZCI6M30.8qSqeXub_UOzqUL2G1qFdHDgvyCorJPdHp6pv3Q8f_I";
		const token = Cookies.get("token");
		// console.log("Initial token check:", token); // Debug log
		if (token) {
			try {
				const decoded = jwtDecode(token);
				// console.log("Token expiration time:", decoded.exp * 1000);
				// console.log("Current time:", Date.now());
				if (decoded.exp * 1000 > Date.now()) {
					console.log("Token is valid");
					setAuth({ token, user: decoded });
					api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				} else {
					console.log("Token expired");
					Cookies.remove("token");
				}
			} catch (error) {
				console.error("Invalid token", error);
				Cookies.remove("token");
			}
		}
		setLoading(false);
	}, []);

	const login = useCallback((token) => {
		try {
			const decoded = jwtDecode(token);
			Cookies.set("token", token, {
				secure: true,
				sameSite: "strict",
				expires: new Date(decoded.exp * 1000), // Set cookie expiry to match JWT expiry
			});
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			setAuth({ token, user: decoded });
		} catch (error) {
			console.error("Login failed", error);
			throw new Error("Invalid token");
		}
	}, []);

	const logout = useCallback(() => {
		Cookies.remove("token");
		delete api.defaults.headers.common["Authorization"];
		setAuth({ token: null, user: null });
	}, []);

	// Memoize the context value to prevent unnecessary re-renders
	const value = useMemo(
		() => ({
			// Memoize the value
			auth,
			login,
			logout,
			isAuthenticated: !!auth.token,
			loading,
		}),
		[auth, login, logout, loading]
	); // Dependencies

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
