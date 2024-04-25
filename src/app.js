//configuration
let roughSvg = rough.svg(document.getElementById("svg"));
const svg = document.getElementById("svg");
let color = "#FFC0CB";

let globalX = 910; //910
let globalY = 300; //300

//**======================================================================**

//adding start rectangle
drawRectangle(globalX, globalY);

//function for drawing rectangles
function drawRectangle(x, y) {
	const rectangle = roughSvg.rectangle(x, y, 100, 100, {
		roughness: 0,
		fill: color,
		fillStyle: "solid",
	});
	rectangle.addEventListener("click", () => {
		console.log("click");
	});
	svg.appendChild(rectangle);
}

//===================================

//adding your own rectangles
//buttons configuration
const upButton = document.getElementById("up");
upButton.addEventListener("click", drawUp);

const rightButtom = document.getElementById("right");
rightButtom.addEventListener("click", drawRight);

const leftButton = document.getElementById("left");
leftButton.addEventListener("click", drawLeft);

const downButton = document.getElementById("down");
downButton.addEventListener("click", drawDown);

const clearContentButton = document.getElementById("clearContent");
clearContentButton.addEventListener("click", clearContent);

const randomColorButton = document.getElementById("randomColor");
randomColorButton.addEventListener("click", randomColor);

//drawing functions
async function drawUp() {
	//upLine
	const upLine = roughSvg.line(
		globalX + 100 / 2,
		globalY,
		globalX + 100 / 2,
		globalY - 30,
		{
			roughness: 0,
		}
	);
	svg.appendChild(upLine);
	globalY = globalY - 130;
	await drawRectangle(globalX, globalY);
}

async function drawRight() {
	//rightLine
	const rightLine = roughSvg.line(
		globalX + 100,
		globalY + 100 / 2,
		globalX + 100 + 30,
		globalY + 100 / 2,
		{
			roughness: 0,
		}
	);
	svg.appendChild(rightLine);
	globalX = globalX + 130;
	await drawRectangle(globalX, globalY);
}

async function drawLeft() {
	//leftLine
	const leftLine = roughSvg.line(
		globalX,
		globalY + 100 / 2,
		globalX - 30,
		globalY + 100 / 2,
		{
			roughness: 0,
		}
	);
	svg.appendChild(leftLine);
	globalX = globalX - 130;
	await drawRectangle(globalX, globalY);
}

async function drawDown() {
	//downLine
	const downLine = roughSvg.line(
		globalX + 100 / 2,
		globalY + 100,
		globalX + 100 / 2,
		globalY + 100 + 30,
		{
			roughness: 0,
		}
	);
	svg.appendChild(downLine);
	globalY = globalY + 130;
	await drawRectangle(globalX, globalY);
}

//===================================
//other functions

//clearContent
async function clearContent() {
	document.getElementById("svg").innerHTML = "";
	globalX = 910;
	globalY = 300;
	await drawRectangle(globalX, globalY);
	console.log("WYCZYSZCZONO PLANSZĘ");
}

//randomColor
async function randomColor() {
	const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	const rectangles = document.querySelectorAll("g");
	rectangles.forEach((rectangle) => {
		rectangle.fill = randomColor;
	});
	console.log(randomColor);
}
