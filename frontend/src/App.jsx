import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Toaster position="top-right" />
				<Routes>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route
						path="/dashboard"
						element={
							// <PrivateRoute>
							<Dashboard />
							// </PrivateRoute>
						}
					/>
					{/* Redirect to login if no route matches */}
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
