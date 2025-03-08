import { useState, useEffect, useRef, useMemo } from "react";
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
			const quizData = {
				category: subject,
				results: results.map((result, index) => ({
					question_id: questions[index].id,
					question: result.question,
					difficulty: result.difficulty,
					correct: result.correct,
				})),
				score: getScorePercentage(),
				totalQuestions: questions.length,
				completedAt: new Date().toISOString(),
			};
			const response = await api.post("/quiz", quizData);

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
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60);
	const [isCorrect, setIsCorrect] = useState(false);
	const timerRef = useRef(null);

	// Get all possible answers from the question
	const getAnswerOptions = () => {
		const options = [];
		for (const key in question.answers) {
			if (question.answers[key]) {
				options.push({
					id: key,
					text: question.answers[key],
					isCorrect: question.correct_answers[`${key}_correct`] === "true",
				});
			}
		}
		return options;
	};

	const answerOptions = getAnswerOptions();

	// Start timer when component mounts
	useEffect(() => {
		timerRef.current = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timerRef.current);
					if (!isSubmitted) {
						handleSubmit(true);
					}
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	// Clear timer when submitted
	useEffect(() => {
		if (isSubmitted) {
			clearInterval(timerRef.current);
		}
	}, [isSubmitted]);

	const handleAnswerSelect = (answerId) => {
		if (!isSubmitted) {
			setSelectedAnswer(answerId);
		}
	};

	const handleSubmit = (isTimeout = false) => {
		if (isSubmitted || (!selectedAnswer && !isTimeout)) return;

		setIsSubmitted(true);

		// Check if answer is correct
		const correctAnswer = answerOptions.find((option) => option.isCorrect);
		const isAnswerCorrect = selectedAnswer === correctAnswer.id;
		setIsCorrect(isAnswerCorrect);

		// Notify parent component
		onSubmit(isAnswerCorrect);
	};

	// Format timer display
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	// Calculate timer color
	const getTimerColor = () => {
		if (timeLeft > 30) return "text-green-500";
		if (timeLeft > 10) return "text-yellow-500";
		return "text-red-500";
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-xl shadow-xl overflow-hidden"
		>
			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
						{question.category.charAt(0).toUpperCase() +
							question.category.slice(1)}
					</span>
					<span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
						{question.difficulty}
					</span>
				</div>

				<h2 className="text-xl font-bold text-gray-800 mb-3">
					{question.question}
				</h2>

				{question.description && (
					<p className="text-gray-600 mb-6 italic">{question.description}</p>
				)}

				<div className="space-y-3 mb-6">
					{answerOptions.map((option) => (
						<button
							key={option.id}
							onClick={() => handleAnswerSelect(option.id)}
							className={`w-full p-4 rounded-lg border-2 transition-all flex items-start ${
								!isSubmitted
									? selectedAnswer === option.id
										? "border-indigo-500 bg-indigo-50"
										: "border-gray-200 hover:border-indigo-200"
									: option.isCorrect
									? "border-green-500 bg-green-50"
									: selectedAnswer === option.id && !option.isCorrect
									? "border-red-500 bg-red-50"
									: "border-gray-200 opacity-60"
							}`}
							disabled={isSubmitted}
						>
							<span className="text-left">{option.text}</span>
							{isSubmitted && option.isCorrect && (
								<svg
									className="w-5 h-5 ml-auto text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							)}
							{isSubmitted &&
								selectedAnswer === option.id &&
								!option.isCorrect && (
									<svg
										className="w-5 h-5 ml-auto text-red-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
						</button>
					))}
				</div>

				<div className="flex justify-between items-center">
					<div className={`text-xl font-mono font-semibold ${getTimerColor()}`}>
						{formatTime(timeLeft)}
					</div>

					{!isSubmitted ? (
						<button
							onClick={() => handleSubmit()}
							disabled={!selectedAnswer}
							className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Submit
						</button>
					) : (
						<button
							onClick={onNext}
							className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
						>
							Next Question
						</button>
					)}
				</div>
			</div>

			{isSubmitted && (
				<div className={`p-4 ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
					<div className="flex">
						<div
							className={`flex-shrink-0 w-5 h-5 ${
								isCorrect ? "text-green-400" : "text-red-400"
							}`}
						>
							{isCorrect ? (
								<svg
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									></path>
								</svg>
							) : (
								<svg
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									></path>
								</svg>
							)}
						</div>
						<div className="ml-3">
							<h3
								className={`text-sm font-medium ${
									isCorrect ? "text-green-800" : "text-red-800"
								}`}
							>
								{isCorrect ? "Correct Answer!" : "Incorrect Answer"}
							</h3>
							<div className="mt-2 text-sm text-gray-700">
								<p>
									{question.explanation ||
										(isCorrect
											? "Great job!"
											: `The correct answer was: ${
													answerOptions.find((option) => option.isCorrect)?.text
											  }`)}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default Quiz;
