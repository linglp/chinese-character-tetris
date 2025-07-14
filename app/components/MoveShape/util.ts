import {cleanUpBoard} from '../Board/util'
import type { shapePositionType } from "../Board/util";

type MoveCheckParams = {
    edgeMaxRow: number;
    edgeMaxCol: number;
    edgeMinCol: number;
    rowLimit: number;
    colLimit: number;
    activity: string;
  };

type ifReachLimitParams = {
  edgeMaxRow: number;
  rowLimit: number; 
  occupied: boolean | undefined; 
};

type ifOccupyParams = {
  shapeCoordinate: shapePositionType[];
  activity: string; 
  board: number[][];
}


/**
 * map shape position to the board for debugging purpose
 * 
 * @param {shapePositionType[]} position - position of a given shape on the board
 * @param {number[][]} board
 * @returns {number[][]} - return the new board with the shape
 */
export function debugShapePosition(position: shapePositionType[], board: number[][]): number[][]{
  var newBoard = board.map(row => [...row])

  position.map(dot => {
    newBoard[dot.row][dot.col] = 1
  })

  return newBoard
}

/**
 * compute border of a given shape
 * 
 * @param {shapePositionType[]} position - position of a given shape on the board
 * @returns {Type[]} - return maxRows, maxCols, minRow, minCol
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
      var spot = board[row][col]
      if (spot === 1){
        return true
      }
    }
  }
  return false
}


/**
 * Computes the next shape coordinates based on a user activity.
 *
 * @param {string} activity - The action to perform (e.g. 'ArrowDown', 'ArrowLeft', 'ArrowRight').
 * @param {shapePositionType[]} shapeCoordinate - Array of current shape positions (each with row and col).
 * @returns {shapePositionType[]|undefined} New array of shape positions after movement, or undefined if activity is unrecognized.
 */
function findNextShape(activity: string, shapeCoordinate: shapePositionType[]): shapePositionType[]|undefined {
  let nextShape; 
  //check if moving this shape down, any shape has occupied the next space
  if (activity === 'ArrowDown'){
      nextShape = shapeCoordinate.map(coord =>({
        ...coord,
        row: coord.row + 1
      }))
  } 
  else if (activity === 'ArrowLeft'){
    nextShape = shapeCoordinate.map(coord =>({
      ...coord,
      col: coord.col - 1
    }))
  }
  else if (activity === 'ArrowRight'){
    nextShape = shapeCoordinate.map(coord =>({
      ...coord,
      col: coord.col + 1
    }))
  }
  return nextShape
}

/**
 * Returns true if the given shape's next position is already occupied on the board based on activity.
 *
 * @param {ifOccupyParams} params - Object containing shapeCoordinate, activity, and board
 * @param {shapePositionType[]} params.shapeCoordinate - Current coordinates of the shape
 * @param {string} params.activity - The user activity (e.g., 'ArrowDown')
 * @param {number[][]} params.board - The current state of the game board
 * @returns {boolean} True if the next shape position is occupied. Undefined if the activity is not recognized
 */
export function ifOccupy({shapeCoordinate, activity, board}: ifOccupyParams): boolean|undefined {
  //create a copy of the current board 
  var newBoard = cleanUpBoard({ board, shapeCoordinate });
  
  //find the next shape based on activity
  var nextShape = findNextShape(activity, shapeCoordinate);

  const result = nextShape && findOccupant(nextShape, newBoard);

  if (result && nextShape) {
    console.debug('Debug info - nextShape on the board:');
    debugShapePosition(nextShape, board).forEach(row => console.debug(row.join(' ')));
    console.debug('Debug info - findOccupant:', findOccupant(nextShape, newBoard));
  }

  return result

  }

export function ifCanMove({edgeMaxRow, edgeMaxCol, edgeMinCol, rowLimit, colLimit, activity}: MoveCheckParams): boolean {
  if (activity === 'ArrowRight') {
        if (edgeMaxCol + 1 < colLimit){
            return true;
        }
        return false; 
      } else if (activity === 'ArrowLeft') {

        if (edgeMinCol - 1 >= 0){
            return true;
        }
        return false;
      } else if (activity === 'ArrowDown') {
        if (edgeMaxRow + 1 < rowLimit){
            return true;
        }
        return false;
      } else {
        return false;
      }
}


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

export function ifReachLimit({edgeMaxRow, rowLimit, occupied}: ifReachLimitParams){
  //if reaching a space that has been occupied, return true
  if (occupied == true){
    return true
  }
  //check if the edge of the shape has reached the bottom of the board
  //account for index 0
  else if (edgeMaxRow + 1 == rowLimit) {
    return true
  }
  else{
    return false
  }

}