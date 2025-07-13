import { describe, expect, test } from 'vitest';
import { computeBorder } from '../util';

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