import { useCallback, useContext, useRef, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompletePng from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";
import QuizContextProvider, { QuizContext } from "../store/quiz-context.jsx";

export default function Quiz() {
  const {
    addAnswer,
    activeQuestionIndex,
    answerState,
    skipAnswer,
    answers,
    quizIsComplete,
  } = useContext(QuizContext);

  return (
    <QuizContextProvider>
      <section id="quiz">
        <Question
          key={activeQuestionIndex}
          questionText={QUESTIONS[activeQuestionIndex].text}
          answers={QUESTIONS[activeQuestionIndex].answers}
          answerState={answerState}
          selectedAnswer={answers[answers.length - 1]}
          onSelectAnswer={addAnswer}
          onSkipAnswer={skipAnswer}
        />
      </section>
    </QuizContextProvider>
  );
}
