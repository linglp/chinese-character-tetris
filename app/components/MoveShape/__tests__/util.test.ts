import { describe, expect, test } from 'vitest';
import { computeBorder, findOccupant, ifOccupy, mapShapeToPositions, rotateShape, debugShapePosition, clearBoardCountScore, ifInBorder, makeWords, getUniqueObjectCounts} from '../util';

const testShapes = [
    {
      name: 'Square shapes',
      shape: [
       {"row": 1, "col": 1, value: "粽"},
       {"row": 1, "col": 2, value: "粽"},
       {"row": 2, "col": 1, value: "粽"},
       {"row": 2, "col": 2, value: "粽"},
      ],
      expected: [2, 2, 1, 1]
    },
    {
        name: 'S shape',
        shape: [
         {"row": 1, "col": 1, value: "粽"},
         {"row": 1, "col": 2, value: "粽"},
         {"row": 2, "col": 1, value: "粽"},
         {"row": 2, "col": 2, value: "粽"},
        ],
        expected: [2, 2, 1, 1]
    },
    {
        name: 'L shape',
        shape: [
         {"row": 2, "col": 1, value: "粽"},
         {"row": 3, "col": 1, value: "粽"},
         {"row": 4, "col": 1, value: "粽"},
         {"row": 4, "col": 2, value: "粽"},
        ],
        expected: [4, 2, 2, 1]
    },
    {
        name: 'L shape 2',
        shape: [
            {"row": 2, "col": 1, value: "粽"},
            {"row": 3, "col": 1, value: "粽"},
            {"row": 4, "col": 1, value: "粽"},
            {"row": 4, "col": 0, value: "粽"},
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
          [0, "粽", "粽"],
          [0, "粽", "粽"],
        ],
        shape: [
         {"row": 0, "col": 1, value: "粽"},
         {"row": 0, "col": 2, value: "粽"},
         {"row": 1, "col": 1, value: "粽"},
         {"row": 1, "col": 2, value: "粽"},
        ],
        expected: true
      },
      {
        name: 'the next square is going to collide with an existing square 2',
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [ "粽", "粽", 0],
          ["粽", "粽", 0],
        ],
        shape: [
         {"row": 1, "col": 1, value: "粽"},
         {"row": 1, "col": 2, value: "粽"},
         {"row": 2, "col": 1, value: "粽"},
         {"row": 2, "col": 2, value: "粽"},
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
         {"row": 2, "col": 1, "value": "粽"},
         {"row": 2, "col": 2, "value": "粽"},
         {"row": 3, "col": 1, "value": "粽"},
         {"row": 3, "col": 2, "value": "粽"},
        ],
        expected: false
      },
      {
        name: 'the next square is not going to collide with a shape',
        board: [
          [0, 0, 0, 0],
          [0, 0, "粽", 0],
          [0, 0, "粽", 0],
          [0, 0, "粽", "粽"],
        ],
        shape: [
         {"row": 2, "col": 0, "value": "粽"},
         {"row": 2, "col": 1, "value": "粽"},
         {"row": 3, "col": 0, "value": "粽"},
         {"row": 3, "col": 1, "value": "粽"},
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
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 1, "col": 2, "value": "粽"},
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 2, "col": 2, "value": "粽"},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, "粽", "粽"],
            [0, "粽", "粽"],
          ],
        expected: false, 
    },
    {
        name: "the next S shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 2, "col": 2, "value": "粽"},
            {"row": 3, "col": 1, "value": "粽"},
            {"row": 3, "col": 0, "value": "粽"},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, "粽", "粽"],
            [0, "粽", "粽"],
          ],
        expected: true, 
    },
    {
        name: "the next I shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 3, "col": 1, "value": "粽"},
            {"row": 4, "col": 1, "value": "粽"},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, "粽", "粽"],
            [0, "粽", "粽"],
          ],
        expected: true, 
    },
    {
        name: "the next L shape is going to collide with an existing square",
        shapeCoordinate: [
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 3, "col": 1, "value": "粽"},
            {"row": 3, "col": 2, "value": "粽"},
        ],
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            ["粽", "粽", 0],
            ["粽", 0, 0],
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
        name: "L shape is in border",
        //      col 0   col 1   col 2
        // row 0:  0      年      0
        // row 1:  0      圆      0
        // row 2:  0      子      糕
        nextShape: [
        {"row": 0, "col": 1,"value": "年"},
        {"row": 1,"col": 1,"value": "圆"},
        {"row": 2, "col": 1, "value": "子"},
        {"row": 2, "col": 2, "value": "糕"}
    ],
        rowLimit: 3, 
        colLimit: 3,
        expected: true, 
    },
    {
        name: "the current S shape is going to be in border",
        //     col 0   col 1   col 2
        // row 0:  0      0       0
        // row 1:  0      粽      粽
        // row 2:  粽     粽      0
        nextShape: [
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 1, "col": 2, "value": "粽"},
            {"row": 2, "col": 0, "value": "粽"},
            {"row": 2, "col": 1, "value": "粽"},
        ],
        rowLimit: 3, 
        colLimit: 3,
        expected: true, 
    },
    {
        name: "the current I shape is going to be out of border",
        //      col 0   col 1   col 2
        // row 0:  粽     0      0
        // row 1:  粽     0      0
        // row 2:  粽     0      0
        nextShape: [
            {"row": 0, "col": 0, "value": "粽"},
            {"row": 1, "col": 0, "value": "粽"},
            {"row": 2, "col": 0, "value": "粽"},
        ],
        rowLimit: 2, 
        colLimit: 5,
        expected: false, 
    },
    {
        name: "the current L shape is moving right and will be out of border",
        //       col 0   col 1   col 2
        // row 0:  0      0      0
        // row 1:  0      0      0
        // row 2:  0      0      粽
        // row 3:  0      0      粽
        // row 4:  0      粽     粽
        nextShape: [
            {"row": 2, "col": 2, "value": "粽"},
            {"row": 3, "col": 2, "value": "粽"},
            {"row": 4, "col": 2, "value": "粽"},
            {"row": 4, "col": 1, "value": "粽"},
        ],
        rowLimit: 10, 
        colLimit: 2,
        expected: false, 
    },
]
describe('test if the next shape is going to be in border', ()=>{
    test.each(testNextShapeInBorder)('$name', ({nextShape, rowLimit, colLimit, expected}) => {
        const result = ifInBorder({nextShape, rowLimit, colLimit})
        expect(result).toEqual(expected);
      });
})

