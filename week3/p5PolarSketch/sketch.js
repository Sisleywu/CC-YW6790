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
  background(180, 205, 237);

  push();
   fill(243, 66, 19, 255);
   noStroke();
   polarEllipses(1, 70, 70, 0);
  pop();

  push();
  fill(210, 241, 113, 190);
  noStroke();
  polarTriangles(8, 130, 150);
  pop();

  push();
  fill(110, 141, 229, 130);
  noStroke();
  polarEllipses(8, 150, 150, 300);
  pop();

  noFill();
  stroke();
  strokeWeight(2);
  polarEllipses(8, 160, 160, 290);

  noFill();
  stroke(255, 123, 145);
  strokeWeight(2);
  polarEllipse(1, 120, 120, 0);

  push();
   fill(194, 249, 119);
   noStroke();
   polarEllipses(8, 5, 5, 170);
  pop();

  push();
   fill(243, 66, 19, 255);
   noStroke();
   polarEllipses(12, 10, 10, 200);
  pop();

  push();
    fill(243, 66, 19, 255);
    noStroke();
    rotate(0);
    polarEllipses(8, 8, 30, 250);
  pop();

   push();
    noFill();
    stroke(164, 191, 235); 
    strokeWeight(2);
    rotate(0); //0.785
    polarLines(8, 10, 310);
  pop();

  fill(64, 91, 255, 200);
  noStroke();
  polarEllipses(4, 20, 40, 70);

  push();
    fill(160, 255, 20, 255);
    noStroke();
    rotate(150);
    polarTriangles(4, 10, 80);
  pop();

  noFill();
  stroke(164, 191, 235);
  strokeWeight(2);
  polarLines(8, 60, 0);

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
  
    starColor = color(245, 247, 73);

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

