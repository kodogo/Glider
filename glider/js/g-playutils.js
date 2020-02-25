'use strict';
const tileWidth = 64;
const tileHeight = 342;

function ResetGlider()
{
	let g = theGlider;

	if (g.mode != burning) {
		g.timeStamp = 0;
		g.mode = fadingIn;
		g.phase = 0;
		g.isForward = true;
		if (g.isRight)
			g.srcNum = 0
		else
			g.srcNum = 2;
	}
	if (enteredLeft)
		g.destRect = SetRect(0, 40, 48, 60)
	else
		g.destRect = SetRect(464, 40, 512, 60);

	g.wholeRect = CopyRect(g.destRect);
	g.shadoDest = CopyRect(g.destRect);
	g.shadoDest.top = kFloorVert;
	g.shadoDest.bottom = kFloorVert + 11;
	g.wholeShado = CopyRect(g.shadoDest);
	g.touchRect = CopyRect(g.destRect);
	g.touchRect = InsetRect(g.touchRect, 10, 5);
	lifeNormal = false;
}
/***************************************
 * Functions used just for DrawWindow (?)
*/

function FillNFrame (theColor, theRect) {
	RGBForeColor(theColor);
	PaintRect(theRect);
	RGBForeColor(rgbBlack);
	FrameRect(theRect);
}

function GrayNFrame (r) {
	FillRect(theRect, gray);
	context.strokeStyle = rgbBlack;
	FrameRect(theRect);
}

function HiLiteARect (theColor, theRect)
{
	RGBForeColor(theColor);
	context.beginPath();
	MoveTo(theRect.left + 1, theRect.top + 1);
	LineTo(theRect.right - 2, theRect.top + 1);
	LineTo(theRect.right - 2, theRect.bottom - 2);
	context.stroke();
	RGBForeColor(rgbBlack);
}

function GrayLiteARect (theRect)
{
	context.strokeStyle = rgbWhite;
	context.beginPath();
	MoveTo(theRect.left + 1, theRect.top + 1);
	LineTo(theRect.right - 2, theRect.top + 1);
	LineTo(theRect.right - 2, theRect.bottom - 2);
	context.stroke();
	context.strokeStyle = rgbBlack;
	context.beginPath();
	MoveTo(theRect.left + 1, theRect.top + 1);
	LineTo(theRect.left + 1, theRect.bottom - 2);
	LineTo(theRect.right - 2, theRect.bottom - 2);
	context.stroke();
}

function LoLiteARect (theRect)
{
	RGBForeColor(rgbLtBrown);
	context.beginPath();
	MoveTo(theRect.left - 1, theRect.top);
	LineTo(theRect.left - 1, theRect.bottom);
	LineTo(theRect.right - 1, theRect.bottom);
	context.stroke();
	RGBForeColor(rgbDkGray);
	context.beginPath();
	MoveTo(theRect.left, theRect.top - 1);
	LineTo(theRect.right, theRect.top - 1);
	LineTo(theRect.right, theRect.bottom);
	context.stroke();
	RGBForeColor(rgbBlack);
}

function GrayLoARect (theRect)
{
	context.strokeStyle = rgbWhite;
	context.beginPath();
	MoveTo(theRect.left - 1, theRect.top);
	LineTo(theRect.left - 1, theRect.bottom);
	LineTo(theRect.right - 1, theRect.bottom);
	context.stroke();
	context.strokeStyle = rgbBlack;
	context.beginPath();
	MoveTo(theRect.left, theRect.top - 1);
	LineTo(theRect.right, theRect.top - 1);
	LineTo(theRect.right, theRect.bottom);
	context.stroke();
}

