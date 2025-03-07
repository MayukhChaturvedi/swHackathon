import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
	// const { user } = useContext(AuthContext);
	return (
		<div>
			{/* <h1>Welcome, {user.username}</h1> */}
			<h1>Welcome, User</h1>
			<p>Dashboard page</p>
		</div>
	);
}
