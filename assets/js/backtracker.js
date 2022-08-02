
function recursiveBacktrack(x, y, cells) {
    //check if neighbors are visited, if not, visit them
    //check above
    cells[y][x].visited = true
    let picks = [0, 1, 2, 3]
    //while picks is not empty
    while (picks.length > 0) {
        //pick a random neighbor
        let pick = picks[Math.floor(Math.random() * picks.length)]

    
        switch (pick) {
            //if pick is 0, check above
            case 0:
                //remove 0 from picks
                picks.splice(picks.indexOf(0), 1)
                if (y > 0 && !cells[y - 1][x].visited) {
                    //remove top wall from current cell and bottom wall from neighbor
                    cells[y][x].walls.top = false
                    cells[y - 1][x].walls.bottom = false
                    recursiveBacktrack(x, y - 1, cells)
                }
                break;
            //if pick is 1, check right
            case 1:
                //remove 1 from picks
                picks.splice(picks.indexOf(1), 1)
                if (x < size - 1 && !cells[y][x + 1].visited) {
                    //remove right wall from current cell and left wall from neighbor
                    cells[y][x].walls.right = false
                    cells[y][x + 1].walls.left = false
                    recursiveBacktrack(x + 1, y, cells)
                }
                break;
            //if pick is 2, check below
            case 2:
                //remove 2 from picks
                picks.splice(picks.indexOf(2), 1)
                if (y < size - 1 && !cells[y + 1][x].visited) {
                    //remove bottom wall from current cell and top wall from neighbor
                    cells[y][x].walls.bottom = false
                    cells[y + 1][x].walls.top = false
                    recursiveBacktrack(x, y + 1, cells)
                }
                break;
            //if pick is 3, check left
            case 3:
                //remove 3 from picks
                picks.splice(picks.indexOf(3), 1)
                if (x > 0 && !cells[y][x - 1].visited) {
                    //remove left wall from current cell and right wall from neighbor
                    cells[y][x].walls.left = false
                    cells[y][x - 1].walls.right = false
                    recursiveBacktrack(x - 1, y, cells)
                }
                break;
        }
    }
    
    buildHTMLGrid(cells)
    
    return

}


function generateMazeBacktracking() {

    let cells = generateCellArray(true, size)
    buildHTMLGrid(cells)
    recursiveBacktrack(0, 0, cells)
    mazeTree = cellsToTree(cells, 0, 0, null);
}