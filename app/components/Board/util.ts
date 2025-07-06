type updateBoardProps = {
    board: number[][];
    shapeCoordinate: shapePositionType[];
    activity: string; 
}

type cleanUpBoardProps = {
    board: number[][];
    shapeCoordinate: shapePositionType[]
}

export type shapePositionType = {
    row: number;
    col: number;
}

export function cleanUpBoard({board, shapeCoordinate}:cleanUpBoardProps): number[][] {
    var newBoard = board.map(row => [...row]);

    shapeCoordinate.forEach((object) => {
        newBoard[object["row"]][object["col"]] = 0;
      });
      
    return newBoard
}

export function updateBoard({board, shapeCoordinate, activity}: updateBoardProps):  { newBoard: number[][]; shapePos: shapePositionType[] } {
    // shallow clone each row
    var newBoard = board.map(row => [...row]);
    let shapePos: shapePositionType[] = [];
    var updated = shapeCoordinate

    if (activity === 'ArrowDown') {
        var updated = shapeCoordinate.map(pos => ({row: pos.row+1, col:pos.col}));
    } else if (activity === 'ArrowLeft') {
        //will forever be greater or equal to zero
        var updated = shapeCoordinate.map(pos => ({row: pos.row, col:pos.col-1}));

      } else if (activity === 'ArrowRight') {
        var updated = shapeCoordinate.map(pos => ({row: pos.row, col:pos.col+1}));
      } else {
        var updated = shapeCoordinate
      }
    updated.forEach((pos) => {
        var rowIndex = pos["row"]
        var colIndex = pos["col"]
        newBoard[rowIndex][colIndex] = 1
    })

    shapePos = updated

    return { newBoard, shapePos };

}


