// Imports
import { describe, expect, test } from 'vitest';
import { cleanUpBoard, updateBoard } from '../util';

const testBoardwithShapes = [
    {
      name: 'square shape in the lower right corner',
      board: [
        [0, 0, 0],
        [0, "粽", "粽"],
        [0, "粽", "粽"],
      ],
      shape: [
       {"row": 1, "col": 1, "value":"粽"},
       {"row": 1, "col": 2, "value":"粽"},
       {"row": 2, "col": 1, "value":"粽"},
       {"row": 2, "col": 2, "value":"粽"},
      ],
      expected: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
    },
    {
      name: 's shape in the middle, other shape does not get affected',
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, "粽", "粽", 0],
        [0, 0, "粽", 0, 0],
        [0, "粽", "粽", 0, 0],
        [0, 0, 0, "粽", "粽"],
      ],
      shape: [
        {"row": 1, "col": 2, "value":"粽"},
        {"row": 1, "col": 3, "value":"粽"},
        {"row": 2, "col": 2, "value":"粽"},
        {"row": 3, "col": 1, "value":"粽"},
        {"row": 3, "col": 2, "value":"粽"},
      ],
      expected: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, "粽", "粽"],
      ]
    },
  ];


describe('test the board can be cleaned clearly given a shape', ()=>{
    test.each(testBoardwithShapes)('$name', ({name, board, shape, expected}) => {
        const result = cleanUpBoard({board: board, shapeCoordinate: shape});
        expect(result).toEqual(expected);
      });
})


const  testUpdateBoardCases = [
    {
        name: 'Move square down',
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        shape: [
            {"row": 1, "col": 0, "value":"粽"},
            {"row": 1, "col": 1, "value":"粽"},
            {"row": 2, "col": 0, "value":"粽"},
            {"row": 2, "col": 1, "value":"粽"},
        ],
        expected:
    {
        newBoard: [
            [0, 0, 0],
            ["粽", "粽", 0],
            ["粽", "粽", 0]
        ],
        shapePos:[
          {"row": 1, "col": 0, "value":"粽"},
          {"row": 1, "col": 1, "value":"粽"},
          {"row": 2, "col": 0, "value":"粽"},
          {"row": 2, "col": 1, "value":"粽"}]
    }
},
    {
        name: 'update the board without an activity provided',
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        shape: [
          {"row": 0, "col": 0, "value": "粽"},
          {"row": 0, "col": 1, "value": "粽"},
          {"row": 1, "col": 0, "value": "粽"},
          {"row": 1, "col": 1, "value": "粽"}
        ],
        activity: "",
        expected:     {
            newBoard: [
                ["粽", "粽", 0],
                ["粽", "粽", 0],
                [0, 0, 0]
            ],
            shapePos:[
                {"row": 0, "col": 0, "value": "粽"},
                {"row": 0, "col": 1, "value": "粽"},
                {"row": 1, "col": 0, "value": "粽"},
                {"row": 1, "col": 1, "value": "粽"}]
        }
    },
    {
        name: 'Move square right',
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        shape: [
            {"row": 0, "col": 1, "value": "粽"},
            {"row": 0, "col": 2, "value": "粽"},
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 1, "col": 2, "value": "粽"},
        ],
        activity: "ArrowRight",
        expected:
        {
            newBoard: [
                [0, "粽", "粽"],
                [0, "粽", "粽"],
                [0, 0, 0]
            ],
            shapePos:[
            {"row": 0, "col": 1, "value": "粽"},
            {"row": 0, "col": 2, "value": "粽"},
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 1, "col": 2, "value": "粽"},
        ]
        }
    },
    {
        name: 'Move s-shape left without moving other shapes in the board',
        board: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, "粽", "粽"],
        ],
        shape: [
            {"row": 0, "col": 2, "value": "粽"},
            {"row": 0, "col": 3, "value": "粽"},
            {"row": 1, "col": 2, "value": "粽"},
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 2, "col": 2, "value": "粽"},
        ],
        activity: "ArrowLeft",
        expected: {
        newBoard: [
            [0, 0, "粽", "粽"],
            [0, 0, "粽", 0],
            [0, "粽", "粽", 0],
            [0, 0, "粽", "粽"],
          ],
          shapePos:[
            {"row": 0, "col": 2, "value": "粽"},
            {"row": 0, "col": 3, "value": "粽"},
            {"row": 1, "col": 2, "value": "粽"},
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 2, "col": 2, "value": "粽"},
        ]
        }
    },
]


describe('test the board can be updated given a activity', ()=>{
    test.each(testUpdateBoardCases)('$name', ({name, board, shape, expected}) => {
        const { newBoard, shapePos }  = updateBoard({board: board, newShape:shape});
        expect(newBoard).toEqual(expected.newBoard);
        expect(shapePos).toEqual(expected.shapePos);
      });
})
