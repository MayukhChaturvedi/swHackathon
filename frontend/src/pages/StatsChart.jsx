import { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const StatsChart = () => {
  const { auth } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/profile", {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch stats. Please try again.");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [auth.token]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading stats...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!stats) {
    return <p className="text-center text-red-500">No stats available.</p>;
  }

  // Prepare chart data safely
  const chartData = [
    { difficulty: "Easy", total: stats.totalEasy || 0, correct: stats.correctEasy || 0 },
    { difficulty: "Medium", total: stats.totalMedium || 0, correct: stats.correctMedium || 0 },
    { difficulty: "Hard", total: stats.totalHard || 0, correct: stats.correctHard || 0 },
  ];

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Quiz Performance Stats for {stats.username}</h2>

      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="difficulty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total Questions" />
          <Bar dataKey="correct" fill="#82ca9d" name="Correct Answers" />
        </BarChart>
      </ResponsiveContainer>

      {chartData.every(item => item.total === 0) && (
        <p className="mt-4 text-gray-500 italic">No quiz data available yet</p>
      )}
    </div>
  );
};

export default StatsChart;
