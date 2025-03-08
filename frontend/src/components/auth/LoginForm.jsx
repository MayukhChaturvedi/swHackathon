import { useState, useContext, useEffect } from "react"; // Add useEffect
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import api from "../../services/api";

const LoginForm = () => {
	const navigate = useNavigate();
	const { isAuthenticated, loading, login } = useContext(AuthContext); // Get auth state and loading
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	// Check if the user is already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/login", {
				username: formData.username,
				password: formData.password,
			});

			if (response.status != 200) {
				throw new Error("Login failed");
			}

			login(response.data); // Pass the access token to AuthProvider

			toast.success("Login successful!");
			navigate("/dashboard");
		} catch (error) {
			toast.error("Login failed. Please check your credentials.");
		}
	};

	// Show loading state while checking auth
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								value={formData.username}
								onChange={(e) =>
									setFormData({ ...formData, username: e.target.value })
								}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
						</button>
					</div>
					<div className="text-center mt-4">
						Don't have an account?{" "}
						<button
							onClick={() => navigate("/register")}
							className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
						>
							Sign up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
