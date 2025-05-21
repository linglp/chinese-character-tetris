import './index.scss';


type ShapeProps = {
    shape: number[][];
};



const Shape: React.FC<ShapeProps> = ({ shape }) => {
    return (
      <div className="shape">
        {shape.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
            cell == 1 ? <div key={`${rowIndex}_${colIndex}`} className={`${cell==1 ? 'is-colored-cell' : 'not-colored-cell'}`}> </div> : null
            ))}
          </div>
        ))}
      </div>
    );
};

export default Shape;