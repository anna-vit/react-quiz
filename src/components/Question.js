import Options from "./Options";
import { useQuizProvider } from "../context/QuizContext";

function Question() {
  const { questions, index } = useQuizProvider();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
