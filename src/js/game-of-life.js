var canvas;			
var stage;			
var messageField;
var inputDialog;
var inputGrid;
var inputGridCells = [];		
var inputGridRows = 10;
var inputGridCols = 10;
var DIALOG_BG_COLOR = "#ffffff";
var LIVE_CELL_COLOR = "#ffffff";
var DEAD_CELL_COLOR = "#000000";
var CELL_WIDTH = 40;
var font = "Arial"
var gameGrid;
var gameGridCells = [];

function init() {
    console.trace('init');
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	messageField = new createjs.Text("Welcome! Click to play", `bold 24px ${font}`, "#FFFFFF");
    messageField.maxWidth = 1000;
    textCenterAlign(messageField);
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
    stage.update(); 	
    canvas.onclick = handleClick;
}

function handleClick() {
    console.trace('handleClick');
    canvas.onclick = null;
    stage.removeChild(messageField);
    initDialog();
    stage.addChild(inputGrid);
    stage.update();
}

function initDialog()
{
    var pad_x = 2;
    var pad_y = 3;
    var text_pad = 1.7;

    var cell_width = CELL_WIDTH;
    inputGrid = new createjs.Container();
    var width = (inputGridRows+pad_x)*cell_width;
    var height = (inputGridCols+pad_y)*cell_width;
    var graphics = new createjs.Graphics().beginFill(DIALOG_BG_COLOR).drawRect(0, 0, width, height);
    var bg = new createjs.Shape(graphics);
    inputGrid.x = (canvas.width / 2 - width / 2);
    inputGrid.y = (canvas.height / 2 - height / 2);
    
    inputGrid.addChild(bg);
    fillInputGrid();
    
    var msg_string = `Click anywhere on the grid to create the initial generation. \n Then press any key to start game`;
    var msg = new createjs.Text(msg_string, `bold 15px ${font}`, "#000000");
    msg.maxWidth = 1000;
    textCenterAlign(msg);
	msg.x = width / 2;
    msg.y = (inputGridRows+text_pad)*cell_width;
    
    inputGrid.addChild(msg);
    document.addEventListener("keydown", startGame);
}

function startGame()
{
    console.trace('startGame');
    document.removeEventListener("keydown", startGame);
    stage.removeChild(inputGrid);
    initGameGrid();
    stage.addChild(gameGrid);
    setInterval(createNextGeneration, 100);    
    stage.update();
}

function fillInputGrid()
{
    console.trace('fillInputGrid');
    var cell_width = CELL_WIDTH;  
    var grid_x = cell_width;
    var grid_y = cell_width;
    fillCellArray(inputGridCells, inputGridRows, inputGridCols, cell_width, true);
    fillContainerWithCells(inputGrid, inputGridCells, { x : grid_x, y : grid_y }, cell_width);
}

function initGameGrid()
{
    var cell_width = CELL_WIDTH / 2;
    console.log({cell_width});
    rows = canvas.width/cell_width;
    cols = canvas.height/cell_width;
    fillCellArray(gameGridCells, rows, cols, cell_width);
    updateCellState(gameGridCells, inputGridCells);
    gameGrid = new createjs.Container();
    fillContainerWithCells(gameGrid, gameGridCells, { x : 0, y : 0 }, cell_width);
}

function updateGridCells(styles) {
    var w,h;
    gameGridCells.forEach((row, i) => {
        row.forEach((cell, j) => {
            [w, h] = [cell.graphics.instructions[1].w, cell.graphics.instructions[1].h] 
            cell.graphics.clear();
            cell.graphics.beginFill(styles[i][j]).drawRect(0, 0, w, h);
        });
    });
    stage.update();
}

function createNextGeneration() {
    console.trace("nextGen");
    var nextGenStyle = [];
    gameGridCells.forEach((row, i) => {
        genRow = []
        row.forEach((cell, j) => {
            genRow.push(newColor(cell, i, j));
        });
        nextGenStyle.push(genRow);
    });
    updateGridCells(nextGenStyle);
}

function newColor(cell, ir, ic) {
    var rows = gameGridCells.length;
    var cols = gameGridCells[0].length;
    coords = {start: {x: ir-1, y: ic-1}, end: {x: ir+1, y: ic+1}};
    
    if (coords.start.x < 0)
        coords.start.x = 0;
    if (coords.start.y < 0)
        coords.start.y = 0;
    if (coords.end.x >= rows)
        coords.end.x = rows-1;
    if (coords.end.y >= cols)
        coords.end.y = cols-1;

    var liveCount = 0;
    for(var i = coords.start.x; i<=coords.end.x; i++) {
        for(var j = coords.start.y; j<=coords.end.y; j++) {
            if (i == ir && j == ic)
                continue;
            if (gameGridCells[i][j].graphics.instructions[2].style == LIVE_CELL_COLOR) {
                liveCount = liveCount+1;
            }
        }
    }
    
    if (liveCount > 3 || liveCount < 2)
        return DEAD_CELL_COLOR;
    else if (liveCount == 3)  
        return LIVE_CELL_COLOR;
    else 
        return cell.graphics.instructions[2].style;
}