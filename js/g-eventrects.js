'use strict';
function SetUpGrease(o, index)
{
    nCycleObs++;
    let co = new CycleRec();
    cycleObjects[nCycleObs] = co;
    if (o.isOn) 
    {
        eventRect[index] = CopyRect(o.boundRect);
        co.kindIs = grease;
        co.tiedTo = index;
        co.wholeRect = CopyRect(eventRect[index]);
        co.reset = 0;				// phase=not spilled
        co.accel = grease;			// graphic # to display
        co.velocity = co.wholeRect.right;// current length of spill
        co.position = o.amount;		// full length of spill
    }
    else				// has been spilled
    {
        co.kindIs = grease;
        co.tiedTo = index;
        co.wholeRect = CopyRect(o.boundRect);

        eventRect[index].left = o.boundRect.right;
        eventRect[index].bottom = o.boundRect.bottom;
        eventRect[index].right = o.amount;
        eventRect[index].top = o.boundRect.bottom - 5;

        co.reset = 999;		// phase=spilled}
        co.accel = 59;		//graphic # to display}
        co.velocity = o.amount;	// current length of spill}
        co.position = o.amount;	// length of spill}
    }
}

function FrameOutlet(o, index)
{
    nCycleObs++;
    let co = new CycleRec();
    cycleObjects[nCycleObs] = co;
    eventRect[index] = CopyRect(o.boundRect);
    co.kindIs = outlet;
    co.tiedTo = index;
    eventKind[co.tiedTo][1] = 0;
    co.accel = 25;
    co.wholeRect = CopyRect(o.boundRect);
    co.reset = o.amount;
    co.position = TickCount();
}

function FrameCandle(o, index)
{
    nCycleObs++;
    let co = new CycleRec();
    cycleObjects[nCycleObs] = co;
    let tempInt = Math.floor((o.boundRect.right + o.boundRect.left) / 2);
    eventRect[index] = SetRect(tempInt - 12, o.amount, tempInt + 4, o.boundRect.top);
    co.wholeRect = CopyRect(o.boundRect);
    co.wholeRect.bottom = co.wholeRect.top;
    co.wholeRect.top = co.wholeRect.bottom - 12;
    co.wholeRect.left = co.wholeRect.left + 5;
    co.wholeRect.right = co.wholeRect.left + 16;
    co.kindIs = candle;
    co.position = Randomize(3) + 48;
}


function FrameDrip(o, index)
{
    nCycleObs++;
    let co = new CycleRec();
    cycleObjects[nCycleObs] = co;
    eventRect[index] = CopyRect(o.boundRect);
    co.kindIs = drip;
    co.tiedTo = index;
    co.holdRect = CopyRect(o.boundRect);
    co.wholeRect = CopyRect(co.holdRect);
    co.reset = o.amount * 32;
    co.accel = 12;
    co.position = co.holdRect.bottom * 32;
    co.velocity = 0;
    co.phase = 53;
}

function ReadyToast(o, index)
{
    nCycleObs++;
    let co = new CycleRec();
    cycleObjects[nCycleObs] = co;
    let tempInt = o.boundRect.left + 3;
    let tempNum = o.boundRect.bottom - 3;
    eventRect[index] = SetRect(0, 0, 32, 31);
    eventRect[index] = OffsetRect(eventRect[index], tempInt, tempNum);
	toastRgn = SetRect(tempInt, o.amount, tempInt + 32, o.boundRect.top);
    hasToast = true;

    co.phase = 60;
    co.kindIs = toastr;
    co.tiedTo = index;
    co.wholeRect = CopyRect(eventRect[index]);
    co.reset = tempNum * 32;
    co.accel = 8;
    co.position = co.reset;
    tempInt = (o.amount + 32) * 32;
    co.velocity = 0;
    do {
        co.velocity +=  co.accel;
        tempInt = tempInt + co.velocity;
    }
    while (tempInt <= co.reset);
    co.velocity = -co.velocity;
}


