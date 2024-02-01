import { useQuizProvider } from "../context/QuizContext";

function StartScreen({ numQuestions }) {
  const { setStartStatus } = useQuizProvider();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3> {numQuestions} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={setStartStatus}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
