import type { shapePositionType, shapePositionWithValueType } from "../Board/util";

type MoveCheckParams = {
    nextShape: shapePositionWithValueType[];
    rowLimit: number;
    colLimit: number;
  };

type ifOccupyParams = {
  nextShape: shapePositionWithValueType[];
  board: (string | number)[][];
}

type findNextShapeParams = {
  activity: string;
  shapeCoordinate: shapePositionWithValueType[];
  box: shapePositionType[];
}

/**
 * map shape position to the board for debugging purpose
 * 
 * @param {shapePositionWithValueType[]} position - position of a given shape on the board
 * @param {number[][]} board
 * @returns {number[][]} - return the new board with the shape
 */
export function debugShapePosition(position: shapePositionWithValueType[], board: number[][]): number[][]{
  const newBoard = board.map(row => [...row])

  position.forEach(dot => {
    newBoard[dot.row][dot.col] = 1
  })

  return newBoard
}

/**
 * compute border of a given shape
 *
 * @param {shapePositionWithValueType[]} position - position of a given shape on the board
 * @returns {[number, number, number, number]} - return maxRows, maxCols, minRow, minCol
 */
export function computeBorder(position: shapePositionWithValueType[]): [number, number, number, number]{
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
*/
export function findOccupant(nextShape: shapePositionWithValueType[], board: (string | number)[][]): boolean {
  const numRows = board.length;
  const numCols = board[0].length;

  for (const coord of nextShape) {
    var row: number = coord["row"]
    var col: number = coord["col"]
  
    // row and col can be undefined if next shape is out of border
    // if next shape is in border, test if it is occupied on the board
    if (row >= 0 && col >= 0 && row < numRows && col < numCols){
      if (typeof board[row][col] === 'string'){
        
        return true
      }
    }
  }
  return false
}


/**
 * Computes the next shape coordinates based on a user activity.
 * @param {findNextShapeParams} params - Object containing shapeCoordinate, activity, and board
 * @param {string} params.activity - The action to perform (e.g., 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp').
 * @param {shapePositionWithValueType[]} params.shapeCoordinate - Current coordinates of the shape (each with row and col).
 * @param {shapePositionType[]} params.box - The bounding box of the current shape.
 * @returns {shapePositionWithValueType[]} New coordinates of the shape after movement
 */
export function findNextShape({activity, shapeCoordinate, box}: findNextShapeParams): [shapePositionWithValueType[], shapePositionType[]]{
  const moveLeft = <T extends shapePositionType | shapePositionWithValueType>(points: T[]): T[] =>points.map(p => ({...p,col: p.col - 1,}));
  const moveRight = <T extends shapePositionType | shapePositionWithValueType>(points: T[]): T[] =>points.map(p => ({...p,col: p.col + 1,}));
  const moveDown= <T extends shapePositionType | shapePositionWithValueType>(points: T[]): T[] =>points.map(p => ({...p,row: p.row + 1,}));

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
    // Rotation happens within the fixed 3×3 box
    // Box coordinates don't change, only the shape positions change
    moved = rotateShape(shapeCoordinate, box);
    // newBox stays as the original box
  }
  return [moved, newBox];
}

/**
 * Returns true if the given shape's next position is already occupied on the board based on activity.
 *
 * @param {ifOccupyParams} params - Object containing shapeCoordinate, activity, and board
 * @param {shapePositionTypeWithValue[]} params.nextShape - Current coordinates of the shape
 * @param {(string | number)[][]} params.board - The current state of the game board
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

  return { row: rowCenter, col: colCenter};
}

/**
 * Rotate a shape
 * @param {shapePositionWithValueType[]} shapeCoordinate - coordinates of the current shape
 * @param {shapePositionWithValueType[]} box  - The grid or boxes that define the boundaries.
 * @returns {shapePositionWithValueType[]} - Returns positions of the rotated shape
*/
export function rotateShape(shapeCoordinate: shapePositionWithValueType[], box: shapePositionType[]): shapePositionWithValueType[]{
  const pivot = getPivot(box);

  //row is vertical position while col is horizontal position 
  const cx = pivot["col"];
  const cy = pivot["row"];

  var rotated = shapeCoordinate.map(cell => ({
  row: Math.round(cy + (cell.col - cx)),   // y' = cy - (x - cx)
  col: Math.round(cx - (cell.row - cy)),   // x' = cx + (y - cy)
  value: cell.value
}));

return rotated
}

/**
 * Checks if a given shape is within the board.
 * @param {MoveCheckParams} params
 * @param {shapePositionWithValueType[]} params.nextShape - Coordinates of the shape to check.
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
 * @param {(string | number)[][]} matrix - shape on the board
 * @returns {shapePositionWithValueType[]} return the position of a shape on the board
 */
export function mapShapeToPositions(matrix: (string | number)[][]): shapePositionWithValueType[] {
  const positions: shapePositionWithValueType[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (typeof cell === 'string') {
        positions.push({ row: rowIndex, col: colIndex, value: cell });
      }
    });
  });

  return positions;
}

/**
 * Save the whole box including the shape and the white space
 *
 * @param {string | number[][]} matrix - shape on the board
 * @returns {shapePositionType[]} return the position of the whole border box
 */
export function saveBox(matrix: (string | number)[][]): shapePositionType[] {
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
 * @params {string[][]} phrases - The list of valid phrases for scoring.
 * @returns {[number, number[][]]} - A tuple containing:
 *    1. The updated score.
 *    2. The updated board after clearing filled rows.
 */
export function clearBoardCountScore(board: (string | number)[][], score: number, phrases: Record<string, string>): [number, (string | number)[][], string[]]{
  const rowsToClear: number[] = [];
  const newBoard = board.map(row => [...row]);
  const foundWords: string[] = [];

  for (let i = 0; i < board.length; i++) {
    const allFilled = <T>(arr: T[]): boolean => arr.every(val => typeof val === 'string');
    //mark rows that need to be removed
    const filled = allFilled(board[i])
    if (filled){
      foundWords.push(...makeWords(board[i], phrases))
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

  return [score, newBoard, foundWords]
}

export function ifGameEnd(board: (string | number)[][]){
  let hasOne = board[0].some(cell => typeof cell === 'string');
  return hasOne
}

function makeWords(arr: (string | number)[], phrases: Record<string, string>): string[] {
    const results: string[] = [];
    let i  = 0;
    while (i <= arr.length -1) {
        let j = i + 1;
        for (j; j < arr.length; j++) {
            var word = String(arr[i]) + String(arr[j]);
            if (Object.keys(phrases).includes(word) && !results.includes(word)) {
                results.push(word);
            }
            var k = j + 1;
            for (k; k < arr.length; k++) {
                var another_word = String(arr[i]) + String(arr[j]) + String(arr[k]);
                if (Object.keys(phrases).includes(another_word) && !results.includes(another_word)) {
                    results.push(another_word);
                }
            }
        }
        i++;
    }
    return results;
}

export function playButtonMovingSound(activity: string){
  if (activity === 'ArrowLeft' || activity === 'ArrowRight') {
    const audio = new Audio('/left-right-button.wav');
    audio.play();
  }
}
