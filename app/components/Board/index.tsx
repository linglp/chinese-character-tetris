import './index.scss';
import React, { useEffect } from 'react';
import EndGame from "../EndGame"

type BoardProps = {
    board: (string | number)[][];
    isDisabled: boolean;
    endGame: boolean; 
    setShape: (value: (string | number)[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: (string | number)[][]) => void;
    setScore: (value: number) => void;
    setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
    words: any[];
    setFood: (value: {word: string, explanation: string}[] | ((prev: {word: string, explanation: string}[]) => {word: string, explanation: string}[])) => void;
};



const Board: React.FC<BoardProps> = ({ board, isDisabled, endGame, setShape, setEndGame, setBoard, setScore, setIsDisabled, words, setFood}) => {
  useEffect(() => {
    if (endGame) {
      setIsDisabled(false); // Enable the button when game ends
    }
  }, [endGame, setIsDisabled]);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            typeof cell === 'string' ?  (
              <div key={`${rowIndex}_${colIndex}`} className={`cell cell-1`}>{cell}</div>
            ) : (
              <div key={`${rowIndex}_${colIndex}`} className={`cell cell-${cell}`}></div>
            )
          ))}
        </div>
      ))}
      {endGame && <EndGame isDisabled={isDisabled} onUpdate={setShape} setEndGame={setEndGame} setBoard={setBoard} setScore={setScore} setIsDisabled={setIsDisabled} words={words} setFood={setFood}/>}
    </div>
  );
  };

export default Board;