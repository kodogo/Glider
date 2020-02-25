'use strict';

let audioFiles =
[
    [1, "snd/Awww"],
    [2, "snd/Beam In"],
    [3, "snd/Blower On"],
    [4, "snd/Bounce"],
    [5, "snd/Alarm Clock"],
    [6, "snd/Glider Crunch"],
    [7, "snd/Drip"],
    [8, "snd/Yeow"],
    [9, "snd/Energize"],
    [10, "snd/Guitar 1"],
    [11, "snd/Fire Band"],
    [12, "snd/Guitar 2"],
    [13, "snd/Whistle"],
    [14, "snd/Grease Spill"],
    [15, "snd/Guitar Srum"],
    [16, "snd/Hey"],
    [17, "snd/Thunder"],
    [18, "snd/Click"],
    [19, "snd/Pop"],
    [20, "snd/Shred"],
    [21, "snd/Score Tick"],
    [22, "snd/Toast Land"],
    [23, "snd/Toast Launch"],
    [24, "snd/Zap"],
    [25, "snd/Teapot Whistle"],
    [26, "snd/Little Tick"],
    [27, "snd/Keystroke"],
    [28, "snd/Carriage Return"],
    [29, "snd/Music"],
    [30, "snd/Bass Line"]
];

/*
let audioFiles =
[
    [1, "snd/Awww.mp3"],
    [2, "snd/Beam In.mp3"],
    [3, "snd/Blower On.mp3"],
    [4, "snd/Bounce.mp3"],
    [5, "snd/Alarm Clock.mp3"],
    [6, "snd/Glider Crunch.mp3"],
    [7, "snd/Drip.mp3"],
    [8, "snd/Yeow.mp3"],
    [9, "snd/Energize.mp3"],
    [10, "snd/Guitar 1.mp3"],
    [11, "snd/Fire Band.mp3"],
    [12, "snd/Guitar 2.mp3"],
    [13, "snd/Whistle.mp3"],
    [14, "snd/Grease Spill.mp3"],
    [15, "snd/Guitar Srum.mp3"],
    [16, "snd/Hey.mp3"],
    [17, "snd/Thunder.mp3"],
    [18, "snd/Click.mp3"],
    [19, "snd/Pop.mp3"],
    [20, "snd/Shred.mp3"],
    [21, "snd/Score Tick.mp3"],
    [22, "snd/Toast Land.mp3"],
    [23, "snd/Toast Launch.mp3"],
    [24, "snd/Zap.mp3"],
    [25, "snd/Teapot Whistle.mp3"],
    [26, "snd/Little Tick.mp3"],
    [27, "snd/Keystroke.mp3"],
    [28, "snd/Carriage Return.mp3"],
    [29, "snd/Music.mp3"],
    [30, "snd/Bass Line.mp3"]
];
*/

let AudioList = new Array();

let letterRects = new Array(8);
letterRects[0] = SetRect(375, 33, 409, 78);	// G
letterRects[1] = SetRect(375, 77, 409, 122);	//a
letterRects[2] = SetRect(375, 121, 409, 166); //m
letterRects[3] = SetRect(375, 165, 409, 210); //e
letterRects[4] = SetRect(375, 209, 409, 254);	//O
letterRects[5] = SetRect(375, 253, 409, 298); //v
letterRects[6] = SetRect(375, 165, 409, 210); //e
letterRects[7] = SetRect(375, 297, 409, 342); //r
let gameOverLetter = 0;
let gameOverNextTime = TickCount();
let gameOverDest = new Rect(0, 0, 0, 0);
let gameOverShuffleCount = 0;

const gameOverTimeBetween = 6;

let soundsLoaded = 0;
 
function Randomize(range)
{
    return Math.floor(Math.random() * range);
}

function supportedAudioFormat(audio) {
        return ".mp3";
        var returnExtension = "";
        if (audio.canPlayType("audio/ogg") =="probably" || audio.canPlayType("audio/ogg") == "maybe") {
            returnExtension = ".ogg";
        } else if(audio.canPlayType("audio/mp3") == "probably" || audio.canPlayType("audio/mp3") == "maybe") {
            returnExtension = ".mp3";
        } else if(audio.canPlayType("audio/wav") =="probably" || audio.canPlayType("audio/wav") == "maybe") {
            returnExtension = ".wav";
        }

        return returnExtension;
        
    }
 
function LoadSounds()
{
    for(let af of audioFiles)
    {
        loadPromises.push(
            new Promise((resolve, reject) => {
                let audio = document.createElement('audio');
                audio.src = af[1] + supportedAudioFormat(audio);
                AudioList.push(audio);
                audio.load();
                audio.addEventListener(
                    'canplaythrough',
                    function _listener(e) {
                        audio.removeEventListener('canplaythrough', _listener);
                        resolve();
                    }
                );
            })
        );
    }
}

function DoTheSound(soundNum)
{
    if(!soundOn || (soundNum < 0) || (soundNum >= AudioList.length))
        return;
    AudioList[soundNum-1].play();
}

function PlayTheMusic()
{
    if(!musicOn)
        return;
    musicAudio.play();
}

function DoTheBass()
{
    if(!musicOn)
        return;
        AudioList[29].play();
}

function PauseTheMusic()
{
    musicAudio.pause();
}

function StopTheMusic()
{
    if(!musicOn)
        return;
    musicAudio.loop();
}

function LoWord(i)
{
    return (i % 32768);
}

function TickCount()
{
    let t = new Date().getTime();
    return (t * 0.06);
}


function GameOver()
{

    playing = false; 
    houseSelect.disabled = false; 
    gameOverDest = SetRect(0, 0, 34, 45);
    gameOverDest = OffsetRect(gameOverDest, 113, 100);
    gameOverLetter = 0;
    gameOverNextTime = TickCount();
    gameOver = true;
}

function GameOverInit()
{
    FillRect(wholeArea, rgbBlack);
    let tempStr = (roomScore + suppScore).toString();

    // Draw the score
    PenNormal();
    TextFont('32px verdana');
    MoveTo(120, 80);
    RGBForeColor(rgbYellow);
    DrawString(tempStr);
    PenNormal();
    RGBForeColor(rgbBlack);
    TextFont('12px arial');
}

function  GameOverStep()
{
    if(gameOverLetter < letterRects.length)
        DrawGameOverLetter();
    else
        MoveGameOverLetters();
}

function DrawGameOverLetter()
{
    DoTheSound(21);
    if(gameOverLetter == 0)
        GameOverInit();
    DrawObject(letterRects[gameOverLetter], gameOverDest);
    gameOverLetter++;
    if(gameOverLetter < letterRects.length)
    {
        gameOverNextTime = TickCount() + gameOverTimeBetween;
        gameOverDest = OffsetRect(gameOverDest, 36, 0);
    }
    else
    {
        gameOverShuffleCount = 0;
    }
}

function MoveGameOverLetters()
{
    gameOverShuffleCount++;
    let i = gameOverShuffleCount;

    gameOverDest = SetRect(0, 0, 34, 45);
    gameOverDest = OffsetRect(gameOverDest, 113, 100 + i * 8);
    gameOverDest = OffsetRect(gameOverDest, Randomize(i * 2 + 1) - i, 0);

    for(let j = 0; j < 8; j++)
    {
        DrawObject(letterRects[j], gameOverDest);
        gameOverDest = OffsetRect(gameOverDest, 36, 0);
        // Original game has a 1 tick delay here, but I can't be bothered doing this in JS
    }

    if(gameOverShuffleCount == 20)
        gameOver = false; // Stop drawing
    else
        gameOverNextTime = TickCount() + gameOverTimeBetween;

}
