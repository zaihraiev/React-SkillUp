import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompletePng from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz() {
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
    return (
      <div id="summary">
        <img src={quizCompletePng} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <section id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={answers[answers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </section>
  );
}