const testShapeMatrix = [
    {
        name: "square shape",
        matrix: [
            [0, 0, 0],
            [0, "粽", "子"],
            [0, "粽", "子"],
        ],
        expected:[
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 1, "col": 2, "value": "子"},
            {"row": 2, "col": 1, "value": "粽"},
            {"row": 2, "col": 2, "value": "子"},
        ]
    },
    {
        name: "S shape",
        matrix: [
            [0, "粽", "子"],
            ["粽", "子", 0],
            [0, 0, 0],
        ],
        expected:[
            {"row": 0, "col": 1, "value": "粽"},
            {"row": 0, "col": 2, "value": "子"},
            {"row": 1, "col": 0, "value": "粽"},
            {"row": 1, "col": 1, "value": "子"},
        ]
    },
    {
        name: "L shape",
        matrix: [
            [0, "粽", 0],
            [0, "粽", 0],
            ["子", "子", 0],
        ],
        expected:[
            {"row": 0, "col": 1, "value": "粽"},
            {"row": 1, "col": 1, "value": "粽"},
            {"row": 2, "col": 0, "value": "子"},
            {"row": 2, "col": 1, "value": "子"},
        ]
    },
]
describe('test if shapes can be mapped to coordinates correctly', ()=>{
    test.each(testShapeMatrix)('$name', ({name, matrix, expected}) => {
        const result = mapShapeToPositions(matrix)
        expect(result).toEqual(expected);
      });
})


