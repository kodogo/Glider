'use strict';

let twisterSrc = new Array(4);
twisterSrc[0] = SetRect(208, 126, 256, 188);
twisterSrc[1] = SetRect(208, 189, 256, 251);
twisterSrc[2] = SetRect(208, 252, 256, 314);
twisterSrc[3] = SetRect(256, 268, 304, 330);
let tinyGliderSrc = SetRect(235, 315, 256, 325);
let tinyGliderDst = new Rect(0, 0, 0, 0);
let twisterDst = new Rect(0, 0, 0, 0);
let wasRect = new Rect(0, 0, 0, 0);
let wasGlider = new Rect(0, 0, 0, 0);
let boltRect = new Rect(0, 0, 0, 0);
let boltWasCast = false;

let whichTwist = 0;
let closingAnimationIteration = 0;
const closingAnimationWaitTicks = 4;
let closingAnimationNextTime = 0;

const scrollingTicks = 1;
let scrollingIteration = 0;
let scrollingNextTime = 0;

const scrollForward  = 1;
const scrollBackward = 2;
const scrollUp = 3;
const scrollDown = 4;

let scrollDirection = 0;



const rFarmPict = 130;

function WrapItUp()
{
    PauseTheMusic();
    GameOver();
}


function CalcRoomScore()
{
    roomScore = 0;
    for(let index = 1; index <= roomVisits.length; index++)
        if (roomVisits[index])
            roomScore += 
                ((500 * (Math.floor(index / 10) + 1)) + 
                    Math.floor(roomsPassed / 41) * 2000);
}

function CheckForTimeBonus()
{
    let timeBonus = 0;
    if (loopsThruRoom < kBonusTimeToBeat)
        timeBonus = (kBonusTimeToBeat - loopsThruRoom) * (Math.floor(roomAt / 5) + 1);
    suppScore = suppScore + timeBonus;

    loopsThruRoom = 0;

    let tempStr = 'Time Bonus = '  + timeBonus;
    let tempRect = SetRect(190, 100, 312, 117);

    PenNormal();
    PaintRect(tempRect);
    context.strokeColor = rgbWhite;
    tempRect = InsetRect(tempRect, 3, 3);
    FrameRect(tempRect);
    PenNormal();
    tempRect = InsetRect(tempRect, -1, -1);
    RGBForeColor(rgbYellow);
    context.font = '12px verdana';
    MoveTo(tempRect.left + 3, tempRect.bottom - 3);
    DrawString(tempStr);
    RGBForeColor(rgbBlack);
}

function SetRoomState()
{
    let oldRoomScore = roomScore;
    bassLoop = 0;
    playBassTime = Math.floor(kBonusTimeToBeat / kBassFract) + kMinBassLoop;

    if (didntExitEntrance)
        roomVisits[roomAt] = true;

    StartScoreRolling();
    CalcRoomScore();
 
    scrollingNextTime = TickCount();
    if ((oldRoomScore < roomScore) && (didntExitEntrance))
    {
        CheckForTimeBonus();
        scrollingNextTime += 30;
    }
    loopsThruRoom = 0;

    let r = thisHouse.theRooms[roomAt];
    for (let [i, o] of r.theObjects.entries())
    {
        if(o==null)
            continue;
        switch (eventKind[i][0])
        {
        case awardIt:
        case extraIt:
        case energizeIt:
        case bandIt:
        case trickIt: 
            o.amount = eventKind[i][1];
            break;
        end;
        case lightIt:
        case airOnIt: 
            if (((!lightsOut) || forceLightsOn) && (!airOut))
                r.conditionCode = 0;
            break;
        }
    }

}

function ScrollForward()
{
    pausing = true;
    theGlider.destRect.left = 0;
    theGlider.destRect.right = 48;
    theGlider.wholeRect = CopyRect(theGlider.destRect);
    theGlider.shadoDest.left = 0;
    theGlider.shadoDest.right = 48;
    theGlider.wholeShado = CopyRect(theGlider.shadoDest);
    theGlider.touchRect = CopyRect(theGlider.destRect);
    theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);
 
    DrawRoomOffscreen(thisHouse.theRooms[roomAt]);
    //scrollingNextTime = TickCount() + 30;
    scrollDirection = scrollForward;
    scrollingIteration = 0;
    isScrolling = true;
}

