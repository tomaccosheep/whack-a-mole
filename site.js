/*
Practice: Whack-A-Mole

Save your solution in a directory in practice/ and in a branch named mole. Your HTML file should be named index.html, your CSS file named site.css, and your JS file named site.js in that directory.

Make a 5x4 grid of hole images. Every second, randomly pick a hole in the grid and turn it's image into a mole. If the user clicks on a mole image, turn it back into a hole.

Use the setInterval function to run a callback function periodically.

Advanced

Keep score.

Every mole that's hit is 100 points
Every hole that's clicked is -50 points
If the whole screen gets filled with moles, they lose, and the game stops.
Every 10 seconds, increase the rate at which moles appear.
*/

var gameTimer;
var moleSpeed;
var upMole = [];
var downMole = [];
for (i = 1; i <= 20; i++) {
    downMole.push(i.toString()); 
}

function setTime() {
    moleSpeed = setInterval(chooseMole, 2000);
    gameTimer = setInterval(faster, 10000);
}

function faster() {
    moleSpeed -= moleSpeed * .5;
}

function chooseMole() {
    if (downMole.length > 0) {
        var randMoleIndex = Math.floor(Math.random() * downMole.length - 1) + 1; // is this correct?
        console.log(upMole);
        console.log(downMole);
        ($("#hole" + downMole[randMoleIndex].toString())).children().attr('src','img/mole.jpg');
        upMole.push(downMole[randMoleIndex]);
        downMole.splice(randMoleIndex, 1);
    }
}

setTime();
