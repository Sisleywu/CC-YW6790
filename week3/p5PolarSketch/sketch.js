// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

let x; 
let y;

function setup() {
  createCanvas(500, 500);
  x = width/2;
  y = height/2;

}

function draw() {
  setCenter(x, y);
  background(18, 0, 44);

  push();
   fill(64, 0, 182, 255);
   noStroke();
   polarEllipses(1, 70, 70, 0);
  pop();

  push();
  fill(171, 152, 227, 100);
  noStroke();
  polarTriangles(8, 130, 150);
  pop();

  push();
  fill(178, 220, 208, 100);
  noStroke();
  polarEllipses(8, 150, 150, 300);
  pop();

  push();
  noFill();
  stroke(246, 255, 145, 255);
  strokeWeight(2);
  polarEllipses(8, 160, 160, 290);
  pop();

  push();
  noFill();
  stroke(255, 133, 100, 255);
  strokeWeight(2);
  polarEllipse(1, 120, 120, 0);
  pop();

  push();
   fill(241, 133, 100, 255);
   noStroke();
   polarEllipses(8, 5, 5, 170);
  pop();

  push();
   fill(64, 0, 182, 255);
   noStroke();
   polarEllipses(12, 10, 10, 200);
  pop();

  push();
    fill(56, 198, 211, 255);
    noStroke();
    rotate(0);
    polarEllipses(8, 8, 30, 250);
  pop();

   push();
    noFill();
    stroke(246, 255, 145); 
    strokeWeight(2);
    rotate(0); //0.785
    polarLines(8, 10, 310);
  pop();

  fill(56, 198, 211, 180);
  noStroke();
  polarEllipses(4, 20, 40, 70);

  push();
    fill(155, 155, 209, 255);
    noStroke();
    rotate(150);
    polarTriangles(4, 10, 80);
  pop();

  push();
  noFill();
  stroke(241, 133, 100);
  strokeWeight(2);
  polarLines(8, 60, 0);
  pop();

  drawStar(0, 0, 80, 20); 
  
  let numberOfStars = 12;
  let distance = 200;

  for (let i = 0; i < numberOfStars; i++){
    let angle = i * TWO_PI / numberOfStars;

    let starX = cos(angle) * distance;
    let starY = sin(angle) * distance;

    drawStar(starX, starY, 20, 5);
  }

  // push();

  //   drawStar(); 

  // pop();
  }

//draw my four point star
function drawStar(starX, starY, outerRadius, innerRadius){
  let rotation = 0; 
  let alpha = 255; 
  let starColor;
  
    starColor = color(205, 247, 15);

    push();
      translate(starX, starY);
      rotate(radians(rotation));
      fill(red(starColor), green(starColor), blue(starColor), alpha);
      noStroke();

    // Custom polar star shape centered at (0, 0)
    beginShape();
      for (let i = 0; i < 8; i += 1) {
        let angle = i * 45;
        let r = (i % 2 === 0) 
        ? outerRadius
        : innerRadius;

        vertex(r * cos(radians(angle)), r * sin(radians(angle)));
        }   
    endShape(CLOSE);
  pop();
}

