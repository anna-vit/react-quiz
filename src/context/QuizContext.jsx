import { createContext, useContext, useEffect, useReducer } from "react";

const Quizcontext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  //   'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFaild":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);

  function setStartStatus() {
    dispatch({ type: "start" });
  }

  function newAnswerStatus(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  function setTimer() {
    dispatch({ type: "tick" });
  }

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finish() {
    dispatch({ type: "finish" });
  }

  function restart() {
    dispatch({ type: "restart" });
  }

  return (
    <Quizcontext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        setStartStatus,
        newAnswerStatus,
        setTimer,
        nextQuestion,
        finish,
        restart,
      }}
    >
      {children}
    </Quizcontext.Provider>
  );
}

function useQuizProvider() {
  const context = useContext(Quizcontext);
  if (context === undefined)
    throw new Error("Quizcontext was used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuizProvider };
