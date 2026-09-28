// p5.plotSvg + p5.Polar Template

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 
// if using randomness, experiment w/ myRandomSeed to see different versions (or iterations) of your sketch
let myRandomSeed = 12345; 
let regenerateButton, exportSvgButton; 

// canvas size
const DPI = 70; // dots per inch
const PAGE_W = 8.5*DPI; 
const PAGE_H = 11*DPI;

//store all circles
let circles = [];

//controls direction of fish with mouse move
let fishDirection = 1;

//------------------------------------------------------------
function setup() {
  createCanvas(PAGE_W, PAGE_H);
  UI();
  noFill();
  // Set the SVG group by stroke color to `true`, so that strokes 
  // of the same color are grouped together in the SVG file. 
  setSvgGroupByStrokeColor(true); 

  generateCircles(); //my designed function
}

function draw(){
  clear();
  randomSeed(myRandomSeed); 
  background(255); 
  
  if (bDoExportSvg == true){
    beginRecordSvg(this, "myOutput_" + month() + day() + year() + "_" + myRandomSeed + ".svg");
  }

  // define your drawing below
  myDrawing(); 

  if (bDoExportSvg){
    endRecordSvg(); 
    bDoExportSvg = false;
  }
}

function myDrawing() {

let myColors = [
  color(255, 0, 0),
  color(0, 0, 255),
  ];

  //making the cirlces avoid mouse
  for (let i = 0; i < circles.length; i++) {

    let c = circles[i];

    // distance between mouse and circle center
    let d = dist(mouseX, mouseY, c.x, c.y);

    // if mouse gets close
    if (d < c.size / 2 + 30) {

      let dx = c.x - mouseX;
      let dy = c.y - mouseY;

      let length = sqrt(dx * dx + dy * dy);

      if (length > 0) {
        dx = dx / length;
        dy = dy / length;
      }

      // move away from mouse
      c.x += dx * 2;
      c.y += dy * 2;
      }

    filledCircle(
      c.x,
      c.y,
      c.size,
      c.circleColor
    );
  }

  //mouse fish
  drawFish();
}

function filledCircle(x, y, circleSize, circleColor) {

  noFill();
  stroke(circleColor);
  strokeWeight(1);

  // concentric circles create a filled effect
  for (let d = circleSize; d > 0; d -= 4) {
    circle(x, y, d);
  }
}

//for the mouse hoover to make circles avoiding 
function generateCircles() {

  circles = [];

  randomSeed(myRandomSeed);

  for (let i = 0; i < 55; i++) {

    let circleColor;

    // 20% red, 80% blue
    if (random(1) < 0.2) {
      circleColor = color(220, 50, 50);
    } else {
      circleColor = color(30, 90, 200);
    }

    circles.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: random(20, 120),
      circleColor: circleColor
    });
  }
}

function drawFish() {

  push();
  translate(mouseX, mouseY);

  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();

   // update direction only when mouse actually moves
  if (mouseX > pmouseX) {
    fishDirection = -1;
  } 
  else if (mouseX < pmouseX) {
    fishDirection = 1;
  }
  scale(fishDirection, 1);

  // body
  triangle(
    -35, 0,
    20, -35,
    20, 35
  );

  // tail
  triangle(
    20, 0,
    45, -18,
    45, 18
  );

  // eye
  circle(-15, -5, 4);

  pop();
}
// Tip: When plotting, strokeWeight() doesn't affect your drawing. 
// To change the thickness of your drawing, change your pen/marker/etc
// - or experiment with code (use a for loop to create an 'outline')

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

// Make a new random seed when the "Regenerate" button is pressed
function regenerate(){
  myRandomSeed = round(millis()); 
  generateCircles();
}

// Set the SVG to be exported when the "Export SVG" button is pressed
function initiateSvgExport(){
  bDoExportSvg = true; 
}

function UI() {
  regenerateButton = createButton('Regenerate');
  regenerateButton.position(0, height);
  regenerateButton.mousePressed(regenerate); // run regenerate() when pressed
  
  exportSvgButton = createButton('Export SVG');
  exportSvgButton.position(120, height);
  exportSvgButton.mousePressed(initiateSvgExport); // run initiateSvgExport() when pressed
}



/*
This template uses the following sketch as a starting point: 
https://editor.p5js.org/golan/sketches/LRTXmDg2q

Additional references/info:
https://github.com/golanlevin/p5.plotSvg
https://github.com/liz-peng/p5.Polar
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#beginrecordsvg
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#endrecordsvg

*/