function FrameBall(o, index)
{
	nCycleObs++;
	let co = new CycleRec();
	cycleObjects[nCycleObs] = co;
	eventRect[index] = CopyRect(o.boundRect);
    co.kindIs = ball;
    co.tiedTo = index;
    co.wholeRect = CopyRect(o.boundRect);
    co.reset = o.boundRect.bottom * 32;
    co.accel = 8;
    co.position = co.reset;
    let tempInt = (o.amount + 32) * 32;
    co.velocity = 0;
    do{
    	co.velocity += co.accel;
        tempInt +=co.velocity;
    }
    while (tempInt <= co.reset);
    co.velocity = -co.velocity;
}

function ReadyFish(o, index)
{
	nCycleObs++;
	let co = new CycleRec();
	cycleObjects[nCycleObs] = co;
	let tempInt = o.boundRect.left + 8;
	let tempNum = o.boundRect.top + 24;
	eventRect[index] = SetRect(0, 0, 16, 16);		// fish rectangle
	eventRect[index] = OffsetRect(eventRect[index], tempInt, tempNum);

	co.phase = 69;				// # of fish rect
	co.kindIs = fshBwl;
	co.tiedTo = index;
	co.wholeRect = CopyRect(eventRect[index]);
	co.reset = tempNum * 32;
	co.accel = 8;
	co.position = co.reset;
	tempInt = (o.amount + 32) * 32;
	co.velocity = 0;
	do
	{
		co.velocity += co.accel;
		tempInt += co.velocity;
	}
	while (tempInt <= co.reset);
	co.velocity = -co.velocity;
}

function ReadyTea(o, index)
{
	nCycleObs++;
	let co = new CycleRec();
	cycleObjects[nCycleObs] = co;

	let tempInt = o.boundRect.left;
	let tempNum = o.boundRect.top;
	eventRect[index] = SetRect(tempInt - 128, tempNum - 128, tempInt, tempNum);
	if (eventRect[index].top < kCeilingVert)
		eventRect[index].top = kCeilingVert;
	if (eventRect[index].left < 0)
		eventRect[index].left = 0;

	co.phase = 0;
	co.kindIs = teaKtl;
	co.tiedTo = index;
	co.wholeRect = SetRect(0, 0, 0, 0);
	co.position = o.amount;
	co.reset = co.position + Randomize(120);
}

function FrameWindow(o, index)
{
	let topRect = CopyRect(nullRect);
	let bottomRect = CopyRect(nullRect);

	nObjects --;
	if (o.isOn)
	{
		topRect = CopyRect(o.boundRect);	// create top opening
		topRect = InsetRect(topRect, 8, 16);
		topRect.top = Math.floor((o.boundRect.bottom + o.boundRect.top) / 2) - 2;
		topRect = OffsetRect(topRect, 0, 26 - Math.floor((o.boundRect.bottom - o.boundRect.top) / 2));
		topRect = InsetRect(topRect, 10, 10);
		bottomRect = CopyRect(o.boundRect);		//create bottom opening
		bottomRect = InsetRect(bottomRect, 8, 16);
		bottomRect.top = Math.floor((o.boundRect.bottom + o.boundRect.top) / 2) + 10;
		windowOpen = true;
	}
	else
	{
		topRect = CopyRect(o.boundRect);		//create top opening
		topRect = InsetRect(topRect, 8, 16);
		topRect.bottom = Math.floor((o.boundRect.bottom + o.boundRect.top) / 2) + 2;
		topRect = InsetRect(topRect, 10, 10);
		bottomRect = CopyRect(o.boundRect);		//create bottom opening
		bottomRect = InsetRect(bottomRect, 8, 16);
		bottomRect.top = Math.floor((o.boundRect.bottom + o.boundRect.top) / 2) - 2;
		bottomRect = InsetRect(bottomRect, 10, 10);
	}
	windowRgn[0] = CopyRect(topRect);
	windowRgn[1] = CopyRect(bottomRect);

	let tempRect = new Rect(
		Math.min(topRect.top, bottomRect.top),
		Math.min(topRect.left, bottomRect.left),
		Math.max(topRect.bottom, bottomRect.bottom),
		Math.max(topRect.right, bottomRect.right)
	);
	let tempInt = Math.floor((tempRect.bottom - tempRect.top) / 7);
	
	let l = theLightning;

	for(let i = 1; i <= 3; i++)
	{
		l.theBolts[i][0][0] = tempRect.left + Randomize(tempRect.right - tempRect.left);
		l.theBolts[i][0][1] = tempRect.top;
		for(let joint = 1; joint <= 7; joint++)
		{
			do
			{
				l.theBolts[i][joint][0] = l.theBolts[i][joint - 1][0] + Randomize(tempInt * 4) - tempInt * 2;
				l.theBolts[i][joint][1] = tempInt * joint + tempRect.top;
			}
			while ((l.theBolts[i][joint][0] <= tempRect.left) || (l.theBolts[i][joint][0] >= tempRect.right));
		}
	}
	l.whichBolt = Randomize(3) + 1;
	l.whatTime = TickCount() + 120 + Randomize(120);
	l.whatPhase = 0;

    hasWindow = true;
}

