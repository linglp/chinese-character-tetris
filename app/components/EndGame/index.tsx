import './index.scss';
import React from 'react';
import StartGameButton from "../StartGameButton";

type EndGameProp = {
  isDisabled: boolean;
  onUpdate: (value: (string | number)[][]) => void;
  setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
  setBoard: (value: (string | number)[][]) => void;
  setScore: (value: number) => void;
  setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
  setFood: (value: {word: string, explanation: string}[] | ((prev: {word: string, explanation: string}[]) => {word: string, explanation: string}[])) => void;
  words: any[];
}

const EndGame: React.FC<EndGameProp> = ({ isDisabled, onUpdate, setEndGame, setBoard, setScore, setIsDisabled, words, setFood }) => {
  return (
    <div className="splash">
      <div>
        <h1>Game Over</h1>
        <div className="restart-btn">
          <StartGameButton isDisabled={isDisabled} onUpdate={onUpdate} setEndGame={setEndGame} setBoard={setBoard} setScore={setScore} setIsDisabled={setIsDisabled} words={words} setFood={setFood}/>
        </div>
      </div>
    </div>
  );
}


export default EndGame;