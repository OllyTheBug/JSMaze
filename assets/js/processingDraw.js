function startSketch() {
    var sketch = function (p) {

        var x = 100;
        var y = 100;
        var w = 466;
        var h = 466;

        p.setup = function () {
            $('#canvasModal').modal('show')
            //wait until modal is shown
            setTimeout(function () {
                //if canvas already exists inside #canvasDiv, remove it
                if ($('#canvasDiv').children().length > 0) {
                    $('#canvasDiv').children().remove();
                }
                //set frameRate to 5
                p.frameRate(5);
                let c = p.createCanvas(w, h);
                c.parent('#canvasDiv');
                c.style('width', '100%');
                c.style('height', '100%');
                setTimeout(function () {
                    runDfsP5JS();
                }, 500);
            }, 200);



        };

        p.draw = function () {
            //get the width of the canvas
            let w = $('#canvasDiv').width();
            //cell width is w/size
            let cellWidth = w / size;
            p.background(255);
            p.fill(255);
            //black stroke
            p.stroke(0);
            //stroke weight is 2
            p.strokeWeight(2);

            // for y,x in cells
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    //if cell has a top wall
                    if (cells[y][x].walls.top) {
                        p.line(x * cellWidth, y * cellWidth, (x + 1) * cellWidth, y * cellWidth);
                    }
                    //if cell has a left wall
                    if (cells[y][x].walls.left) {
                        p.line(x * cellWidth, y * cellWidth, x * cellWidth, (y + 1) * cellWidth);
                    }
                    //if cell has a right wall
                    if (cells[y][x].walls.right) {
                        p.line((x + 1) * cellWidth, y * cellWidth, (x + 1) * cellWidth, (y + 1) * cellWidth);
                    }
                    //if cell has a bottom wall
                    if (cells[y][x].walls.bottom) {
                        p.line(x * cellWidth, (y + 1) * cellWidth, (x + 1) * cellWidth, (y + 1) * cellWidth);
                    }
                }

                //draw cell
                //p.rect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);


            }

        };


        function colorCellp5(y, x, color) {
            let w = $('#canvasDiv').width();
            let cellWidth = w / size;
            p.fill(color);
            p.rect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        }

    };

    var myp5 = new p5(sketch);
}
/* ------------------------- P5js utility functions ------------------------- */
//color cell



//depth first search of tree of treeNodes
function dfsP5JS(tree, path) {
    if (tree.x === size - 1 && tree.y === size - 1) {
        path.push([tree.y, tree.x])
        return true;
    }
    //if we reach a dead end, return null
    if (tree.left === null && tree.right === null && tree.up === null && tree.down === null) {
        //if we are not at the end of the maze, return false
        colorCellp5(tree.y, tree.x, '#ff9999');
        return false;
    }
    //left child
    if (tree.left !== null) {
        if (dfsP5JS(tree.left, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //right child
    if (tree.right !== null) {
        if (dfsP5JS(tree.right, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //up child
    if (tree.up !== null) {
        if (dfsP5JS(tree.up, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //down child
    if (tree.down !== null) {
        if (dfsP5JS(tree.down, path) === true) {
            path.push([tree.y, tree.x]);
            return true;
        }
    }
    //color cell red
    colorCellp5(tree.y, tree.x, '#ff9999');
    return false


}

function runDfsP5JS() {
    //if mazeTree is null, alert
    if (mazeTree === null) {
        alert("Please generate a maze first!");
    } else {
        path = []
        returned = dfsP5JS(mazeTree, path);
        //if path is null, alert
        if (path === null) {
            alert("No path found!");
        } else {
            //iterate over path in reverse
            drawPath(path);
        }
    }

}