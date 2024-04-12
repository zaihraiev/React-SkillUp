import { useState } from "react";
import CalculateForm from "./components/CalculateForm";
import Result from "./components/Result";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  });

  const inputIsValid = userInput.duration >= 1;

  function handleOnChangeValue(inputIdentifier, newValue) {
    setUserInput((prevValue) => {
      return {
        ...prevValue,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <CalculateForm
        onChangeInputs={handleOnChangeValue}
        userInput={userInput}
      />
      {inputIsValid && <Result userInput={userInput} />}
      {!inputIsValid && <p className="center">Please enter a duration greater than zero.</p>}
    </>
  );
}

export default App;
