'use strict';
function StartNewGame()
{
    thisHouse = JSON.parse(JSON.stringify(HouseList[houseSelect.selectedIndex][1]));
    if(cheatMode)
        roomAt = roomSelect.selectedIndex + 1;
    else
        roomAt = 1;
    roomsPassed = 1;
    roomScore = 0;
    suppScore = 0;
    rollScore = 0;
    //GetDateTime(workingGameNumber);
    sideYouCantExit = whoCares;
    loopsThruRoom = 0;
    bassLoop = 0;
    playBassTime = Math.floor(kBonusTimeToBeat / kBassFract) + kMinBassLoop;

    for (let i = 0; i < roomVisits.length; i++)
        roomVisits[i] = false;

    if(cheatMode)
	{
		mortals = 50;
		theGlider.bands = 1000;
		theGlider.energy = 10000;
    }
    else
    {
        mortals = 5;
        theGlider.energy = 0;
        theGlider.bands = 0;
    }

    refuseHigh = true;

    enteredLeft = true;
    theGlider.isRight = true;
    theGlider.forVel = 4;

    ResetGlider();

    playing = true;
    pausing = false;
    houseSelect.disabled = true;
    
    hasMirror = false;
    hasWindow = false;
    hasToast = false;
    scoreIsRolling = false;
    floatPoints.out = false;

    ReadyRoom();
    gameName = '';
}