const testClearBoardCountScore = [
    {
        //all two rows should be cleared
        //one instance of 粽子 were found
        "board": [
            [0, 0, 0, 0, 0],
            ["粽", "子", "汤", "汤", "汤"],
            ["汤", "汤", "汤", "汤", "汤"],
            [0, 0, 0, 0, 0],
        ],
        "score": 0,
        "phrases": {
            "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
        },
        "expected": [
        20,
        [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
        ],
        [{word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."}]
        ]
    },
    {
        //all two rows should be cleared
        //and one row should be moved down by 1
        //two instances of 粽子 were found
        "board": [
            [0, 0, 0, 0, 0],
            ["粽", "子", "汤", "汤", "汤"],
            [0, "汤","汤", "汤", "汤"],
            ["粽", "子", "汤", "汤", "汤"],
            [0, 0, 0, 0, 0],
        ],
        "score": 10,
        "phrases": {
            "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
        },
        "expected": [
        30,
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, "汤", "汤", "汤", "汤"],
            [0, 0, 0, 0, 0],
        ], 
        [
            {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."},
            {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."},

        ]
        ]
    },
    {
        //one row should be moved down by 1
        //two instances of 粽子 were found
        "board": [
            [0, 0, 0, 0, 0],
            [0, 0, 0, "汤", "汤"],
            ["汤", "汤", 0, "汤", "汤"],
            ["粽", "子", "粽", "子", "汤"],
            ["汤", "汤", "汤", 0, 0]
        ],
        "score": 0,
        "phrases": {
            "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
        },
        "expected": [
        10,
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, "汤", "汤"],
            ["汤", "汤", 0, "汤", "汤"],
            ["汤", "汤", "汤", 0, 0]
        ],
        [
            {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."},

        ]
]
    }
]
describe('test if shape can be cleared correctly', ()=>{
    test.each(testClearBoardCountScore)('$name', ({board, score, phrases, expected}) => {
        const result = clearBoardCountScore(board, score, phrases)
        expect(result).toEqual(expected);
      });
})


const testWords: {
    name: string;
    array: (string | number)[];
    phrases: Record<string, string>;
    expected: {word: string, explanation: string}[];
}[] = [
    {
        name: "zong zi appears one time",
        array: ["粽", "子", "汤", "汤", "汤"],
        phrases: {
            "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
        },
        expected: [
            {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."}
        ]
    },
    {
    name: "zong zi appears three times",
    array: ["粽", "子", "粽", "子", "粽", "子"],
    phrases: {
        "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
    },
    expected: [
        {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."}
    ]
    },
    {
    name: "zong zi mixed with other random characters",
    array: ["粽", "子", "粽", "子", "粽", "糕", "糕", "糕", "元"],
    phrases: {
        "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
    },
    expected: [
        {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."}
    ]
    },
    {
    name: "multiple food items can be extracted",
    array: ["年", "年", "粽", "子", "粽", "糕", "糕", "糕", "元"],
    phrases: {
        "粽子": "A traditional Chinese rice dumpling wrapped in bamboo leaves.",
        "年糕": "Chinese New Year cake made from glutinous rice.",
    },
    expected: [
        {word: "年糕", explanation: "Chinese New Year cake made from glutinous rice."},
        {word: "粽子", explanation: "A traditional Chinese rice dumpling wrapped in bamboo leaves."}, 
    ]
    },

]
describe('test if words can be extracted correctly', ()=>{
    test.each(testWords)('$name', ({array, phrases, expected}) => {
        const result = makeWords(array, phrases)
        expect(result).toEqual(expected);
      });
})


const testUniqueWords = [
    [
        {
            name: "count unique objects in an array with two unique objects",
            array: 
            [
                {"粽子": "description 1"}, 
                {"粽子": "description 1"}, 
                {"汤圆": "description 2"}, 
                {"粽子": "description 1"},
            ],
            expected: [
                {object: {"粽子": "description 1"}, "count": 3},
                {object: {"汤圆": "description 2"}, "count": 1},
            ]
        },
    {
        name: "count unique objects in an array with three unique objects",
        array: 
        [
            {"粽子": "description 1"}, 
            {"粽子": "description 1"}, 
            {"汤圆": "description 2"}, 
            {"汤圆": "description 2"}, 
            {"粽子": "description 1"},
            {"年糕": "description 3"},
        ],
        expected: [
            {object: {"粽子": "description 1"}, "count": 3},
            {object: {"汤圆": "description 2"}, "count": 2},
            {object: {"年糕": "description 3"}, "count": 1},
        ]
    }
        
    ]
]
describe('test if unique objects can be counted correctly', ()=>{
    test.each(testUniqueWords)('$name', ({array, expected}) => {
        const result = getUniqueObjectCounts(array)
        expect(result).toEqual(expected);
      });
})


