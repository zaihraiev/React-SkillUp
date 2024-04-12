export default function CalculateForm({ onChangeInputs, userInput }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <div>
          <label>Initial Investment</label>
          <input
            name="initialInvestment"
            type="number"
            value={userInput.initialInvestment}
            onChange={(event) =>
              onChangeInputs("initialInvestment", event.target.value)
            }
            required
          ></input>
        </div>
        <div>
          <label>Annual Investment</label>
          <input
            name="annualInvestment"
            type="number"
            value={userInput.annualInvestment}
            onChange={(event) =>
              onChangeInputs("annualInvestment", event.target.value)
            }
            required
          ></input>
        </div>
      </div>
      <div className="input-group">
        <div>
          <label>Expected Return</label>
          <input
            name="expectedReturn"
            type="number"
            value={userInput.expectedReturn}
            onChange={(event) =>
              onChangeInputs("expectedReturn", event.target.value)
            }
            required
          ></input>
        </div>
        <div>
          <label>Duration</label>
          <input
            name="duration"
            type="number"
            value={userInput.duration}
            onChange={(event) => onChangeInputs("duration", event.target.value)}
            required
          ></input>
        </div>
      </div>
    </section>
  );
}
