import React, { useState, useEffect } from 'react';
import './index.scss';
import Shape from '../Shape'


type MoveShapeProps = {
  shape: number[][];
};

const MoveShape: React.FC<MoveShapeProps> = ({shape}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const step = 10;

  const handleKeyDown = (event) => {
    
    switch (event.key) {
      case 'ArrowLeft':
        setPosition(prevPosition => ({...prevPosition, left: prevPosition.left - step}));
        break;
      case 'ArrowRight':
        setPosition(prevPosition => ({...prevPosition, left: prevPosition.left + step}));
        break;
      case 'ArrowDown':
        setPosition(prevPosition => ({...prevPosition, top: prevPosition.top + step}));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{position: 'absolute', top: position.top, left: position.left}}>
      <Shape shape={shape} />
    </div>
  );
}

export default MoveShape;