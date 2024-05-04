// Konfiguracja
let roughSvg = rough.svg(document.getElementById("svg"));
const svg = document.getElementById("svg");
let color = "#FFC0CB";

let globalX = 910;
let globalY = 300;

console.log("Wszystkie prostokąty:");
var rectanglePositions = [];

// Konfiguracja przycisków
const upButton = document.getElementById("up");
upButton.addEventListener("click", drawUp);

const rightButton = document.getElementById("right");
rightButton.addEventListener("click", drawRight);

const leftButton = document.getElementById("left");
leftButton.addEventListener("click", drawLeft);

const downButton = document.getElementById("down");
downButton.addEventListener("click", drawDown);

const clearContentButton = document.getElementById("clearContent");
clearContentButton.addEventListener("click", clearContent);

const randomColorButton = document.getElementById("randomColor");
randomColorButton.addEventListener("click", randomColor);

// Funkcje główne
async function drawRectangle(x, y) {
	// Rysowanie prostokąta
	const rectangle = roughSvg.rectangle(x, y, 100, 100, {
		roughness: 0,
		fill: color,
		fillStyle: "solid",
	});
	rectangle.addEventListener("click", () => {
		console.log("click");
	});
	svg.appendChild(rectangle);

	// Dodawanie informacji o prostokącie do tablicy
	const rectangleData = {
		x: x,
		y: y,
		width: 100,
		height: 100,
	};
	rectanglePositions.push(rectangleData);
	console.log(rectanglePositions);

	// Sprawdzanie prostokątów
	await checkRectangles();
}

// Rysowanie pierwszego prostokąta przy starcie
drawRectangle(globalX, globalY);

// Funkcje rysowania w różnych kierunkach
async function drawUp() {
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

// Inne funkcje
async function checkRectangles() {
	// Sprawdzanie prostokątów
	console.log("Wszystkie prostokąty:");
	if (rectanglePositions.length > 1) {
		rectanglePositions.forEach((position, index) => {
			console.log(`Prostokąt ${index + 1}: x=${position.x}, y=${position.y}`);
		});
	} else {
		console.log("Brak innych prostokątów na planszy.");
	}
}

async function clearContent() {
	// Czyszczenie zawartości
	alert("Wyczyszczono planszę");
	document.getElementById("svg").innerHTML = "";
	globalX = 910;
	globalY = 300;
	rectanglePositions = [];
	await drawRectangle(globalX, globalY);
}

async function randomColor() {
	// Losowanie koloru
	const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	const rectangles = document.querySelectorAll("g");
	rectangles.forEach((rectangle) => {
		rectangle.fill = randomColor;
	});
	console.log(randomColor);
}
