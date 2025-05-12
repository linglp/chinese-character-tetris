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
            <div key={`${rowIndex}_${colIndex}`} className={`${cell==1 ? 'is-colored-cell' : 'not-colored-cell'}`}>
                {cell==1 ? cell : null}
            </div>
            ))}
          </div>
        ))}
      </div>
    );
};

export default Shape;