import React, { useState, useEffect } from 'react';
import './index.scss';
import {updateBoard, cleanUpBoard} from '../Board/util'
import { computeBorder, ifCanMove, mapShapeToPositions} from './util';


type MoveShapeProps = {
  shape: number[][];
  board: number[][];
  rowLimit: number;
  colLimit: number;
  setBoard: (value: number[][]) => void;

};

const MoveShape: React.FC<MoveShapeProps> = ({shape, setBoard, board, rowLimit, colLimit}) => {
  //coordinate of shape that is currently being moved
  const [shapeCoordinate, setShapeCoordinate] = useState(mapShapeToPositions(shape));
  const [hasInitialized, setHasInitialized] = useState(false);

  //after click on "start game"
  //update the board once
  useEffect(() => {
    if (!hasInitialized && shape.length > 0) {
      const {newBoard, shapePos} = updateBoard({board: board, shapeCoordinate: shapeCoordinate, activity: ""});
      setShapeCoordinate(shapePos)
      setBoard(newBoard);
      setHasInitialized(true); // ensure it only runs once
    }
  }, [shape, hasInitialized]);


  useEffect(() => {
  }, [shapeCoordinate])


  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let newRow = shapeCoordinate[0]["row"];
    let newCol = shapeCoordinate[0]["col"];

    intervalId = setInterval(() => {

      const [edgeMaxRow, edgeMaxCol, edgeMinRow, edgeMinCol] = computeBorder(shapeCoordinate);
      const canMove = ifCanMove({
        edgeMaxRow, edgeMaxCol, edgeMinCol,
        rowLimit, colLimit, activity: 'ArrowDown'
      });
  
      if (canMove) {
        const cleanedBoard = cleanUpBoard({ board, shapeCoordinate });
        const { newBoard, shapePos } = updateBoard({
          board: cleanedBoard,
          shapeCoordinate,
          activity: 'ArrowDown'
        });
        setBoard(newBoard);
        setShapeCoordinate(shapePos);
      }
    }, 1000);


    const handleKeyDown = (e: KeyboardEvent) => {

      //allow user to control the position 
      if (e.key === 'ArrowDown') {
        newRow += 1;
      } else if (e.key === 'ArrowLeft') {
        //will forever be greater or equal to zero
        newCol = Math.max(0, newCol - 1);
      } else if (e.key === 'ArrowRight') {
        newCol += 1;

      } else {
        return; // ignore other keys
      }

      const [edgeMaxRow, edgeMaxCol, edgeMinRow, edgeMinCol] = computeBorder(shapeCoordinate);

      const canMove = ifCanMove({edgeMaxRow: edgeMaxRow, edgeMaxCol: edgeMaxCol, edgeMinCol: edgeMinCol, rowLimit: rowLimit, colLimit: colLimit, activity: e.key})
      if (canMove){
      const cleanedBoard = cleanUpBoard({board: board, shapeCoordinate: shapeCoordinate})
      const {newBoard, shapePos} = updateBoard({board:cleanedBoard, shapeCoordinate: shapeCoordinate, activity: e.key});
      setBoard(newBoard);
      setShapeCoordinate(shapePos);
      }

    };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearInterval(intervalId);
      };

  }), ([shape, board]);


  return null; 
}

export default MoveShape;