import { useEffect } from "react";
import { useQuizProvider } from "../context/QuizContext";

function Timer() {
  const { setTimer, secondsRemaining } = useQuizProvider();
  const mins = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        setTimer();
      }, 1000);

      return () => clearInterval(id);
    },
    [setTimer]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
