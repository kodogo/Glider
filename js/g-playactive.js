'use strict';
let timeIs = 0;
let hotRect = new Rect(0, 0, 0, 0);
let sliding = false;


function RemoveObject(o, theRect)
{
	o.isVisible = false;
}

function FloatTheScore(whatPoints)
{
	floatPoints.out = true;
	floatPoints.whereR = CopyRect(theGlider.destRect);
	floatPoints.whereR.top = floatPoints.whereR.bottom
	floatPoints.whereR.bottom = floatPoints.whereR.top + 12;
	PenNormal();
	context.font = '12px verdana';
	MoveTo(floatPoints.whereR.left, floatPoints.whereR.bottom - 2);
	RGBForeColor(rgbYellow);
	floatPoints.saysWhat = whatPoints.toString();
	DrawString(floatPoints.saysWhat);
	PenNormal();
	RGBForeColor(rgbBlack);
	floatPoints.tickStamp = TickCount() + 120;
}

function Collision (whatKind, who)
{
	let tempInt = 0;
	let o = thisHouse.theRooms[roomAt].theObjects[who];
	switch(whatKind)
	{
	case ignoreIt: 
		break;

	case crashIt: 
		lifeNormal =false;

		DoTheSound(1);
		theGlider.mode = fadingOut;
		theGlider.destRect.top = theGlider.destRect.bottom - 20;
		if (theGlider.isForward)
			theGlider.srcNum = 0
		else
			theGlider.srcNum = 2;
		break;

	case liftIt: 
		if (! airOut)
			liftAmount = -7;
		break;
	case dropIt: 
		if (! airOut)
			liftAmount = 7;
		break;
	case moveIt: 
		DoTheSound(16);
		Transport(eventKind[who][1]);
		hotRect = CopyRect(nullRect);			// don't die in rest of SearchRects}
		break;

	case turnItLeft: 
		shiftAmount = -7;
		if ((lifeNormal) && (theGlider.isRight))
		{
			lifeNormal = false;
			theGlider.mode = turnRt2Lf;
		}
		break;

	case turnItRight: 
		shiftAmount = 7;
		if ((lifeNormal) && (!theGlider.isRight))
		{
			lifeNormal = false;
			theGlider.mode = turnLf2Rt;
		}
		break;

	case burnIt: 
		liftAmount = -7;
		if ((lifeNormal) && (theGlider.destRect.bottom > eventKind[who][1])) 
		{
			DoTheSound(8);
			lifeNormal = false;
			if (theGlider.isRight)
				theGlider.phase = 1;
			theGlider.mode = burning;
			theGlider.timeStamp = TickCount() + 300;
			theGlider.destRect.top = theGlider.destRect.bottom - 36;
		}
		break;

	case awardIt:		// clock
		if (eventKind[who][1] != 0)
		{
			DoTheSound(5);
			StartScoreRolling();
			suppScore = suppScore + eventKind[who][1];
			let tempRect = UnionRect(eventRect[who], theGlider.wholeRect);
			RemoveObject(o, tempRect);
			FloatTheScore(eventKind[who][1]);
			eventKind[who][1] = 0;
			o.amount = 0;
		}
		break;

	case extraIt:		// folded piece of paper
		if (eventKind[who][1] != 0)
		{
			DoTheSound(10);
			StartScoreRolling();
			suppScore = suppScore + eventKind[who][1];
			FloatTheScore(eventKind[who][1]);
			eventKind[who][1] = 0;
			thisHouse.theRooms[roomAt].theObjects[who].amount = 0;
			mortals++;
			let tempRect = UnionRect(eventRect[who], theGlider.wholeRect);
			RemoveObject(o, tempRect);
			DrawRemainingGliders();
		}
		break;

	case spillIt: 		// grease upright
		eventRect[who].left = eventRect[who].right;
		eventRect[who].right = eventRect[who].right;
		eventRect[who].top = eventRect[who].bottom - 5;
		eventKind[who][0] = ignoreIt;	// signal to the cycleOb loop that a spill has occurred
		thisHouse.theRooms[roomAt].theObjects[who].isOn = false;
		break;

	case slideIt: 		//grease spilt
		let tempInt = eventRect[who].top - theGlider.touchRect.bottom + 1;
		theGlider.destRect.top = theGlider.destRect.top + tempInt;
		theGlider.destRect.bottom = theGlider.destRect.bottom + tempInt;
		theGlider.touchRect.top = theGlider.touchRect.top + tempInt;
		theGlider.touchRect.bottom = theGlider.touchRect.bottom + tempInt;
		sliding = true;
		break;

	case bandIt: 			// rubber bands
		if (eventKind[who][1] != 0)
		{
			DoTheSound(12);
			theGlider.bands = theGlider.bands + eventKind[who][1];
			FloatTheScore(eventKind[who][1]);
			eventKind[who][1] = 0;
			thisHouse.theRooms[roomAt].theObjects[who].amount = 0;
			let tempRect = UnionRect(eventRect[who], theGlider.wholeRect);
			RemoveObject(o, tempRect);
		}
		break;

	case energizeIt: 		// battery
		if (eventKind[who][1] != 0)
		{
			DoTheSound(9);
			theGlider.energy = theGlider.energy + eventKind[who][1];
			FloatTheScore(eventKind[who][1]);
			eventKind[who][1] = 0;
			thisHouse.theRooms[roomAt].theObjects[who].amount = 0;
			let tempRect = UnionRect(eventRect[who], theGlider.wholeRect);
			RemoveObject(o, tempRect);
		}
		break;

	case trickIt: 		// good move!
		if (eventKind[who][1] != 0)
		{
			DoTheSound(kWhistleSound);
			StartScoreRolling();
			suppScore = suppScore + eventKind[who][1];
			FloatTheScore(eventKind[who][1]);
			eventKind[who][1] = 0;
		}
		break;

	case lightIt: 
		if (lightsOut)
		{
			DoTheSound(18);
			lightsOut = false;
			thisHouse.theRooms[roomAt].conditionCode = 0;
			let r = thisHouse.theRooms[roomAt];
			DrawBackground(r);
			DrawObjects(r);
			DrawHeadline(r.roomName);
		}
		break;

	case airOnIt: 
		if (airOut)
		{
			DoTheSound(3);
			airOut = false;
		}
		break;

	case zapIt: 
		if (eventKind[who][1] != 0)
		{
			lifeNormal = false;
			DoTheSound(24);
			theGlider.mode = fadingOut;
			theGlider.destRect.top = theGlider.destRect.bottom - 20;
			if (theGlider.isForward)
				theGlider.srcNum = 0
			else
				theGlider.srcNum = 2;
		}
		break;

	case toggleIt: 
		if (eventKind[who][2] < TickCount())
		{
			DoTheSound(18);
			let tempInt = eventKind[who][1];
			let o = thisHouse.theRooms[roomAt].theObjects[tempInt];
			if(o == null)
				break;
			o.isOn = !o.isOn;
			switch(o.objectIs)
			{
				case lftFan: 
					if (eventKind[tempInt][0] == ignoreIt)
					{
						DoTheSound(3);
						eventKind[tempInt][0] = turnItLeft;
					}
					else
						eventKind[tempInt][0] = ignoreIt;
					break;
				case ritFan: 
					if (eventKind[tempInt][0] == ignoreIt)
					{
						DoTheSound(3);
						eventKind[tempInt][0] = turnItRight;
					}
					else
						eventKind[tempInt][0] = ignoreIt;
					break;
				case shredr: 
					if (eventKind[tempInt][0] == ignoreIt)
						eventKind[tempInt][0] = shredIt
					else
						eventKind[tempInt][0] = ignoreIt;
					break;
			}
			eventKind[who][2] = TickCount() + 90;
		}
		break;

	case playIt: 
		if (eventKind[who][1] < TickCount())
		{
			DoTheSound(15);
			eventKind[who][1] = TickCount() + 120;
		}
		break;

	case ascendIt: 
		lifeNormal = false;
		theGlider.mode = ascending;
		UpAFlight(eventKind[who][1]);
		hotRect = CopyRect(nullRect);			// don't die in rest of SearchRects
		break;

	case descendIt: 
		lifeNormal = false;
		theGlider.mode = descending;
		DownAFlight(eventKind[who][1]);
		hotRect = CopyRect(nullRect);			// don't die in rest of SearchRects}
		break;

	case shredIt: 
		lifeNormal = false;
		theGlider.mode = shredding;
		theGlider.destRect.top = eventRect[who].bottom;
		theGlider.destRect.bottom = theGlider.destRect.top;
		theGlider.destRect.left = eventRect[who].left + 12;
		theGlider.destRect.right = theGlider.destRect.left + 48;
		theGlider.shadoDest.left = theGlider.destRect.left;
		theGlider.shadoDest.right = theGlider.destRect.right;
		theGlider.phase = 0;
		break;

	case steamIt: 
		liftAmount = -7;
		shiftAmount = -7;
		break;
	}
}


