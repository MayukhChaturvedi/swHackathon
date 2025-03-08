import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const RegisterForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
		role: "student",
	});

	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
	});

	const validateForm = () => {
		let isValid = true;
		const newErrors = {
			username: "",
			email: "",
			password: "",
			password2: "",
		};

		if (formData.password !== formData.password2) {
			newErrors.password2 = "Passwords do not match";
			isValid = false;
		}

		if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters long";
			isValid = false;
		}

		if (!formData.email.includes("@")) {
			newErrors.email = "Please enter a valid email address";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			const response = await api.post("/register", formData);

			// if (!response.ok) {
			// 	const errorData = await response.json();
			// 	throw new Error(errorData.message || "Registration failed");
			// }
			if (response.status != 200) {
				throw new Error("Registration failed");
			}
			toast.success("Registration successful! Please login.");
			navigate("/login");
		} catch (error) {
			toast.error(error.message || "Registration failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md space-y-4">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium text-gray-700"
							>
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								value={formData.username}
								onChange={(e) =>
									setFormData({ ...formData, username: e.target.value })
								}
							/>
							{errors.username && (
								<p className="text-red-500 text-xs mt-1">{errors.username}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs mt-1">{errors.email}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs mt-1">{errors.password}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password2"
								className="block text-sm font-medium text-gray-700"
							>
								Confirm Password
							</label>
							<input
								id="password2"
								name="password2"
								type="password"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								value={formData.password2}
								onChange={(e) =>
									setFormData({ ...formData, password2: e.target.value })
								}
							/>
							{errors.password2 && (
								<p className="text-red-500 text-xs mt-1">{errors.password2}</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Register
						</button>
					</div>

					<div className="text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<button
								type="button"
								onClick={() => navigate("/login")}
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Sign in
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
