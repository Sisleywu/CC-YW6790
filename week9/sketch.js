let mic;
let amplitude; 

let letters = "WORDS UNSPOKEN";
let positions = [];
let started = false;
let offsets = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textFont("monospace");

    mic = new p5.AudioIn();
    amplitude = new p5.Amplitude();

    // Connect microphone to amplitude analyzer
    mic.connect(amplitude);

    // Store letter coordinates
    for (let i = 0; i < letters.length; i++) {
        // Store a different movement value for each letter
        offsets.push(random(1000));

        positions.push({
            x: width / 2 + (i - (letters.length - 1) / 2) * 30,
            y: height / 2
        });
    }
}

function draw() {
    background(10, 10, 15);

    if (!started) {
        fill(255);
        textSize(18);
        text("Click to start microphone", width / 2, height / 2);
    } else {
        let volume = amplitude.getLevel(); 
        console.log(volume);
        let letterSize = map(volume, 0, 0.03, 20, 100, true);
        let spread = map(volume, 0, 0.03, 0, 300, true);
        let opacity = map(volume, 0, 0.03, 150, 255, true);

        for (let i = 0; i < letters.length; i++) {
            let x = positions[i].x;
            let y = positions[i].y;
            // Slowly move letters using  noise
            let offsetX = map(
            noise(offsets[i] + frameCount * 0.005),
            0, 1, -spread, spread
            );

            let offsetY = map(
            noise(offsets[i] + 500 + frameCount * 0.005),
            0, 1, -spread, spread
            );

        fill(255, opacity);
        noStroke();
        textSize(letterSize);
        text(letters[i], x + offsetX, y + offsetY);
        }
    }
}

async function mousePressed() {
    if (started === false) {
        try {
            await userStartAudio();
            await mic.start();

            started = true;
            console.log("Microphone started!");
            } catch (error) {
            console.error("Microphone error:", error);
        }
    }
}