function DrawTable(o) 
{
    context.strokeStyle = rgbBlack;
    context.fillStyle = rgbBrown;
	let boundRect = CopyRect(o.boundRect);
	//boundRect.top += 1;
    PaintRect(boundRect);
    FrameRect(boundRect);
    
	let theRect = CopyRect(boundRect);
    context.lineWidth = 2;
    context.strokeStyle = rgbBlack;
    context.beginPath();
    MoveTo(theRect.left + 1, theRect.bottom + 0.5);
    LineTo(theRect.right + 1, theRect.bottom + 0.5);

    context.stroke();
    context.strokeStyle = rgbLtBrown;
    context.beginPath();
    context.lineWidth = 1;
    MoveTo(theRect.left + 1, theRect.top + 3);
    //LineTo(theRect.right + 1, theRect.top + 3);
    context.stroke();
	context.strokeStyle = rgbBlack;
	
	let tempRect = SetRect(theRect.left, kFloorVert - 0, theRect.right, kFloorVert + 20);
	tempRect = OffsetRect(tempRect, Math.floor((theRect.top - kFloorVert) / 5), 0);
	context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillStyle = 'rgba(80, 80, 80, 1.0)';
	PaintOval(tempRect);

	PenNormal();
	context.lineWidth = 5;
    context.beginPath();
	MoveTo(Math.floor(((theRect.left + theRect.right) / 2)), theRect.bottom);
	LineTo(Math.floor(((theRect.left + theRect.right) / 2)), kFloorVert - 7);
    context.stroke();
	RGBForeColor(rgbWhite);
	context.lineWidth = 1;
    context.beginPath();
	MoveTo(Math.floor(((theRect.left + theRect.right) / 2)) + 2, theRect.bottom + (theRect.right - theRect.left) / 8);
	LineTo(Math.floor(((theRect.left + theRect.right) / 2)) + 2, kFloorVert - 7);
    context.stroke();
	RGBForeColor(rgbLtBrown);
    context.beginPath();
	MoveTo(Math.floor(((theRect.left + theRect.right) / 2)), theRect.bottom + (theRect.right - theRect.left) / 8);
	LineTo(Math.floor(((theRect.left + theRect.right) / 2)), kFloorVert - 7);
    context.stroke();
	RGBForeColor(rgbBlack);
	PenNormal;

	let kind = o.objectIs;
	let src = srcRect[o.objectIs];
	tempRect = CopyRect(src);
	tempRect = OffsetRect(tempRect, -tempRect.left, -tempRect.top);
	tempRect = OffsetRect(tempRect, Math.floor(((theRect.left + theRect.right)) / 2) - 31.5, kFloorVert - 11);
	DrawMaskedObject(src, src, tempRect);
}

function DrawShelf (o) {

PenNormal();

let kind = o.objectIs;
let theRect = CopyRect(o.boundRect);
//***** Draw shelf top}
theRect.top++;
RGBForeColor(rgbLtBrown);
PaintRect(theRect);
FrameRect(theRect);
context.beginPath();
MoveTo(theRect.left + 1, theRect.bottom - 2);
LineTo(theRect.right - 1, theRect.bottom - 2);
context.stroke();
RGBForeColor(rgbWhite);
context.beginPath();
MoveTo(theRect.left + 1, theRect.top);
LineTo(theRect.right + 1, theRect.top);
context.stroke();

PenNormal();

//***** Draw shelf shadow
context.beginPath();
MoveTo(theRect.right + 1, theRect.bottom - 1);
Line(-15, 15);
LineTo(theRect.left - 15, currentY);
//Line(0, -5);
Line(15, -15);
//Line(0, 5);
LineTo(theRect.right + 1, theRect.bottom - 1);
FillPattern(patGrayTransparent);
context.stroke();
FillPattern(patGrayTransparent);
PenNormal();

let src = CopyRect(srcRect[kind]);
let tempRect = CopyRect(src);
tempRect = OffsetRect(tempRect, -tempRect.left, -tempRect.top);
tempRect = OffsetRect(tempRect, theRect.left + 15, theRect.bottom - 2);
DrawMaskedObject(src, src, tempRect);

tempRect = CopyRect(src);
tempRect = OffsetRect(tempRect, -tempRect.left, -tempRect.top);
tempRect = OffsetRect(tempRect, theRect.right - 25, theRect.bottom - 2);
DrawMaskedObject(src, src, tempRect);
}

