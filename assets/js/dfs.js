//depth first search of tree of treeNodes
function dfs(tree, path) {
    if (tree.x === size - 1 && tree.y === size - 1) {
        path.push([tree.y, tree.x])
        return true;
    }
    //if we reach a dead end, return null
    if (tree.left === null && tree.right === null && tree.up === null && tree.down === null) {
        //if we are not at the end of the maze, return false
        return false;
    }
    //left child
    if (tree.left !== null) {
        if (dfs(tree.left, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //right child
    if (tree.right !== null) {
        if (dfs(tree.right, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //up child
    if (tree.up !== null) {
        if (dfs(tree.up, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //down child
    if (tree.down !== null) {
        if (dfs(tree.down, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }

    return false


}

function runDfs() {
    //if mazeTree is null, alert
    if (mazeTree === null) {
        alert("Please generate a maze first!");
    } else {
        path = []
        returned = dfs(mazeTree, path);
        //if path is null, alert
        if (path === null) {
            alert("No path found!");
        } else {
            //iterate over path in reverse
            drawPath(path);
        }
    }

}