function ScrollStep()
{
    switch(scrollDirection)
    {
        case scrollForward:
            return ScrollForwardStep();
            break;
        case scrollBackward:
            return ScrollBackwardStep();
            break;
        case scrollUp:
            return ScrollUpStep();
            break;
        case scrollDown:
            return ScrollDownStep();
            break;
    }
}
                                   
function ScrollForwardStep()
{
    scrollingIteration++;
    let xWidth = scrollingIteration * 16;
    let xSep = 512 - xWidth;
    context.drawImage(offscreenCanvas, xSep, 0, xWidth, 342, xSep, 0, xWidth, 342);
    PenNormal();
    context.beginPath();
    MoveTo(xSep - 1, 0);
    Line(0, 342);
    context.stroke();
    if(scrollingIteration == 32)
    {
        ReadyRoom();
        return false;
    }
    else
        scrollingNextTime += scrollingTicks;
    return true;
}


function ScrollBackward()
{
    theGlider.destRect.left = 464;
    theGlider.destRect.right = 512;
    theGlider.wholeRect = CopyRect(theGlider.destRect);
    theGlider.shadoDest.left = 464;
    theGlider.shadoDest.right = 512;
    theGlider.wholeShado = CopyRect(theGlider.shadoDest);
    theGlider.touchRect = CopyRect(theGlider.destRect);
    theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);
    
    DrawRoomOffscreen(thisHouse.theRooms[roomAt]);
    //scrollingNextTime = TickCount() + 30;
    scrollDirection = scrollBackward;
    scrollingIteration = 0;
    isScrolling = true;
}

function ScrollBackwardStep()
{
    scrollingIteration++;
    let xWidth = scrollingIteration * 16;
    let xSep = xWidth;
    context.drawImage(offscreenCanvas, 0, 0, xWidth, 342, 0, 0, xWidth, 342);
    PenNormal();
    context.beginPath();
    MoveTo(xSep + 1, 0);
    Line(0, 342);
    context.stroke();
    if(scrollingIteration == 32)
    {
        ReadyRoom();
        return false;
    }
    else
        scrollingNextTime += scrollingTicks;
    return true;
}

function ScrollUp()
{
    let leftCorner = 232;
    for (let o of thisHouse.theRooms[roomAt].theObjects)
    {
        if(o == null)
            continue;
        if (o.objectIs == dnStar)
            leftCorner = o.boundRect.left + 64;
    }

    theGlider.destRect.left = leftCorner;
    theGlider.destRect.right = leftCorner + 48;
    theGlider.destRect.top = kFloorVert - 20;
    theGlider.destRect.bottom = kFloorVert;
    theGlider.wholeRect = CopyRect(theGlider.destRect);
    theGlider.shadoDest.left = theGlider.destRect.left;
    theGlider.shadoDest.right = theGlider.destRect.right;
    theGlider.wholeShado = CopyRect(theGlider.shadoDest);
    theGlider.touchRect = CopyRect(theGlider.destRect);
    theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);

    DrawRoomOffscreen(thisHouse.theRooms[roomAt]);
    //scrollingNextTime = TickCount() + 30;
    scrollDirection = scrollUp;
    scrollingIteration = 0;
    isScrolling = true;
}

function ScrollUpStep()
{
    scrollingIteration++;
    let yHeight = scrollingIteration * 18;
    let ySep = yHeight;
    context.drawImage(offscreenCanvas, 0, 0, 512, yHeight, 0, 0, 512, yHeight);
    PenNormal();
    context.beginPath();
    MoveTo(0, ySep+1);
    Line(512, 0);
    context.stroke();
    if(scrollingIteration == 20)
    {
        ReadyRoom();
        return false;
    }
    else
        scrollingNextTime += scrollingTicks;
    return true;
}