function DrawMirror (o) {
	PenNormal();
	let theRect = o.boundRect;
	RGBForeColor(rgbBrown);
	PaintRect(theRect);
	RGBForeColor(rgbBlack);
	FrameRect(theRect);
	theRect = InsetRect(theRect, 3, 3);
	RGBForeColor(rgbWhite);
	PaintRect(theRect);
	RGBForeColor(rgbBlack);
	PenNormal();
}

function DrawCabinet (o) {

let offIt = 0;

PenNormal();
let theRect = CopyRect(o.boundRect);
let tempR = CopyRect(theRect);

if (theRect.bottom > 280) {
	tempR.bottom -= 7;
	context.fillStyle = rgbBrown;
	PaintRect(tempR);
	context.strokeStyle = rgbBlack;
	FrameRect(tempR);

	tempR = CopyRect(theRect);
	tempR = InsetRect(tempR, 2, 0);
	tempR.top = tempR.bottom - 5;
	context.fillStyle = rgbBlack;
	PaintRect(tempR)
	FrameRect(tempR);

	tempR = SetRect(theRect.left - 2, theRect.top, theRect.right + 2, theRect.top + 7);
	context.fillStyle = rgbLtBrown;
	PaintRect(tempR);
	context.strokeStyle = rgbBlack;
	context.fillStyle = rgbBlack;
	FrameRect(tempR);
	context.beginPath();
	MoveTo(tempR.left, tempR.bottom + 0.5);
	LineTo(tempR.right + 1, tempR.bottom + 0.5);
	context.stroke();

	// Do the shadow
	context.beginPath();
	MoveTo(theRect.left, theRect.top + 8);
	Line(-15, 15);
	LineTo(theRect.left - 15, theRect.bottom - 10);
	LineTo(theRect.left, theRect.bottom);
	LineTo(theRect.left, theRect.top + 8);
	context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
	context.stroke();
	FillPattern(patGrayTransparent);
	PenNormal();
	offIt = 5;
} else {
	// No footer - wall cabinet
	RGBForeColor(rgbBrown);
	PaintRect(theRect);
	RGBForeColor(rgbBlack);
	FrameRect(theRect);
/*
			MoveTo(theRect.left, theRect.top);
			OpenRgn;
			Line(-15, 15);
			LineTo(theRect.left - 15, theRect.bottom + 15);
			LineTo(theRect.right - 15, theRect.bottom + 15);
			Line(15, -15);
			LineTo(theRect.left, theRect.bottom);
			LineTo(theRect.left, theRect.top);
*/
	context.beginPath();
	x = theRect.left; y = theRect.top;
	MoveTo(theRect.left, theRect.top);
	Line(-15, 15);
	LineTo(theRect.left - 15, theRect.bottom + 15);
	LineTo(theRect.right - 15, theRect.bottom + 15);
	Line(16.5, -14);
	LineTo(theRect.left, currentY);
	LineTo(theRect.left, theRect.top);
	context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
	context.stroke();
	FillPattern(patGrayTransparent);
	PenNormal();
	offIt = 0;
}
let panels = Math.floor((theRect.right - theRect.left) / 48);
if (panels == 0) {
	tempR = CopyRect(theRect);
	tempR = InsetRect(tempR, 5, 5 + offIt);
	RGBForeColor(rgbBlack);
	FrameRect(tempR);
	RGBForeColor(rgbLtBrown);
	context.beginPath();
	MoveTo(tempR.left + 3, tempR.top + 3);
	LineTo(tempR.left + 3, tempR.bottom - 4);
	LineTo(tempR.right - 4, tempR.bottom - 4);
	RGBForeColor(rgbBlack);
	LineTo(tempR.right - 4, tempR.top + 3);
	LineTo(tempR.left + 3, tempR.top + 3);
	context.stroke();
} else {
	let width = Math.floor(((theRect.right - theRect.left) - (panels + 1) * 5) / panels);
	tempR = SetRect(theRect.left + 5, theRect.top + 5 + offIt, theRect.left + 5 + width, theRect.bottom - 5 - offIt);
	for (let i = 0; i < panels; i++) {
		RGBForeColor(rgbLtBrown);
		context.beginPath();
		MoveTo(tempR.left + 3, tempR.top + 3);
		LineTo(tempR.left + 3, tempR.bottom - 4);
		LineTo(tempR.right - 4, tempR.bottom - 4);
		context.stroke();
		RGBForeColor(rgbBlack);
		context.beginPath();
		MoveTo(tempR.right - 4, tempR.bottom - 4);
		LineTo(tempR.right - 4, tempR.top + 3);
		LineTo(tempR.left + 3, tempR.top + 3);
		context.stroke()
		tempR = OffsetRect(tempR, width + 5, 0);
	}
	PenNormal();
}

}

