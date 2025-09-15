import './index.scss';
import React from 'react';
import StartGameButton from "../StartGameButton";

type EndGameProp = {
  onUpdate: (value: number[][]) => void;
  setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
  setBoard: (value: number[][]) => void;
  setScore: (value: number) => void;
}

const EndGame: React.FC<EndGameProp> = ({ onUpdate, setEndGame, setBoard, setScore}) => {
  const disabled = false;

  return (
    <div className="splash">
      <div>
        <h1>Game Over</h1>
        <div className="restart-btn">
          <StartGameButton disabled={disabled} onUpdate={onUpdate} setEndGame={setEndGame} setBoard={setBoard} setScore={setScore}/>
        </div>
      </div>
    </div>
  );
}



export default EndGame;