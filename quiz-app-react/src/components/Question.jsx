import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";
import { useContext } from "react";
import { QuizContext } from "../store/quiz-context.jsx";

export default function Question() {
  const { skipAnswer, activeQuestionIndex, answerState, answers } =
    useContext(QuizContext);

  const questionText = QUESTIONS[activeQuestionIndex].text;
  let timer = 10000;

  if (answerState != "") {
    timer = 1000;
  }

  if (answerState === "correct" || answerState === "wrong") {
    timer = 2000;
  }

  return (
    <div id="question" key={activeQuestionIndex}>
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answerState === "" ? skipAnswer : null}
        mode={answerState}
      />
      <h2>{questionText}</h2>
      <Answers />
    </div>
  );
}
