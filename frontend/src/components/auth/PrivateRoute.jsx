import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { auth, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Loading...</div>; // Show a loader during initialization
	}

	return auth.token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
