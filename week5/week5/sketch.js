// position of the skater
let skaterX;
let skaterY;

//speed of the skater
let speedX;
let speedY;

let traces = [];//stores the traces, empty array that I put values in

//change of ice color subtly
let noiseTime = 0;

// time variables
let previousMinute; // remembers the previous minute
let previousHour; // remembers the previous hour

//ice resurfacer
let cleaning = false; // not cleaning 
let resurfacerX = 0; //ice resurfacer position
let resurfacerWidth = 100; // width of cleaning area


function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('week5-sketch'); // do not delete - links to your index.html pages (description)
  
  // skater starts in the center
  skaterX = width / 2;
  skaterY = height / 2;

  // random starting direction
  speedX = random(-2, 2);
  speedY = random(-2, 2);

  // remember the current minute
  previousMinute = minute();
  // remember the current hour
  previousHour = hour();
}

function draw() {

   // second: 0 - 59
  let currentSecond = second();
  // minute: 0 - 59
  let currentMinute = minute();
  // hour: 0 - 23
  let currentHour = hour();

  // calculate how many seconds have passed in this hour
  let secondsInHour = currentMinute * 60 + currentSecond;

  
  // noise() gives a smoothly changing by the number between about 0 and 1
  let iceNoise = noise(noiseTime);
  // ice slowly gets darker throughout the whole hour
  let ice = map(secondsInHour, 0, 3599, 0, 20);   
  let noiseColor = map(iceNoise, 0, 1, -5, 5);

  //ice becomes darker each second passed
  background(225 - ice + noiseColor, 240 - ice + noiseColor, 255); 
  noiseTime += 0.002; //smaller number = slower color change

  // changes direction when minute changes/a new minute has started
  if (currentMinute !== previousMinute) {
    speedX = random(-2, 2);
    speedY = random(-2, 2);
    previousMinute = currentMinute; // remember this new minute
  }

   // every 120 frames, slightly changes the direction of skater
  if (frameCount % 120 === 0) {
    speedX += random(-0.5, 0.5);
    speedY += random(-0.5, 0.5);
    // keep the speed between -2 and 2
    speedX = constrain(speedX, -2, 2);
    speedY = constrain(speedY, -2, 2);
  }

  // hour: the resurfacer cleans the ice every hour
  if (currentHour !== previousHour) {
    cleaning = true;
    resurfacerX = 0; //starts from left
    previousHour = currentHour; // remember this new hour
  }

  // the skater only moves when not cleaning
  if (cleaning === false) {
    skaterX += speedX;
    skaterY += speedY;

     //stores the traces in the global array
    traces.push({
      x: skaterX, 
      y: skaterY
    });
  }

   // if skater touches the left or right edge, bounces back in horizontal direction
  if (skaterX > width || skaterX < 0) {
    speedX *= -1;
  }
  // if skater touches the top or bottom edge, bounces back in vertical direction
  if (skaterY > height || skaterY < 0) {
    speedY *= -1;
  }
  
  //draw traces
  stroke(150, 175, 185);
  strokeWeight(2);

  // draw the traces stored in the array
  // when i = 1, we draw a line from the first trace to the second trace
  for (let i = 1; i < traces.length; i++) {
    line(traces[i - 1].x, traces[i - 1].y, traces[i].x, traces[i].y);
  }

  // ice resurfacer
  if (cleaning === true) {
    // draw the ice resurfacer
    fill(6, 100, 150);
    noStroke();
    rect(resurfacerX, 0, resurfacerWidth, height);

  // move the resurfacer to right
  resurfacerX += 3;
  // clear traces where the resurfacer passed
   for (let i = traces.length - 1; i >= 0; i--) {
      if (traces[i].x < resurfacerX) {
        // remove this trace from array
        traces.splice(i, 1);
      }
    }
    // when resurfacer leaves the canvas, stop cleaning
    if (resurfacerX > width) {
      cleaning = false;
    }
  }

  // only show skater when resurfacer is not cleaning
  if (cleaning === false) {
    //draw skater 
    fill(255, 0, 0);
    noStroke();
    ellipse(skaterX, skaterY, 12);
  }
}