function RectLap(r1, r2)
{
	return !((r2.left > r1.right || 
			 r2.right < r1.left || 
			 r2.top > r1.bottom ||
			 r2.bottom < r1.top));
}

function BiteIt()
{
	DoTheSound(1);
	lifeNormal = false;
	theGlider.mode = fadingOut;
	theGlider.destRect.top = theGlider.destRect.bottom - 20;
	if (theGlider.isForward)
		theGlider.srcNum = 0;
	else
		theGlider.srcNum = 2;
}

function GetItLegal(outside)
{
	theGlider.destRect.left += outside;
	theGlider.destRect.right += outside;
	theGlider.shadoDest.left += outside;
	theGlider.shadoDest.right += outside;
	theGlider.touchRect.left += outside;
	theGlider.touchRect.right += outside;
}

function SearchRects()
{
	let outside = 0;
	hotRect = CopyRect(theGlider.touchRect);	//get 'hot rect'
	if (rightIsOpen)					// check right edge
	{
		if (theGlider.destRect.left > 500)
		{
			AdvanceARoom();
			return;
		}
	}
	else if (theGlider.destRect.right > 512)
	{
		outside = 512 - theGlider.destRect.right;
		GetItLegal(outside);
	}
	if (leftIsOpen)					// check left edge}
	{
		if (theGlider.destRect.right < 12)
		{
			RetreatARoom();
			return;
		}
	}
	else if (theGlider.destRect.left < 0)
	{
		outside = -theGlider.destRect.left;
		GetItLegal(outside);
	}
	if (theGlider.destRect.bottom > kFloorLimit)	// check floor
	{
		BiteIt();
		return;
	}

	shiftAmount = 0;

	for (let index = 1; index <= nObjects; index++) {
		if (RectLap(eventRect[index], hotRect))
			Collision(eventKind[index][0], index);
	}

	if (nAnimates != 0)
		for (let index = 1; index <= nAnimates; index++)
			if (RectLap(theAnimates[index].destRect, hotRect))
			{
				BiteIt();
				return;
			}
}

