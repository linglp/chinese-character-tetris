type updateBoardProps = {
    board: (string | number)[][];
    newShape: shapePositionWithValueType[];
}

type cleanUpBoardProps = {
    board: (string | number)[][];
    shapeCoordinate: shapePositionWithValueType[]
}

export type shapePositionType = {
    row: number;
    col: number;
}

export type shapePositionWithValueType = {
    row: number;
    col: number;
    value: string | number;
}

/**
 * Cleans up the board by removing the shape's current position.
 * @param params - The parameters object.
 * @param params.board - The current game board.
 * @param params.shapeCoordinate - The coordinates of the shape to remove.
 * @returns A new board with the shape cleared from its previous position.
 */
export function cleanUpBoard({board, shapeCoordinate}:cleanUpBoardProps): (string | number)[][]{
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
 * @param params.newShape - The coordinates of the new shape. 
 * @returns An object containing:
 * - `newBoard`: The updated board after applying the activity.
 * - `shapePos`: The new shape
 */
export function updateBoard({board, newShape}: updateBoardProps):  { newBoard: (string | number)[][]; shapePos: shapePositionWithValueType[] } {
  // shallow clone each row
  const newBoard = board.map(row => [...row]);
  const shapePos = newShape
  
  newShape.forEach((pos) => {
    const rowIndex = pos.row;
    const colIndex = pos.col;
    newBoard[rowIndex][colIndex] = pos.value;
})
    return { newBoard, shapePos };
}


