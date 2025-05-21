import './index.scss';
import React, { useEffect } from 'react';

type BoardProps = {
    board: number[][];
};



const Board: React.FC<BoardProps> = ({ board }) => {
  //re-render the board every time there's an update
  useEffect(() => {
    console.log('updating the board...', board)
  }, [board]);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={`${rowIndex}_${colIndex}`} className={`cell cell-${cell}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  };

export default Board;