function HandleBand()
{
	if ((theBand.whole.left > 512) || (theBand.whole.left < -16))
		bandBorne = false;

	theBand.phase++;;
	if (theBand.phase > 2)
		theBand.phase = 0;
	theBand.whole = CopyRect(theBand.dest);
	theBand.dest.left += theBand.velocity;
	theBand.dest.right += theBand.velocity;
	if (theBand.velocity > 0)
		theBand.whole.right += theBand.velocity
	else
		theBand.whole.left += theBand.velocity;

	if (nAnimates > 0)
	{
		for (let index = 1; index <= nAnimates; index++)
		{
			let a = theAnimates[index];
			if ((a.vertOff != 12) && (RectLap(a.destRect, theBand.dest)))
			{
				switch(a.kind)
				{
					case 0: 
					case 1:
						DoTheSound(6);
						break;
					case 2: 
						DoTheSound(19);
						break;
				}
				a.phase = -1;
				StartScoreRolling();
				suppScore = suppScore + 100 * (3 - a.kind);
				a.horiOff = 0;
				a.vertOff = 12;
			}
		}
	}
}

function PushIt(howFast)
{
	if (theGlider.energy > 0)
	{
		if(!cheatMode)
			theGlider.energy--;
		DoTheSound(26);

		theGlider.forVel = howFast;
	}
}

function FireBand()
{
	if (theGlider.bands > 0)
	{
		DoTheSound(11);
		if(!cheatMode)
			theGlider.bands --;

		if (theGlider.bands == 0)
		{
			theBand.dest = SetRect(346, 5, 368, 20);
			FillRect(theBand.dest, rgbBlack);
		}
		bandBorne = true;
		theBand.dest.top = theGlider.destRect.top + 6;
		theBand.dest.bottom = theBand.dest.top + 7;
		if (theGlider.isRight)
		{
			theBand.dest.left = theGlider.destRect.right;
			theBand.velocity = 16;
		}
		else
		{
		theBand.dest.left = theGlider.destRect.left - 16;
		theBand.velocity = -16;
		}
		theBand.dest.right = theBand.dest.left + 16;
		theBand.whole = CopyRect(theBand.dest);
	}
}


