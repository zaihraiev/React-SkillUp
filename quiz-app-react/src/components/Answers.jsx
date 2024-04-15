import { useRef } from "react";
import QUESTIONS from "../questions.js";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
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
            <button className={cssClasses} onClick={() => onSelect(a)}>
              {a}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
