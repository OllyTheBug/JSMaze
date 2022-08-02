/* -------------------------------------------------------------------------- */
/*                              Globals                              */
/* -------------------------------------------------------------------------- */
var size = 10;
var mazeTree = null;
var path = null;

/* -------------------------------------------------------------------------- */
/*                              Configure webpage                             */
/* -------------------------------------------------------------------------- */
//get slider and maze container
let mazeBox = document.getElementById('mazeBox');
let slider = document.getElementById('slider');
drawBorder(generateCellArray(false, size));
//when slider is changed
slider.oninput = function () {
    //set size to slider value casted to int
    size = parseInt(slider.value);
    // clear maze
    mazeBox.innerHTML = '';
    // set style   grid-template-columns: repeat(size, 1fr);
    //redraw border
    mazeBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawBorder(generateCellArray(false, size));
    //update sizeText to Size: size
    document.getElementById('sizeText').innerHTML = `Size: ${size}`;
}
//get #mazeBox element



/* -------------------------------------------------------------------------- */
/*                              Shared functions                              */
/* -------------------------------------------------------------------------- */



function generateCellArray(defaultWalls = true, size) {
    cells = []
    //for x from 0 to size
    for (let y = 0; y < size; y++) {
        cells[y] = []
        //for y from 0 to size
        for (let x = 0; x < size; x++) {
            //add cell object with x,y,walls,visited,parent
            cells[y][x] = {
                x: x,
                y: y,
                walls: {
                    top: defaultWalls,
                    right: defaultWalls,
                    bottom: defaultWalls,
                    left: defaultWalls
                },
                visited: false,
                parent: null
            }
        }
    }
    return cells
}

function buildHTMLGrid(cells) {
    //get MazeBox div
    let mazeBox = document.getElementById('mazeBox');
    //delete old maze
    mazeBox.innerHTML = '';
    //create grid of cells
    // for row in cells
    for (let row = 0; row < cells.length; row++) {
        for (let col = 0; col < cells[row].length; col++) {
            //create cell
            let cell = document.createElement('div');
            //set class to cell
            cell.className = 'cell';
            //set id to cell
            cell.id = `${row}-${col}`;
            //set style to cell
            cell.style.top = `${row * 20}px`;
            cell.style.left = `${col * 20}px`;
            //cell.style.borderRadius = '15px';
            //set border based on cell.walls
            if (cells[row][col].walls.top) {
                cell.style.borderTop = 'solid black 1px';
            }
            if (cells[row][col].walls.left) {
                cell.style.borderLeft = 'solid black 1px';
            }
            if (cells[row][col].walls.right) {
                cell.style.borderRight = 'solid black 1px';
            }
            if (cells[row][col].walls.bottom) {
                cell.style.borderBottom = 'solid black 1px';
            }
            //append cell to mazeBox every 0.1 seconds
            mazeBox.appendChild(cell);
            //wait for 0.1 seconds

        }

    }

}

class treeNode {
    constructor(y, x) {
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
        this.up = null;
        this.down = null;
    }
}

//recursive function cellsToTree(cells) that takes in a 2D array of cells and returns a tree of cells with each open wall leading to a child cell
function cellsToTree(cells, y, x, lastDirection) {
    //create new tree node
    let node = new treeNode(y, x);
    //if cells[y][x] has an open left wall
    if (cells[y][x].walls.left === false && lastDirection !== 'right') {
        node.left = cellsToTree(cells, y, x - 1, 'left');
    }
    //if cells[y][x] has an open bottom wall
    if (cells[y][x].walls.bottom === false && lastDirection !== 'up') {
        node.down = cellsToTree(cells, y + 1, x, 'down');
    }
    //if cells[y][x] has an open right wall
    if (cells[y][x].walls.right === false && lastDirection !== 'left') {
        node.right = cellsToTree(cells, y, x + 1, 'right');
    }
    //if cells[y][x] has an open top wall
    if (cells[y][x].walls.top === false && lastDirection !== 'down') {
        node.up = cellsToTree(cells, y - 1, x, 'up');
    }
    //return tree
    return node;

}

function drawBorder(cells) {
    //draw left border along left side of grid
    for (let y = 0; y < size; y++) {
        cells[y][0].walls.left = true;
    }
    //draw right border along right side of grid
    for (let y = 0; y < size; y++) {
        cells[y][size - 1].walls.right = true;
    }
    //draw top border along top side of grid
    for (let x = 0; x < size; x++) {
        cells[0][x].walls.top = true;
    }
    //draw bottom border along bottom side of grid
    for (let x = 0; x < size; x++) {
        cells[size - 1][x].walls.bottom = true;
    }
    //draw grid
    buildHTMLGrid(cells);
}

function drawPath(path) {
    //for pair from 0 to path.length
    for (let i = 0; i < path.length; i++) {
        let x = path[i][1];
        let y = path[i][0];
        let cellID = `${y}-${x}`;
        let cell = document.getElementById(cellID);
        cell.style.backgroundColor = '#00ff00';
    }
    if (size === 1) {
        document.getElementById('0-0').innerHTML = '<h1 style="position:relative;top:40%;font-size: 85px;" class="text-center text-dark">(ಠ ͜ʖ ಠ)</h1>';
    }

}