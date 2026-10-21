// position of the skater
let skaterX;
let skaterY;

let traces = [];//stores the traces, empty array that I put values in

// time variables
let previousSecond; // remembers the previous second
let previousHour; // remembers the previous hour
let secondStartMillis; // remembers the start time of the current second in milliseconds

//ice resurfacer
let cleaning = false; // not cleaning 
let resurfacerX = 0; //ice resurfacer position
let resurfacerWidth = 100; // width of cleaning area


function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('week5-sketch'); // do not delete - links to your index.html pages (description)
  // HSB: Hue (0-360), Saturation (0-100), Brightness (0-100)
  colorMode(HSB, 360, 100, 100);

  //remember the previous second
  previousSecond = second();
  // remember the previous hour
  previousHour = hour();
  // remember the start time of the current second in milliseconds
  secondStartMillis = millis();

  // calculate the beginning of the current hour
  let hourStart = hour() * 3600;
  let secondsInHour = minute() * 60 + second();

  // rebuild traces from the beginning of this hour, t = time
  for (let t = 0; t <= secondsInHour; t++) {
    let pastTime = hourStart + t;

    let pastX = width * noise(pastTime * 0.05);
    let pastY = height * noise(pastTime * 0.05 + 100);

    // trace color changes based on the past minute
    let pastColor = lerpColor(
      color(200, 20, 65),
      color(275, 45, 45),
      t / 3599
    );

    traces.push({
      x: pastX,
      y: pastY,
      c: pastColor
    });
  }
}

function draw() {
   // second: 0 - 59
  let currentSecond = second();
  // minute: 0 - 59
  let currentMinute = minute();
  // hour: 0 - 23
  let currentHour = hour();
 
  // changes trace color based on the current minute gradually 
  let traceColor = lerpColor(
    color(205, 38, 65),
    color(215, 65, 35),
    currentMinute / 59
  );

  // the ice color become darker as time passes
  let cleanIce = color(192, 12, 97); 
  let oldIce = color(210, 35, 85); 

  // how many seconds have passed in the hour (0 to 3599), so the color change of ice happens smoothly every second
  let secondsInHour = currentMinute * 60 + currentSecond;

  // changes the ice color as time changes
  // calculate the progress of ice cleaning based on the current minute, mapping it from 0 to 1
  let iceProgress = map(secondsInHour, 0, 3599, 0, 1);
  let iceColor = lerpColor(cleanIce, oldIce, iceProgress);
  
  background(iceColor);

  // current time in seconds
  let currentTime = currentHour * 3600 + currentMinute * 60 + currentSecond;

    // if a new second has started, !== means not equal to
  if (currentSecond !== previousSecond) {
    secondStartMillis = millis();
    previousSecond = currentSecond;
  }

  // use millis() to calculate movement in a fraction of a second, (takes the moduolo and make it into a number between 0 - 1)
  let move = (millis() - secondStartMillis) / 1000;
    // keep move between 0 and 1
    if (move > 1) {
      move = 1;
    }
    if (move < 0) {
      move = 0;
    }

  // calculate positions at the current and the next second
  let startX = width * noise(currentTime * 0.05);
  let startY = height * noise(currentTime * 0.05 + 100);

  // where the skater should be in the next second
  let endX = width * noise((currentTime + 1) * 0.05);
  let endY = height * noise((currentTime + 1) * 0.05 + 100);

  // smoothly move between positions
  skaterX = lerp(startX, endX, move);
  skaterY = lerp(startY, endY, move);

  // record skater's position as it moves when not cleaning
  if (cleaning === false) {
    traces.push({
      x: skaterX,
      y: skaterY,
      c: traceColor
    });
  }

  // clean the ice when a new hour starts
  if (currentHour !== previousHour) {
    cleaning = true;
    resurfacerX = 0;
    previousHour = currentHour;
  }
  
  //draw traces
  stroke(150, 175, 185);
  strokeWeight(2);

  // draw the traces stored in the array
  // when i = 1, we draw a line from the first trace to the second trace
  for (let i = 1; i < traces.length; i++) {

    // draw traces when it's not cleaning 
    if (cleaning === false ||
        (traces[i].x > resurfacerX &&
        traces[i - 1].x > resurfacerX)) {
      stroke(traces[i].c);
      line(
        traces[i - 1].x,
        traces[i - 1].y,
        traces[i].x,
        traces[i].y
      );
    }
  }

  // ice resurfacer
  if (cleaning === true) {
    // draw the ice resurfacer
    fill(210, 70, 72);
    noStroke();
    rect(resurfacerX, 0, resurfacerWidth, height);

    // move the resurfacer to right
    resurfacerX += 3;
    }

    // when resurfacer leaves the canvas, stop cleaning
    if (resurfacerX > width) {
      cleaning = false;
      traces = []; 
    }

  // only show skater when resurfacer is not cleaning
  if (cleaning === false) {
    //draw skater 
    fill(0, 100, 100);
    noStroke();
    ellipse(skaterX, skaterY, 12);
  }
}