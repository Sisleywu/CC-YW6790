function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(0, 0, 25);
  triangle(windowWidth/2, windowHeight/2 - 100, windowWidth/2 + 300, windowHeight/2 + 50, windowWidth/2 - 300, windowHeight/2 + 50);
}
