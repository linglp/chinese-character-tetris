import { describe, expect, test } from 'vitest';
import { computeBorder, findOccupant, ifOccupy, ifInBorder, mapShapeToPositions, rotateShape, debugShapePosition } from '../util';

const testShapes = [
    {
      name: 'Square shapes',
      shape: [
       {"row": 1, "col": 1},
       {"row": 1, "col": 2},
       {"row": 2, "col": 1},
       {"row": 2, "col": 2},
      ],
      expected: [2, 2, 1, 1]
    },
    {
        name: 'S shape',
        shape: [
         {"row": 1, "col": 1},
         {"row": 1, "col": 2},
         {"row": 2, "col": 1},
         {"row": 2, "col": 2},
        ],
        expected: [2, 2, 1, 1]
    },
    {
        name: 'L shape',
        shape: [
         {"row": 2, "col": 1},
         {"row": 3, "col": 1},
         {"row": 4, "col": 1},
         {"row": 4, "col": 2},
        ],
        expected: [4, 2, 2, 1]
    },
    {
        name: 'L shape 2',
        shape: [
            {"row": 2, "col": 1},
            {"row": 3, "col": 1},
            {"row": 4, "col": 1},
            {"row": 4, "col": 0},
        ],
        expected: [4, 1, 2, 0]
    },
]


describe('test the border of a given shape can be computed correctly', ()=>{
    test.each(testShapes)('$name', ({name, shape, expected}) => {
        const result = computeBorder(shape);
        expect(result).toEqual(expected);
      });
})


const testNextShapeBorder = [
    {
        name: 'the next square is going to collide with an existing square',
        board: [
          [0, 0, 0],
          [0, 1, 1],
          [0, 1, 1],
        ],
        shape: [
         {"row": 0, "col": 1},
         {"row": 0, "col": 2},
         {"row": 1, "col": 1},
         {"row": 1, "col": 2},
        ],
        expected: true
      },
      {
        name: 'the next square is going to collide with an existing square 2',
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [1, 1, 0],
          [1, 1, 0],
        ],
        shape: [
         {"row": 1, "col": 1},
         {"row": 1, "col": 2},
         {"row": 2, "col": 1},
         {"row": 2, "col": 2},
        ],
        expected: true
      },
      {
        name: 'the next square is going to be out of border',
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        shape: [
         {"row": 2, "col": 1},
         {"row": 2, "col": 2},
         {"row": 3, "col": 1},
         {"row": 3, "col": 2},
        ],
        expected: false
      },
      {
        name: 'the next square is not going to collide with a shape',
        board: [
          [0, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 1],
        ],
        shape: [
         {"row": 2, "col": 0},
         {"row": 2, "col": 1},
         {"row": 3, "col": 0},
         {"row": 3, "col": 1},
        ],
        expected: false
      },
]

describe('test if the next shape will collide with an existing shape', ()=>{
    test.each(testNextShapeBorder)('$name', ({name, board, shape, expected}) => {
        const result = findOccupant(shape,board);
        expect(result).toEqual(expected);
      });
})


const testIfNextShapeOccupy = [
    {
        name: "the next square is not going to collide with an existing square",
        shapeCoordinate: [
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
            {"row": 2, "col": 1},
            {"row": 2, "col": 2},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1],
          ],
        expected: false, 
    },
    {
        name: "the next S shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 2, "col": 1},
            {"row": 2, "col": 2},
            {"row": 3, "col": 1},
            {"row": 3, "col": 0},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1],
          ],
        expected: true, 
    },
    {
        name: "the next I shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 2, "col": 1},
            {"row": 3, "col": 1},
            {"row": 4, "col": 1},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1],
          ],
        expected: true, 
    },
    {
        name: "the next L shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 1, "col": 1},
            {"row": 2, "col": 1},
            {"row": 3, "col": 1},
            {"row": 3, "col": 2},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 0],
            [1, 0, 0],
          ],
        expected: true, 
    },
]
describe('test if the next shape is occupied based on activity provided', ()=>{
    test.each(testIfNextShapeOccupy)('$name', ({name, board, shapeCoordinate, expected}) => {
        const result = ifOccupy({board: board, nextShape: shapeCoordinate});
        expect(result).toEqual(expected);
      });
})


