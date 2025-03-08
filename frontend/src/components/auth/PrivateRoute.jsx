import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "../../util/Navbar";
// import Footer from "../../util/Footer";

const PrivateRoute = ({ children }) => {
	const { auth, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Loading...</div>; // Show a loader during initialization
	}

	return auth.token ? (
		<>
			{/* <Navbar /> */}
			{children}
			{/* <Footer /> */}
		</>
	) : (
		<Navigate to="/login" replace />
	);
};

export default PrivateRoute;
