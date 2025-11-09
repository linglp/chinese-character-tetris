import type { shapePositionType } from "../Board/util";

type MoveCheckParams = {
    nextShape: shapePositionType[];
    rowLimit: number;
    colLimit: number;
  };

type ifOccupyParams = {
  nextShape: shapePositionType[];
  board: number[][];
}

const OCCUPIED_CELL = 1

/**
 * map shape position to the board for debugging purpose
 * 
 * @param {shapePositionType[]} position - position of a given shape on the board
 * @param {number[][]} board
 * @returns {number[][]} - return the new board with the shape
 */
export function debugShapePosition(position: shapePositionType[], board: number[][]): number[][]{
  const newBoard = board.map(row => [...row])

  position.forEach(dot => {
    newBoard[dot.row][dot.col] = 1
  })

  return newBoard
}

/**
 * compute border of a given shape
 * 
 * @param {shapePositionType[]} position - position of a given shape on the board
 * @returns {[number, number, number, number]} - return maxRows, maxCols, minRow, minCol
 */
export function computeBorder(position: shapePositionType[]): [number, number, number, number]{
    if (position.length === 0) return [0, 0, 0, 0];

    const { maxRow, maxCol, minRow, minCol } = position.reduce(
    (acc, { row, col }) => (
    {
        maxRow: Math.max(acc.maxRow, row),
        maxCol: Math.max(acc.maxCol, col),
        minRow: Math.min(acc.minRow, row),
        minCol: Math.min(acc.minCol, col)
    }),
    //Any actual row or col value will be less than 100
    { maxRow: 0, maxCol: 0, minRow: 100,  minCol: 100}
    );

    return [maxRow, maxCol, minRow, minCol]
}

/**
 * Return true if a given shape has been occupied on the board. 
 * 
 * @param {shapePositionType[]} nextShape - position of a given shape on the board
 * @param {number[][]} board - board
 * @returns {boolean} - return true if this position has been occupied
 */
export function findOccupant(nextShape: shapePositionType[], board: number[][]): boolean {
  const numRows = board.length;
  const numCols = board[0].length;

  for (const coord of nextShape) {
    var row: number = coord["row"]
    var col: number = coord["col"]
  
    // row and col can be undefined if next shape is out of border
    // if next shape is in border, test if it is occupied on the board
    if (row >= 0 && col >= 0 && row < numRows && col < numCols){
      if (board[row][col] === OCCUPIED_CELL){
        
        return true
      }
    }
  }
  return false
}


/**
 * Computes the next shape coordinates based on a user activity. 
 * If the next shape is out of bounds, returns undefined.
 * @param {string} activity - The action to perform (e.g., 'ArrowDown', 'ArrowLeft', 'ArrowRight').
 * @param {shapePositionType[]} shapeCoordinate - Current coordinates of the shape (each with row and col).
 * @param {shapePositionType[]} box - The bounding box of the current shape.
 * @returns {shapePositionType[]} New coordinates of the shape after movement
 */
export function findNextShape(activity: string, shapeCoordinate: shapePositionType[], box: shapePositionType[]): [shapePositionType[], shapePositionType[]] {
  const moveLeft =  (points: shapePositionType[]) => points.map(p => ({ "row": p["row"], "col": p["col"]-1 }));
  const moveRight =  (points: shapePositionType[]) => points.map(p => ({ "row": p["row"], "col": p["col"]+1 }));
  const moveDown =  (points: shapePositionType[]) => points.map(p => ({ "row": p["row"]+1, "col": p["col"] }));

  let moved = shapeCoordinate;
  let newBox = box; 

  if (activity === 'ArrowRight') {
    moved = moveRight(shapeCoordinate);
    newBox = moveRight(box);
  } 
  else if (activity === 'ArrowLeft') {
    moved = moveLeft(shapeCoordinate);
    newBox = moveLeft(box);
  } 
  else if (activity === 'ArrowDown') {
    moved = moveDown(shapeCoordinate);
    newBox = moveDown(box);
  }
  else if (activity == 'ArrowUp'){
    moved = rotateShape(shapeCoordinate, box);

  }
  return [moved, newBox];
}

/**
 * Returns true if the given shape's next position is already occupied on the board based on activity.
 *
 * @param {ifOccupyParams} params - Object containing shapeCoordinate, activity, and board
 * @param {shapePositionType[]} params.nextShape - Current coordinates of the shape
 * @param {number[][]} params.board - The current state of the game board
 * @returns {boolean|undefined} True if the next shape position is occupied. Undefined if the activity is not recognized
 */
export function ifOccupy({nextShape, board}: ifOccupyParams): boolean|undefined {
  //create a copy of the current board 
  const newBoard = board.map(row => [...row])

  const result = findOccupant(nextShape, newBoard);

  return result
}

