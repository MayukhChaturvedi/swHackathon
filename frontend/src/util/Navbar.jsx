import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "../logo.jpg"; // Assumes logo is at root directory
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = useState(null);

	const categories = ["Linux", "Networking", "Programming", "Cloud"];

	const handleCategoryClick = (category) => {
		navigate(`/quiz/${category.toLowerCase()}`);
		setActiveCategory(category);
		// You can add navigation logic here if needed
	};

	const handleSignOut = () => {
		// Implement your signout logic here
		// e.g. authContext.signOut()
		logout();
		navigate("/login");
	};

	return (
		<nav className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Logo and Project Name */}
					<div className="flex items-center">
						<Link to="/" className="flex items-center">
							<img src={logo} alt="Quizzzzz Logo" className="h-8 w-auto mr-2" />
							<span className="text-white font-bold text-xl">Quizzard</span>
						</Link>
					</div>

					{/* Navigation Categories */}
					<div className="hidden md:flex items-center space-x-4">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryClick(category)}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                  ${
										activeCategory === category
											? "bg-white text-indigo-700"
											: "text-white hover:bg-indigo-500 hover:bg-opacity-50"
									}`}
							>
								{category}
							</button>
						))}

						{/* Custom Quiz */}
						<Link
							to="/custom-quiz"
							className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 hover:bg-opacity-50 transition-colors duration-200"
						>
							Custom Quiz
						</Link>
					</div>

					{/* User Profile and Sign Out */}
					<div className="flex items-center space-x-3">
						<button
							onClick={() => navigate("/user")}
							className="p-2 rounded-full bg-indigo-800 text-white hover:bg-indigo-700 transition-colors duration-200"
							aria-label="User Profile"
						>
							<FaUser className="h-5 w-5" />
						</button>

						<button
							onClick={handleSignOut}
							className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white text-indigo-700 hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm"
						>
							<FaSignOutAlt className="h-4 w-4" />
							<span>Sign Out</span>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu (you can expand this) */}
			<div className="md:hidden">
				<div className="px-2 pt-2 pb-3 space-y-1">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => handleCategoryClick(category)}
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-50"
						>
							{category}
						</button>
					))}
					<Link
						to="/quiz/custom"
						className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-50"
					>
						Custom Quiz
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
