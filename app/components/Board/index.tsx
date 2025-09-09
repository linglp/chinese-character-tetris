import './index.scss';
import React, { useEffect } from 'react';
import Timer from '../Timer';
import EndGame from "../EndGame"

type BoardProps = {
    board: number[][];
    endGame: boolean; 
    setShape: (value: number[][]) => void;
};



const Board: React.FC<BoardProps> = ({ board, endGame, setShape}) => {
  //re-render the board every time there's an update
  useEffect(() => {
  }, [board]);

  return (
    <div className="board">
      <Timer />
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={`${rowIndex}_${colIndex}`} className={`cell cell-${cell}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
      {endGame && <EndGame onUpdate={setShape} />}
    </div>
  );
  };

export default Board;