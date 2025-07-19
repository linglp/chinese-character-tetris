import React, { useState, useEffect } from 'react';
import './index.scss';
import { updateBoard } from '../Board/util'
import { ifInBorder, mapShapeToPositions, ifCollide, ifOccupy} from './util';
import { randomShapeGenerator } from '../Shape/util';


type MoveShapeProps = {
  setShape: (value: number[][]) => void;
  shape: number[][];
  board: number[][];
  rowLimit: number;
  colLimit: number;
  setBoard: (value: number[][]) => void;

};

const MoveShape: React.FC<MoveShapeProps> = ({setShape, shape, setBoard, board, rowLimit, colLimit}) => {
  //coordinate of shape that is currently being moved
  const [shapeCoordinate, setShapeCoordinate] = useState(mapShapeToPositions(shape));
  const [hasInitialized, setHasInitialized] = useState(false);

  //after click on "start game"
  //update the board once
  useEffect(() => {
    if (!hasInitialized && shape.length > 0) {
      console.log('starting again......')
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
      const inBorder = ifInBorder({
        shapeCoordinate,
        rowLimit, colLimit, activity: 'ArrowDown'
      });

      const Occupied = ifOccupy({shapeCoordinate, activity: 'ArrowDown', board})
      const available = inBorder && !Occupied

      if (available) {
        const { newBoard, shapePos } = updateBoard({
          board: board,
          shapeCoordinate,
          activity: 'ArrowDown'
        });
        setBoard(newBoard);
        setShapeCoordinate(shapePos);
      }
      else {
        // the shape becomes part of the board
        const { newBoard, shapePos} = updateBoard({
          board: board,
          shapeCoordinate,
          activity: ""
        });
        setBoard(newBoard);
        //restart a new shape
        var newShape = randomShapeGenerator()
        setShape(newShape);
        setShapeCoordinate(mapShapeToPositions(newShape))
        setHasInitialized(false);
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
      const inBorder = ifInBorder({shapeCoordinate: shapeCoordinate, rowLimit: rowLimit, colLimit: colLimit, activity: e.key})
      if (inBorder){
      const {newBoard, shapePos} = updateBoard({board:board, shapeCoordinate: shapeCoordinate, activity: e.key});
      setBoard(newBoard);
      setShapeCoordinate(shapePos);
      }

    };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearInterval(intervalId);
      };

  }), [shape, board];


  return null; 
}

export default MoveShape;