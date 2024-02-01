import { useQuizProvider } from "../context/QuizContext";

function Progress({ numQuestions, maxPossiblePoints }) {
  const { index, points, answer } = useQuizProvider();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