function ScrollDown()
{
let leftCorner = 232;
    for (let o of thisHouse.theRooms[roomAt].theObjects)
    {
        if(o == null)
            continue;
        if (o.objectIs == upStar)
            leftCorner = o.boundRect.left + 64;
    }

    theGlider.destRect.left = leftCorner;
    theGlider.destRect.right = leftCorner + 48;
    theGlider.destRect.top = kCeilingVert + 20;
    theGlider.destRect.bottom = kCeilingVert + 40;
    theGlider.wholeRect = CopyRect(theGlider.destRect);
    theGlider.shadoDest.left = theGlider.destRect.left;
    theGlider.shadoDest.right = theGlider.destRect.right;
    theGlider.wholeShado = CopyRect(theGlider.shadoDest);
    theGlider.touchRect = CopyRect(theGlider.destRect);
    theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);
    DrawRoomOffscreen(thisHouse.theRooms[roomAt]);
    //scrollingNextTime = TickCount() + 30;
    scrollDirection = scrollDown;
    scrollingIteration = 0;
    isScrolling = true;
}

function ScrollDownStep()
{
    scrollingIteration++;
    let yHeight = scrollingIteration * 18;
    let ySep = (342 - yHeight);
    context.drawImage(offscreenCanvas, 0, ySep, 512, yHeight, 0, ySep, 512, yHeight);
    PenNormal();
    context.beginPath();
    MoveTo(0, ySep-1);
    Line(512, 0);
    context.stroke();
    if(scrollingIteration == 20)
    {
        ReadyRoom();
        return false;
    }
    else
        scrollingNextTime += scrollingTicks;
    return true;
}


function OffAMortal()
{
    if(!cheatMode)
        mortals--;
    if (mortals < 1)
    {
        WrapItUp();
        return;
    }
    ResetGlider();
}

function AdvanceARoom()
{
    pausing = true;
    didntExitEntrance = (sideYouCantExit != rightOfRoom);

    SetRoomState();
    enteredLeft = true;
    sideYouCantExit = leftOfRoom;

    roomAt = roomAt + 1;
    roomsPassed = roomsPassed + 1;

    if (roomAt > thisHouse.numberOfRooms)
    {
        roomAt = 0;
        roomsPassed = roomsPassed - 1;
        ClosingAnimation();
        WrapItUp();
        return;
    }

    if (roomAt != 0)
    {
        ScrollForward();
    }
}

function RetreatARoom()
{
    pausing = true;
    didntExitEntrance = (sideYouCantExit != leftOfRoom);
    SetRoomState();
    enteredLeft = false;
    sideYouCantExit = rightOfRoom;

    roomAt = roomAt - 1;
    roomsPassed = roomsPassed - 1;
    if (roomAt < 1) 
    {
        roomAt = 0;
        roomsPassed = roomsPassed - 1;
        ClosingAnimation();
        WrapItUp();
        return;
    }

    ScrollBackward();
    pausing = false;
}

function UpAFlight(whatRoom)
{
    didntExitEntrance = (sideYouCantExit != topOfRoom);
    SetRoomState();
    sideYouCantExit = bottomOfRoom;
    let rTemp = roomAt;
    while(rTemp > 40)
    {
        rTemp -= 40;
        whatRoom += 40;
    }

    let addToIt = whatRoom - roomAt;
    roomAt = whatRoom;
    roomsPassed = roomsPassed + addToIt;
    if ((roomAt > thisHouse.numberOfRooms) || (roomAt <= 0)) 
    {
            roomAt = 0;
            roomsPassed = roomsPassed - 1;
            ClosingAnimation();
            WrapItUp();
            return;
    }

    if (roomAt != 0)
    {
        ScrollUp();
    }
}

function DownAFlight(whatRoom)
{
    didntExitEntrance = (sideYouCantExit != bottomOfRoom);
    SetRoomState();
    sideYouCantExit = topOfRoom;
    let rTemp = roomAt;
    while(rTemp > 40)
    {
        rTemp -= 40;
        whatRoom += 40;
    }

    let addToIt = whatRoom - roomAt;
    roomAt = whatRoom;
    roomsPassed = roomsPassed + addToIt;
    if ((roomAt <= 0) || (roomAt > thisHouse.numberOfRooms))
    {
            roomAt = 0;
            roomsPassed = roomsPassed - 1;
            ClosingAnimation();
            WrapItUp();
            return;
    }
    if (roomAt != 0)
    {
        ScrollDown();
    }
}

