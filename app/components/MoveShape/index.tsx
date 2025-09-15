import React, { useState, useEffect } from 'react';
import './index.scss';
import { updateBoard, cleanUpBoard } from '../Board/util'
import { ifInBorder, mapShapeToPositions, ifOccupy, findNextShape, saveBox, clearBoardCountScore, ifGameEnd} from './util';
import { randomShapeGenerator } from '../Shape/util';


type MoveShapeProps = {
  setShape: (value: number[][]) => void;
  shape: number[][];
  board: number[][];
  rowLimit: number;
  colLimit: number;
  setBoard: (value: number[][]) => void;
  score: number;
  setScore: (value: number) => void;
  borderBox: number[][];
  setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
  hasInitialized: boolean;
  setHasInitialized: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const MoveShape: React.FC<MoveShapeProps> = ({setShape, shape, setBoard, board, score, setScore, rowLimit, colLimit, setEndGame, hasInitialized, setHasInitialized}) => {
  //coordinate of shape that is currently being moved
  const [shapeCoordinate, setShapeCoordinate] = useState(mapShapeToPositions(shape));
  const [box, setBorderCoordinate] = useState(saveBox(shape));

  //after click on "start game"
  //update the board once
  useEffect(() => {
    if (!hasInitialized && shape.length > 0) {
      console.log("restarting...")
      const nextShape = findNextShape("", shapeCoordinate, box, setBorderCoordinate);
      const {newBoard, shapePos} = updateBoard({board: board, newShape: nextShape});
      setShapeCoordinate(shapePos);
      setBoard(newBoard);
      setHasInitialized(true); // ensure it only runs once
    }
  }, [shape, hasInitialized, box]);


  useEffect(() => {
  }, [shapeCoordinate])

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    intervalId = setInterval(() => {
      const nextShape = findNextShape("ArrowDown", shapeCoordinate, box, setBorderCoordinate);
      const inBorder = ifInBorder({nextShape: nextShape, rowLimit: rowLimit, colLimit: colLimit});
      const cleanedBoard = cleanUpBoard({board, shapeCoordinate});
      const Occupied = ifOccupy({nextShape, board: cleanedBoard});

      if (inBorder && !Occupied) {
        const { newBoard, shapePos } = updateBoard({
          board: cleanedBoard,
          newShape: nextShape,
        });
        setBoard(newBoard);
        setShapeCoordinate(shapePos);
      }
      else {
        // the shape becomes part of the board
        const { newBoard, shapePos} = updateBoard({
          board: board,
          newShape: shapeCoordinate,
        });
        setBoard(newBoard);
        // check if the first row gets filled. If so, set endGame
        const endGame = ifGameEnd(newBoard);
        if (endGame){
          setEndGame(endGame);
          return
        }
        // also calculate if a shape needs to be cleared
        const [newScore, updatedBoard] = clearBoardCountScore(newBoard, score);
        setScore(newScore);
        setBoard(updatedBoard);

        // restart a new shape
        var newShape = randomShapeGenerator()
        setShape(newShape);
        setBorderCoordinate(saveBox(newShape));
        setShapeCoordinate(mapShapeToPositions(newShape))
        setHasInitialized(false);
      }
    }, 1000);


    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      const nextShape = findNextShape(e.key, shapeCoordinate, box, setBorderCoordinate);
      const inBorder = ifInBorder({nextShape: nextShape, rowLimit: rowLimit, colLimit: colLimit});
      const cleanedBoard = cleanUpBoard({board, shapeCoordinate});
      const Occupied = ifOccupy({nextShape, board: cleanedBoard});

      if (inBorder && !Occupied){
      const {newBoard, shapePos} = updateBoard({board:cleanedBoard, newShape: nextShape});
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