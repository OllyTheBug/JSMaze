function generateCellArray(defaultWalls = true, size) {
    cells = []
    //for x from 0 to size
    for (let x = 0; x < size; x++) {
        cells[x] = []
        //for y from 0 to size
        for (let y = 0; y < size; y++) {
            //add cell object with x,y,walls,visited,parent
            cells[x][y] = {
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

function buildHTMLGrid(cells){
    //get MazeBox div
    let mazeBox = document.getElementById('mazeBox');
    //delete old maze
    mazeBox.innerHTML = '';
    //create grid of cells
    // for row in cells
    for (let row = 0; row < cells.length; row++) {
        for(let col = 0; col < cells[row].length; col++){
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

function drawBorder(cells){
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