import { useRef, useContext, useEffect } from "react";
import { QuizContext } from "../store/quiz-context.jsx";
import QUESTIONS from "../questions.js";

export default function Answers() {
  const { activeQuestionIndex, answerState, addAnswer, answers } =
    useContext(QuizContext);
  const shuffledAnswers = useRef();
  const selectedAnswer = answers[answers.length - 1];

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((a) => {
        const isSelected = selectedAnswer === a;
        let cssClasses = "";

        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={a} className="answer">
            <button
              className={cssClasses}
              onClick={() => addAnswer(a)}
              disabled={answerState !== ""}
            >
              {a}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
