import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const Score_board = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = () => {
    const storedScores = JSON.parse(localStorage.getItem("quizResults")) || [];
    setScores(storedScores);
  };

  const handleDelete = (id) => {
    const updatedScores = scores.filter(score => score.id !== id);
    localStorage.setItem("quizResults", JSON.stringify(updatedScores));
    setScores(updatedScores);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-3/4 bg-gray-800 rounded-lg p-6 items-center">
        <h1 className="text-center font-bold text-2xl text-white mb-6">Scoreboard</h1>
        <table className="w-full text-left text-sm text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-6 border-b border-gray-600 rounded-tl-lg">Rank</th>
              <th className="py-3 px-6 border-b border-gray-600">Username</th>
              <th className="py-3 px-6 border-b border-gray-600">Score</th>
              <th className="py-3 px-6 border-b border-gray-600">Date</th>
              <th className="py-3 px-6 border-b border-gray-600">Time</th>
              <th className="py-3 px-6 border-b border-gray-600 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr 
                  key={score.id} 
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-3 px-6 border-b border-gray-600">{index + 1}</td>
                  <td className="py-3 px-6 border-b border-gray-600">{score.playerName}</td>
                  <td className="py-3 px-6 border-b border-gray-600">{score.finalScore}/10</td>
                  <td className="py-3 px-6 border-b border-gray-600">{score.date}</td>
                  <td className="py-3 px-6 border-b border-gray-600">{score.time}</td>
                  <td className="py-3 px-6 border-b border-gray-600">
                    <button 
                      onClick={() => handleDelete(score.id)}
                      className="text-red-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No scores recorded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Score_board;
