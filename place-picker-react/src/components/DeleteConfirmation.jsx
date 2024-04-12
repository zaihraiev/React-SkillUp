import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      // Executes before next function call OR executes before removing component.
      clearTimeout(timer);
    };
  }, [onConfirm]); //onConfirm will be different each time, because it is an object. During comparing objects they are not equal to each other even with same data.
  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button onClick={onCancel} className='button-text'>
          No
        </button>
        <button onClick={onConfirm} className='button'>
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
