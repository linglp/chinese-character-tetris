
export function createLShape(): number[][]{
    return [[1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]];
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

export function createTShape(): number[][]{
    return [[1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]]; 
}

export function createSShape(): number[][]{
    return [[0, 1, 1],
            [0, 1, 0],
            [1, 1, 0]]; 
}

export function createIShape(): number[][]{
    return [[1, 0, 0],
            [1, 0, 0],
            [1, 0, 0]]; 
}

export function createZShape(): number[][]{
    return [[1, 1, 0],
            [0, 1, 0],
            [0, 1, 1]]; 
}

export function randomShapeGenerator(): number[][]{
    const all_shapes = ['left1', 'left2', 'square', 's_shape', 't_shape', "i_shape", "z_shape"]
    let random_shape = all_shapes[Math.floor(Math.random() * all_shapes.length)];

    if (random_shape == "left1"){
        return createLShape()
    }
    else if (random_shape == "left2"){
        return createLShape2()
    }
    else if (random_shape == "t_shape"){
        return createTShape()
    }
    else if (random_shape == "s_shape"){
        return createSShape()
    }
    else if (random_shape == "i_shape"){
        return createIShape()
    }
    else if (random_shape == "z_shape"){
        return createZShape()
    }
    else {
        return createSquareShape()
    }

}