function GetInput()
{
	if(controlMethod == holdKey)
	{
		if (theKeys[leftKey]) 
		{
			if (theGlider.isRight) 
			{
				theGlider.isForward = false;
				theGlider.srcNum = 1;
				theGlider.forVel = -kMaxThrust;
			}
			else
			{
				theGlider.isForward = true;
				theGlider.srcNum = 2;
				theGlider.forVel = -kMaxThrust;
			}
		}
		else if (theKeys[rightKey]) 
		{
			if (theGlider.isRight)
			{
				theGlider.isForward = true;
				theGlider.srcNum = 0;
				theGlider.forVel = kMaxThrust;
			}
			else
			{
				theGlider.isForward = false;
				theGlider.srcNum = 3;
				theGlider.forVel = kMaxThrust;
			}
		}
		else
		{	// no key of import down
		
			if (theGlider.isRight)
			{
				theGlider.isForward = true;
				theGlider.srcNum = 0;
				theGlider.forVel = 0;
			}
			else
			{
				theGlider.isForward = true;
				theGlider.srcNum = 2;
				theGlider.forVel = 0;
			}
		}

		if (theKeys[bandKey] && (!bandBorne))		// fire rubber bands
			FireBand();
		if (theKeys[energyKey])
		{
			if (((theGlider.isRight) && (theGlider.isForward)) ||
				((! theGlider.isRight) && (! theGlider.isForward)))
				PushIt(16)
			else
				PushIt(-16);
		}
	}
	else if (controlMethod == dropKey)
	{
		if (((theGlider.isRight) && (theGlider.isForward)) || 
			((! theGlider.isRight) && (! theGlider.isForward)))
			theGlider.forVel = kMaxThrust
		else
			theGlider.forVel = -kMaxThrust;
		if (theKeys[leftKey]) 
		{
			if (theGlider.isRight) 
			{
			begin
				theGlider.isForward = false;
				theGlider.theGlider.srcNum = 1;
				theGlider.forVel = -kMaxThrust;
			}
			else
			{
				theGlider.isForward = true;
				theGlider.srcNum = 2;
				theGlider.forVel = -kMaxThrust;
			}
		}
		else if (theKeys[rightKey]) 
		{
			if (theGlider.isRight)
			{
				theGlider.isForward = true;
				theGlider.srcNum = 0;
				theGlider.forVel = kMaxThrust;
			}
			else
			{
				theGlider.isForward = false;
				theGlider.srcNum = 3;
				theGlider.forVel = kMaxThrust;
			}
		}
		if (theKeys[bandKey] && (! bandBorne))	//fire rubber bands}
			FireBand();
		if (theKeys[energyKey])
		{
			if (((theGlider.isRight) && (theGlider.isForward)) || 
				((! theGlider.isRight) && (! theGlider.isForward)))
				PushIt(16)
			else
				PushIt(-16);
		}
	}
}

function MoveGlider()
{
	if (windowOpen) // randomly move glider}
	{
		liftAmount += Randomize(11) - 5;
		shiftAmount += Randomize(11) - 5;
	}
	liftAmount = liftAmount + 1;	// add gravity
	if (sliding)
	{
		liftAmount = 0;				//zero out lift}
		sliding = false;
	}
	else
	{						//vertical offset of glider}
		theGlider.destRect.top += liftAmount;
		theGlider.destRect.bottom += liftAmount;
		theGlider.touchRect.top += liftAmount;
		theGlider.touchRect.bottom += liftAmount;
	}

	theGlider.forVel = theGlider.forVel + shiftAmount;	// horizontal offset of glider
	theGlider.destRect.left = theGlider.destRect.left + theGlider.forVel;
	theGlider.destRect.right = theGlider.destRect.right + theGlider.forVel;
	theGlider.touchRect.left = theGlider.destRect.left + 10;	// touch rect is inset from dest
	theGlider.touchRect.right = theGlider.destRect.right - 10;
	theGlider.shadoDest.left = theGlider.destRect.left;			// shadow has same l. & r. as dest
	theGlider.shadoDest.right = theGlider.destRect.right;
}

function MoveAnimates()
{
	let tempRect = new Rect(0, 0, 0, 0);

	for (let index = 1; index <= nAnimates; index++)
	{
		let a = theAnimates[index];
		if (a.unSeen)
		{
			if (TickCount() > a.tickStamp)
			{
				ResetAnimate(-1, index);
				a.unSeen = false;
			}
		}
		else
		{
			if (a.phase > -1)
			{
				a.phase++;
				if (a.phase > 7)
					a.phase = 0;
			}

			a.wholeRect = CopyRect(a.destRect);

			switch(a.kind)
			{
				case 0: 
					a.destRect.left += a.horiOff;
					a.destRect.right += a.horiOff;
					a.destRect.top += a.vertOff;
					a.destRect.bottom += a.vertOff;
					a.wholeRect.left += a.horiOff;
					a.wholeRect.bottom += a.vertOff;
					break;

				case 1: 
					a.destRect.left += a.horiOff;
					a.destRect.right += a.horiOff;
					a.destRect.top += a.vertOff;
					a.destRect.bottom += a.vertOff;
					a.wholeRect.left += a.horiOff;
					a.wholeRect.bottom += a.vertOff;
					break;

				case 2: 
					a.destRect.top += a.vertOff;
					a.destRect.bottom += a.vertOff;
					if (a.vertOff > 0)
						a.wholeRect.bottom += a.vertOff
					else
						a.wholeRect.top += a.vertOff;
					break;
			}

			if ((!a.unseen) &&
				(!RectLap(a.wholeRect, wholeArea)))
			{
				a.tickStamp = TickCount() + a.delay;
				a.destRect = CopyRect(nullRect);
				a.wholeRect = CopyRect(nullRect);
				a.unSeen = true;
			}
		}
	}
}

