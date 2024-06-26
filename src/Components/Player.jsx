import { useState } from "react"

export default function Player({initialName, symbol, isActive}){
  console.log("check active", isActive)
    const [playerName, setPlayerName] = useState(initialName);

    const [isEditing, setIsEditing] = useState(false);

    function handleEditing(){
        console.log(initialName);
        setIsEditing((editing) => !editing);
    }

    function handleChange(event){
     console.log(event);
     setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = 'Edit';

    if(isEditing){
      editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
      btnCaption = 'Save';
    }

    return (
        <li className={isActive ? "Active" : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{btnCaption}</button>
        </li>
    )
}