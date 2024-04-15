import quizLogo from '/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <img src={quizLogo} alt='Quiz Logo' />
      <h1>React Quiz</h1>
    </header>
  );
}
