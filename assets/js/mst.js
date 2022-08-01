
// create size*size array of cell objects

size = 10

function buildATree(adjacencyMatrix) {
    nodeCount = adjacencyMatrix.length
    let Q = []
    let keys = []
    let parents = []
    let visited = []
    for (let i = 0; i < nodeCount; i++) {
        Q.push(i)
        parents.push(-1)
        keys.push(1000)
        visited.push(-1)
    }
    keys[0] = 0
    //while Q isn't empty
    while (Q.length > 0) {
        //get minimum key
        let min = 1000
        let minIndex = 0
        for (let i = 0; i < Q.length; i++) {
            if (keys[Q[i]] < min) {
                min = keys[Q[i]]
                minIndex = i
            }
        }
        //remove min from Q
        let minNode = Q.splice(minIndex, 1)
        //add min to visited
        visited.push(minNode[0])
        //for each neighbor of min
        for (let i = 0; i < nodeCount; i++) {
            if (adjacencyMatrix[minNode[0]][i] != -1) {
                //if neighbor is not visited
                if (visited.indexOf(i) == -1) {
                    u_v = adjacencyMatrix[minNode[0]][i]
                    //if u_v < key[v]
                    if (u_v < keys[i]) {
                        //set key[v] = u_v
                        keys[i] = u_v
                        //set parent[v] = u
                        parents[i] = minNode[0]
                    }


                }
            }
        }
    }
    return parents;

}

function generateGridAdjacencyMatrix(size) {
    //create and adjacency matrix of size*size where nodes are connected if they are neighbors with random weights, and -1 if not
    let adjacencyMatrix = [];
    for (let y = 0; y < size * size; y++) {
        adjacencyMatrix[y] = [];
        for (let x = 0; x < size * size; x++) {
            adjacencyMatrix[y][x] = -1;
            //set neighbors if cell is not on edge
            //if not on left edge
        }
    }
    //Set random weights between neighboring nodes
    nodeCount = size * size
    for (let node = 0; node < nodeCount; node++) {
        let neighbors = []
        //get neighbors of node
        //if not not on left edge, add left neighbor
        if (node % size != 0) {
            neighbors.push(node - 1);
        }
        //if not on top edge, add top neighbor
        if (node >= size) {
            neighbors.push(node - size);
        }
        //if not on right edge, add right neighbor
        if (node % size != size - 1) {
            neighbors.push(node + 1);
        }
        //if not on bottom edge, add bottom neighbor
        if (node < size * size - size) {
            neighbors.push(node + size);
        }
        //randomize weights between node and each neighbor
        for (let i = 0; i < neighbors.length; i++) {
            adjacencyMatrix[node][neighbors[i]] = Math.floor(Math.random() * 50);
        }


    }
    return adjacencyMatrix;
}

function openWallsByParent(parents, cells, size) {
    //for each parent
    for (let i = 1; i < parents.length; i++) {
        let parent_x = i % size
        let parent_y = Math.floor(i / size)
        let child_x = parents[i] % size
        let child_y = Math.floor(parents[i] / size)

        //if child is to the right of parent
        if (child_x > parent_x) {
            //open right wall
            cells[parent_y][parent_x].walls.right = false;
            //open left wall of child
            cells[child_y][child_x].walls.left = false;
        }
        //if child is to the left of parent
        if (child_x < parent_x) {
            //open left wall
            cells[parent_y][parent_x].walls.left = false;
            //open right wall of child
            cells[child_y][child_x].walls.right = false;
        }
        //if child is below parent
        if (child_y > parent_y) {
            //open bottom wall
            cells[parent_y][parent_x].walls.bottom = false;
            //open top wall of child
            cells[child_y][child_x].walls.top = false;
        }
        //if child is above parent
        if (child_y < parent_y) {
            //open top wall
            cells[parent_y][parent_x].walls.top = false;
            //open bottom wall of child
            cells[child_y][child_x].walls.bottom = false;
        }
    }
    return cells;
}




//main function to generate maze
function generateMazeMST() {
    //create array of cells
    let cells = generateCellArray(true, size);
    let adjacencyMatrix = generateGridAdjacencyMatrix(size);
    let parents = buildATree(adjacencyMatrix);
    cells = openWallsByParent(parents, cells, size);
    buildHTMLGrid(cells);
    console.log('adjacency matrix:');

}