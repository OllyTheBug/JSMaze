function wallFollower(maze){
    //start at top left corner
    let x = 0;
    let y = 0;
    //if cell has a left border
    if (maze[y][x].walls.left) {
        //
    }

}

function runWallFollower(){
        if (maze === null) {
            alert("Please generate a maze first!");
        } else {

            path = wallFollower(maze);
            //if path is null, alert
            if (path === null) {
                alert("No path found!");
            } else {
                //iterate over path in reverse
                drawPath(path);
            }
        }

}