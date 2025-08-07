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
 * If the next shape is out of bound, return undefined
 *
 * @param {string} activity - The action to perform (e.g. 'ArrowDown', 'ArrowLeft', 'ArrowRight').
 * @param {shapePositionType[]} shapeCoordinate - Array of current shape positions (each with row and col).
 * @returns {shapePositionType[]|undefined} New array of shape positions after movement, or undefined if activity is unrecognized or out of bound
 */
export function findNextShape(activity: string, shapeCoordinate: shapePositionType[]): shapePositionType[]{

  const moveLeft =  (points: shapePositionType[]) => points.map(p => ({ "row": p["row"], "col": p["col"]-1 }));
  const moveRight =  (points: shapePositionType[]) => points.map(p => ({ "row": p["row"], "col": p["col"]+1 }));
  const moveDown =  (points: shapePositionType[]) => points.map(p => ({ "row": p["row"]+1, "col": p["col"] }));

  var moved = shapeCoordinate;

  if (activity === 'ArrowRight') {
    moved = moveRight(shapeCoordinate);
  } 
  else if (activity === 'ArrowLeft') {
    moved = moveLeft(shapeCoordinate);
  } 
  else if (activity === 'ArrowDown') {
    moved = moveDown(shapeCoordinate);
  }

  return moved
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

  if (result && nextShape && process.env.NODE_ENV !== 'production') {
    console.debug('Debug info - nextShape on the board:');
    debugShapePosition(nextShape, board).forEach(row => console.debug(row.join(' ')));
    console.debug('Debug info - findOccupant:', findOccupant(nextShape, newBoard));
  }

  return result

  }


/**
 * Look at the edges of the current shape. Returns true if the next activity is in border. 
 *
 * @param {nextShape[]} params.shapeCoordinate - Next coordinates of the shape
 * @param {number} params.rowLimit - The total row number of the board
 * @param {number} params.colLimit - The total col number of the board
 * @returns {boolean} True if the next shape position is within the border. Returns false for unrecognized activities.
 */
export function ifInBorder({nextShape, rowLimit, colLimit}: MoveCheckParams): boolean {
  const [edgeMaxRow, edgeMaxCol, edgeMinRow, edgeMinCol] = computeBorder(nextShape);
  return edgeMaxRow < rowLimit && edgeMaxCol < colLimit && edgeMinCol >= 0 && edgeMinRow >= 0
}

/**
 * Turn raw matrix to position of the shape on a given board
 *
 * @param {number[][]} params.matrix - shape on the board
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