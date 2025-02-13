import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);

  // Function to shuffle options randomly
  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const data = await response.json();
         console.log(data)
        console.log(data.results);
        console.log(data.results.map((q) => q.category));
        const decodeHTML = (text) =>
          new DOMParser().parseFromString(text, "text/html").body.textContent;
        const formattedQuestions = data.results.map((q) => ({
          question: decodeHTML(q.question),
          difficulty: q.difficulty,
          category: q.category,
          options: shuffleOptions([
            ...q.incorrect_answers.map(decodeHTML),
            decodeHTML(q.correct_answer),
          ]),
          correctAnswer: decodeHTML(q.correct_answer),
        }));

        setQuestions(formattedQuestions);
      } catch (error) {
        console.log("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    if (startQuiz) fetchQuestions();
  }, [startQuiz]);
  const handleAnswerClick = (answer) => {
    setSelectAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[questionIndex].correctAnswer) {
      const newScore = score + 1;
    setScore(newScore);
    localStorage.setItem("quizScore", newScore);
    }
  };
  
  const handleNextQuestion = () => {
    setSelectAnswer(null);
    setIsAnswered(false);
    setQuestionIndex((prev) => prev + 1);
  };
  const handlePlayButton = () => {
    console.log("player Name:");

    if (playerName.trim() === "") {
      alert("Plese enter the username first");
      return;
    } else {
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("quizScore","0");
      const savedname = localStorage.getItem("playerName");
      console.log(savedname);
      setStartQuiz(true);
    }
  };
  const handleFinishQuiz = () => {
    const finalScore = parseInt(localStorage.getItem("quizScore")) || 0;
    const playerName = localStorage.getItem("playerName");
    
    // Create a new score entry
    const newScore = {
      id: Date.now(),
      playerName: playerName,
      finalScore: finalScore,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    // Get existing scores or initialize empty array
    const existingScores = JSON.parse(localStorage.getItem("quizResults")) || [];
    
    // Add new score
    const updatedScores = [...existingScores, newScore];
    
    // Sort scores in descending order
    updatedScores.sort((a, b) => b.finalScore - a.finalScore);
    
    // Save to localStorage
    localStorage.setItem("quizResults", JSON.stringify(updatedScores));
    
    // Reset states
    setStartQuiz(false);
    setPlayerName("");
    setQuestionIndex(0);
    setScore(0);
    setSelectAnswer(null);
    setIsAnswered(false);
    
    
    if (document.getElementById("inputName")) {
      document.getElementById("inputName").value = "";
    }

    // Clear quiz score
    localStorage.removeItem("quizScore");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white flex-col space-y-1">
     
      {!startQuiz ? (
        <div className="flex flex-col space-y-8 mb-5">
          <input
          id="inputName"
            type="text"
            value={playerName}
            placeholder="Input Player Name"
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePlayButton();
              }
            }}
            className="shadow-lg shadow-sky-600 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
          <button
            onClick={handlePlayButton}
            disabled={playerName.trim().length === 0}
            className="border-gray-400 p-5 border-2 rounded-lg mx-auto py-1 hover:bg-sky-600"
          >
            Play
          </button>
          <h2>
            Checkout the{" "}
            <Link to="/about" className="underline text-sky-400">
              Rules
            </Link>{" "}
            if you are new.
          </h2>
          <h2>
            Doesn&apos;t Have an account{" "}
            <Link to="/profile" className="underline text-sky-400">
              Sign up?
            </Link>
          </h2>
        </div>
      ) : (
        // Quiz screen: Shows the questions when quiz starts
        <div className="w-3/4 max-w-2xl p-6 bg-gray-800 rounded-lg relative min-h-screen flex flex-col justify-center items-center">
          {/* Back button to return to the home screen */}
          <button
            onClick={() => setStartQuiz(false)}
            className="absolute top-4 left-4 bg-gray-600 rounded-full p-2"
          >
            <ArrowLeft size={24} />
          </button>

          {loading ? (
            <p>Loading....</p>
          ) : questions.length > 0 ? (
            <div className="w-3/4 p-5 bg-gray-600 text-center rounded-3xl">
              <h2 className="text-sm mb-5 text-center">
                Category: {questions[questionIndex].category} <br />
                difficulty: {questions[questionIndex].difficulty}
              </h2>
              <h2 className="text-lg">{questions[questionIndex].question}</h2>
              <div className="mt-4 space-y-1.5">
                {questions[questionIndex].options.map((answer, index) => (
                  <button
                    disabled={isAnswered}
                    key={index}
                    className={`block w-full p-2 rounded-xl  ${
                      isAnswered
                        ? answer === questions[questionIndex].correctAnswer
                          ? "bg-green-500"
                          : selectedAnswer === answer
                          ? "bg-red-500"
                          : "bg-gray-700"
                        : "bg-gray-700 hover:bg-gray-400"
                    }`}
                    onClick={() => handleAnswerClick(answer)}
                  >
                    {answer}
                  </button>
                ))}
              </div>

              {questionIndex < 9 ? (
                <button
                  onClick={() => handleNextQuestion()}
                  className={`mt-4 bg-sky-700 font-semibold rounded-lg p-2 px-4`}
                  disabled={selectedAnswer === null}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="mt-4 bg-green-600 font-semibold rounded-lg p-2 px-4"
                >
                  Finish Quiz
                </button>
              )}
              {questionIndex === 9 && isAnswered && (
                <p>
                  Quiz Completed! Your Score:{" "}
                  {localStorage.getItem("quizScore")}/10
                </p>
              )}
            </div>
          ) : (
            <p>No questions found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