function FrameMirror(o, index)
{
    nObjects--;

    let tempRect = CopyRect(o.boundRect);
	tempRect = InsetRect(tempRect, 5, 5);
	mirrorRgn = CopyRect(tempRect);
    hasMirror = true;
}

function ExtractEventRects(r)
{

	let tempInt = 0;
	let br = null;
	hasMirror = false;
	hasWindow = false;
	hasToast = false;
	windowOpen = false;
	lightsOut = (r.conditionCode == 2);
	airOut = (r.conditionCode == 1);

	nCycleObs = 0;
	nObjects = thisHouse.theRooms[roomAt].numberOfObjects;
	let tempNum = nObjects;
	for(let [index, o] of r.theObjects.entries())
	{
		if(o == null)
			continue;
		switch(o.objectIs)
		{
			case table:
			case shelf:
			case books:
			case cabnet:
			case extRct:
			case obsRct:
					eventRect[index] = CopyRect(o.boundRect);
					break;
			case flrVnt: 
				tempInt = Math.floor((o.boundRect.right + o.boundRect.left) / 2);
				eventRect[index] = SetRect(tempInt - 8, o.amount, tempInt + 8, kFloorVert);
				break;
			case celVnt: 
				tempInt = Math.floor((o.boundRect.right + o.boundRect.left) / 2);
				eventRect[index] = SetRect(tempInt - 8, kCeilingVert, tempInt + 8, o.amount);
				break;
			case celDct: 
				if (o.isOn)
				{
					tempInt = Math.floor((o.boundRect.right + o.boundRect.left) / 2);
					eventRect[index] = SetRect(tempInt - 8, kCeilingVert, tempInt + 8, o.amount);
				}
				else
				{
					eventRect[index] = CopyRect(o.boundRect);
					eventRect[index].bottom = eventRect[index].top + 8;
				}
				break;
			case candle: 
				FrameCandle(o, index);
				break;
			case lftFan: 
				eventRect[index] = SetRect(o.amount, o.boundRect.top + 10, o.boundRect.left, o.boundRect.top + 30);
				break;
			case ritFan: 
				eventRect[index] = SetRect(o.boundRect.right, o.boundRect.top + 10, o.amount, o.boundRect.top + 30);
				break;
			case clock:
			case paper: 
				eventRect[index] = CopyRect(o.boundRect);
				break;
			case grease: 
				SetUpGrease(o, index);
				break;
			case bnsRct:
			case battry:
			case rbrBnd:
			case litSwt:
			case thermo:
			case pwrSwt:
				eventRect[index] = CopyRect(o.boundRect);
				break;
			case shredr: 
				eventRect[index] = CopyRect(o.boundRect);
				eventRect[index].top = eventRect[index].top - 4;
				eventRect[index].bottom = eventRect[index].bottom - 12;
				break;
			case outlet: 
				FrameOutlet(o, index);
				break;
			case guitar: 
				br = o.boundRect;
				eventRect[index] = SetRect(br.left + 36, br.top + 24, br.left + 38, br.bottom - 56);
				break;
			case ball: 
				FrameBall(o, index);
				break;
			case drip: 
				FrameDrip(o, index);
				break;
			case toastr: 
				ReadyToast(o, index);
				break;
			case fshBwl: 
				ReadyFish(o, index);
				break;
			case teaKtl: 
				ReadyTea(o, index);
				break;
			case wind: 
				FrameWindow(o, index);
				break;
			case paintg: 
				nObjects = nObjects - 1;
				break;
			case mirror: 
				FrameMirror(o, index);
				break;
			case basket:
			case macTsh: 
				eventRect[index] = CopyRect(o.boundRect);
				break;
			case upStar: 
				br = o.boundRect;
				eventRect[index] = SetRect(br.left + 32, br.top, br.right - 32, br.top + 8);
				break;
			case dnStar: 
				br = o.boundRect;
				eventRect[index] = SetRect(br.left + 32, br.bottom - 8, br.right - 32, br.bottom);
				break;
			default:
				eventRect[index] = CopyRect(nullRect);
				break;
		}	// switch

		eventKind[index][1] = 0;
		switch(o.objectIs)
		{
			case table:
			case shelf:
			case books:
			case cabnet:
			case obsRct:
			case drip:
			case toastr:
			case ball:
			case fshBwl:
			case basket:
			case macTsh: 
				eventKind[index][0] = crashIt;
				break;
			case extRct: 
				eventKind[index][0] = moveIt;
				eventKind[index][1] = o.amount;
				break;;
			case flrVnt: 
				eventKind[index][0] = liftIt;
				break;
			case celVnt: 
				eventKind[index][0] = dropIt;
				break;
			case celDct: 
				if (o.isOn)
					eventKind[index][0] = dropIt
				else
				{
					eventKind[index][0] = moveIt;
					eventKind[index][1] = o.extra;
				}
				break;
			case candle: 
				eventKind[index][0] = burnIt;
				eventKind[index][1] = o.boundRect.bottom - 48;
				break;
			case lftFan: 
				if (o.isOn)
					eventKind[index][0] = turnItLeft
				else
					eventKind[index][0] = ignoreIt;
				break;
			case ritFan: 
				if (o.isOn)
					eventKind[index][0] = turnItRight
				else
					eventKind[index][0] = ignoreIt;
				break;
			case clock: 
				eventKind[index][0] = awardIt;
				eventKind[index][1] = o.amount;
				if (o.amount < 1)
					eventRect[index] = CopyRect(nullRect);
				break;
			case paper: 
				eventKind[index][0] = extraIt;
				eventKind[index][1] = o.amount;
				if (o.amount < 1)
					eventRect[index] = CopyRect(nullRect);
				break;
			case grease: 
				if (o.isOn)
					eventKind[index][0] = spillIt
				else
					eventKind[index][0] = slideIt;
					break;
			case bnsRct: 
				eventKind[index][0] = trickIt;
				eventKind[index][1] = o.amount;
				if (o.amount < 1)
					eventRect[index] = CopyRect(nullRect);
					break;
			case battry: 
				eventKind[index][0] = energizeIt;
				eventKind[index][1] = o.amount;
				if (o.amount < 1)
					eventRect[index] = CopyRect(nullRect);
				break;
			case rbrBnd: 
				eventKind[index][0] = bandIt;
				eventKind[index][1] = o.amount;
				if (o.amount < 1)
					eventRect[index] = CopyRect(nullRect);
					break;
			case litSwt: 
				eventKind[index][0] = lightIt;
				break;
			case outlet: 
				eventKind[index][0] = zapIt;
				break;
			case thermo: 
				eventKind[index][0] = airOnIt;
				break;
			case shredr: 
				if (o.isOn)
					eventKind[index][0] = shredIt
				else
					eventKind[index][0] = ignoreIt;
					break;
			case pwrSwt: 
				eventKind[index][0] = toggleIt;
				eventKind[index][1] = o.amount;	//object# linked to}
				eventKind[index][2] = TickCount();//delay from when hit}
				break;
			case guitar: 
				eventKind[index][0] = playIt;
				eventKind[index][1] = 0;
				break;
			case upStar: 
				eventKind[index][0] = ascendIt;
				eventKind[index][1] = o.amount;	//room # linked to}
				break;
			case dnStar: 
				eventKind[index][0] = descendIt;
				eventKind[index][1] = o.amount;	// room # linked to}
				break;
			default:
				eventKind[index][0] = ignoreIt;
				break;
		}	//switch
	}
}