/**
 * Determines the pivot point for rotating a shape clockwise.
 * @param {shapePositionType[]} shapeCoordinate - Current coordinates of the shape.
 * @returns {shapePositionType} The pivot point if it is part of the shape; otherwise, the second point in the shape is used as the pivot point.
*/
function getPivot(shapeCoordinate: shapePositionType[]): shapePositionType{
  const rows = shapeCoordinate.map(cell => cell.row); // vertical positions
  const cols = shapeCoordinate.map(cell => cell.col); // horizontal positions

  const rowCenter = (Math.min(...rows) + Math.max(...rows)) / 2;
  const colCenter = (Math.min(...cols) + Math.max(...cols)) / 2;

  return { row: rowCenter, col: colCenter };
}

/**
 * Rotate a shape
 * @param {shapePositionType[]} shapeCoordinate - coordinates of the current shape
 * @param {shapePositionType[]} box  - The grid or boxes that define the boundaries.
 * @returns {shapePositionType[]} - Returns positions of the rotated shape
*/
export function rotateShape(shapeCoordinate: shapePositionType[], box: shapePositionType[]): shapePositionType[]{
  const pivot = getPivot(box);

  //row is vertical position while col is horizontal position 
  const cx = pivot["col"];
  const cy = pivot["row"];

  var rotated = shapeCoordinate.map(cell => ({
  row: Math.round(cy + (cell.col - cx)),   // y' = cy - (x - cx)
  col: Math.round(cx - (cell.row - cy))    // x' = cx + (y - cy)
}));

return rotated
}

/**
 * Checks if a given shape is within the board.
 * @param {MoveCheckParams} params
 * @param {shapePositionType[]} params.nextShape - Coordinates of the shape to check.
 * @param {number} params.rowLimit - Maximum number of rows in the grid.
 * @param {number} params.colLimit - Maximum number of columns in the grid.
 * @returns {boolean} True if the shape is entirely within the border; otherwise, false.
 */
export function ifInBorder({nextShape, rowLimit, colLimit}: MoveCheckParams): boolean {
  const [edgeMaxRow, edgeMaxCol, edgeMinRow, edgeMinCol] = computeBorder(nextShape);
  return edgeMaxRow < rowLimit && edgeMaxCol < colLimit && edgeMinCol >= 0 && edgeMinRow >= 0
}

/**
 * Turn raw matrix to position of the shape on a given board
 *
 * @param {number[][]} matrix - shape on the board
 * @returns {shapePositionType[]} return the position of a shape on the board
 */
export function mapShapeToPositions(matrix: number[][]): shapePositionType[] {
  const positions: shapePositionType[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 1) {
        positions.push({ row: rowIndex, col: colIndex });
      }
    });
  });

  return positions;
}

/**
 * Save the whole box including the shape and the white space
 *
 * @param {number[][]} matrix - shape on the board
 * @returns {shapePositionType[]} return the position of the whole border box
 */
export function saveBox(matrix: number[][]): shapePositionType[] {
  const borderBox: shapePositionType[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        borderBox.push({ row: rowIndex, col: colIndex });
    });
  });

  return borderBox;
}

/**
 * Clears fully filled rows in a Tetris-like board and returns the updated score and board.
 *
 * A row is considered "filled" if all its cells contain `1`. 
 * Cleared rows are either removed or reset to zeros depending on implementation.
 * The score can be incremented based on the number of cleared rows.
 *
 * @param {number[][]} board - The current game board, represented as a 2D array of numbers.
 * @param {number} score - The current score before clearing any rows.
 * @returns {[number, number[][]]} - A tuple containing:
 *    1. The updated score.
 *    2. The updated board after clearing filled rows.
 */
export function clearBoardCountScore(board: number[][], score: number): [number, number[][]]{
  const rowsToClear: number[] = [];
  const newBoard = board.map(row => [...row]);
  
  for (let i = 0; i < board.length; i++) {
    const allFilled = <T>(arr: T[]): boolean => arr.every(val => val === 1);
    //mark rows that need to be removed
    const filled = allFilled(board[i])
    if (filled){
      rowsToClear.push(i)
    }
  }
  //sort index
  rowsToClear.sort((a, b) => b - a);

  //remove rows
  //have to start from the bigger indexs
  if (rowsToClear.length > 0){
    for (let i of rowsToClear) {
      newBoard.splice(i, 1);
    }
    //add empty rows back to the top
    let numCols = board[0].length;
    for (let i = 0; i < rowsToClear.length; i++) {
      newBoard.unshift(Array(numCols).fill(0));
    }
  }

  score = score + 10 * rowsToClear.length

  return [score, newBoard]
}

export function ifGameEnd(board: number[][]){
  let hasOne = board[0].some(cell => cell === 1);
  return hasOne
}


export function playButtonMovingSound(activity: string){
  if (activity === 'ArrowLeft' || activity === 'ArrowRight') {
    const audio = new Audio('/left-right-button.wav');
    audio.play();
  }
}
