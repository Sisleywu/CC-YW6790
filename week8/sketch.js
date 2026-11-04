let raindrops = []; // Array to store raindrop objects
let umbrella;
let dragging = false; // Flag to indicate if the triangle is being dragged

function setup() {
    createCanvas(windowWidth, windowHeight);

    //create an umbrella
    umbrella = new Umbrella(windowWidth / 2, windowHeight / 2);  

    // Initialize raindrops with random positions and speeds
    for (let i = 0; i < 300; i++) {
        raindrops.push({
        x: random(windowWidth),
        y: random(windowHeight),
        speed: random(2, 6)
        });
    }

}

function draw() {
    background(10, 10, 35);

    // Loop through the raindrops array backwards
    for (let i = raindrops.length - 1; i >= 0; i--) {
        let drop = raindrops[i];
        drop.y += drop.speed;

        // Calculate the umbrella roof
        let roofY = umbrella.y - 30;

        // left side of the triangle
        if (drop.x > umbrella.x - 80 && drop.x < umbrella.x) {
        roofY = map(
            drop.x,
            umbrella.x - 80,
            umbrella.x,
            umbrella.y + 30,
            umbrella.y - 30
        );
        }

        // right side of the triangle
        if (drop.x >= umbrella.x && drop.x < umbrella.x + 80) {
        roofY = map(
            drop.x,
            umbrella.x,
            umbrella.x + 80,
            umbrella.y - 30,
            umbrella.y + 30
        );
        }

        let hitUmbrella = false;

        // if the raindrop is under the umbrella roof
        if (drop.x > umbrella.x - 80 &&
            drop.x < umbrella.x + 80 &&
            drop.y + 20 >= roofY) {
        hitUmbrella = true;
        }

        // remove the raindrop if it hits the umbrella
        if (hitUmbrella === true) {

        // slice(0, i) copies all raindrops before the raindrop that hits the umbrella, it starts at index 0 and stops before index i
        // slice(i + 1) copies all raindrops after the raindrop that hits the umbrella
        let before = raindrops.slice(0, i);
        let after = raindrops.slice(i + 1);

        // replace the original array with the raindrops before index i, so the raindrop that hit the umbrella is removed
        raindrops = before;

        // Add the remaining raindrops back into the array
        for (let j = 0; j < after.length; j++) {
            raindrops.push(after[j]);
        }

        } else {

        // Reset raindrops that leave the canvas
        if (drop.y > height) {
            drop.y = random(-100, 0);
        }

        // Draw the raindrop
        stroke(150, 190, 220);
        line(drop.x, drop.y, drop.x, drop.y + 20);
        }
    }

    // total number of raindrops
    for (let i = raindrops.length; i < 300; i++) {
    raindrops.push({
        x: random(width),
        y: random(-100, 0),
        speed: random(2, 6)
    });
    }

    // Draw the umbrella
    fill(255, 90, 0);
    noStroke();
    umbrella.display();

}

function mousePressed() {
    //check if the mouse is over the umbrella
    //mouseX > umbrella.x - 80: Mouse is to the right of the left boundary.
    //mouseX < umbrella.x + 80: Mouse is to the left of the right boundary.
    //mouseY > umbrella.y - 30: Mouse is below the top boundary.
    //mouseY < umbrella.y + 30: Mouse is above the bottom boundary.
    if (mouseX > umbrella.x - 80 && 
        mouseX < umbrella.x + 80 &&
        mouseY > umbrella.y - 30 &&
        mouseY < umbrella.y + 30) {
    dragging = true;
    } else { // Add a new raindrop
    raindrops.push({
      x: mouseX,
      y: 0,
      speed: random(2, 6)
    });
  }

}

function mouseDragged() {
  if (dragging === true) {
    umbrella.x = mouseX;
    umbrella.y = mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}

//what is an umbrella class, it represents a triangle with a position and a display method
//a new triangle can be created using the umbrella class, it creates 
class Umbrella {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() { // Draw the umbrella triangle
    triangle(
      this.x, this.y - 30,
      this.x - 80, this.y + 30,
      this.x + 80, this.y + 30
    );
  }
}