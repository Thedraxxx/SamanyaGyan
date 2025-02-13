import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col space-y-6 pl-11 pt-16 w-3/4 mx-auto text-xl text-white">
      <h1 className="text-2xl font-bold">Rules:</h1>
      <ol className="list-decimal list-inside space-y-2">
        <li>You will be asked 10 multiple-choice questions.</li>
        <li>Each question has only one correct answer.</li>
        <li>Once you select an option, you cannot change it.</li>
        <li>You must select an answer before moving to the next question.</li>
        <li>Each correct answer will earn you points.</li>
        <li>There is no negative marking for incorrect answers.</li>
        <li>You must complete all 10 questions to see your final score.</li>
        <li>Your score will be updated in the{" "}
          <Link to="/Score-Board" className="underline text-red-500">
            Score Board
          </Link>.
        </li>
        <li>Make sure to enter your username before starting the quiz.</li>
        <li>Have fun and try to get the highest score!</li>
      </ol>
    </div>
  );
};

export default About;
