
export function createLShape(): number[][]{
    return [[0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]];
};


export function createLShape2(): number[][]{
    return [[0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]];
};

export function createSquareShape(): number[][]{
    return [[1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]]; 
}

export function randomShapeGenerator(): number[][]{
    const all_shapes = ['left1', 'left2', 'square']
    let random_shape = all_shapes[Math.floor(Math.random() * all_shapes.length)];

    if (random_shape == "left1"){
        return createLShape()
    }
    else if (random_shape == "left2"){
        return createLShape2()
    }
    else {
        return createSquareShape()
    }

}