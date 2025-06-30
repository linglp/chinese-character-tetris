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
};

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

export function ifReachLimit({edgeMaxRow, rowLimit}: ifReachLimitParams){
  // if the edge of the shape has reached the bottom of the board

  //account for index 0
  if (edgeMaxRow + 1 == rowLimit) {
    return true
  }
  else{
    return false
  }

}