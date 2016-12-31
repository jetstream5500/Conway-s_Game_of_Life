var grid;
var locs = [];

function fillSquare(loc) {
	var gameCanvas = document.getElementById("game");
	var ctx = gameCanvas.getContext('2d');
	var scaledLoc = {
		x:loc.x*20,
		y:loc.y*20
	}

	ctx.fillStyle = "#3377BB";
	ctx.strokeStyle = "#FFFFFF";
	ctx.lineWidth = 2;
	ctx.fillRect(scaledLoc.x,scaledLoc.y,20,20);
	ctx.strokeRect(scaledLoc.x,scaledLoc.y,20,20);
}
function gridSetup() {
	grid = [];
	for (var x = 0; x<50; x++) {
		var list = [];
		for (var y = 0; y<50; y++) {
			list.push(false);
		}
		grid.push(list);
	}
}
function randomFill(population) {
	gridSetup();
	for (var i = 0; i<population; i++) {
		var loc;
		do {
			loc = newLoc();
		} while (grid[loc.x][loc.y]);
		loc = {x:loc.x+20,y:loc.y+20};
		grid[loc.x][loc.y] = true;
		locs.push(loc);
		fillSquare(loc);
	}
}
function testFill() {
	gridSetup();
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

function runGame(ms) {
	setInterval(function() {
		clearCanvas();
		updateGame();
	},ms);
}

function clearCanvas() {
	var gameCanvas = document.getElementById("game");
	var ctx = gameCanvas.getContext('2d');
	ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function updateGame() {
	locs = [];
	for (var i = 0; i<50; i++) {
		for (var j = 0; j<50; j++) {
			var isAlive = grid[i][j];
			var loc = {x:i,y:j};
			var count = countNeighbors(loc);
			if (i<3 && j<3) {
				console.log(loc.x+","+loc.y+" = "+count);
			}
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
			}
			if (grid[(loc.x+xDelta+50)%50][(loc.y+yDelta+50)%50]) {
				count++;
			}
		}
	}
	return count;
}