function DrawWindow(o)
{

	let kind = o.objectIs;
	let theRect = o.boundRect;
	let windowOpen = o.isOn;

		//***** Draw window shadow
	context.beginPath();
	MoveTo(theRect.left, theRect.top);
	Line(-10, 10);
	Line(0, 5);
	Line(5, 5);
	LineTo(theRect.left - 5, theRect.bottom - 10);
	Line(-5, 5);
	Line(0, 5);
	Line(5, 5);
	LineTo(theRect.right - 5, theRect.bottom + 5);
	LineTo(theRect.right, theRect.bottom);
	LineTo(theRect.left, theRect.bottom);
	LineTo(theRect.left, theRect.top);
	context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
	context.stroke();
	FillPattern(patGrayTransparent);

	PenNormal();

	FillNFrame(rgbBrown, theRect);	//***** Draw window frame and sill}
	HiLiteARect(rgbLtBrown, theRect);
	let tempRect = SetRect(theRect.left - 4, theRect.top, theRect.right + 4, theRect.top + 6);
	FillNFrame(rgbBrown, tempRect);
	HiLiteARect(rgbLtBrown, tempRect);
	tempRect = SetRect(theRect.left - 2, theRect.top + 6, theRect.right + 2, theRect.top + 10);
	FillNFrame(rgbBrown, tempRect);
	tempRect = SetRect(theRect.left - 4, theRect.bottom - 6, theRect.right + 4, theRect.bottom);
	FillNFrame(rgbBrown, tempRect);
	HiLiteARect(rgbLtBrown, tempRect);
	tempRect = SetRect(theRect.left - 2, theRect.bottom - 10, theRect.right + 2, theRect.bottom - 5);
	FillNFrame(rgbBrown, tempRect);
	HiLiteARect(rgbLtBrown, tempRect);
	tempRect = CopyRect(theRect);
	tempRect = InsetRect(tempRect, 8, 16);
	FillNFrame(rgbBrown, tempRect);
	LoLiteARect(tempRect);
	tempRect = CopyRect(theRect);		//***** Draw the top window pane}
	tempRect = InsetRect(tempRect, 8, 16);
	tempRect.bottom = Math.floor((theRect.bottom + theRect.top) / 2) + 2;
	FillNFrame(rgbBrown, tempRect);
	tempRect = InsetRect(tempRect, 6, 6);
	LoLiteARect(tempRect);
	tempRect = InsetRect(tempRect, 2, 2);
	LoLiteARect(tempRect);
	tempRect = InsetRect(tempRect, 2, 2);
	FillNFrame(rgbBlack, tempRect);
	LoLiteARect(tempRect);
	tempRect = CopyRect(theRect);			//Fill bottom black}
	tempRect = InsetRect(tempRect, 8, 16);
	tempRect.top = Math.floor((theRect.bottom + theRect.top) / 2) + 2;
	FillRect(tempRect, rgbBlack);
	tempRect = CopyRect(theRect);			//***** Draw the bottom window pane}
	tempRect = InsetRect(tempRect, 8, 16);
	tempRect.top = Math.floor((theRect.bottom + theRect.top) / 2) - 2;
	if (windowOpen) {
		tempRect = OffsetRect(tempRect, 0, 26 - Math.floor((theRect.bottom - theRect.top) / 2));
	}
	FillNFrame(rgbBrown, tempRect);
	tempRect = InsetRect(tempRect, 6, 6);
	LoLiteARect(tempRect);
	tempRect = InsetRect(tempRect, 2, 2);
	LoLiteARect(tempRect);
	tempRect = InsetRect(tempRect, 2, 2);
	FillNFrame(rgbBlack, tempRect);
	LoLiteARect(tempRect);

	RGBForeColor(rgbBlack);

}