const testNextShapeInBorder = [
    {
        name: "the square shape is moving down and will be in border",
        shapeCoordinate: [
            {"row": 0, "col": 1},
            {"row": 0, "col": 2},
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
        ],
        rowLimit: 3, 
        colLimit: 3,
        activity: "ArrowDown",
        expected: true, 
    },
    {
        name: "the current S shape is moving down and will be out of border",
        shapeCoordinate: [
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
            {"row": 2, "col": 0},
            {"row": 2, "col": 1},
        ],
        rowLimit: 3, 
        colLimit: 3,
        activity: "ArrowDown",
        expected: false, 
    },
    {
        name: "the current I shape is moving down and will be out of border",
        shapeCoordinate: [
            {"row": 0, "col": 0},
            {"row": 1, "col": 0},
            {"row": 2, "col": 0},
        ],
        activity: "ArrowDown",
        rowLimit: 2, 
        colLimit: 5,
        expected: false, 
    },
    {
        name: "the current L shape is moving right and will be out of border",
        shapeCoordinate: [
            {"row": 2, "col": 2},
            {"row": 3, "col": 2},
            {"row": 4, "col": 2},
            {"row": 4, "col": 1},
        ],
        activity: "ArrowRight",
        rowLimit: 10, 
        colLimit: 2,
        expected: false, 
    },
]
// describe('test if the next shape is going to be in border', ()=>{
//     test.each(testNextShapeInBorder)('$name', ({name, shapeCoordinate, rowLimit, colLimit, activity, expected}) => {
//         const result = ifInBorder({shapeCoordinate, rowLimit, colLimit, activity})
//         expect(result).toEqual(expected);
//       });
// })

const testShapeMatrix = [
    {
        name: "square shape",
        matrix: [
            [0, 0, 0],
            [0, 1, 1],
            [0, 1, 1],
        ],
        expected:[
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
            {"row": 2, "col": 1},
            {"row": 2, "col": 2},
        ]
    },
    {
        name: "S shape",
        matrix: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        expected:[
            {"row": 0, "col": 1},
            {"row": 0, "col": 2},
            {"row": 1, "col": 0},
            {"row": 1, "col": 1},
        ]
    },
    {
        name: "L shape",
        matrix: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
        expected:[
            {"row": 0, "col": 1},
            {"row": 1, "col": 1},
            {"row": 2, "col": 0},
            {"row": 2, "col": 1},
        ]
    },
]
describe('test if shapes can be mapped to coordinates correctly', ()=>{
    test.each(testShapeMatrix)('$name', ({name, matrix, expected}) => {
        const result = mapShapeToPositions(matrix)
        expect(result).toEqual(expected);
      });
})


const testRotateShape = [
    {
        "name": "rotate I shape from horizontal to vertical",
        "coordinate": [{"row": 1, "col": 1}, {"row": 2, "col": 1}, {"row": 3, "col": 1}, {"row": 4, "col": 1}],
        "board": [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        "expected": [{"row": 2, "col": 0}, {"row": 2, "col": 1}, {"row": 2, "col": 2}, {"row": 2, "col": 3}],
    },
    {
        "name": "rotate I shape from vertical to horizontal",
        "coordinate": [{"row": 2, "col": 0}, {"row": 2, "col": 1}, {"row": 2, "col": 2}, {"row": 2, "col": 3}],
        "board": [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        "expected": [{"row": 0, "col": 1}, {"row": 1, "col": 1}, {"row": 2, "col": 1}, {"row": 3, "col": 1}]
    },
    {
        "name": "rotate a L shape",
        "coordinate": [{"row": 0, "col": 1}, {"row": 1, "col": 1}, {"row": 2, "col": 1}, {"row": 2, "col": 2}],
        "board": [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ],
        "expected": [{"row": 0, "col": 2}, {"row": 1, "col": 0}, {"row": 1, "col": 1}, {"row": 1, "col": 2}],
    }
]
describe('test if shape can be rotated correctly', ()=>{
    test.each(testRotateShape)('$name', ({name, coordinate, board, expected}) => {
        const result = rotateShape(coordinate)
        console.debug('Debug info - current shape on the board:');
        debugShapePosition(coordinate, board).forEach(row => console.debug(row.join(' ')));
        console.debug('Debug info - new shape on the board:');
        debugShapePosition(result, board).forEach(row => console.debug(row.join(' ')));
        expect(result).toEqual(expected);
      });
})