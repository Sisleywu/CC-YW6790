let colorPalette = ["#E6F8B2", "#5430D5", "#D0DAB4", "#FFD621 ", "#618BFF"];
let c;
let r;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  r = random(0, 360); // pick a random rotation angle between 0 and 360 degrees
  c = random(colorPalette); // pick a random color from the color palette
}

function draw() {
  background(20, 11, 50);
  // draw a triangle and defining the vertices of the triangle
  let topx = windowWidth/2, topy = windowHeight/2 - 100; // top vertex of triangle
  let bRx = windowWidth/2 + 300, bRy = windowHeight/2 + 50; // bottom right vertex of triangle
  let bLx = windowWidth/2 - 300, bLy = windowHeight/2 + 50; // bottom left vertex of triangle

  //rotate the sqaure
  push();
  translate(windowWidth/2, 610); // move the origin to the center of the square
  rotate(random(r));
  rectMode(CENTER); // set the square to center
  //draw a square
  fill(221, 255, 0); //color of square
  noStroke();
  square(0, 0, 100); 
  pop(); // restore the original coordinate system

  fill(c); // color of triangle
  noStroke();
  triangle(topx, topy, bRx, bRy, bLx, bLy);

  stroke(156, 163, 239); //color of rain drops
  strokeWeight(2); //thickness of rain drops
  
  //draw 300 rain drops
  for (let i = 0; i < 300; i++) {
    let x = random(windowWidth); // randompositions of rain drops
    let y = random(windowHeight); 
    let lineLength = random(10, 45); //length of rain drops(lines)

    // Calculate the sloped roof height for this drop's x position 
    // if the position of the rain drop is inside the triangle, it will not be drawn
    // && means "and" in programming, so the condition is that if x is greater than x2 and less than x3 and y is greater than y1 and less than y2, then the rain drop will not be drawn
    let roofY = bLy; 
    if (x >= bLx && x <= topx) { 
      roofY = map(x, bLx, topx, bLy, topy); // Left slope 
      } else if (x > topx && x <= bRx) { 
      roofY = map(x, topx, bRx, topy, bRy); // Right slope 
      } 

   // if the rain drop is under the triangle, it will not be drawn
    if (x > bLx && x < bRx && y > roofY) {
    continue; // continue means to skip the rest of the code in the loop and go to the next iteration
    }
    line(x, y, x, y + lineLength); //number of rain drops

  }
  
}

  
function mousePressed() {
  // Change the color of the triangle to a random color when the mouse is pressed
  c = random(colorPalette);
  redraw(); // Tells draw() to run once and pick new random values [7]
}