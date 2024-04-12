import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [btnCaption, setBtnCaption] = useState("Edit");
  const [name, setNewName] = useState(initialName);

  let playerName = <span className="player-name">{name}</span>;

  function handleClick() {
    setIsEditing((editing) => !editing);
    setBtnCaption(isEditing ? "Edit" : "Save");

    if (isEditing) {
      onChangeName(symbol, name);
    }
  }

  function handleChange(event) {
    setNewName(event.target.value);
  }

  if (isEditing) {
    playerName = (
      <input
        type="text"
        name="nickname"
        required
        value={name}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{btnCaption}</button>
    </li>
  );
}
