import { describe, expect, test } from 'vitest';
import { computeBorder, findOccupant, ifOccupy } from '../util';

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
        name: "the current square is not going to collide with an existing square",
        shapeCoordinate: [
            {"row": 0, "col": 1},
            {"row": 0, "col": 2},
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
        ],
        activity: "ArrowDown",
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
        name: "the current S shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
            {"row": 2, "col": 0},
            {"row": 2, "col": 1},
        ],
        activity: "ArrowDown",
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
        name: "the current I shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 2, "col": 0},
            {"row": 3, "col": 0},
            {"row": 4, "col": 0},
        ],
        activity: "ArrowRight",
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
        name: "the current L shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 2, "col": 2},
            {"row": 3, "col": 2},
            {"row": 4, "col": 2},
            {"row": 4, "col": 1},
        ],
        activity: "ArrowLeft",
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
    test.each(testIfNextShapeOccupy)('$name', ({name, shapeCoordinate, activity, board, expected}) => {
        const result = ifOccupy({shapeCoordinate: shapeCoordinate, activity: activity, board: board});
        expect(result).toEqual(expected);
      });
})