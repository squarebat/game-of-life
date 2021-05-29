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

function createNextGeneration()
{
    var nextGenStyle = [];
    gameGridCells.forEach((row, i) => {
        row.forEach((cell, j) => {
            nextGenStyle.push(killOrRevive(cell, i, j));
        });
    });
}

function killOr
//fill container with cells
//click event on cells
//prompt submit facility
//display cell pattern on screen