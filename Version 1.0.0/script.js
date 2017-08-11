var running = false;
var runner;
var pixelSize = 20;
var numRows = 50;
var numCols = 50;

function updatePixelSize() {
	pixelSize = Number(document.getElementById("pixelSizeInput").value);
	console.log(pixelSize);
	updateCanvasGrid();
}
function updateNumRows() {
	numRows = Number(document.getElementById("numRowsInput").value);
	console.log(numRows);
	updateCanvasGrid();
}
function updateNumCols() {
	numCols = Number(document.getElementById("numColsInput").value);
	console.log(numCols);
	updateCanvasGrid();
}

function updateCanvasGrid() {
	var gameCanvas = document.getElementById("game");

	gameCanvas.setAttribute("height",numRows*pixelSize);
	gameCanvas.style.height = ""+numRows*pixelSize/2+"px";

	gameCanvas.setAttribute("width",numCols*pixelSize);
	gameCanvas.style.width = ""+numCols*pixelSize/2+"px";

	/*for (var i = 0; i<numCols; i++) {
		for (var j = 0; j<numRows; j++) {
			fillSquare({x:i,y:j});
		}
	}*/
}


var grid;
var locs = [];

function fillSquare(loc) {
	var gameCanvas = document.getElementById("game");
	var ctx = gameCanvas.getContext('2d');
	var scaledLoc = {
		x:loc.x*pixelSize,
		y:loc.y*pixelSize
	}
	ctx.fillStyle = "#4488DD";
	ctx.strokeStyle = "#FFFFFF";
	//ctx.fillStyle = "#AACCFF";
	//ctx.strokeStyle = "#3377BB";
	//ctx.fillStyle = "#FFAAAA";
	//ctx.strokeStyle = "#FF5555";
	ctx.lineWidth = pixelSize/10;
	// x y reversed
	ctx.fillRect(scaledLoc.x,scaledLoc.y,pixelSize,pixelSize);
	ctx.strokeRect(scaledLoc.x,scaledLoc.y,pixelSize,pixelSize);
}
function gridSetup() {
	grid = [];
	for (var x = 0; x<numCols; x++) {
		var list = [];
		for (var y = 0; y<numRows; y++) {
			list.push(false);
		}
		grid.push(list);
	}
}
function randomFill(population) {
	clearCanvas()
	gridSetup();
	locs = [];
	for (var i = 0; i<population; i++) {
		var loc;
		do {
			loc = newLoc();
		} while (grid[loc.x][loc.y]);
		loc = {x:loc.x,y:loc.y};
		grid[loc.x][loc.y] = true;
		locs.push(loc);
		fillSquare(loc);
	}
}
function testFill() {
	clearCanvas();
	gridSetup();
	locs = [];
	for (var i = 0; i<3; i++) {
		var loc = {x:1,y:i};
		grid[1][i] = true;
		locs.push(loc);
		fillSquare(loc);
	}
}

function newLoc() {
	return {
		x: Math.floor(Math.random()*10),
		y: Math.floor(Math.random()*10)
	}
}

function toggleGame() {
	if (!running) {
		runGame(100);
	} else {
		stopGame();
	}
	running=!running;
}

function runGame(ms) {
	runner = setInterval(function() {
		clearCanvas();
		updateGame();
	},ms);
}

function stopGame() {
	clearInterval(runner);
}

function clearCanvas() {
	var gameCanvas = document.getElementById("game");
	var ctx = gameCanvas.getContext('2d');
	ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function updateGame() {
	locs = [];
	for (var i = 0; i<numCols; i++) {
		for (var j = 0; j<numRows; j++) {
			var isAlive = grid[i][j];
			var loc = {x:i,y:j};
			var count = countNeighbors(loc);
			if (count == 3 && !isAlive) {
				locs.push(loc);
			} else if ((count == 2 || count == 3) && isAlive) {
				locs.push(loc);
			}
		}
	}

	gridSetup();

	for (var i = 0; i<locs.length; i++) {
		var loc = locs[i];
		fillSquare(loc);
		grid[loc.x][loc.y] = true;
	}
}

function countNeighbors(loc) {
	var count = 0;
	for (var xDelta = -1; xDelta<=1; xDelta++) {
		for (var yDelta = -1; yDelta<=1; yDelta++) {
			if (xDelta==0 && yDelta==0) {
				continue;
			} else if (grid[(loc.x+xDelta+numCols)%numCols][(loc.y+yDelta+numRows)%numRows]) {
				count++;
			}
		}
	}
	return count;
}