function Transport(whatRoom)
{
    let newRoom = (whatRoom != roomAt);
    if (newRoom)
    {
        didntExitEntrance = true;
        SetRoomState();
        sideYouCantExit = whoCares;
        let addToIt = whatRoom - roomAt;
        roomAt = whatRoom;
        roomsPassed = roomsPassed + addToIt;

        if ((roomAt <= 0) || (roomAt > thisHouse.numberOfRooms))
        {
            ClosingAnimation();
            roomAt = 0;
            WrapItUp();
            return;
        }
        ReadyRoom();
    }
    if (roomAt != 0)
    {
        let leftCorner = 232;
        for(let [index, o] of thisHouse.theRooms[roomAt].theObjects.entries())
        {
            if(o==null)
                continue;
            if ((o.objectIs == celDct) && (o.isOn))
                leftCorner = o.boundRect.left;
        }

        theGlider.destRect.left = leftCorner;
        theGlider.destRect.right = leftCorner + 48;
        theGlider.destRect.top = kCeilingVert;
        theGlider.destRect.bottom = kCeilingVert + 20;
        theGlider.wholeRect = CopyRect(theGlider.destRect);
        theGlider.shadoDest.left = theGlider.destRect.left;
        theGlider.shadoDest.right = theGlider.destRect.right;
        theGlider.wholeShado = CopyRect(theGlider.shadoDest);
        theGlider.touchRect = theGlider.destRect;
        theGlider.touchRect = InsetRect(theGlider.touchRect, 10, 5);

    }
}

function CastBolt()
{
    const cloudBottom = 140;
    const boltLength = 8;
    
    let ctx = context;
    boltRect = SetRect(512, cloudBottom, 0, (boltLength + 1) * 8 + cloudBottom + 2);
    RGBForeColor(rgbWhite, ctx);
    let start = Randomize(100) + 200;
    let finish = Randomize(7) - 3 + start;
    DoTheSound(17);
    ctx.lineWidth = 2;
    ctx.beginPath();
    for(let i = 0; i <= boltLength; i++)
    {
        MoveTo(start, i * 8 + cloudBottom + 1, ctx);
        LineTo(finish, (i + 1) * 8 + cloudBottom, ctx);

        if (start <= boltRect.left)
            boltRect.left = start;
        if (finish <= boltRect.left)
            boltRect.left = finish;
        if (start >= boltRect.right)
            boltRect.right = start;
        if (finish >= boltRect.right)
            boltRect.right = finish;

        start = finish;
        finish = Randomize(7) - 3 + start;
    }
    ctx.stroke();

    RGBForeColor(rgbBlack, ctx);
    boltWasCast = true;
    boltRect = InsetRect(boltRect, -2, 0);
}


function ClosingAnimation()
{

    playing = false;
    houseSelect.disabled = false;

    twisterDst = CopyRect(twisterSrc[0]);
    twisterDst = OffsetRect(twisterDst, -twisterDst.left, -twisterDst.top);
    twisterDst = OffsetRect(twisterDst, 230, 138);

    tinyGliderDst = CopyRect(tinyGliderSrc);
    tinyGliderDst = OffsetRect(tinyGliderDst, -tinyGliderDst.left, -tinyGliderDst.top);
    tinyGliderDst = OffsetRect(tinyGliderDst, 420, 90);
    wasGlider = CopyRect(tinyGliderDst);

    boltWasCast = false;

    let ctx = context;
    let img = artFiles.get(rFarmPict);
    ctx.drawImage(img, 0, 0);
    whichTwist = 0;

    PenNormal(ctx);

    closingAnimationIteration = 0;
    inClosingAnimation = true;
    closingAnimationNextTime = TickCount() + closingAnimationWaitTicks;
}

function ClosingAnimationStep()
{
    let img = artFiles.get(rFarmPict);
    context.drawImage(img, 0, 0);
    closingAnimationIteration++;
    let i = closingAnimationIteration;

    whichTwist = i % 4;
    if (whichTwist == 0)
    {
        twisterDst = OffsetRect(twisterDst, -1, 0);
        wasRect.right ++;
    }

    tinyGliderDst = OffsetRect(tinyGliderDst, -2, -(i % 2));

    if (Randomize(20) == 0)
        CastBolt();

    DrawMaskedObject(twisterSrc[whichTwist], twisterSrc[whichTwist], twisterDst);
    DrawMaskedObject(tinyGliderSrc, tinyGliderSrc, tinyGliderDst);

    if(closingAnimationIteration == 200)
        inClosingAnimation = false;
}
