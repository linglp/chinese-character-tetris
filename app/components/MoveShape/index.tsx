import React, { useState, useEffect } from 'react';
import './index.scss';
import {updateBoard, cleanUpBoard} from '../Board/util'


type MoveShapeProps = {
  shape: number[][];
  board: number[][];
  setBoard: (value: number[][]) => void;
};

const MoveShape: React.FC<MoveShapeProps> = ({shape, setBoard, board}) => {
  const [position, setPosition] = useState({rowIndex: 0, colIndex: 0 });
  const [hasInitialized, setHasInitialized] = useState(false);

  //after click on "start game"
  //update the board once
  useEffect(() => {
    if (!hasInitialized && shape.length > 0) {
      const newBoard = updateBoard({shape:shape, board: board, rowIndex: position.rowIndex, colIndex: position.colIndex});
      setBoard(newBoard);
      setHasInitialized(true); // ensure it only runs once
    }
  }, [shape, hasInitialized]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newRow = position.rowIndex;
      let newCol = position.colIndex;
  
      if (e.key === 'ArrowDown') {
        newRow += 1;
      } else if (e.key === 'ArrowLeft') {
        newCol -= 1;
      } else if (e.key === 'ArrowRight') {
        newCol += 1;

      } else {
        return; // ignore other keys
      }
      const cleanedBoard = cleanUpBoard({board: board, activity: e.key, rowIndex:position.rowIndex, colIndex:position.colIndex })
      const newBoard = updateBoard({shape:shape, board:cleanedBoard, rowIndex:newRow, colIndex: newCol});
      setBoard(newBoard);
      setPosition({ rowIndex: newRow, colIndex: newCol });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }), ([shape, board, position]);


  return null; 
}

export default MoveShape;