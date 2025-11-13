import React, { useState, useEffect } from 'react';
import './index.scss';
import { updateBoard, cleanUpBoard } from '../Board/util'
import { ifInBorder, mapShapeToPositions, ifOccupy, findNextShape, saveBox, clearBoardCountScore, ifGameEnd, playButtonMovingSound} from './util';
import { randomShapeGenerator} from '../Shape/util';


type MoveShapeProps = {
  setShape: (value: (string | number)[][]) => void;
  shape: (string | number)[][];
  board: (string | number)[][];
  rowLimit: number;
  colLimit: number;
  setBoard: (value: (string | number)[][]) => void;
  score: number;
  setScore: (value: number) => void;
  borderBox: number[][];
  setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
  hasInitialized: boolean;
  setHasInitialized: (value: boolean | ((prev: boolean) => boolean)) => void;
  setFood: (value: (string)[]) => void;
  words: any[];
  phrases: Record<string, string>;
};

const MoveShape: React.FC<MoveShapeProps> = ({setShape, shape, setBoard, board, score, setScore, rowLimit, colLimit, setEndGame, hasInitialized, setHasInitialized, setFood, words, phrases}) => {
  //coordinate of shape that is currently being moved
  const [shapeCoordinate, setShapeCoordinate] = useState(mapShapeToPositions(shape));
  const [box, setBorderCoordinate] = useState(saveBox(shape));

  //after click on "start game"
  //update the board once
  useEffect(() => {
    if (!hasInitialized && shape.length > 0) {
      console.log("restarting...")
      const [nextShape, newBox] = findNextShape({activity: "", shapeCoordinate: shapeCoordinate, box: box});
      const {newBoard, shapePos} = updateBoard({board: board, newShape: nextShape});
      setShapeCoordinate(shapePos);
      setBoard(newBoard);
      setHasInitialized(true); // ensure it only runs once
      setBorderCoordinate(newBox);
    }
  }, [shape, hasInitialized, box]);


  useEffect(() => {
  }, [shapeCoordinate])


  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    intervalId = setInterval(() => {
      const [nextShape, newBox] = findNextShape({activity: "ArrowDown", shapeCoordinate: shapeCoordinate, box: box});
      const inBorder = ifInBorder({nextShape: nextShape, rowLimit: rowLimit, colLimit: colLimit});

      //For auto movement, if in border, clean up the board
      //Then check if occupied. If not occupied, apply the move
      //If can't move down either because of out of border or occupied, lock the piece
      console.log('Auto move down: inBorder=', inBorder);
      
      if (inBorder) {
        const cleanedBoard = cleanUpBoard({board, shapeCoordinate});
        const Occupied = ifOccupy({nextShape, board: cleanedBoard});
        console.log('Auto move down: Occupied=', Occupied);
        
        if (!Occupied) {
          // Valid move: move the piece down
          const { newBoard, shapePos } = updateBoard({
            board: cleanedBoard,
            newShape: nextShape,
          });
          setBoard(newBoard);
          setBorderCoordinate(newBox);
          setShapeCoordinate(shapePos);
          return; // Exit early but do not lock the piece to the board
        }
      }

          // Can't move down (either out of border OR occupied)
          // Lock the shape in place
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
          const [newScore, updatedBoard, foundPhrases] = clearBoardCountScore(newBoard, score, phrases);
          setScore(newScore);
          setBoard(updatedBoard);
          setFood(foundPhrases);

          // restart a new shape
          var newShape = randomShapeGenerator(words);
          setShape(newShape);
          setBorderCoordinate(saveBox(newShape));
          setShapeCoordinate(mapShapeToPositions(newShape))
          setHasInitialized(false);
      }, 1000);


    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      const [nextShape, newBox] = findNextShape({activity: e.key, shapeCoordinate: shapeCoordinate, box: box});
      const inBorder = ifInBorder({nextShape: nextShape, rowLimit: rowLimit, colLimit: colLimit});

      //For manual movement, if in border, clean up the board
      //Then check if occupied. If not occupied, apply the move
      //If out of border or occupied, do nothing
      if (inBorder) {
        const cleanedBoard = cleanUpBoard({board, shapeCoordinate});
        const Occupied = ifOccupy({nextShape, board: cleanedBoard});
        
        if (!Occupied) {
          const {newBoard, shapePos} = updateBoard({board:cleanedBoard, newShape: nextShape});
          setBoard(newBoard);
          setShapeCoordinate(shapePos);
          setBorderCoordinate(newBox);
        }
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