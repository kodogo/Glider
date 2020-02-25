'use strict';
function DrawHeadlineBox(r)
{
	RGBForeColor(rgbBlack);
	PaintRect(r);
	let tempRect = InsetRect(r, 2, 2);
	RGBForeColor(rgbWhite);
	FrameRect(tempRect);
	PenNormal();
}

function DrawRoomName(roomName)
{
	let tempRect =	SetRect(3, 2, 162, 23);
	DrawHeadlineBox(tempRect);
	TextFont('12px "arial black"');
	MoveTo(tempRect.left + 4, tempRect.top + 15);
	RGBForeColor(rgbRed);
	DrawString(roomName);
	PenNormal();
	RGBForeColor(rgbBlack);
}

function DrawRoomNumber()
{
	let shown = 0;
	let srcR = SetRect(36, 318, 54, 341);		//Pop up number of room
	let tempRect = SetRect(165, 1, 183, 24);
	DrawMaskedObject(srcR, srcR, tempRect);

	if (roomsPassed > 99)
		shown = Math.floor(roomsPassed / 100);
	else
	{
		if (roomsPassed > 9)
			shown = Math.floor(roomsPassed / 10);
		else
			shown = roomsPassed;
	}
	TextFont('12px arial');
	MoveTo(tempRect.left + 5, tempRect.bottom - 6);
	//NumToString(shown, tempStr);
	let tempStr = shown;
	DrawString(tempStr);
	if (roomsPassed > 9)
	{
		srcR = OffsetRect(srcR, 18, 0);
		tempRect = OffsetRect(tempRect, 20, 0);
		DrawMaskedObject(srcR, srcR, tempRect);
		if (roomsPassed > 99)
			shown = Math.floor(roomsPassed / 10) - Math.floor(roomsPassed / 10);
		else
			shown = roomsPassed % 10;
		MoveTo(tempRect.left + 6, tempRect.bottom - 6);
		//NumToString(shown, tempStr);
		tempStr = shown;
		TextFont('12px arial');
		DrawString(tempStr);
		if (roomsPassed > 99)
		{
			srcR = OffsetRect(srcR, -18, 0);
			tempRect = OffsetRect(tempRect, 20, 0);
			DrawMaskedObject(srcR, srcR, tempRect);
			shown = roomsPassed % 100;
			MoveTo(tempRect.left + 5, tempRect.bottom - 6);
			//NumToString(shown, tempStr);
			tempStr = shown;
			DrawString(tempStr);
		}
	}
	tempRect = SetRect(165, 1, 210, 24);
}

function DrawRemainingGliders()
{
	let shown = mortals;
	PenNormal();
	let tempRect = SetRect(302, 2, 510, 23);
	DrawHeadlineBox(tempRect);

	if (mortals > 1)
	{
		if (mortals > 3) 
		{
			tempRect = SetRect(380, 5, 396, 20);
			MoveTo(tempRect.left, tempRect.bottom - 3);
			TextFont('12px arial');
			let tempStr = mortals - 1;
			RGBForeColor(rgbRed);
			DrawString(tempStr);
			PenNormal();
			RGBForeColor(rgbBlack);
			shown = 3;
		}
		else
			shown = mortals - 1; //???? Why - 1?

		tempRect = SetRect(470, 5, 505, 20);
		let srcR = SetRect(0, 318, 35, 333);
		for (let i = 0; i < shown; i++)
		{
			DrawMaskedObject(srcR, srcR, tempRect);
			tempRect = OffsetRect(tempRect, -37, 0);
		}
	}
	tempRect = SetRect(302, 2, 510, 23);
}

function PopTheScore (whatScore)
{
	let tempRect = SetRect(220, 2, 298, 23);
	DrawHeadlineBox(tempRect); // Score box
	PenNormal();
	MoveTo(225, 18);
	TextFont('12px arial');
	let tempStr = whatScore;
	RGBForeColor(rgbLtBlue);
	DrawString(tempStr);
	PenNormal();
	RGBForeColor(rgbBlack);
}

function UpdateBandNumbers()
{
	let bands = theGlider.bands
	let dest = SetRect(342, 5, 375, 20);
	FillRect(dest, rgbBlack);
	MoveTo(dest.left - 2, dest.bottom - 2);
	TextFont('12px arial');
	if (theGlider.bands >= 100)
		bands = '++';
	RGBForeColor(rgbLtGreen);
	DrawString(bands);
	PenNormal();
	RGBForeColor(rgbBlack);
	let src = SetRect(36, 301, 45, 316);
	dest = SetRect(359, 5, 368, 20);
	DrawMaskedObject(src, src, dest);
	dest = SetRect(346, 5, 359, 20);	
}

function UpdateBatteryEnergy()
{
	let energy = theGlider.energy;
	let dest = SetRect(308, 5, 326, 20);
	FillRect(dest, rgbBlack);
	MoveTo(dest.left, dest.bottom - 2);
	TextFont('12px arial');
	if (theGlider.energy >= 1000) 
		energy= '+++';
	RGBForeColor(rgbYellow);
	DrawString(energy);
	PenNormal();
	RGBForeColor(rgbBlack);
	let src = SetRect(46, 301, 55, 316);
	dest = SetRect(326, 5, 335, 20);
	DrawMaskedObject(src, src, dest);
	dest = SetRect(308, 5, 326, 20);
}

function DrawHeadline(roomName)
{
	DrawRoomName(roomName);
	DrawRoomNumber();
	DrawRemainingGliders();
	PopTheScore(rollScore);

	if (theGlider.bands > 0)
	{
		UpdateBandNumbers();
	}
	
	if (theGlider.energy > 0)
	{
		UpdateBatteryEnergy();
	}
}

