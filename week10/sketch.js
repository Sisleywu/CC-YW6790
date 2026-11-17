let video;
let handPose;
let hands = []; //store detection results

let particles = [];
let openness = 0;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log("ml5 version:", ml5.version);

    //create webcam capture
    video = createCapture(VIDEO); 
    video.size(windowWidth, windowHeight);
    video.hide();

    //load handpose model
    handPose = await ml5.handPose();
    handPose.detectStart(video, gotHands);

    //create particles
    for (let i = 0; i < 250; i++) {
        particles.push(new Particle()); //custom class to create quick particles
    }
}

function draw() {
    background(5, 8, 18);

    //detect hand openness 
    if (hands.length > 0) {
        let hand = hands[0];
        console.log("Hand detected!");
 
    // Get the index finger tip and thumb of the first hand (index: 0 in the array)
    let thumb1 = hand.keypoints[4];
    let thumb2 = hand.keypoints[8];
    let thumb3 = hand.keypoints[12];
    let thumb4 = hand.keypoints[16];
    let thumb5 = hand.keypoints[20];

    // Calculate distances between thumb and other fingertips
    let d1 = dist(thumb1.x, thumb1.y, thumb2.x, thumb2.y);
    let d2 = dist(thumb1.x, thumb1.y, thumb3.x, thumb3.y);
    let d3 = dist(thumb1.x, thumb1.y, thumb4.x, thumb4.y);
    let d4 = dist(thumb1.x, thumb1.y, thumb5.x, thumb5.y);

    let averageDistance = (d1 + d2 + d3 + d4) / 4;

    // Get the base of the index finger and pinky
    let indexBase = hand.keypoints[5];
    let pinkyBase = hand.keypoints[17];

    // Calculate the width of the palm
    let handSize = dist(
    indexBase.x, indexBase.y,
    pinkyBase.x, pinkyBase.y
    );

    // Calculate relative finger distance
    let handOpen = averageDistance / handSize;

    // Check the value
    console.log(handOpen);

    // Map hand openness to particle spread
    let targetOpen = map(handOpen, 0.8, 2.5, 0, 1, true);

    // Smooth the movement
    openness = lerp(openness, targetOpen, 0.08);
    }

    // Draw and move particles
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Position when hand is closed
        let closedX = width / 2 + p.originalX;
        let closedY = height / 2 + p.originalY;

        // Position when hand is open
        let openX = closedX + p.scatterX;
        let openY = closedY + p.scatterY;

        // Move between closed and open positions
        let targetX = lerp(closedX, openX, openness);
        let targetY = lerp(closedY, openY, openness);

        // Smooth particle movement
        p.x = lerp(p.x, targetX, 0.08);
        p.y = lerp(p.y, targetY, 0.08);

        // Draw particle
        p.display();
    }
}

function gotHands(results) {
    hands = results;
    
}

class Particle {
  constructor() {
    let angle = random(TWO_PI);
    let radius = sqrt(random()) * 90;

    // Original position inside the sphere
    this.originalX = cos(angle) * radius;
    this.originalY = sin(angle) * radius;

    // Current position
    this.x = width / 2 + this.originalX;
    this.y = height / 2 + this.originalY;

    // Position offset when the sphere breaks apart
    this.scatterX = random(-350, 350);
    this.scatterY = random(-350, 350);

    this.size = random(2, 5);
  }

  display() {
    noStroke();
    fill(130, 210, 255, 210);
    circle(this.x, this.y, this.size);
  }
}