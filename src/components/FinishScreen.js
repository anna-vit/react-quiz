import { useQuizProvider } from "../context/QuizContext";

function FinishScreen({ maxPossiblePoints }) {
  const { highscore, points, restart } = useQuizProvider();

  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = " 🏆 ";
  if (percentage >= 80 && percentage < 100) emoji = " 🥳 ";
  if (percentage >= 50 && percentage < 80) emoji = " 🧑‍💻 ";
  if (percentage >= 0 && percentage < 50) emoji = " 😵 ";
  if (percentage === 0) emoji = " 🤦 ";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore : {highscore} points)</p>
      <button className="btn btn-ui" onClick={restart}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
