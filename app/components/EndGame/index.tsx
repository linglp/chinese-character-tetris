import './index.scss';
import React, { useEffect } from 'react';
import StartGameButton from "../StartGameButton";

type EndGameProp = {
  onUpdate: (value: number[][]) => void;
}

const EndGame: React.FC<EndGameProp> = ({ onUpdate }) => {
  const disabled = false;

  return (
    <div className="splash">
      <div>
        <h1>Game Over</h1>
        {/* <div className="button">
            <StartGameButton disabled={disabled} onUpdate={onUpdate}/>
        </div> */}
      </div>
    </div>
  );
}



export default EndGame;