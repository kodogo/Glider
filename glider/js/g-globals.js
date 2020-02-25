'use strict';
function initMultiArray(...dimensions) {
  function initMultiArrayRec(dimIndex) {
    if (dimIndex >= dimensions.length) {
      return 0;
    } else {
      const dim = dimensions[dimIndex];
      const arr = [];
      for (let i=0; i<dim; i++) {
        arr.push(initMultiArrayRec(dimIndex+1));
      }
      return arr;
    }
  }
  return initMultiArrayRec(0);
}

function CycleRec()
{
    this.holdRect = new Rect(0, 0, 0, 0);
    this.wholeRect = new Rect(0, 0, 0, 0);
    this.tiedTo = 0;
    this.kindIs = 0;
    this.phase = 0;
    this.reset = 0;
    this.position = 0;
    this.accel = 0;
    this.velocity = 0;
}

function LightningRec()
{
  this.theBolts = initMultiArray(4, 8, 2);
  this.whichBolt = 0;
  this.whatPhase = 0;
  this.whatTime = 0;
}

function GliderRec()
{
  this.destRect = new Rect(0,0,0,0);
  this.wholeRect = new Rect(0,0,0,0);

  this.shadoDest = new Rect(0,0,0,0);
  this.wholeShado = new Rect(0,0,0,0);

  this.touchRect = new Rect(0,0,0,0);

  this.timeStamp = 0;
  this.mode = 0;
  this.phase= 0;
  this.srcNum = 0;
  this.forVel = 0;
  this.mass = 0;
  this.bands = 0;
  this.energy = 0;
  this.isRight = true;
  this.isForward = true;
}

function BandRec()
{
  this.dest =  new Rect(0,0,0,0);;
  this.whole =  new Rect(0,0,0,0);; 
  this.phase = 0;
  this.velocity = 0;
}

function AnimateRec()
{
  this.destRect = new Rect(0,0,0,0);
  this.wholeRect = new Rect(0,0,0,0);
  this.horiOff = 0;
  this.vertOff = 0;
  this.kind = 0;
  this.phase = 0;
  this.tickStamp = 0;
  this.delay = 0;
  this.unSeen = true;
}

function PointRec()
{
  this.whereR = new Rect(0, 0, 0, 0);
  this.tickStamp = 0;
  this.saysWhat = "";
  this.out = false;
}

const kMinBassLoop = 14;			// quickest pace of duh-dum
const kBassFract = 8;				// smaller = slower bass @ 1st / larger = quicker
const kBonusTimeToBeat = 256;		// number of passes for time bonus
const kCeilingVert = 24;			//absolute ceiling in pixels
const kFloorVert = 325;			//absolute floor in pixels
const kFloorLimit = kFloorVert + 5;
const kMaxThrust = 5;				// maximum speed (in pixels) of glider

// furniture
const table = 1;
const shelf = 2;
const books = 3;
const cabnet = 4;
const extRct = 5;
const obsRct = 6;

// blowers
const flrVnt = 8;
const celVnt = 9;
const celDct = 10;
const candle = 11;
const lftFan = 12;
const ritFan = 13;

// table objects
const clock = 16;
const paper = 17;
const grease = 18;
const bnsRct = 19;
const battry = 20;
const rbrBnd = 21;

// wall objects
const litSwt = 24;
const outlet = 25;
const thermo = 26;
const shredr = 27;
const pwrSwt = 28;
const guitar = 29;

// animate objects
const drip = 32;
const toastr = 33;
const ball = 34;
const fshBwl = 35;
const teaKtl = 36;
const wind = 37;


// jewelry
const paintg = 40;
const mirror = 41;
const basket = 42;
const macTsh = 43;
const upStar = 44;
const dnStar = 45;

const normal = 0;		//glider situational modes
const fadingIn = 1;
const fadingOut = 2;
const turnRt2Lf = 3;
const turnLf2Rt = 4;
const burning = 5;
const ascending = 6;
const descending = 7;
const shredding = 8;
//objects effects codes
const ignoreIt = 0;		//null or unknown objects
const crashIt = 1;		//tables, shelves, cabinets, etc...
const liftIt = 2;		//floor vents
const dropIt = 3;		//ceiling blower, some ducts
const moveIt = 4;		//exit rects/suction ceiling ducts
const burnIt = 5;		//candle if too close
const turnItLeft = 6;		//left fan
const turnItRight = 7;	//right fan
const awardIt = 8;		//clocks
const extraIt = 9;		//folded pieces of paper
const slideIt = 10;		//grease fallen
const trickIt = 11;		//bonus rect
const energizeIt = 12;	//battery
const bandIt = 13;		//rubber bands
const playIt = 14;		//guitar
const lightIt = 15;		//light switch
const zapIt = 16;		//wall outlet
const airOnIt = 17;		//thermostats
const shredIt = 18;		//shredder
const toggleIt = 19;		//power switch
const weightIt = 20;		//?
const spillIt = 21;		//grease standing up
const ascendIt = 22;		//up stair case
const descendIt = 23;		//down stair case
const steamIt = 24;

const patGray = 1000;
const patGrayTransparent = 1001;
const patRisingAir = 1002;
const patHorizontalAir = 1003;

