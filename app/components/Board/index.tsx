import './index.scss';
import React, { useEffect } from 'react';
import Timer from '../Timer';
import EndGame from "../EndGame"

type BoardProps = {
    board: number[][];
    endGame: boolean; 
    hasInitialized: boolean;
    setShape: (value: number[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: number[][]) => void;
};



const Board: React.FC<BoardProps> = ({ board, endGame, setShape, hasInitialized, setEndGame, setBoard}) => {
  //re-render the board every time there's an update
  useEffect(() => {
  }, [board, endGame]);

  return (
    <div className="board">
      <Timer endGame={endGame} hasInitialized={hasInitialized}/>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={`${rowIndex}_${colIndex}`} className={`cell cell-${cell}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
      {endGame && <EndGame onUpdate={setShape} setEndGame={setEndGame} setBoard={setBoard}/>}
    </div>
  );
  };

export default Board;