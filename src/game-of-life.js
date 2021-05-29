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
    
function textCenterAlign(text)
{
    text.textAlign = "center";
	text.textBaseline = "middle";
}
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
    stage.removeChild(inputGrid);
    stage.update();
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

function fillInputGrid()
{
    console.trace('fillInputGrid');
    var cell_width = CELL_WIDTH;  
    var grid_x = cell_width;
    var grid_y = cell_width;
    fillCellArray();
    inputGridCells.forEach((row, i) => {
        row.forEach((cell, j) => {
            cell.x = grid_x + cell_width*i; 
            cell.y = grid_y + cell_width*j;
            inputGrid.addChild(cell);
        });
    });
}

//fill container with cells
//click event on cells
//prompt submit facility
//display cell pattern on screen