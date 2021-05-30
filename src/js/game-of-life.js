var canvas;			
var stage;			
var messageField;
var inputDialog;
var inputGrid;
var inputGridCells = [];		
var inputGridRows = 54;
var inputGridCols = 29;
var DIALOG_BG_COLOR = "#ffffff";
var LIVE_CELL_COLOR = "#ffffff";
var DEAD_CELL_COLOR = "#00004d";
var CELL_WIDTH = 20;
var GAME_CELL_WIDTH = 15;
var font = "Courier"
var gameGrid;
var gameGridCells = [];
var NEXT_GEN_TIME = 0;
var intervalId;
var resetField;
var stopField;
var saveInitial = [];

var populationField;
var population = 0;
var iterField;
var iterCount = 1;

function init() {
    console.trace('init');
	canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    fillText();
	stage.update(); 	
    canvas.onclick = handleClick;
}

function fillText()
{
    var messageField = new createjs.Text("Welcome to the Game of Life! Click to play", `bold 28px ${font}`, LIVE_CELL_COLOR);
    messageField.maxWidth = 1000;
    messageField.shadow = new createjs.Shadow(LIVE_CELL_COLOR, 0, 0, 5);
    
    gameIntroStr = "The Game of Life is a cellular automation,\n"  
    + "and was invented by Cambridge mathematician John Conway. It consists of a\n"
    + "collection of cells which, based on a few mathematical rules, can live, die\n"
    + "or multiply. Depending on the initial conditions, the cells form various patterns\n"
    + "throughout the course of the game. ";
    var gameIntro = new createjs.Text(gameIntroStr, `18px Verdana`, LIVE_CELL_COLOR);

    var rulesTitle = new createjs.Text("Rules", `bold 24px ${font}`, LIVE_CELL_COLOR);
    rulesTitle.shadow = new createjs.Shadow(LIVE_CELL_COLOR, 0, 0, 5);
    
    rulesStr = "1. Each cell with one or no neighbors dies, as if by solitude.\n\n" 
    + "2. Each cell with four or more neighbors dies, as if by overpopulation.\n\n" 
    + "3. Each cell with two or three neighbors survives.\n";

    var rules = new createjs.Text(rulesStr, `18px Verdana`, LIVE_CELL_COLOR);

    textCenterAlign(messageField);
	textCenterAlign(gameIntro);
    textCenterAlign(rulesTitle);
    textCenterAlign(rules);
    
    var x, y;
    [x, y] = [canvas.width / 2, canvas.height / 2 - 200];
    placeText(messageField,x,y);  
    placeText(gameIntro,x,y+50);  
    placeText(rulesTitle,x,y+185);  
    placeText(rules,x,y+220);  
    //messageField.y = canvas.height / 2 - 200;
    stage.addChild(messageField);
    stage.addChild(gameIntro);
    stage.addChild(rulesTitle);
    stage.addChild(rules);
}

function fillPopulationText()
{
    iterField = new createjs.Text(`Generation: ${iterCount}`, `22px ${font}`, LIVE_CELL_COLOR);
    placeText(iterField,0,0);  
    stage.addChild(iterField);
}

function updateGen()
{
    iterField.text =  `Generation: ${iterCount}`;
    stage.update();
}

function fillInstructionText()
{
    resetField = new createjs.Text(`Press R to Restart`, `22px ${font}`, LIVE_CELL_COLOR);
    //resetField.shadow = new createjs.Shadow(LIVE_CELL_COLOR, 0, 0, 3);
    stopField = new createjs.Text(`Press P to Pause`, `22px ${font}`, LIVE_CELL_COLOR);
    var resumeField = new createjs.Text(`Press Q to Resume`, `22px ${font}`, LIVE_CELL_COLOR);
    //stopField.shadow = new createjs.Shadow(LIVE_CELL_COLOR, 0, 0, 3);
    placeText(stopField,0,5);  
    placeText(resumeField,0,25);  
    placeText(resetField,0,45);
    
    stage.addChild(resetField);
    stage.addChild(resumeField);
    stage.addChild(stopField);
}

function placeText(field, x, y)
{
    [field.x, field.y] = [x, y];
}

function handleClick() {
    console.trace('handleClick');
    canvas.onclick = null;
    stage.removeAllChildren();
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
    var graphics = new createjs.Graphics().beginFill(DIALOG_BG_COLOR).drawRoundRect(0, 0, width, height, 20, 20, 20, 20);
    var bg = new createjs.Shape(graphics);
    bg.shadow = new createjs.Shadow(LIVE_CELL_COLOR, 0, 0, 10);

    inputGrid.x = (canvas.width / 2 - width / 2);
    inputGrid.y = (canvas.height / 2 - height / 2);
    
    inputGrid.addChild(bg);
    fillInputGrid();
    
    var msg_string = `Click anywhere on the grid to create the initial generation. Then press any key to start game`;
    var msg = new createjs.Text(msg_string, `bold 18px ${font}`, DEAD_CELL_COLOR);
    //msg.shadow = new createjs.Shadow(DEAD_CELL_COLOR, 0, 0, 3);
    msg.maxWidth = 1000;
    textCenterAlign(msg);
	msg.x = width / 2;
    msg.y = (inputGridCols+text_pad)*cell_width + 10;
    
    inputGrid.addChild(msg);
    document.addEventListener("keydown", startGame);
}

function startGame()
{
    console.trace('startGame');
    document.removeEventListener("keydown", startGame);
    stage.removeAllChildren();
    initGameGrid();
    stage.addChild(gameGrid);
    fillInstructionText();
    //fillPopulationText();
    //document.addEventListener("keydown", createNextGeneration);
    document.addEventListener("keydown", instruction);
    intervalId = setInterval(createNextGeneration, NEXT_GEN_TIME);    
    stage.update();
}

function instruction(event) {
    switch (event.key)
    {
        case 'p':
            clearInterval(intervalId);
            break;
        case 'q':
            intervalId = setInterval(createNextGeneration, NEXT_GEN_TIME);
            break;
        case 'r':
            clearInterval(intervalId);
            gameGridCells = [];
            gameGrid = null;
            startGame();
            break;
    }
}
function fillInputGrid()
{
    console.trace('fillInputGrid');
    var cell_width = CELL_WIDTH;  
    var grid_x = cell_width;
    var grid_y = cell_width;
    fillCellArray(inputGridCells, inputGridRows, inputGridCols, cell_width, true, true);
    fillContainerWithCells(inputGrid, inputGridCells, { x : grid_x, y : grid_y }, cell_width);
}

function initGameGrid()
{
    var cell_width = GAME_CELL_WIDTH;
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
    iterCount++;
    //updateGen();
    var nextGenStyle = [];
    gameGridCells.forEach((row, i) => {
        genRow = [];
        row.forEach((cell, j) => {
            var color  = newColor(cell, i, j);
            genRow.push(color);
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
