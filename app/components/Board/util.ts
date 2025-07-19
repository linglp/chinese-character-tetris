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

/**
 * Cleans up the board by removing the shape's current position.
 * @param params - The parameters object.
 * @param params.board - The current game board.
 * @param params.shapeCoordinate - The coordinates of the shape to remove.
 * @returns A new board with the shape cleared from its previous position.
 */
export function cleanUpBoard({board, shapeCoordinate}:cleanUpBoardProps): number[][] {
    const newBoard = board.map(row => [...row]);

    shapeCoordinate.forEach((object) => {
        newBoard[object["row"]][object["col"]] = 0;
      });

    return newBoard
}


/**
 * Update the board based on the activity. If there's no activity provided, just paste the shape to the board. 
 * @param params - The parameters object.
 * @param params.board - The current game board.
 * @param params.shapeCoordinate - The coordinates of the shape to remove.
 * @returns An object containing:
 * - `newBoard`: The updated board after applying the activity.
 * - `shapePos`: The new shape coordinates after the move.
 */
export function updateBoard({board, shapeCoordinate, activity}: updateBoardProps):  { newBoard: number[][]; shapePos: shapePositionType[] } {
  const cleanBoard = activity !== "" ? cleanUpBoard({ board, shapeCoordinate }): board;
  
  // shallow clone each row
    const newBoard = cleanBoard.map(row => [...row]);
    let shapePos: shapePositionType[] = [];
    let updated = shapeCoordinate

    if (activity === 'ArrowDown') {
        updated = shapeCoordinate.map(pos => ({row: pos.row+1, col:pos.col}));
    } 
    else if (activity === 'ArrowLeft') {
        //will forever be greater or equal to zero
        updated = shapeCoordinate.map(pos => ({row: pos.row, col:pos.col-1}));
    } 
    else if (activity === 'ArrowRight') {
        updated = shapeCoordinate.map(pos => ({row: pos.row, col:pos.col+1}));
      }
    else {
        updated = shapeCoordinate
    }

    updated.forEach((pos) => {
        const rowIndex = pos.row;
        const colIndex = pos.col;
        newBoard[rowIndex][colIndex] = 1;
    })

    shapePos = updated
    return { newBoard, shapePos };
}


