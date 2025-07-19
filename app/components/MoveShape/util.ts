import {cleanUpBoard} from '../Board/util'
import type { shapePositionType } from "../Board/util";

type MoveCheckParams = {
    shapeCoordinate: shapePositionType[];
    rowLimit: number;
    colLimit: number;
    activity: string;
  };

type ifReachLimitParams = {
  shapeCoordinate: shapePositionType[];
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
 * If the next shape is out of bound, return undefined
 *
 * @param {string} activity - The action to perform (e.g. 'ArrowDown', 'ArrowLeft', 'ArrowRight').
 * @param {shapePositionType[]} shapeCoordinate - Array of current shape positions (each with row and col).
 * @returns {shapePositionType[]|undefined} New array of shape positions after movement, or undefined if activity is unrecognized or out of bound
 */
function findNextShape(activity: string, shapeCoordinate: shapePositionType[], board: number[][]): shapePositionType[]|undefined {
  let nextShape; 
  var rowLimit = board.length;
  var colLimit = board[0].length;

  //if the next shape is not in border, output a message
  var inBorder = ifInBorder({shapeCoordinate, rowLimit, colLimit, activity})
  if (!inBorder){
    console.debug("the next shape is not in border")
    return undefined
  }

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

  // find the next shape based on activity
  // if the next shape is not in bound, this would return undefined. 
  var nextShape = findNextShape(activity, shapeCoordinate, board);

  const result = nextShape && findOccupant(nextShape, newBoard);

  if (result && nextShape) {
    console.debug('Debug info - nextShape on the board:');
    debugShapePosition(nextShape, board).forEach(row => console.debug(row.join(' ')));
    console.debug('Debug info - findOccupant:', findOccupant(nextShape, newBoard));
  }
  
  return result

  }

  
export function ifInBorder({shapeCoordinate, rowLimit, colLimit, activity}: MoveCheckParams): boolean {
  const [edgeMaxRow, edgeMaxCol, edgeMinRow, edgeMinCol] = computeBorder(shapeCoordinate);

  if (activity === 'ArrowRight') {
    return edgeMaxCol + 1 < colLimit;
  } 
  else if (activity === 'ArrowLeft') {
    return edgeMinCol - 1 >= 0
  } 
  else if (activity === 'ArrowDown') {
    return edgeMaxRow + 1 < rowLimit
  }

  else{
    //for other unrecognized activity, cannot move
    //will need to update this function for rotation to work properly
    return false
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

export function ifReachLimit({shapeCoordinate, rowLimit, occupied}: ifReachLimitParams){
  const [edgeMaxRow, , , ] = computeBorder(shapeCoordinate);
  //if reaching a space that has been occupied, return true
  if (occupied == true){
    return true
  }
  //check if the edge of the shape has reached the bottom of the board
  //account for index 0
  else {
    return edgeMaxRow + 1 == rowLimit
  }

}