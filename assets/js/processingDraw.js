let myp5 = null;
function startSketch() {
    myp5 = new p5(sketch);
}

var sketch = function (p) {

    var x = 100;
    var y = 100;
    var w = 466;
    var h = 466;
    // current path stack
    var currentPath = [];

    p.getPath = function () {
        return currentPath;
    }
    p.pushToPath = function (node) {
        currentPath.push(node);
    }
    p.popFromPath = function () {
        currentPath.pop();
    }

    p.setup = function () {
        $('#canvasModal').modal('show')
        //wait until modal is shown
        setTimeout(function () {
            //if canvas already exists inside #canvasDiv, remove it
            if ($('#canvasDiv').children().length > 0) {
                $('#canvasDiv').children().remove();
            }
            //set frameRate to 5
            p.frameRate(0.5);
            let c = p.createCanvas(w, h);
            c.parent('#canvasDiv');
            c.style('width', '100%');
            c.style('height', '100%');
            p.noLoop();
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
    };


    p.colorCellp5 = function (y, x, color) {
        let w = $('#canvasDiv').width();
        let cellWidth = w / size;
        p.fill(color);
        p.noStroke()
        p.rect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

};



/* ------------------------- P5js utility functions ------------------------- */