const whoCares = 0;		// place where entered room
const topOfRoom = 1;
const bottomOfRoom = 2;
const leftOfRoom = 3;
const rightOfRoom = 4;

const kWhistleSound = 13;
const kTapSound = 27;
const kCRSound = 28;
const kMusicSound = 29;	// ID of music sound
const kDuhDumSound = 30;	// ID of bass beat

let rgbBlack = 'rgba(0, 0, 0, 1.0)'
let rgbBlue = 'rgba(0, 0, 255, 1.0)'
let rgbBrown = 'rgba(117, 75, 27, 1.0)'
let rgbDkGray = 'rgba(128, 128, 128, 1.0)'
let rgbLtBlue = 'rgba(9, 193, 240, 1.0)'
let rgbLtBrown = 'rgba(171, 145, 91, 1.0)'
let rgbLtGreen = 'rgba(144, 238, 144, 1.0)'
let rgbRed = 'rgba(255, 0, 0, 1.0)'
let rgbViolet = 'rgba(255, 0, 255, 1.0)'
let rgbWhite = 'rgba(255, 255, 255, 1.0)'
let rgbYellow = 'rgba(255, 255, 0, 1.0)'

// Global variables
let srcRect = new Array(70);
let eventRect = new Array(20);
for(let i = 0; i < eventRect.length; i++)
  eventRect[i] = new Rect(0, 0, 0, 0);

let eventKind = initMultiArray(20, 3);

let roomAt = 1;
let roomsPassed = 1;

let airVisible = false;
let cheatMode = false;
let soundOn = true;
let musicOn = false;

let reserveRects = new Array(20);
let nAnimates = 0;
let theAnimates = new Array(20);
for(let i = 0; i < 20; i++)
  theAnimates[i] = new AnimateRec();
let animateRct = initMultiArray(3, 20); // 2nd index is -1..16 in Pascal
let animateCrushed = 19;
let theBand = new BandRec();
let bandRct = new Array(3);
let bandBorne = false;

let nCycleObs = 0;
let cycleObjects = new Array(20);
let nObjects = 0;
let hasToast = false;
let toastRgn = null;
let hasWindow = false;
let windowOpen = false;
let windowRgn = new Array(2);
let hasMirror = false;
let mirrorRgn = null;
let mortals = 5;
let srcNum = 0;
let enteredLeft = true;
let lifeNormal = false;
let rightIsOpen = true;
let leftIsOpen = true;
let rollScore = 0;
let scoreIncrement = 17;
let roomScore = 0;
let loopsThruRoom = 0;
let bassLoop = 0;
let playBassTime = 0;
let suppScore = 0;
let scoreIsRolling = false;
let floatPoints = new PointRec();
let sideYouCantExit = 0;
let didntExitEntrance = true;
let playing = false;
let pausing = false;
let isScrolling = false;
let inClosingAnimation = false;
let gameOver = false;
let doneFlag = false;
let gameName = "";
let refuseHigh = true;
let liftAmount = 0;
let shiftAmount = 0;
let binaryFlip = 0;
let lightsOut = false;
let forceLightsOn = false;
let airOut = false;

let theGlider = new GliderRec();

let roomVisits = new Array(100);
let glideRct = new Array(50);
let shadoRct = new Array(2);
let nextPhase = initMultiArray(5, 20);

// Global rectangles
let wholeArea = new Rect(0, 0, 0, 0);
let fullArea = new Rect(0, 0, 0, 0);
let nullRect = new Rect(0, 0, 0, 0);
let smScoreRect = new Rect(0, 0, 0, 0);
let lgScoreRect = new Rect(0, 0, 0, 0);
let wholeRgn = new Rect(0, 0, 0, 0);

// Control methods - just implement holdKey for now
const holdKey = 1;
const dropKey = 2;
const absMouse = 3;
const relMouse = 4;
let controlMethod = holdKey;

//?????? Not sure if these are needed 
// Seem to be to do with positioning Glider window centred in the screen

let rightOffset = 0;
let downOffset = 0;

let LastTickCount = 0;
let TimeEnteredRoom = 0;

let theLightning = new LightningRec();

let theKeys = new Array(128);
for(let i = 0; i < 128; i++)
  theKeys[i] = false;

// Customisable in the original
let leftKey = 37;
let rightKey = 39;
let energyKey = 13;
let bandKey = 32;
let pauseKey = 27;

let screenCanvas = document.getElementById('canvas');
let screenContext = screenCanvas.getContext('2d');
let maskCanvas = document.createElement('canvas');
let maskContext = maskCanvas.getContext('2d');
maskCanvas.width = screenCanvas.width;
maskCanvas.height = screenCanvas.height;

let musicAudio = null;

let offscreenCanvas = document.createElement('canvas');
let offscreenContext = offscreenCanvas.getContext('2d');
offscreenCanvas.width = screenCanvas.width;
offscreenCanvas.height = screenCanvas.height;

let canvas = screenCanvas;
let context = screenContext;

let loadPromises = new Array();
let houseSelect = document.getElementById("houses-select");
let roomSelect = document.getElementById("rooms-select");
let roomSelectSpan = document.getElementById("rooms-span");

let thisHouse = null;