function DrawStair (o)
{
	let kind = o.objectIs;
	let theRect = o.boundRect;
	let img = null;

	if (kind == upStar)
		img = artFiles.get(198);
	else
		img = artFiles.get(199);

	context.drawImage(img, theRect.left, theRect.top);
}

function DrawBackground(r) {
	let dx = 0;
	let b = artFiles.get(r.backPicktID);
	for (let t of r.tileOrder) {
		let sx = t * tileWidth;
		context.drawImage(b, sx, 0, tileWidth, tileHeight, dx, 0, tileWidth, tileHeight);
		dx += tileWidth;
	}
}

function DrawObject(src, dst, ctx) 
{
	// The height and width look to be off by 1, but this seems
	// to be needed to avoid random lines at the top and bottom
	// of the object
	ctx = (ctx === undefined) ? context : ctx;
	let sx = src.left;
	let sy = src.top;
	let sw = src.right - src.left;
	let sh = src.bottom - src.top;
	
	let dx = dst.left;
	let dy = dst.top;
	let dw = dst.right - dst.left;
	let dh = dst.bottom - dst.top;
	
	if((dw <= 0) || (dh <= 0) || (sw <= 0) || (sh <= 0))
		return;

	ctx.drawImage(artFiles.get(128), sx, sy, sw, sh, dx, dy, dw, dh);
}

function DrawMaskedObject(src, mask, dst, ctx) {
	// The height and width look to be off by 1, but this seems
	// to be needed to avoid random lines at the top and bottom
	// of the object
	ctx = (ctx === undefined) ? context : ctx;
	let sx = src.left;
	let sy = src.top;
	let sw = src.right - src.left;
	let sh = src.bottom - src.top;
	
	let dx = dst.left;
	let dy = dst.top;
	let dw = dst.right - dst.left;
	let dh = dst.bottom - dst.top;

	if((dw <= 0) || (dh <= 0) || (sw <= 0) || (sh <= 0))
		return;

	let mx = mask.left;
	let my = mask.top;
	let mw = mask.right - mask.left;
	let mh = mask.bottom - mask.top;

	maskContext.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
	maskContext.globalCompositeOperation = 'source-over';
	maskContext.drawImage(artFiles.get(129), mx, my, mw, mh, 0, 0, dw, dh);
	maskContext.globalCompositeOperation = 'source-in';
	maskContext.drawImage(artFiles.get(128), sx, sy, sw, sh, 0, 0, dw, dh);
	ctx.drawImage(maskCanvas, 0, 0, dw, dh, dx, dy, dw, dh);
}

function DrawRisingAir(o, index)
{
	if (airVisible) {
		PenNormal();
		let img = artFiles.get(patRisingAir);
		let pat = context.createPattern(img, 'repeat');
		context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
		context.fillStyle = pat;
		PaintRect(eventRect[index]);
		PenNormal();
	}
	
}

function DrawHorizontalAir(o, index)
{
	if (airVisible) {
		PenNormal();
		let img = artFiles.get(patHorizontalAir);
		let pat = context.createPattern(img, 'repeat');
		context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
		context.fillStyle = pat;
		PaintRect(eventRect[index]);
		PenNormal();
	}
}

