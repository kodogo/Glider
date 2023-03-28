'use strict';
const artFileLocations =
[
	[128, "art/00128.png"],
	[129, "art/00129.png"],
	[130, "art/00130.png"],
	[198, "art/00198.png"],
	[199, "art/00199.png"],
	[200, "art/00200.png"],
	[201, "art/00201.png"],
	[202, "art/00202.png"],
	[203, "art/00203.png"],
	[204, "art/00204.png"],
	[205, "art/00205.png"],
	[206, "art/00206.png"],
	[207, "art/00207.png"],
	[208, "art/00208.png"],
	[209, "art/00209.png"],
	[210, "art/intro.png"],
	[1000, "art/Graypat.png"],
	[1001, "art/Graypat Transparent.png"],
	[1002, "art/Rising Air.png"],
	[1003, "art/Horizontal Air.png"]
];

function loadFile(key, fileName) 
{
	loadPromises.push(
		new Promise((resolve, reject) => {
			let img = new Image();
			artFiles.set(key, img); 
			img.src = fileName;
			img.onload = function(e) {
				resolve();
			}
		})
	);
}

function LoadImages()
{
	for(let f of artFileLocations)
		loadFile(f[0], f[1]);
}

function AnimFrame(){
	Coordinate(); 
	requestAnimationFrame(AnimFrame,canvas);
}

function ReadyToPlay() {
	musicAudio = AudioList[28];
	//musicAudio.loop = true;
	ShowStartScreen();
	AnimFrame();
}


let icons = new Image();
let artFiles = new Map();

InitGlobalRects();
InitAllOtherGlobalVars();

let startButton = document.getElementById("start-button");
let quitButton = document.getElementById("quit-button");
let soundCheckbox = document.getElementById("sound-checkbox");
let musicCheckbox = document.getElementById("music-checkbox");
let airVisibleCheckbox = document.getElementById("air-visible-checkbox");
let forceLightsOnCheckbox = document.getElementById("lights-on-checkbox");
let cheatCheckbox = document.getElementById("cheat-checkbox");


musicCheckbox.checked = false;
musicOn = false;
soundCheckbox.checked = true;
soundOn = true;
airVisibleCheckbox.checked = false;
airVisible = false;
cheatCheckbox.checked = false;
cheatMode = false;
forceLightsOnCheckbox.checked = false;
forceLightsOn = false;

window.addEventListener(
	'keydown',
	function (e) {
		theKeys[e.keyCode] = true;
		let key = e.keyCode;
		if(key == pauseKey)
		{	
			pausing = !pausing;
		}
		if(playing)
			e.preventDefault();
	 }
)

window.addEventListener(
	'keyup',
	function (e) {
		theKeys[e.keyCode] = false;
		if(playing)
			e.preventDefault();
	}
)

startButton.addEventListener(
	'click',
	function (e) {
		StartNewGame();
	}
)

quitButton.addEventListener(
	'click',
	function (e) {
		WrapItUp();
	}
)
musicCheckbox.onchange = function (e) {
	musicOn = musicCheckbox.checked;
/*	if(musicOn)
		PlayTheMusic();
	else
		PauseTheMusic();*/
 };
 
 soundCheckbox.onchange = function (e) {
	soundOn = soundCheckbox.checked;
 };

 airVisibleCheckbox.onchange = function (e) {
	airVisible = airVisibleCheckbox.checked;
 };

 forceLightsOnCheckbox.onchange = function (e) {
	forceLightsOn = forceLightsOnCheckbox.checked;
 };

 cheatCheckbox.onchange = function (e) {
	cheatMode = cheatCheckbox.checked;
	if(cheatMode)
	{
		mortals = 50;
		theGlider.bands = 1000;
		theGlider.energy = 10000;
		roomSelectSpan.style.visibility = 'visible';
	}
	else
	{
		mortals = 5;
		theGlider.bands = 0;
		theGlider.energy = 0;
		roomSelectSpan.style.visibility = 'hidden';
	}
 };
 
 houseSelect.onchange = function(e) {
	 thisHouse = JSON.parse(JSON.stringify(HouseList[houseSelect.selectedIndex][1]));
	 PopulateRoomList();
 }

 roomSelect.onchange = function(e) {
	roomAt = roomSelect.selectedIndex + 1;
	if(playing)
	{
		ReadyRoom();
		ResetGlider();
	}
}

let x = canvas.width / 2;
let y = canvas.height / 2 - 10;
let text = 'Loading...';

context.save();
context.font = '30pt Calibri';
context.textAlign = 'center';
context.fillStyle = 'blue';
context.fillText(text, x, y);
context.restore();

PopulateHouseList();
thisHouse = JSON.parse(JSON.stringify(HouseList[houseSelect.selectedIndex][1]));
PopulateRoomList();

LoadSounds();
LoadImages();


Promise.all(loadPromises).then(ReadyToPlay);
