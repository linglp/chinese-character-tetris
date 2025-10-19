import './index.scss';
import React, { useEffect } from 'react';
import EndGame from "../EndGame"

type BoardProps = {
    board: number[][];
    isDisabled: boolean;
    endGame: boolean; 
    setShape: (value: number[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: number[][]) => void;
    setScore: (value: number) => void;
    setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
};



const Board: React.FC<BoardProps> = ({ board, isDisabled, endGame, setShape, setEndGame, setBoard, setScore, setIsDisabled}) => {
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
            <div key={`${rowIndex}_${colIndex}`} className={`cell cell-${cell}`}>
            </div>
          ))}
        </div>
      ))}
      {endGame && <EndGame isDisabled={isDisabled} onUpdate={setShape} setEndGame={setEndGame} setBoard={setBoard} setScore={setScore} setIsDisabled={setIsDisabled}/>}
    </div>
  );
  };

export default Board;