/*
	We can get the web camera through p5.js. It's actually a video element under
	the hood, so include p5.dom.min.js!

	Again, the tutorial on video in p5 is a good reference: 
		http://creative-coding.decontextualize.com/video/
*/
var capture;
var stepSize = 7;

var dx = 0;

var myFont;
var currentWord = "";
var mouseX;
var mouseY;

var hbSlider; //background hue
var sbSlider; //background saturation
var bbSlider; //background brightness

var wordSlider; //word position

function preload() {
	myFont = loadFont("fonts/OpenSans-CondLightItalic.ttf"); 

}

function visitPage() {
	window.location='http://reach-me-at.tumblr.com/submit';
}


function setup() {
	//write text
	textFont(myFont);
	textSize(60);
	textAlign(CENTER, CENTER);
	fill(255);
	stroke(0, 0, 300);


	var canvas = createCanvas(1050, 650);
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
	
	//video
	capture = createCapture(VIDEO);
	capture.hide(); 
	imageMode(CENTER);

	pixelDensity(1);

	//save button
	button = createButton("snap it!");
	button.position(1170, 400);
	button.mousePressed(saveScreenshot);

	//submit button
	button = createButton("submit!");
	button.position(1170, 450);
	button.mousePressed(visitPage);


	//sliders
	hbSlider = createSlider(0, 360, 300); // min, max, start
	hbSlider.position(1170, 100);
	hbSlider.size(90, 50);

	sbSlider = createSlider(0, 100, 80);
	sbSlider.position(1170, 200);
	sbSlider.size(90, 50);

	bbSlider = createSlider(0, 100, 80);
	bbSlider.position(1170, 300);
	bbSlider.size(90, 50);


	wordSlider = createSlider(0, 700, 50);
	wordSlider.position(1170, 20);
	wordSlider.size(100, 50);

}

// shows/hides dropdown 
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if click outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function keyTyped() {
	currentWord += key;
}

function keyPressed() {
	if (keyCode === BACKSPACE) {
		currentWord = currentWord.slice(0, -1)
	}
}

function saveScreenshot() {
	save("screenshot.png");
}

function draw() {

	//image(capture, mouseX, mouseY, 160, 120);

	var h = hbSlider.value();
	var s = sbSlider.value();
	var b = bbSlider.value();
	background(h, s, b);

	var p = wordSlider.value();

	text(currentWord, 890, p);


	capture.loadPixels(); 
		if (capture.pixels.length === 0) {
			return;
	}


	//Manipulating pixels
	for (var px = 0; px < capture.width; px += stepSize) {
		for (var py = 0; py < capture.height; py += stepSize) {
			var i = 4 * (py * capture.width + px);
			var r = capture.pixels[i];
			var g = capture.pixels[i + 1];
			var b = capture.pixels[i + 2];
			var a = capture.pixels[i + 2];

			fill(r, g, b);
			noStroke();

			var pixelSaturation = saturation([r, g, b, a]);
			var pixelBrightness = brightness([r, g, b, a]);
			var pixelHue = hue([r, g, b, a]);

			var rectSize = map(pixelSaturation, 0, 10, 0, 3 * stepSize);
			var rectWidth = map(pixelBrightness, 0, 0, 0, 10 * stepSize);
			var rectHeight = map(pixelHue, 0, 100, 0, 10 * stepSize);
			rect(px, py, rectSize, rectSize);

			push();
//				translate(px, py);
//				angleMode(DEGREES);
//				rotate(pixelHue);
//				rectMode(CENTER);
//				rect(0, 0, rectWidth, rectHeight);
			pop();
	  	}
	if (dx > capture.width) {
		dx = 0;
	}
 }
}

function makeSliderVertical(slider) {
	slider.style("-webkit-appearance", "slider-vertical");
	slider.style("writing-mode", "bt-lr");
	slider.attribute("orient", "vertical");
}









