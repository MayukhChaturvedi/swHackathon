import React, { useEffect } from "react";

function Dashboard() {
	useEffect(() => {
		// Initialize animation
		const animatedElements = document.querySelectorAll(".animate-on-scroll");
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("appear");
					}
				});
			},
			{ threshold: 0.1 }
		);

		animatedElements.forEach((el) => observer.observe(el));

		// Parallax for hero section
		const handleScroll = () => {
			const heroElement = document.querySelector(".hero-bg");
			if (heroElement) {
				heroElement.style.transform = `translateY(${window.scrollY * 0.1}px)`;
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			animatedElements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	return (
		<div className="font-sans bg-gray-50 text-gray-800">
			{/* Hero Section without navigation header */}
			<section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
				<div className="hero-bg absolute inset-0 bg-[url('https://i.pinimg.com/736x/cc/b5/2a/ccb52a6af411732c1785749b378741d3.jpg')] bg-no-repeat bg-cover opacity-5"></div>
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center">
						<div className="w-full md:w-1/2 mb-12 md:mb-0 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
							<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
								Learning that{" "}
								<span className="text-indigo-600 relative">Adapts</span> to Your
								Abilities
							</h1>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								Our AI-powered e-learning platform automatically adjusts
								difficulty levels based on your performance, ensuring optimal
								engagement and learning outcomes.
							</p>
							<a
								href="#features"
								className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-3 rounded-lg transition-all hover:shadow-lg hover:translate-y-0.5"
							>
								Explore Features
							</a>
						</div>
						<div className="w-full md:w-1/2 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
							<img
								src="https://i.pinimg.com/736x/cc/b5/2a/ccb52a6af411732c1785749b378741d3.jpg"
								alt="Adaptive Learning Platform"
								className="w-full rounded-xl shadow-xl transition-transform hover:scale-105 duration-300"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
						<h2 className="text-3xl font-bold mb-4 text-gray-900">
							Key Features
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Discover how our adaptive platform transforms the learning
							experience
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								title: "Personalized Learning Path",
								description:
									"Our system uses AI to analyze your responses and creates a customized learning journey that matches your pace and knowledge level.",
							},
							{
								title: "Intelligent Difficulty Adjustment",
								description:
									"Questions automatically adapt from easy to hard based on your performance, keeping you in the optimal learning zone.",
							},
							{
								title: "Engagement Analytics",
								description:
									"Comprehensive metrics track student engagement levels, providing insights to educators about learning patterns and areas needing attention.",
							},
							{
								title: "Real-time Feedback",
								description:
									"Receive immediate guidance and explanations tailored to your learning style, helping you understand concepts better.",
							},
							{
								title: "Learning Style Recognition",
								description:
									"Our system identifies your unique learning preferences and adapts content presentation accordingly.",
							},
							{
								title: "Progress Tracking",
								description:
									"Visualize your learning journey with detailed progress metrics and achievement milestones.",
							},
						].map((feature, index) => (
							<div
								key={index}
								className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0 translate-y-8"
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-indigo-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900">
									{feature.title}
								</h3>
								<p className="text-gray-600">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section id="adaptive" className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center">
						<div className="w-full md:w-1/2 mb-12 md:mb-0 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
							<img
								src="https://i.pinimg.com/736x/16/32/e0/1632e0a9a5f5ea1ba7a8e769da66b9cd.jpg"
								alt="Adaptive Learning System"
								className="w-full rounded-xl shadow-xl"
							/>
						</div>
						<div className="w-full md:w-1/2 md:pl-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
							<h2 className="text-3xl font-bold mb-6 text-gray-900">
								How Adaptive Learning Works
							</h2>
							<p className="text-lg text-gray-600 mb-8">
								Our platform uses advanced algorithms to analyze your responses
								in real-time, automatically adjusting question difficulty to
								keep you challenged but not overwhelmed.
							</p>

							<div className="space-y-6">
								{[
									{
										title: "Performance Analysis",
										description:
											"The system continuously monitors your speed, accuracy, and confidence level when answering questions.",
									},
									{
										title: "Dynamic Difficulty Scaling",
										description:
											"Question difficulty automatically increases or decreases based on your performance, keeping you in the optimal learning zone.",
									},
									{
										title: "Learning Style Adaptation",
										description:
											"Content presentation adjusts to match your preferred learning style, whether visual, auditory, or kinesthetic.",
									},
								].map((step, index) => (
									<div key={index} className="flex">
										<div className="flex-shrink-0 mr-4">
											<div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-medium">
												{index + 1}
											</div>
										</div>
										<div>
											<h3 className="text-lg font-semibold mb-2 text-gray-900">
												{step.title}
											</h3>
											<p className="text-gray-600">{step.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section id="cta" className="py-20 bg-indigo-600 text-white">
				<div className="container mx-auto px-6 text-center">
					<div className="max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
						<h2 className="text-3xl font-bold mb-6">
							Transform Your Learning Experience Today
						</h2>
						<p className="text-lg mb-8 text-indigo-100">
							Join thousands of students who have improved their learning
							outcomes with our adaptive platform.
						</p>
						<a
							href="#"
							className="inline-block bg-white text-indigo-600 font-medium px-8 py-3 rounded-lg transition-all hover:shadow-lg hover:bg-gray-50"
						>
							Sign Up Free
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 bg-gray-900 text-gray-400">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between mb-8">
						<div className="mb-8 md:mb-0">
							<div className="flex items-center mb-4">
								<span className="text-2xl font-bold text-indigo-400">
									Adaptive
								</span>
								<span className="text-2xl font-bold text-white">Learn</span>
							</div>
							<p className="max-w-xs">
								Personalized learning for better outcomes
							</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							<div>
								<h3 className="text-white font-medium mb-4">Product</h3>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Features
										</a>
									</li>
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Pricing
										</a>
									</li>
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Testimonials
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="text-white font-medium mb-4">Company</h3>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:text-white transition-colors">
											About
										</a>
									</li>
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Blog
										</a>
									</li>
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Careers
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="text-white font-medium mb-4">Support</h3>
								<ul className="space-y-2">
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Help Center
										</a>
									</li>
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Contact
										</a>
									</li>
									<li>
										<a href="#" className="hover:text-white transition-colors">
											Privacy
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
						<p>&copy; 2025 AdaptiveLearn. All rights reserved.</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<a href="#" className="hover:text-white transition-colors">
								Twitter
							</a>
							<a href="#" className="hover:text-white transition-colors">
								LinkedIn
							</a>
							<a href="#" className="hover:text-white transition-colors">
								Facebook
							</a>
							<a href="#" className="hover:text-white transition-colors">
								Instagram
							</a>
						</div>
					</div>
				</div>
			</footer>

			{/* Custom Styles */}
			<style jsx>{`
				.animate-on-scroll {
					transition: opacity 0.6s ease-out, transform 0.6s ease-out;
				}
				.animate-on-scroll.appear {
					opacity: 1 !important;
					transform: translateY(0) !important;
				}
			`}</style>
		</div>
	);
}

export default Dashboard;
