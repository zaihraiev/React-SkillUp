import quizCompletePng from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ answers }) {
  const skippedAnswers = answers.filter((answer) => answer == null).length;
  const correctAnswers = answers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  ).length;

  const skippedPercent = Math.round((skippedAnswers / QUESTIONS.length) * 100);
  const correctPercent = Math.round((correctAnswers / QUESTIONS.length) * 100);
  const incorrectPercent = 100 - skippedPercent - correctPercent;

  return (
    <div id="summary">
      <img src={quizCompletePng} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{incorrectPercent}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClasses = "user-answer";

          if (answer == null) {
            cssClasses += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClasses += " correct";
          } else {
            cssClasses += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClasses}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
