import { useEffect, useState } from "react";

export function createLShape1(): number[][]{
    return [[1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]];
};
export function createLShape2(): number[][]{
    return [[0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ];
};
export function createLShape3(): number[][]{
    return [[0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ];
};
export function createLShape4(): number[][]{
    return [[0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ];
};


//the S shape family
export function createSShape1(): number[][]{
    return [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ]; 
}
export function createSShape2(): number[][]{
    return [[0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
            ]; 
}
export function createSShape3(): number[][]{
    return [[0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
            ]; 
}
export function createSShape4(): number[][]{
    return [[0, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
            ]; 
}

//the Z shape
export function createZShape1(): number[][]{
    return [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]

    ]; 
}
export function createZShape2(): number[][]{
    return [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]

    ]; 
}
export function createZShape3(): number[][]{
    return [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]

    ]; 
}
export function createZShape4(): number[][]{
        return [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]

        ]; 
}
//the J shape
export function createJShape1(): number[][]{
    return [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
        ]
};
export function createJShape2(): number[][]{
    return [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
        ]
};
export function createJShape3(): number[][]{
    return [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
        ]
};
export function createJShape4(): number[][]{
    return [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
        ]
};
//the O shape
export function createSquareShape1(): number[][]{
    return [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],

        ]; 
}

//The I shape family
export function createIShape1(): number[][]{
    return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
        ]; 
}
export function createIShape2(): number[][]{
    return [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        ]; 
}

//The T shape family
export function createTShape1(): number[][]{
    return [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ]
};
export function createTShape2(): number[][]{
    return [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
        ]
};
export function createTShape3(): number[][]{
    return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ]
};
export function createTShape4(): number[][]{
    return [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
        ]
};
const allShapesFunctions = [
    //L shape family
    "createLShape1",
    "createLShape2",
    "createLShape3",
    "createLShape4", 
    //S shape family,
    "createSShape1",
    "createSShape2",
    "createSShape3",
    "createSShape4",
    //T shape family,
    "createTShape1",
    "createTShape2",
    "createTShape3",
    "createTShape4",
    //I shape family
    "createIShape1",
    "createIShape2",
    //J shape family
    "createJShape1",
    "createJShape2",
    "createJShape3",
    "createJShape4",
    //Z shape family
    "createZShape1",
    "createZShape2",
    "createZShape3",
    "createZShape4",
    //O shape family
    "createSquareShape1",
]

const shapeRegistry: { [key: string]: () => number[][] } = {
    //L shape family
    createLShape1,
    createLShape2,
    createLShape3,
    createLShape4,
    //S shape family
    createSShape1,
    createSShape2,
    createSShape3,
    createSShape4,
    //T shape family
    createTShape1,
    createTShape2,
    createTShape3,
    createTShape4,
    //I shape family
    createIShape1,
    createIShape2,
    //J shape family,
    createJShape1,
    createJShape2,
    createJShape3,
    createJShape4,
    //Z shape family
    createZShape1,
    createZShape2,
    createZShape3,
    createZShape4,
    //O shape family
    createSquareShape1,
}


function generateRandomCharacter(charArr: string[]): string {
    const lengthOfArray = charArr.length;
    const randomElement = charArr[Math.floor(Math.random() * lengthOfArray)];
    return randomElement;
}

function addCharacterToShape(charArr: string[], shape: number[][]): (string | number)[][] {
    const shapeWithCharacter: (string | number)[][] = shape.map(row => [...row]);

    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] === 1) {
                var character = generateRandomCharacter(charArr);
                shapeWithCharacter[i][j] = character;
            }
        }
    }
    return shapeWithCharacter;
}


export function loadWords() {
  const [words, setWords] = useState<any[]>([]);

  useEffect(() => {
    fetch("/words.json")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error("Error loading words.json:", err));
  }, []); // runs once on mount

  return words;
}

export function randomShapeGenerator(words: any[]): (string | number)[][] {
    let randomShape:string = allShapesFunctions[Math.floor(Math.random() * allShapesFunctions.length)];
    const fn = shapeRegistry[randomShape];
    var shape = fn();
    const updatedShape = addCharacterToShape(words, shape);
    return updatedShape;
}
