function recursiveDivider(fromX, fromY, toX, toY, cells) {
    // log arguments with labels
    console.log('recursiveDivider(FX:%s, FY:%s, TX:%s, TY:%s)', fromX, fromY, toX, toY);
    
    //if fromX is greater than toX, swap them
    if (fromX > toX) {
        let temp = fromX;
        fromX = toX;
        toX = temp;
    }
    //if fromY is greater than toY, swap them
    if (fromY > toY) {
        let temp = fromY;
        fromY = toY;
        toY = temp;
    }

    //base case - if the cell is too small, just return
    if (toX - fromX < 0 || toY - fromY < 0 || fromX < 0 || fromY < 0) {
        return
    }

    //pick horizontal or vertical
    let direction = -1;
    //if width is greater than height, pick vertical
    if (toX - fromX > toY - fromY) {
        //direction is vertical
        direction = 1
    }
    //elseif height is greater than width, pick horizontal
    else if (toY - fromY > toX - fromX) {
        //direction is horizontal
        direction = 0
    }
    //else, pick randomly
    else {
        let direction = Math.floor(Math.random() * 2);
    }
    //if horizontal
    if (direction == 0) {
        //pick a random y between fromY and toY
        let y = Math.floor(Math.random() * (toY - fromY)) + fromY;
        //add bottom walls to all cells between fromX and toX at y
        for (let x = fromX; x <= toX; x++) {
            cells[y][x].walls.top = true;
        }
        //remove bottom wall from random cell along the path
        //cells[y][Math.floor(Math.random() * (toX - fromX + 1)) + fromX].walls.bottom = false;
        //draw grid
        buildHTMLGrid(cells);
        //recursive call on left and right sides of y
        recursiveDivider(fromX, fromY, toX, y - 1, cells);
        recursiveDivider(fromX, y + 1, toX, toY, cells);

    } else {
        //pick random x 
        let x = Math.floor(Math.random() * (toX - fromX)) + fromX;

        //add right walls to all cells between fromY and toY at x
        for (let y = fromY; y <= toY; y++) {
            cells[y][x].walls.left = true;
        }
        //remove right wall from random cell along the path
        // cells[Math.floor(Math.random() * (toY - fromY + 1)) + fromY][x].walls.right = false;
        //draw grid
        buildHTMLGrid(cells);
        //recursive call on top and bottom sides of x
        recursiveDivider(fromX, fromY, x - 1, toY, cells);
        recursiveDivider(x + 1, fromY, toX, toY, cells);
    }

}



function buildRecursiveDivider() {
    cells = generateCellArray(false, size);
    drawBorder(cells);
    recursiveDivider(0, 0, size - 1, size - 1, cells);
}