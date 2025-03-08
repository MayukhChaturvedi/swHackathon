import { useState, useEffect, useRef } from "react";
import api from "../services/api.js";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import confetti from "react-canvas-confetti";
import { useParams } from "react-router-dom";

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [quizStarted, setQuizStarted] = useState(false);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [results, setResults] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { subject } = useParams();
	const [questionsLoaded, setQuestionsLoaded] = useState(false);

	const fetchQuestions = async () => {
		setIsLoading(true);
		try {
			const response = await api.get(`/questions?category=${subject}`);
			if (response.status !== 200) {
				throw new Error("Failed to fetch questions");
			}
			setQuestions(response.data);
			setQuestionsLoaded(true); // Mark questions as loaded, but don't start quiz yet
		} catch (error) {
			toast.error("Failed to load quiz questions. Please try again.");
			console.error("Error fetching questions:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (subject) {
			fetchQuestions();
		}
	}, [subject]);

	const handleStartQuiz = () => {
		setQuizStarted(true); // Only start the quiz when button is clicked
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setQuizCompleted(true);
			submitQuizResults();
			// Show confetti for completing the quiz
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}
	};

	const submitQuizResults = async () => {
		setIsSubmitting(true);
		try {
			const formattedResults = results.map((result) => ({
				difficulty: result.difficulty,
				correct: result.correct,
			}));

			const response = await api.post("/submit", formattedResults);

			if (response.status === 200 || response.status === 201) {
				toast.success("Quiz results saved successfully!");
			} else {
				throw new Error("Failed to save quiz results");
			}
		} catch (error) {
			toast.error("Failed to save quiz results.");
			console.error("Error submitting quiz results:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleAnswerSubmit = (isCorrect) => {
		const currentQuestion = questions[currentQuestionIndex];
		setResults([
			...results,
			{
				difficulty: currentQuestion.difficulty,
				correct: isCorrect,
				question: currentQuestion.question,
			},
		]);
	};

	const restartQuiz = () => {
		setQuizStarted(false);
		setQuizCompleted(false);
		setCurrentQuestionIndex(0);
		setResults([]);
		setQuestions([]);
		setQuestionsLoaded(false);
		fetchQuestions();
	};

	const getScorePercentage = () => {
		if (results.length === 0) return 0;
		const correctAnswers = results.filter((result) => result.correct).length;
		return Math.round((correctAnswers / results.length) * 100);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
			{!quizStarted ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
				>
					<h1 className="text-3xl font-bold text-indigo-700 mb-6">
						Ready to Test Your Knowledge?
					</h1>
					<p className="text-gray-600 mb-8">
						This quiz contains {questions.length || "several"} questions. You'll
						have 1 minute to answer each question.
					</p>
					<button
						onClick={handleStartQuiz}
						disabled={isLoading || !questionsLoaded}
						className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition hover:scale-105 disabled:opacity-70"
					>
						{isLoading
							? "Loading Questions..."
							: questionsLoaded
							? "Start Quiz"
							: "Preparing Quiz..."}
					</button>
					{isLoading && (
						<p className="mt-4 text-sm text-gray-500">
							Loading questions, please wait...
						</p>
					)}
				</motion.div>
			) : quizCompleted ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full"
				>
					<h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
						Quiz Completed!
					</h1>
					<div className="flex justify-center mb-8">
						<div className="relative w-40 h-40">
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-4xl font-bold">
									{getScorePercentage()}%
								</span>
							</div>
							<svg className="w-full h-full" viewBox="0 0 36 36">
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke="#eee"
									strokeWidth="3"
								/>
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke={
										getScorePercentage() > 70
											? "#4ade80"
											: getScorePercentage() > 40
											? "#facc15"
											: "#f87171"
									}
									strokeWidth="3"
									strokeDasharray={`${getScorePercentage()}, 100`}
									strokeLinecap="round"
								/>
							</svg>
						</div>
					</div>

					<div className="mb-8">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Question Summary:
						</h2>
						<div className="max-h-60 overflow-y-auto">
							{results.map((result, index) => (
								<div
									key={index}
									className="flex items-center mb-2 p-3 bg-gray-50 rounded-lg"
								>
									<div
										className={`w-6 h-6 rounded-full flex-shrink-0 ${
											result.correct ? "bg-green-500" : "bg-red-500"
										}`}
									></div>
									<div className="ml-3 overflow-hidden">
										<p className="truncate text-sm text-gray-700">
											{result.question}
										</p>
										<p className="text-xs text-gray-500">
											Difficulty: {result.difficulty}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						onClick={restartQuiz}
						disabled={isSubmitting}
						className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition hover:scale-105 disabled:opacity-70"
					>
						{isSubmitting ? "Saving Results..." : "Take Another Quiz"}
					</button>
				</motion.div>
			) : (
				<div className="w-full max-w-2xl">
					<div className="mb-4 flex justify-between items-center">
						<span className="text-sm font-medium text-gray-600">
							Question {currentQuestionIndex + 1} of {questions.length}
						</span>
						<span className="text-sm font-medium text-gray-600">
							Score: {results.filter((r) => r.correct).length} /{" "}
							{results.length}
						</span>
					</div>

					<motion.div
						key={currentQuestionIndex}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						{questions.length > 0 && (
							<QuizCard
								question={questions[currentQuestionIndex]}
								onNext={handleNextQuestion}
								onSubmit={handleAnswerSubmit}
							/>
						)}
					</motion.div>
				</div>
			)}
		</div>
	);
};

const QuizCard = ({ question, onNext, onSubmit }) => {
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [answered, setAnswered] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60);
	const isMultipleCorrect = question.multiple_correct_answers;

	useEffect(() => {
		// Reset state when question changes
		setSelectedAnswers({});
		setAnswered(false);
		setIsCorrect(false);
		setTimeLeft(60);
	}, [question]);

	useEffect(() => {
		// Timer setup
		if (answered || timeLeft <= 0) return;

		const timer = setTimeout(() => {
			if (timeLeft > 0) {
				setTimeLeft(timeLeft - 1);
			} else {
				handleSubmit();
			}
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft, answered]);

	const handleAnswerSelect = (key) => {
		if (answered) return;

		if (isMultipleCorrect) {
			// For multiple answers, toggle the selection
			setSelectedAnswers((prev) => ({
				...prev,
				[key]: !prev[key],
			}));
		} else {
			// For single answer, only select one
			const newSelection = {};
			newSelection[key] = true;
			setSelectedAnswers(newSelection);
		}
	};

	const handleSubmit = () => {
		// Check if any answer is selected for multiple-choice or if an answer is selected for single-choice
		if (
			Object.keys(selectedAnswers).filter((key) => selectedAnswers[key])
				.length === 0
		) {
			return; // Don't submit if no answer selected
		}

		// Determine if answer(s) are correct
		let correct = false;

		if (isMultipleCorrect) {
			// Get all the correct answer keys
			const correctAnswerKeys = Object.entries(question.correct_answers)
				.filter(([key, value]) => key.endsWith("_correct") && value === "true")
				.map(([key, _]) => key.replace("_correct", ""));

			// Get all the selected answer keys
			const selectedKeys = Object.keys(selectedAnswers).filter(
				(key) => selectedAnswers[key]
			);

			// Check if all selected answers are correct
			const allSelectedAreCorrect = selectedKeys.every(
				(key) => question.correct_answers[`${key}_correct`] === "true"
			);

			// Check if all correct answers are selected
			const allCorrectAreSelected = correctAnswerKeys.every(
				(key) => selectedAnswers[key] === true
			);

			// Both conditions must be true for multiple correct answers
			correct = allSelectedAreCorrect && allCorrectAreSelected;
		} else {
			// For single correct answer, check if the selected one is correct
			const selectedKey = Object.keys(selectedAnswers).find(
				(key) => selectedAnswers[key]
			);
			correct = selectedKey
				? question.correct_answers[`${selectedKey}_correct`] === "true"
				: false;
		}

		setIsCorrect(correct);
		setAnswered(true);
		onSubmit(correct);
	};

	// Get available answer keys (answer_a, answer_b, etc.) that have content
	const answerKeys = Object.keys(question.answers).filter(
		(key) => question.answers[key] !== null
	);

	const getButtonClass = (key) => {
		const baseClass =
			"block w-full text-left p-4 mb-3 rounded-lg transition-all duration-300";

		if (!answered) {
			return `${baseClass} ${
				selectedAnswers[key]
					? "bg-indigo-100 border-2 border-indigo-500"
					: "bg-white border-2 border-gray-200 hover:border-indigo-300"
			}`;
		} else {
			// After answering, show correct/incorrect
			if (question.correct_answers[`${key}_correct`] === "true") {
				return `${baseClass} bg-green-100 border-2 border-green-500`;
			} else if (selectedAnswers[key]) {
				return `${baseClass} bg-red-100 border-2 border-red-500`;
			} else {
				return `${baseClass} bg-white border-2 border-gray-200 opacity-70`;
			}
		}
	};

	return (
		<motion.div
			className="bg-white rounded-xl shadow-lg p-6 w-full"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="mb-6">
				{/* Timer and difficulty */}
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium text-gray-500">
						Difficulty: {question.difficulty}
					</span>
					<div className="flex items-center">
						<svg
							className="w-4 h-4 mr-1 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span
							className={`text-sm font-medium ${
								timeLeft < 10 ? "text-red-500" : "text-gray-600"
							}`}
						>
							{timeLeft}s
						</span>
					</div>
				</div>

				{/* Question */}
				<h2 className="text-xl font-semibold text-gray-800 mb-1">
					{question.question}
				</h2>

				{/* Description if present */}
				{question.description && (
					<p className="text-gray-600 text-sm mb-4">{question.description}</p>
				)}

				{/* Multiple answers notice */}
				{isMultipleCorrect && (
					<div className="mb-4 text-sm text-indigo-600 font-medium bg-indigo-50 p-2 rounded">
						This question has multiple correct answers. Select all that apply.
					</div>
				)}
			</div>

			{/* Answer options */}
			<div className="mb-6">
				{answerKeys.map((key) => (
					<button
						key={key}
						onClick={() => handleAnswerSelect(key)}
						disabled={answered}
						className={getButtonClass(key)}
					>
						<div className="flex items-start">
							<div
								className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 border ${
									selectedAnswers[key]
										? isMultipleCorrect
											? "bg-indigo-500 border-indigo-500 text-white"
											: "bg-indigo-500 border-indigo-500 text-white"
										: "border-gray-300"
								}`}
							>
								{isMultipleCorrect ? (
									selectedAnswers[key] ? (
										"✓"
									) : (
										""
									)
								) : (
									<span className="text-xs">{key.slice(-1).toUpperCase()}</span>
								)}
							</div>
							<span>{question.answers[key]}</span>
						</div>
					</button>
				))}
			</div>

			{/* Explanation when answered */}
			{answered && question.explanation && (
				<div
					className={`p-4 mb-6 rounded-lg ${
						isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
					}`}
				>
					<p className="font-medium mb-1">
						{isCorrect ? "Correct!" : "Incorrect!"}
					</p>
					<p className="text-sm">{question.explanation}</p>
				</div>
			)}

			{/* Action buttons */}
			<div className="flex justify-end">
				{!answered ? (
					<button
						onClick={handleSubmit}
						disabled={
							Object.keys(selectedAnswers).filter((key) => selectedAnswers[key])
								.length === 0
						}
						className="py-2 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition hover:scale-105 disabled:opacity-70"
					>
						Submit Answer
					</button>
				) : (
					<button
						onClick={onNext}
						className="py-2 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition hover:scale-105"
					>
						Next Question
					</button>
				)}
			</div>
		</motion.div>
	);
};

export default Quiz;
