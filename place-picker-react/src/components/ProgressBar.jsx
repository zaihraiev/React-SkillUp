import { useState, useEffect } from 'react';

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevValue) => {
        return prevValue - 10;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id='progress-bar' value={remainingTime} max={timer}></progress>
  );
}
