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
  background(47, 75, 38);

  push();
   fill(62, 136, 91, 255);
   noStroke();
   polarEllipses(1, 70, 70, 0);
  pop();

  push();
  fill(133, 189, 166, 180);
  noStroke();
  polarTriangles(8, 130, 150);
  pop();

  push();
  fill(192, 215, 187, 130);
  noStroke();
  polarEllipses(8, 150, 150, 300);
  pop();

  noFill();
  stroke();
  strokeWeight(2);
  polarEllipses(8, 160, 160, 290);

  noFill();
  stroke(47, 75, 38);
  strokeWeight(2);
  polarEllipse(1, 120, 120, 0);

  push();
   fill(190, 220, 254, 255);
   noStroke();
   polarEllipses(8, 5, 5, 170);
  pop();

  push();
   fill(47, 75, 38, 255);
   noStroke();
   polarEllipses(12, 10, 10, 200);
  pop();

  push();
    fill(62, 136, 91, 255);
    noStroke();
    rotate(0);
    polarEllipses(8, 8, 30, 250);
  pop();

   push();
    noFill();
    stroke(190, 220, 254); 
    strokeWeight(2);
    rotate(0); //0.785
    polarLines(8, 10, 310);
  pop();

  fill(192, 215, 187, 200);
  noStroke();
  polarEllipses(4, 20, 40, 70);

  push();
    fill(190, 220, 254, 255);
    noStroke();
    rotate(150);
    polarTriangles(4, 10, 80);
  pop();

  noFill();
  stroke(192, 215, 187);
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
  
    starColor = color(190, 220, 254);

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

