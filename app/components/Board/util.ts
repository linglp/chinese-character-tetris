type updateBoardProps = {
    shape: number[][];
    board: number[][];
    rowIndex: number; 
    colIndex: number;
}

type cleanUpBoardProps = {
    board: number[][];
    rowIndex: number; 
    colIndex: number;
    activity: string;
}

export function cleanUpBoard({board, rowIndex, colIndex, activity}:cleanUpBoardProps): number[][] {
    let cellsToClear: [number, number][] = [];
    var newBoard = board.map(row => [...row]);

    //clean up either one row or one column 
    if (activity == "ArrowRight"){
        cellsToClear = [
            [rowIndex, colIndex],
            [rowIndex+1, colIndex],
            [rowIndex+2, colIndex]
        ];
    }

    else if (activity == "ArrowLeft"){
        var newColIndex = colIndex + 2;
        cellsToClear = [
            [rowIndex, newColIndex],
            [rowIndex+1, newColIndex],
            [rowIndex+2, newColIndex]
        ];        
    }

    else if (activity == "ArrowDown"){
        cellsToClear = [
            [rowIndex, colIndex],
            [rowIndex, colIndex+1],
            [rowIndex, colIndex+2]
        ];        
    }


    cellsToClear.forEach(([r, c]) => {
        newBoard[r][c] = 0;
      });


    console.log('new board after clean', newBoard)

    return newBoard
}

export function updateBoard({shape, board, rowIndex, colIndex}: updateBoardProps): number[][] {
    var shapeRowIndex = 0;
    // shallow clone each row
    var newBoard = board.map(row => [...row]);

    //shape(0,0) --> board(rowIndex, colIndex)
    //shape(0,1) --> board(rowIndex, colIndex+1)
    //shape(0,2) --> board(rowIndex, colIndex+2)
    //shape(1,0) --> board(rowIndex+1, colIndex)


    //update the board based on position (row number, column number)
    while (shapeRowIndex <= 2){
            var shapeColIndex = 0
            while (shapeColIndex <=2){
                if (rowIndex >= 0 && rowIndex+shapeRowIndex < board.length && colIndex >= 0 && colIndex+shapeColIndex < board[0].length){
                    newBoard[rowIndex+shapeRowIndex][colIndex+shapeColIndex] = shape[shapeRowIndex][shapeColIndex]
                    shapeColIndex = shapeColIndex + 1
                }
                else {
                    console.error("Invalid row or column index.");
                  }
            }
            shapeRowIndex = shapeRowIndex + 1
    }
    return newBoard

}