function MoveCycleObs()
{
	let diff = 0;

for(let index = 1; index <= nCycleObs; index++)
{
	let co = cycleObjects[index];
	switch(co.kindIs)
	{
		case candle: 
			co.position++;
			if (co.position > 50)
				co.position = 48;
			break;

		case grease: 
			if (eventKind[co.tiedTo][0] == ignoreIt)
			{
				DoTheSound(14);
				eventKind[co.tiedTo][0] = slideIt;
				co.reset = 1;
			}
			else if ((co.reset != 0) && (co.reset != 999))
			{
				co.reset++;
				if (co.reset > 4)
				{
					co.velocity++;
					eventRect[co.tiedTo].right++
					if (co.velocity > co.position)
						co.reset = 999;
				}
				else
				{
					if (co.reset < 3)
						co.accel = 58
					else
						co.accel = 59;
				}
			}
			break;

			case outlet: 
				if (co.accel == 25)
				{
					if (TickCount() > co.position)
					{
						co.accel = binaryFlip + 51;	// go into zap mode
						co.position = TickCount();
						eventKind[co.tiedTo][1] = 1;
					}
				}
				else
				{
					if (TickCount() > (co.position + 60))
					{
						co.accel = 25;				// stop zapping
						co.position = TickCount() + co.reset;
						eventKind[co.tiedTo][1] = 0;
					}
					else
					{
						DoTheSound(24);			// zapping
						co.accel = binaryFlip + 51;
					}
				}
				break;

			case drip: 
				if (co.phase < 57)
				{
					if (binaryFlip != 0)
					{
						co.phase++;
						if (co.phase == 57)
							co.position = co.position + 160;
					}
				}
				else
				{
					co.velocity += co.accel;
					co.position += co.velocity;
					if (co.position > co.reset)
					{
						DoTheSound(7);
						co.velocity = 0;
						co.position = co.holdRect.bottom * 32;
						eventRect[co.tiedTo] = CopyRect(co.holdRect);
						co.phase = 53;
					}
					co.wholeRect = CopyRect(eventRect[co.tiedTo]);
					let er = eventRect[co.tiedTo];
					diff = LoWord(co.position >> 5) - er.bottom;
					er.bottom += diff;
					er.top += diff;
					co.wholeRect.bottom += diff
				}
				break;

			case toastr: 
				if (co.phase != 0)
				{
					if (binaryFlip == 0)
					{
						co.phase++;
						if (co.phase > 65)
							co.phase = 60;
					}
					co.velocity += co.accel;
					co.position += co.velocity;
					if (co.position > co.reset)
					{
						DoTheSound(22);
						co.velocity = -co.velocity;
						co.position = co.reset;
						co.reset = TickCount() + thisHouse.theRooms[roomAt].theObjects[co.tiedTo].extra;
						co.phase = 0;
					}
					co.wholeRect = CopyRect(eventRect[co.tiedTo]);
					let er = eventRect[co.tiedTo];
					diff = LoWord(co.position >> 5) - er.bottom;
					er.bottom += diff;
					er.top += diff;
					if (diff > 0)
						co.wholeRect.bottom += diff;
					else
						co.wholeRect.top += diff;
				}
				else
				{
					if (TickCount() > co.reset)
					{
						DoTheSound(23);
						co.reset = co.position;
						co.phase = 60;
					}
				}
				break;
			case ball: 
				co.velocity += co.accel;
				co.position += co.velocity;
				if (co.position > co.reset)
				{
					DoTheSound(4);
					co.velocity = -co.velocity;
					co.position = co.reset;
				}
				co.wholeRect = CopyRect(eventRect[co.tiedTo]);
				let er = eventRect[co.tiedTo];
				diff = LoWord(co.position >> 5) - er.bottom;
				er.bottom += diff;
				er.top += diff;
				if (diff > 0)
					co.wholeRect.bottom += diff
				else
					co.wholeRect.top += diff;
				break;

			case fshBwl: 
				if (co.phase != 0)
				{
					if ((co.velocity > -16) && (co.velocity < 16))
						co.phase = 69;
					else
					{
						if (co.velocity < 0)
							co.phase = 66;
						else
							co.phase = 68;
					}
					co.velocity += co.accel;
					co.position += co.velocity;
					if (co.position > co.reset)
					{
						DoTheSound(7);
						co.velocity = -co.velocity;
						co.position = co.reset;
						co.reset = TickCount() + thisHouse.theRooms[roomAt].theObjects[co.tiedTo].extra;
						co.phase = 0;
					}
					co.wholeRect = CopyRect(eventRect[co.tiedTo]);
					let er = eventRect[co.tiedTo];
					{
						diff = LoWord(co.position >> 5) - er.bottom;
						er.bottom += diff;
						er.top += diff;
					}
					if (diff > 0)
						co.wholeRect.bottom += diff;
					else
						co.wholeRect.top += diff;
				}
				else
				{
					if (TickCount() > co.reset)
					{
						DoTheSound(7);
						co.reset = co.position;
						co.phase = 66;
					}
				}
				break;

			case teaKtl: 
				if (TickCount() > co.reset)
				{
					eventKind[co.tiedTo][0] = steamIt;
					if (co.phase == 0)
						DoTheSound(25);
					co.phase = co.phase + 1;
					if (co.phase > 10)
					{
						co.phase = 0;
						eventKind[co.tiedTo][0] = ignoreIt;
						co.reset = TickCount() + co.position;
					}
				}
				break;
		}			
	}
}


