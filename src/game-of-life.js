var canvas;			
var stage;			
var messageField;
var inputGrid;
var inputGridCells = [];		
var inputGridRows = 6;
var inputGridCols = 6;
var DIALOG_BG_COLOR = "#ffffff";
var LIVE_CELL_COLOR = "#ffffff";
var DEAD_CELL_COLOR = "#000000";
var CELL_WIDTH = 40;
    
function init() {
    console.trace('init');
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	messageField = new createjs.Text("Welcome! Click to play", "bold 24px Arial", "#FFFFFF");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.textBaseline = "middle";
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
    initInputGrid();
    stage.addChild(inputGrid);
    stage.update();
}

function initDialog()
{
    var cell_width = CELL_WIDTH;
    inputDialog = new createjs.Container();
    var width = (inputGridRows+2)*cell_width;
    var height = (inputGridCols+3)*cell_width;
    var graphics = new createjs.Graphics().beginFill(DIALOG_BG_COLOR).drawRect(0, 0, width, height);
    var bg = new createjs.Shape(graphics);
    inputDialog.x = (canvas.width / 2 - width / 2);
    inputDialog.y = (canvas.height / 2 - width / 2);
    inputDialog.addChild(bg);
    //initInputGrid();
    inputDialog.addChild(inputGrid);
}

function getRandomColor() {
    var letters = '456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
  

function createCell(live = false)
{
    var color = live ? LIVE_CELL_COLOR : DEAD_CELL_COLOR;
    var cell_width = CELL_WIDTH;
    var graphics = new createjs.Graphics().beginFill(color).drawRect(0, 0, cell_width, cell_width);
    var cell = new createjs.Shape(graphics);
    cell.addEventListener("click", updateCell);
    return cell;
}

function updateCell(event)
{
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

function fillCellArray()
{
    for (var i = 0; i < inputGridRows; i++)
    {
        var row = [];
        for (var j = 0; j< inputGridCols; j++)
        {
            row.push(createCell());
        }
        inputGridCells.push(row);
    }
}

function initInputGrid()
{
    var cell_width = CELL_WIDTH;
    var grid_width = inputGridRows*cell_width;
    var grid_height = inputGridCols*cell_width;
    var grid_x = (canvas.width / 2 - grid_width / 2);
    var grid_y = (canvas.height / 2 - grid_height / 2);
    inputGrid = new createjs.Container();
    [ inputGrid.x, inputGrid.y ]  = [ grid_x, grid_y ]; 
    fillCellArray();
    inputGridCells.forEach((row, i) => {
        row.forEach((cell, j) => {
            cell.x = cell_width*i; 
            cell.y = cell_width*j;
            inputGrid.addChild(cell);
        });
    });
}

//fill container with cells
//click event on cells
//prompt submit facility