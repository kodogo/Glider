'use strict';
function InitGlobalRects()
{
	wholeArea = SetRect(0, 0, 512, 342);
	fullArea = SetRect(-rightOffset, -downOffset, 512 + rightOffset, 342 + downOffset);
	nullRect = SetRect(-500, -500, -500, -500);
	smScoreRect = SetRect(224, 8, 296, 17);
	lgScoreRect = SetRect(222, 4, 296, 21);
	wholeRgn = CopyRect(wholeArea);
}

function InitAllOtherGlobalVars() {

	doneFlag = false;
	playing = false;
    houseSelect.disabled = false;
	pausing = false;
	refuseHigh = false;

	binaryFlip = 0;

	shadoRct[0] = SetRect(256, 0, 304, 11);
	shadoRct[1] = SetRect(256, 12, 304, 23);

	glideRct[0] = SetRect(0, 0, 48, 20);		// right forward
	glideRct[1] = SetRect(0, 21, 48, 41);		// right tipped
	glideRct[2]= SetRect(0, 42, 48, 62);		// left forward
	glideRct[3] = SetRect(0, 63, 48, 83);		// left tipped
	glideRct[4] = SetRect(208, 0, 256, 20);		// turn endpoint
	glideRct[5] = SetRect(208, 21, 256, 41);		//  "  
	glideRct[6] = SetRect(208, 42, 256, 62);		//  "  
	glideRct[7] = SetRect(208, 63, 256, 83);		//  "  
	glideRct[8] = SetRect(208, 84, 256, 104);	//  "  
	glideRct[9] = SetRect(208, 105, 256, 125);	//turn endpoint
	glideRct[10] = SetRect(414, 53, 462, 73);	// glider fading masks right
	glideRct[11] = SetRect(414, 74, 462, 94);
	glideRct[12] = SetRect(414, 95, 462, 115);
	glideRct[13] = SetRect(414, 116, 462, 136);
	glideRct[14] = SetRect(414, 137, 462, 157);
	glideRct[15] = SetRect(414, 158, 462, 178);
	glideRct[16] = SetRect(414, 179, 462, 199);
	glideRct[17] = SetRect(463, 53, 511, 73);	// glider fading masks left
	glideRct[18] = SetRect(463, 74, 511, 94);
	glideRct[19] = SetRect(463, 95, 511, 115);
	glideRct[20] = SetRect(463, 116, 511, 136);
	glideRct[21] = SetRect(463, 137, 511, 157);
	glideRct[22] = SetRect(463, 158, 511, 178);
	glideRct[23] = SetRect(463, 179, 511, 199);
	glideRct[24] = SetRect(256, 24, 304, 60);	// burning
	glideRct[25] = SetRect(256, 61, 304, 97);
	glideRct[26] = SetRect(256, 98, 304, 134);
	glideRct[27] = SetRect(256, 135, 304, 171);

	nextPhase[1][0] = 10;
	nextPhase[1][1] = 11;
	nextPhase[1][2] = 10;
	nextPhase[1][3] = 11;
	nextPhase[1][4] = 12;
	nextPhase[1][5] = 11;
	nextPhase[1][6] = 12;
	nextPhase[1][7] = 13;
	nextPhase[1][8] = 12;
	nextPhase[1][9] = 13;
	nextPhase[1][10] = 14;
	nextPhase[1][11] = 13;
	nextPhase[1][12] = 14;
	nextPhase[1][13] = 15;
	nextPhase[1][14] = 14;
	nextPhase[1][15] = 15;
	nextPhase[1][16] = 16;

	nextPhase[2][0] = 16;
	nextPhase[2][1] = 15;
	nextPhase[2][2] = 16;
	nextPhase[2][3] = 15;
	nextPhase[2][4] = 14;
	nextPhase[2][5] = 15;
	nextPhase[2][6] = 14;
	nextPhase[2][7] = 13;
	nextPhase[2][8] = 14;
	nextPhase[2][9] = 13;
	nextPhase[2][10] = 12;
	nextPhase[2][11] = 13;
	nextPhase[2][12] = 12;
	nextPhase[2][13] = 11;
	nextPhase[2][14] = 12;
	nextPhase[2][15] = 11;
	nextPhase[2][16] = 10;

	nextPhase[3][0] = 4;
	nextPhase[3][1] = 4;
	nextPhase[3][2] = 5;
	nextPhase[3][3] = 5;
	nextPhase[3][4] = 6;
	nextPhase[3][5] = 6;
	nextPhase[3][6] = 7;
	nextPhase[3][7] = 7;
	nextPhase[3][8] = 8;
	nextPhase[3][9] = 8;
	nextPhase[3][10] = 9;
	nextPhase[3][11] = 9;

	nextPhase[4][0] = 9;
	nextPhase[4][1] = 9;
	nextPhase[4][2] = 8;
	nextPhase[4][3] = 8;
	nextPhase[4][4] = 7;
	nextPhase[4][5] = 7;
	nextPhase[4][6] = 6;
	nextPhase[4][7] = 6;
	nextPhase[4][8] = 5;
	nextPhase[4][9] = 5;
	nextPhase[4][10] = 4;
	nextPhase[4][11] = 4;

	srcRect[celVnt] = SetRect(0, 84, 48, 96);
	srcRect[celDct] = SetRect(0, 97, 48, 110);
	srcRect[flrVnt] = SetRect(0, 111, 48, 124);
	srcRect[paper] = SetRect(0, 125, 48, 146);
	srcRect[toastr] = SetRect(0, 147, 38, 174);
	srcRect[60] = SetRect(304, 84, 336, 115);	// toast 1
	srcRect[61] = SetRect(304, 116, 336, 147);	// toast 2
	srcRect[62] = SetRect(304, 148, 336, 179);	// toast 3
	srcRect[63] = SetRect(304, 180, 336, 211);	// toast 4
	srcRect[64] = SetRect(304, 212, 336, 243);	// toast 5
	srcRect[65] = SetRect(304, 244, 336, 275);	// toast 6
	srcRect[teaKtl] = SetRect(0, 175, 41, 205);
	srcRect[lftFan] = SetRect(0, 206, 35, 261);
	srcRect[ritFan] = SetRect(0, 262, 35, 316);
	srcRect[table] = SetRect(48, 23, 112, 45);
	srcRect[shredr] = SetRect(48, 46, 112, 70);
	srcRect[books] = SetRect(48, 71, 112, 126);
	srcRect[clock] = SetRect(112, 0, 144, 29);
	srcRect[candle] = SetRect(112, 30, 144, 51);
	srcRect[rbrBnd] = SetRect(112, 52, 144, 75);
	srcRect[ball] = SetRect(112, 76, 144, 108);
	srcRect[fshBwl] = SetRect(112, 109, 144, 138);
	srcRect[66] = SetRect(144, 109, 160, 125);	// fish 1
	srcRect[67] = SetRect(144, 126, 160, 142);	// fish 2
	srcRect[68] = SetRect(144, 143, 160, 159);	// fish 3
	srcRect[69] = SetRect(144, 160, 160, 176);	// fish 4
	srcRect[grease] = SetRect(112, 139, 144, 168);
	srcRect[58] = SetRect(112, 169, 144, 198);	// grease falling 1
	srcRect[59] = SetRect(112, 199, 144, 228);	// grease fallen
	srcRect[litSwt] = SetRect(142, 0, 160, 26);
	srcRect[thermo] = SetRect(144, 27, 162, 54);
	srcRect[outlet] = SetRect(160, 264, 192, 289);
	srcRect[51] = SetRect(160, 290, 192, 315);	// outlet sparking 1
	srcRect[52] = SetRect(160, 316, 192, 341);	// outlet sparking 2
	srcRect[pwrSwt] = SetRect(144, 82, 162, 108);
	srcRect[guitar] = SetRect(48, 127, 112, 297);
	srcRect[drip] = SetRect(192, 42, 208, 55);
	srcRect[shelf] = SetRect(192, 71, 208, 99);
	srcRect[basket] = SetRect(448, 270, 511, 341);
	srcRect[paintg] = SetRect(408, 53, 510, 146);
	srcRect[battry] = SetRect(144, 55, 160, 81);
	srcRect[macTsh] = SetRect(256, 209, 301, 267);
	srcRect[upStar] = SetRect(0, 0, 161, 254);
	srcRect[dnStar] = SetRect(0, 0, 161, 254);
	srcRect[48] = SetRect(144, 189, 160, 201);	// candle flame
	srcRect[49] = SetRect(144, 202, 160, 214);	// candle flame
	srcRect[50] = SetRect(144, 215, 160, 227);	// candle flame
	srcRect[53] = SetRect(192, 0, 208, 13);		// drip
	srcRect[54] = SetRect(192, 14, 208, 27);	// drip
	srcRect[55] = SetRect(92, 28, 208, 41);	// drip
	srcRect[56] = SetRect(192, 42, 208, 55);	// drip
	srcRect[57] = SetRect(192, 56, 208, 70);	// drip

	animateRct[0][animateCrushed] = SetRect(304, 0, 368, 22);	//crushed dart
	animateRct[0][0] = SetRect(48, 0, 112, 22);		//dart...
	animateRct[0][1] = SetRect(48, 0, 112, 22);
	animateRct[0][2] = SetRect(48, 0, 112, 22);
	animateRct[0][3] = SetRect(48, 0, 112, 22);
	animateRct[0][4] = SetRect(48, 0, 112, 22);
	animateRct[0][5] = SetRect(48, 0, 112, 22);
	animateRct[0][6] = SetRect(48, 0, 112, 22);
	animateRct[0][7] = SetRect(48, 0, 112, 22);

	animateRct[1][animateCrushed] = SetRect(304, 276, 336, 308);	//crushed 'copter
	animateRct[1][0] = SetRect(160, 0, 192, 32);		//'copter...
	animateRct[1][1] = SetRect(160, 33, 192, 65);
	animateRct[1][2] = SetRect(160, 66, 192, 98);
	animateRct[1][3] = SetRect(160, 99, 192, 131);
	animateRct[1][4] = SetRect(160, 132, 192, 164);
	animateRct[1][5] = SetRect(160, 165, 192, 197);
	animateRct[1][6] = SetRect(160, 198, 192, 230);
	animateRct[1][7] = SetRect(160, 231, 192, 263);

	animateRct[2][animateCrushed] = SetRect(304, 309, 336, 341);	// popped balloon
	animateRct[2][0] = SetRect(112, 229, 144, 261);	//balloon...
	animateRct[2][1] = SetRect(112, 229, 144, 261);
	animateRct[2][2] = SetRect(112, 262, 144, 294);
	animateRct[2][3] = SetRect(112, 262, 144, 294);
	animateRct[2][4] = SetRect(112, 295, 144, 327);
	animateRct[2][5] = SetRect(112, 295, 144, 327);
	animateRct[2][6] = SetRect(112, 262, 144, 294);
	animateRct[2][7] = SetRect(112, 262, 144, 294);

	bandRct[0] = SetRect(192, 155, 208, 162);
	bandRct[1] = SetRect(192, 163, 208, 170);
	bandRct[2] = SetRect(192, 171, 208, 178);

}

function DoStartUp()
{
}