function MonitorStorm()
{
	if (theLightning.whatPhase == 0)
	{
		if (TickCount() > theLightning.whatTime)
			theLightning.whatPhase = 1;
	}
	else if (theLightning.whatPhase > 3)
	{
		theLightning.whatPhase = 0;
		theLightning.whichBolt = Randomize(3) + 1;
		theLightning.whatTime = TickCount() + Randomize(300);
			DoTheSound(17);
	}
	else
		theLightning.whatPhase++;
}

function DrawCScene()
{
	let tempInt = 0;
	DrawRoom(thisHouse.theRooms[roomAt]);

	if ((hasWindow) && (theLightning.whatPhase != 0))
	{
		// Save the context and set the clip region for lightning
		context.save();
		context.beginPath();
		for(let r of windowRgn)
		{
			if(r != null)
			{
				let x = r.left;
				let y = r.top;
				let w = r.right - x + 1;
				let h = r.bottom - y + 1;
				context.rect(x, y, w, h);
			}
		}
		context.clip();
		PenNormal();
		if (theLightning.whatPhase == 4)
			context.fill();
		else
		{
			context.beginPath();
			context.lineWidth = 2;
			context.strokeStyle = rgbWhite;
			let bolt = theLightning.whichBolt;
			MoveTo(theLightning.theBolts[bolt][0][0], theLightning.theBolts[bolt][0][1]);
			for(let index = 1; index < 8; index++)
			{
				LineTo(theLightning.theBolts[bolt][index][0], theLightning.theBolts[bolt][index][1]);
				//Move(0, 2);
			}
			context.stroke();
		}
	context.restore();
	}

	//-----pop masks on-----
	if (hasMirror)
	{
			let tempSmRect = CopyRect(theGlider.destRect);
			tempSmRect.left = tempSmRect.left - 32;
			tempSmRect.right = tempSmRect.right - 32;
			tempSmRect.top = tempSmRect.top - 32;
			tempSmRect.bottom = tempSmRect.bottom - 32;
			context.save();
			context.beginPath();
			let x = mirrorRgn.left;
			let y = mirrorRgn.top;
			let w = mirrorRgn.right - x + 1;
			let h = mirrorRgn.bottom - y + 1;
			context.rect(x, y, w, h);
			context.clip();
			DrawMaskedObject(glideRct[theGlider.srcNum], glideRct[theGlider.srcNum], tempSmRect);
			context.restore();
	}

	if (nCycleObs > 0)
		for(let index = 1; index <= nCycleObs; index++)
		{
			let co = cycleObjects[index];
			switch(co.kindIs)
			{
				case candle:
					DrawMaskedObject(srcRect[co.position], srcRect[co.position], co.wholeRect);
					break;
				case outlet:
				case grease: 
					DrawMaskedObject(srcRect[co.accel], srcRect[co.accel], co.wholeRect);
					break;
				case ball: 
					DrawMaskedObject(srcRect[co.kindIs], srcRect[co.kindIs], eventRect[co.tiedTo]);
					break;
				case drip: 
					DrawMaskedObject(srcRect[co.phase], srcRect[co.phase], eventRect[co.tiedTo]);
					break;
				case toastr: 
					if(co.phase != 0)
					{
						context.save();
						context.beginPath();
						let x = toastRgn.left;
						let y = toastRgn.top;
						let w = toastRgn.right - x + 1;
						let h = toastRgn.bottom - y + 1;
						context.rect(x, y, w, h);
						context.clip();
						DrawMaskedObject(srcRect[co.phase], srcRect[co.phase], eventRect[co.tiedTo]);
						context.restore();
					}
					break;
				case fshBwl: 
					if (co.phase != 0)
						DrawMaskedObject(srcRect[co.phase], srcRect[co.phase], eventRect[co.tiedTo]);
					else
						DrawMaskedObject(srcRect[69], srcRect[69], eventRect[co.tiedTo]);
					break;
			}
			co.oldRect = CopyRect(co.wholeRect);
		}

	if (theGlider.isRight)
		DrawMaskedObject(shadoRct[0], shadoRct[0], theGlider.shadoDest);
	else
	DrawMaskedObject(shadoRct[1], shadoRct[1], theGlider.shadoDest);
	if (lifeNormal)
		DrawMaskedObject(glideRct[theGlider.srcNum], glideRct[theGlider.srcNum], theGlider.destRect);
	else
		switch(theGlider.mode)
		{
			case fadingIn:
			case fadingOut:
				tempInt = nextPhase[theGlider.mode][theGlider.phase];
				if (! theGlider.isRight)
					tempInt = tempInt + 7;
				DrawMaskedObject(glideRct[srcNum], glideRct[tempInt], theGlider.destRect);
				break;

			case turnLf2Rt:
			case turnRt2Lf: 
				tempInt = nextPhase[theGlider.mode][theGlider.phase];
				DrawMaskedObject(glideRct[tempInt], glideRct[tempInt], theGlider.destRect);
				break;

			case burning:
			case ascending:
			case descending: 
				DrawMaskedObject(glideRct[theGlider.srcNum], glideRct[theGlider.srcNum], theGlider.destRect);
				break;
			
			case shredding: 
				let tempRect = SetRect(256, 208 - (theGlider.destRect.bottom - theGlider.destRect.top), 304, 208);
				DrawMaskedObject(tempRect, tempRect, theGlider.destRect)
				break;
		}

		if (nAnimates > 0)
			for(let index = 1; index <= nAnimates; index++)
				{
					let a = theAnimates[index];
					let p = a.phase;
					if(p < 0)
						p = animateCrushed;

					DrawMaskedObject(animateRct[a.kind][p], animateRct[a.kind][p], a.destRect);
					a.oldRect = CopyRect(a.wholeRect);
				}

		if (bandBorne)
		{
			DrawMaskedObject(bandRct[theBand.phase], bandRct[theBand.phase], theBand.dest);
			theBand.old = CopyRect(theBand.dest);
		}

	//-----pop to visible screen-----
	if (floatPoints.out)
	{
		if(TickCount() > floatPoints.tickStamp)
		{
			floatPoints.out = false;
		}
		else
		{
			PenNormal();
			floatPoints.whereR.right += 2;
			floatPoints.whereR.left += 2;
			floatPoints.whereR.top -= 1;
			floatPoints.whereR.bottom -= 1;
			context.font = '12px verdana';
			MoveTo(floatPoints.whereR.left, floatPoints.whereR.bottom - 2);
			if (binaryFlip == 0)
				RGBForeColor(rgbBlue)
			else
				RGBForeColor(rgbRed);
			DrawString(floatPoints.saysWhat);
			PenNormal();
			RGBForeColor(rgbBlack);
		}
	}

	if (nCycleObs > 0)
		for(let index = 1; index <= nCycleObs; index++)
		{
			let co = cycleObjects[index];
			if(co.kindIs == grease)
			{
					PenNormal();
					context.lineWidth = 2;
					context.beginPath();
					MoveTo(co.wholeRect.right, co.wholeRect.bottom - 1);
					if (co.velocity > co.wholeRect.right + 1)
						LineTo(co.velocity + 1, co.wholeRect.bottom - 1);
					context.stroke();
					PenNormal();
			}
		}
}

