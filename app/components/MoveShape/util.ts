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

export function findOccupant(nextShape: shapePositionType[], board: number[][]){
  const numRows = board.length;
  const numCols = board[0].length;

  for (const coord of nextShape) {
    var row: number = coord["row"]
    var col: number = coord["col"]
  
    // row and col can be undefined if next shape is out of border
    // if next shape is in border, test if it is occupied on the board
    if (row < numRows && col < numCols){
      var spot = board[row][col]
      if (spot == 1){
        return true
      }
    }
  }
  return false
}

export function ifOccupy({shapeCoordinate, activity, board}: ifOccupyParams){
  let nextShape; 

  //create a copy of the current board 
  var newBoard = cleanUpBoard({ board, shapeCoordinate });
  
  //check if moving this shape down, any shape has occupied the next space
  if (activity === 'ArrowDown'){
    nextShape = shapeCoordinate.map(coord =>({
      ...coord,
      row: coord.row + 1
    }))
  }
  
  return nextShape && findOccupant(nextShape, newBoard)

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