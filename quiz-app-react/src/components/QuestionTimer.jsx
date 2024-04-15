import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timeoutValue = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeoutValue);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => {
        return prevState - 100;
      });
    }, 100);

    return () => {
      setRemainingTime(timeout);
      clearInterval(interval);
    };
  }, []);

  return <progress id='question-time' value={remainingTime} max={timeout} />;
}