function DoSpecial()
{
	switch(theGlider.mode)
	{
		case fadingIn: 
			if (theGlider.phase == 1)
				DoTheSound(2);	
			theGlider.phase++;
			if (theGlider.phase > 16)
			{
				if (theGlider.isRight)
					theGlider.srcNum = 0
				else
					theGlider.srcNum = 2;
				lifeNormal = true;
				theGlider.phase = 0;
				theGlider.mode = normal;
			}
			break;
		case fadingOut: 
			theGlider.phase++;
			if (theGlider.isRight)
				theGlider.srcNum = 0
			else
				theGlider.srcNum = 2;
			if (theGlider.phase > 16)
				OffAMortal();
				break;
		case turnRt2Lf: 
			theGlider.phase++;
			if (theGlider.phase > 11)
			{
				lifeNormal = true;
				theGlider.phase = 0;
				theGlider.mode = normal;
				shiftAmount = 0;
				theGlider.isRight = false;
			}
			SearchRects();
			theGlider.destRect.left += shiftAmount;
			theGlider.destRect.right += shiftAmount;
			theGlider.touchRect.left += shiftAmount;
			theGlider.touchRect.right += shiftAmount;
			theGlider.shadoDest.left += shiftAmount;
			theGlider.shadoDest.right += shiftAmount;
			break;
		case turnLf2Rt: 
			theGlider.phase++;
				if (theGlider.phase > 11)
				{
					lifeNormal = true;
					theGlider.phase = 0;
					theGlider.mode = normal;
					shiftAmount = 0;
					theGlider.isRight = true;
				}
				SearchRects();
				theGlider.destRect.left += shiftAmount;
				theGlider.destRect.right += shiftAmount;
				theGlider.touchRect.left += shiftAmount;
				theGlider.touchRect.right += shiftAmount;
				theGlider.shadoDest.left += shiftAmount;
				theGlider.shadoDest.right += shiftAmount;
				break;
		case burning: 
			theGlider.phase = 1 - theGlider.phase;
			if (theGlider.isRight)
			{
				theGlider.srcNum = 24 + theGlider.phase;
				theGlider.forVel = 1;
			}
			else
			{
				theGlider.srcNum = 26 + theGlider.phase;
				theGlider.forVel = -1;
			}
			SearchRects();
			MoveGlider();
			if (TickCount() > theGlider.timeStamp)
			{
				DoTheSound(1);
				theGlider.mode = fadingOut;
				theGlider.phase = 0;
				theGlider.destRect.top = theGlider.destRect.bottom - 20;
				if (theGlider.isForward)
					theGlider.srcNum = 0
				else
					theGlider.srcNum = 2;
			}
			break;
		case ascending: 
			theGlider.destRect.left = theGlider.destRect.left - 2;
			theGlider.destRect.right = theGlider.destRect.left + 48;
			theGlider.destRect.top = theGlider.destRect.top - 6;
			theGlider.destRect.bottom = theGlider.destRect.top + 20;
			theGlider.shadoDest.left = theGlider.destRect.left;
			theGlider.shadoDest.right = theGlider.destRect.right;
			theGlider.touchRect = CopyRect(theGlider.destRect);
			theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);
			if (theGlider.destRect.top < 220)
			{
				lifeNormal = true;
				theGlider.phase = 0;
				theGlider.mode = normal;
			}
			break;
		case descending: 
			theGlider.destRect.left = theGlider.destRect.left + 2;
			theGlider.destRect.right = theGlider.destRect.left + 48;
			theGlider.destRect.top = theGlider.destRect.top + 6;
			theGlider.destRect.bottom = theGlider.destRect.top + 20;
			theGlider.shadoDest.left = theGlider.destRect.left;
			theGlider.shadoDest.right = theGlider.destRect.right;
			theGlider.touchRect = CopyRect(theGlider.destRect);
			theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);
			if (theGlider.destRect.top > 120)
			{
				lifeNormal = true;
				theGlider.phase = 0;
				theGlider.mode = normal;
			}
			break;
		case shredding: 
			if (theGlider.phase == 0)
			{
				DoTheSound(20);
				theGlider.destRect.bottom = theGlider.destRect.bottom + 1;
				if (theGlider.destRect.bottom >= theGlider.destRect.top + 36)
				theGlider.phase = 1;
			}
			else
			{
				theGlider.destRect.top = theGlider.destRect.top + 8;
				theGlider.destRect.bottom = theGlider.destRect.bottom + 8;
				if (theGlider.destRect.top > 342)
				{
					theGlider.phase = 0;
					OffAMortal();
				}
			}
			break;
	}
}

