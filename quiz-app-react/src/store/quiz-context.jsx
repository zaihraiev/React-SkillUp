import { createContext, useCallback, useEffect, useState } from "react";
import QUESTIONS from "../questions.js";
import Summary from "../components/Summary.jsx";

export const QuizContext = createContext({
  answerState: "",
  answers: [],
  activeQuestionIndex: 0,
  quizIsComplete: false,
  addAnswer: () => {},
  skipAnswer: () => {},
});

export default function QuizContextProvider({ children }) {
  const [answerState, setAnswerState] = useState("");
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setAnswers((prevState) => {
        return [...prevState, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex],
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null), [handleSelectAnswer];
  });

  if (quizIsComplete) {
    return <Summary answers={answers} />;
  }

  const ctxValue = {
    answerState,
    answers,
    activeQuestionIndex,
    quizIsComplete,
    addAnswer: handleSelectAnswer,
    skipAnswer: handleSkipAnswer,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
