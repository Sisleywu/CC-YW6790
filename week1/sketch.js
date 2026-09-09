// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "a new form of expression that bridges the gap between technology and art", source: "Ahmad Moussa" },
  { text: "a process based on exploration, iteration, reflection and discovery", source: "Tim" },
  { text: "the practice of combining programming techniques with artistic expression", source: "SMU" },
  { text: "the process of using code, technology and computers as artistic and designtools", source: "Whitney" },
  { text: "a deliberate act of letting go and see where the process take you", source: "Patrik" },
  { text: "the application of programming techniques in the act of creation", source: "Stokes" },
  { text: "creating something expressive instead of something only functional", source: "Zhai" },
  { text: "learning a new language", source: "Reas, 2008" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(54, 255, 206);  // set the text color
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(48, 32, 15); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}