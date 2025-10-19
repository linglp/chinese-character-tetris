import './index.scss';
import React from 'react';
import StartGameButton from "../StartGameButton";

type EndGameProp = {
  isDisabled: boolean;
  onUpdate: (value: number[][]) => void;
  setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
  setBoard: (value: number[][]) => void;
  setScore: (value: number) => void;
  setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const EndGame: React.FC<EndGameProp> = ({ isDisabled, onUpdate, setEndGame, setBoard, setScore, setIsDisabled }) => {
  return (
    <div className="splash">
      <div>
        <h1>Game Over</h1>
        <div className="restart-btn">
          <StartGameButton isDisabled={isDisabled} onUpdate={onUpdate} setEndGame={setEndGame} setBoard={setBoard} setScore={setScore} setIsDisabled={setIsDisabled}/>
        </div>
      </div>
    </div>
  );
}


export default EndGame;