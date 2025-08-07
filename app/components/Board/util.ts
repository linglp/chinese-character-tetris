type updateBoardProps = {
    board: number[][];
    newShape: shapePositionType[];
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
export function updateBoard({board, newShape}: updateBoardProps):  { newBoard: number[][]; shapePos: shapePositionType[] } {
  // shallow clone each row
  const newBoard = board.map(row => [...row]);
  const shapePos = newShape
  
  newShape.forEach((pos) => {
    const rowIndex = pos.row;
    const colIndex = pos.col;
    newBoard[rowIndex][colIndex] = 1;
})
    return { newBoard, shapePos};
}


