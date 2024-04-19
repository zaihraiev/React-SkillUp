import { useState } from "react";

export function useInput(initialValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputBlur(event) {
    setDidEdit(true);
  }

  function handleChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputBlur,
    handleChange,
    hasError: didEdit && !valueIsValid,
  };
}
