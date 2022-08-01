function runSideWinder(cells) {
    //Start at the top left corner
    let x = 0
    let y = 0
    // if y=0, dig all the way to the right. First row is a special case.
    if (y === 0) {
        while (x < size) {
            cells[y][x].visited = true
            cells[y][x].walls.right = false
            x++
        }
        // move to the next row
        y++
        x = 0
    }
    // while we haven't reached the bottom
    while (y < size) {
        // while we haven't reached the right edge
        runSet = []
        //dig one cell to the right
        cells[y][x].walls.right = false
        // if not at the end of the row, remove left wall from the next cell
        if (x < size - 1) {
            cells[y][x + 1].walls.left = false
        }
        // add the cell to the run
        runSet.push(cells[y][x])
        //randomly decide to dig north
        let digNorth = Math.random() < 0.5
        // if we dig north
        if (digNorth) {
            // if we're not at the top
            if (y > 0) {
                //pick a random cell in the run
                let pick = Math.floor(Math.random() * runSet.length)
                //remove the wall between the picked cell and the cell above it
                runSet[pick].walls.top = false
                cells[y - 1][runSet[pick].x].walls.bottom = false


            }
        }
    }

    function sideWinder() {
        //generate cells with walls
        let cells = generateCellArray(true, size)
        // generate sideWinder
        runSideWinder(cells)
        //draw grid
        buildHTMLGrid(cells)
    }