function Coordinate()
{
	let thisTickCount = TickCount();

	if(isScrolling)
	{
		if(thisTickCount >= scrollingNextTime)
			isScrolling = ScrollStep();
		if(!isScrolling)
			pausing = false;
		return;
	}

	if(inClosingAnimation)
	{
		if(thisTickCount >= closingAnimationNextTime)
			ClosingAnimationStep();
		return;
	}

	if(gameOver)
	{
		if(thisTickCount >= gameOverNextTime)
			GameOverStep();
		return;
	}


	if(Math.round(thisTickCount - LastTickCount) < 2)
		return;
	LastTickCount = thisTickCount;
	if (playing && (!pausing)) 
	{
		timeIs = thisTickCount;
		liftAmount = 2;
		binaryFlip ^= 1;
		if (bandBorne)
			HandleBand();
		if (lifeNormal) 
		{
			SearchRects();
			if(isScrolling)
				return;
			GetInput();
			MoveGlider();
		}
		else
			DoSpecial();

		if (playing) 
		{
			if (nAnimates > 0)
				MoveAnimates();
			if (nCycleObs > 0)
				MoveCycleObs();
			if (hasWindow)
				MonitorStorm();

			DrawCScene();

			if (scoreIsRolling)
				BumpTheScore();
		}


		//repeat
		//until (TickCount >= (timeIs + 2));

		loopsThruRoom = loopsThruRoom + 1;
		bassLoop++;
		if (bassLoop >= playBassTime)
		{
			bassLoop = 0;
			DoTheBass();
			playBassTime = Math.floor((kBonusTimeToBeat - loopsThruRoom) / kBassFract) + kMinBassLoop;
			if (playBassTime < kMinBassLoop)
				playBassTime = kMinBassLoop;
		}

	}

}