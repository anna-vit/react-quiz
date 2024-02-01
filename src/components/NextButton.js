import { useQuizProvider } from "../context/QuizContext";

function NextButton({ numQuestions }) {
  const { nextQuestion, finish, answer, index } = useQuizProvider();
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={finish}>
        Finish
      </button>
    );
}

export default NextButton;
