let paletteToggle = false;  

function setup() {

  createCanvas(500, 500);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 255); 

}

function draw() {
  background(0,0,0);

  const spacing = 70;
  const maxDiag = width + height;
  
  //repeat vertically
  for(let y = 25; y < height; y += spacing){
  //repeat horizontally
    for(let x = 25; x < width; x += spacing){

    let diag = x + y;
    let rotation = map(diag, 0, maxDiag, 0, 45);
    let alpha;
    let starHue;

    if (paletteToggle){
      starHue = map(diag, 0, maxDiag, 200, 340); // Cool cyan-to-magenta palette } else { starHue = map(diag, 0, maxDiag, 55, 260); // Warm yellow-to-purple palette }
    } else {
      starHue = map(diag, 0, maxDiag, 55, 260);
    }
    let starColor = color(starHue, 80, 95); 

    // if (x + y < 400){
    //   rotation = 0;
    //   alpha = 255;
    //   starColor = color(245, 247, 73);
    //   } else if (x + y < 600){
    //     rotation = 20;
    //     alpha = 255;
    //     starColor = color(255, 220, 186);
    //   } else {
    //     rotation = 45;
    //     alpha = 255;
    //     starColor = color(242, 206, 230);
    //   }

      sparkle(x, y, rotation, starColor, 200);
     }
    }
}
  
  
  //sparkle shape
  function sparkle(xPos, yPos, rotation, starColor, alpha){
    const outerRadius = 25; //distance between tips
    const innerRadius = 6.25; //distance to inner valleys 

    push();
      translate(xPos, yPos);
      rotate(rotation);
      fill(hue(starColor), saturation(starColor), brightness(starColor), alpha);
      noStroke();

     beginShape();
      for(let i = 0; i < 8; i += 1){
      let angle = i * 45; //degrees of inner valley? 
    
      //alternate between outer and inner radius
      let r = (i % 2 == 0) ? outerRadius : innerRadius; 

      //Conver polar (r, angle) to Cartesian (x, y)
      let x = r * cos(angle);
      let y = r * sin(angle);

      vertex(x, y);
      }
      endShape(CLOSE); //connect final point to start
      pop();
  }

function mousePressed(){
  paletteToggle = !paletteToggle; // Swaps between true and false }
}
