function createCell(cell_width, addListener = false, live = false) {
    var color = live ? LIVE_CELL_COLOR : DEAD_CELL_COLOR;
    var graphics = new createjs.Graphics().beginFill(color).drawRect(0, 0, cell_width, cell_width);
    var cell = new createjs.Shape(graphics);
    if (addListener)
        cell.addEventListener("click", updateCell);
    return cell;
}

function updateCell(event) {
    var cell = event.target;
    var cell_width = CELL_WIDTH;
    var color = cell.graphics.instructions[2].style;
    cell.graphics.clear();
    cell.graphics.beginFill(DEAD_CELL_COLOR).drawRect(0, 0, cell_width, cell_width);
    if (color == DEAD_CELL_COLOR)
    {
        cell.graphics.clear();
        cell.graphics.beginFill(LIVE_CELL_COLOR).drawRect(0, 0, cell_width, cell_width);
    }
    stage.update();
}

function fillCellArray(cellArray, rows, cols, cell_width, addListener = false) {
    for (var i = 0; i < rows; i++)
    {
        var row = [];
        for (var j = 0; j< cols; j++)
        {
            row.push(createCell(cell_width, addListener));
        }
        cellArray.push(row);
    }
}

function fillContainerWithCells(container, cellArray, coords, cell_width) {
    cellArray.forEach((row, i) => {
        row.forEach((cell, j) => {
            cell.x = coords.x + cell_width*i; 
            cell.y = coords.y + cell_width*j;
            container.addChild(cell);
        });
    });
}

function updateCellState(cellArray1, cellArray2)
{
    var rows1, rows2, cols1 = 0, cols2 = 0;
    console.table(cellArray1[0][0].graphics.instructions);
    [rows1, rows2] = [cellArray1.length, cellArray2.length];
    if (rows1 > 0) cols1 = cellArray1[0].length; 
    if (rows2 > 0) cols2 = cellArray2[0].length; 
    x = Math.floor((rows1 - rows2) / 2);
    y = Math.floor((cols1 - cols2) / 2);
    if (x<0) x = 0;
    if (y<0) y = 0;
    
    var w = 0, h = 0;
    if (rows>0 && cols>0)
        [w, h] = [cellArray1[0][0].graphics.instructions[1].w, cellArray1[0][0].graphics.instructions[1].h] 
    cellArray2.forEach((row, i) => {
        row.forEach((cell, j) => { 
            cellArray1[x + i][y + j].graphics.clear(); 
            cellArray1[x + i][y + j].graphics.beginFill(cell.graphics.instructions[2].style).drawRect(0, 0, w, h);
        });
    });
}
