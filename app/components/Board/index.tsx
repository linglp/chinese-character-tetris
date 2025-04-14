import './index.scss';

type BoardProps = {
    board: number[][];
};



const Board: React.FC<BoardProps> = ({ board }) => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}_${colIndex}`} className="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default Board;