function DrawObjects(r) 
{
	if (lightsOut && !forceLightsOn)
	{
		PenNormal();
		PaintRect(wholeArea);
		for(let o of r.theObjects)
			if(o != null && (o.objectIs == litSwt))
				DrawMaskedObject(srcRect[o.objectIs], srcRect[o.objectIs], o.boundRect);			
		return;
	}

	for(let [index, o] of r.theObjects.entries())
	{
		if(o==null || !o.isVisible)
			continue;
		switch(o.objectIs) {
			case macTsh:
			case books:
			case toastr:
			case fshBwl:
			case teaKtl:
			case basket:
			case litSwt:
			case outlet:
			case thermo:
			case shredr:
			case pwrSwt:
			case guitar:
				DrawMaskedObject(srcRect[o.objectIs], srcRect[o.objectIs], o.boundRect);
				break;
			case paintg:
				DrawObject(srcRect[o.objectIs], o.boundRect);
				break;
			case flrVnt:
			case celVnt:
			case celDct:
			case candle:
				DrawMaskedObject(srcRect[o.objectIs], srcRect[o.objectIs], o.boundRect);
				DrawRisingAir(o, index);
				break;
			case lftFan:
			case ritFan:
				DrawMaskedObject(srcRect[o.objectIs], srcRect[o.objectIs], o.boundRect);
				DrawHorizontalAir(o, index);
				break
			case clock:
			case paper:
			case battry:
			case rbrBnd: 
				if(o.amount > 0)
					DrawMaskedObject(srcRect[o.objectIs], srcRect[o.objectIs], o.boundRect);
				break;
			case table:
				DrawTable(o);
				break;
			case shelf:
				DrawShelf(o);
				break;
			case cabnet: 
				DrawCabinet(o);
				break;
			case mirror: 
				DrawMirror(o);
				break;
			case wind: 
				DrawWindow(o);
				break;
			case upStar:
			case dnStar: 
				DrawStair(o);
				break;
			default:
				break;
		}
	}
}

function BumpTheScore()
{
	rollScore += scoreIncrement;

	if (rollScore < (roomScore + suppScore))
	{
		DoTheSound(21);
	}
	else
	{
		scoreIsRolling = false;
		rollScore = roomScore + suppScore;
	}
}

function StartScoreRolling()
{
	if (rollScore < (roomScore + suppScore))
	{
		rollScore = roomScore + suppScore;
	}
	scoreIsRolling = true;
}

function ResetAnimate(typeIs, index)
{
	let a = theAnimates[index];
	if (typeIs != -1) 
	{
		a.delay = thisHouse.theRooms[roomAt].animateDelay;
		a.kind = typeIs;
		a.unSeen = true;
	}
	switch(a.kind)
	{
		case 0: 	// dart
			a.destRect.left = 512;
			a.destRect.right = a.destRect.left + 64;
			a.destRect.top = Randomize(150);
			a.destRect.bottom = a.destRect.top + 22;			
			a.phase = 0;
			a.horiOff = -8;
			a.vertOff = 1;
			break;
		case 1: 	// copter
			a.destRect.left = Randomize(256) + 256;
			a.destRect.right = a.destRect.left + 32;
			a.destRect.top = -32;
			a.destRect.bottom = 0;
			a.phase = Randomize(8);
			a.horiOff = -4;
			a.vertOff = 2;
			break;
		case 2: 	// balloon
			a.destRect.left = Randomize(400) + 50;
			a.destRect.right = a.destRect.left + 32;
			a.destRect.top = 342;
			a.destRect.bottom = 374;
			a.phase = Randomize(8);
			a.horiOff = 0;
			a.vertOff = -3;
			break;
	}
	a.wholeRect = CopyRect(a.destRect);
	a.tickStamp = Randomize(LoWord(a.delay) + 120) + TickCount() + 60;
}

function DrawRoom(r)
{
	DrawBackground(r);
	DrawObjects(r);
	DrawHeadline(r.roomName);

}

function DrawRoomOffscreen(r)
{
	context = offscreenContext;
    canvas = offscreenCanvas;
    DrawRoom(r);
    context = screenContext;
    canvas = screenCanvas;
}

function ReadyRoom() 
{
	let r = thisHouse.theRooms[roomAt];
	rightIsOpen = r.rightOpen;
	leftIsOpen = r.leftOpen;

	if (r.animateNumber > 0)
	{
		nAnimates = r.animateNumber;
		for (let index = 1; index <= nAnimates; index++)
			ResetAnimate(r.animateKind, index);
	}
	else
		nAnimates = 0;
	bandBorne = false;

	floatPoints.out = false;

	ExtractEventRects(r);
	DrawBackground(r);
	PlayTheMusic();
	DrawObjects(r);
	DrawHeadline(r.roomName);
}

function ShowStartScreen()
{
	let img = artFiles.get(210);
	context.drawImage(img, 0, 0);
}

