function runSideWinder(cells) {
    //Start at the top left corner
    let x = 0
    let y = 0
    // if y=0, dig all the way to the right. First row is a special case.
    if (y === 0) {
        while (x < size - 1) {
            cells[y][x].visited = true
            cells[y][x].walls.right = false
            cells[y][x + 1].walls.left = false
            x++
        }
        // move to the next row
        y++
        x = 0
    }
    //draw grid
    buildHTMLGrid(cells)
    // while we haven't reached the bottom
    while (y < size) {
        // while we haven't reached the right edge
        buildHTMLGrid(cells)
        let runSet = []
        while (x < size) {
            // add the cell to the run
            runSet.push(cells[y][x])


            //randomly decide to dig north
            let digNorth = Math.random() < 0.5
            // if we dig north
            if (digNorth || x === size - 1) {
                // if we're not at the top
                if (y > 0) {
                    //pick a random cell in the run
                    let pick = Math.floor(Math.random() * runSet.length)
                    //remove the wall between the picked cell and the cell above it
                    cells[y][runSet[pick].x].walls.top = false
                    cells[y - 1][runSet[pick].x].walls.bottom = false
                    //empty the run
                    runSet = []
                }
            }
            else{
            //dig one cell to the right
            cells[y][x].walls.right = false
            cells[y][x+1].walls.left = false
            }
            x++
            //draw grid
            
            buildHTMLGrid(cells)
        }
        // reset x
        x = 0
        // move to the next row
        y++
    }
}

function sideWinder() {
    //generate cells with walls
    let cells = generateCellArray(true, size)
    //border the cells
    drawBorder(cells)
    // generate sideWinder
    runSideWinder(cells)
    //draw grid
    buildHTMLGrid(cells)
    maze = cells
    mazeTree = cellsToTree(cells, 0, 0, null);
}