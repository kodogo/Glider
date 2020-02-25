'use strict';
 let currentX = 0;
 let currentY = 0;
 
 function Rect(top, left, bottom, right) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }
    
 function PaintRect(r) 
 {
    let w = r.right - r.left + 1;
    let h = r.bottom - r.top + 1;
    context.fillRect(r.left, r.top, w, h);      
}

function FrameRect(r) {
    let w = r.right - r.left + 1;
    let h = r.bottom - r.top + 1;
    context.strokeRect(r.left + 0.5, r.top + 0.5, w, h); 
}

function SetRect(left, top, right, bottom) 
{
	return new Rect(top, left, bottom, right);
} 
 
 function OffsetRect(r, dh, dv)
 {
	return new Rect(r.top + dv, r.left + dh, r.bottom + dv, r.right + dh);
}

function InsetRect(r, dh, dv)
{
	return new Rect(r.top + dv, r.left + dh, r.bottom - dv, r.right - dh);
}

function CopyRect(r)
{
	return new Rect(r.top, r.left, r.bottom, r.right);
}

function UnionRect(r1, r2)
{
	return new Rect(
	Math.min(r1.top, r2.top),
	Math.min(r1.left, r2.left),
	Math.max(r1.bottom, r2.bottom),
	Math.max(r1.right, r2.right)
	);
}

function MoveTo(x, y)
{
	context.moveTo(x, y); 
	currentX = x;
	currentY = y;
}

function LineTo(x, y)
{
	context.lineTo(x, y); 
	currentX = x;
	currentY = y;
}

function Line(dx, dy)
{
	currentX += dx;
	currentY += dy;
	context.lineTo(currentX, currentY);
}

function Move(dx, dy)
{
	currentX += dx;
	currentY += dy;
	context.moveTo(currentX, currentY);
}

function PenNormal() 
{
	context.lineWidth = 1;
	context.strokeStyle = rgbBlack;
	context.fillStyle = rgbBlack;
}

function FillPattern(n)
{
	let img = artFiles.get(n);
	let pat = context.createPattern(img, 'repeat');
	context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillStyle = pat;
	context.fill();
}

function PaintOval(r) 
{
	let x = (r.left + r.right) / 2;
	let radiusx = (r.right - r.left) / 2;
	let y = (r.top + r.bottom) / 2;
	let radiusy = (r.bottom - r.top) / 2;
	context.beginPath();
	context.ellipse(x, y, radiusx, radiusy, 0, 0, 2 * Math.PI);
	context.strokeStyle = 'rgba(0, 0, 0, 0.0)';
	context.stroke();
	FillPattern(patGrayTransparent);
}

function RGBForeColor(c) 
{
	context.strokeStyle = c;
	context.fillStyle = c;
}

function FillRect(r, c) {
	context = (context === undefined) ? context : context;
	context.save();
	context.fillStyle = c;
	PaintRect(r, context);
	context.restore();
}

function DrawString(s)
{
	context.fillText(s, currentX, currentY);
}

function TextFont(f)
{
	context.font = f;
}
