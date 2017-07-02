/*

Every mole that's hit is 100 points
Every hole that's clicked is -50 points
If the whole screen gets filled with moles, they lose, and the game stops.
Every 10 seconds, increase the rate at which moles appear.
*/

var points = 0;
var gameTimer;
var moleSpeed;
var upMole = []; // an array of moles that are popped up
var downMole = []; // an array of moles that are set to down
var speedUp = false; // this will be set to true when the game should speed up during the next iteration
var game = true; // this will be true until the game is over, and all clicking does nothing
var gameSpeed = 1000; // How often moles will pop up initially

// This part adds every number into the downmole array. The numbers correspond to images of moles.
// {
for (i = 1; i <= 20; i++) {
    downMole.push(i.toString()); 
}
// }

// This sets an initial gamespeed. when moleSpeed is set, it will run chooseMole at that gamespeed.
// When gameTimer is set, it chooses how quickly the faster method will increase the speed
// {
function setTime() {
    moleSpeed = setInterval(chooseMole, gameSpeed);
    gameTimer = setInterval(faster, 10000);
}

function faster() {
    speedUp = true;
}


// This checks to see if the list of moles down is empty, to see if we have any moles left.
// If so, it makes a random number between 0 and (array length - 1), to indicate possible indicies of the
// array that holds the numbers. That changes a random mole's image, and moves them from downmole to upmole.
// If the boolean "speedup" is true, then it will reset molespeed with a slightly decreased gamespeed.
// If there are no more moles down, then it will clear all intervals, present a "game over" message,
// and set "game" to false.
// {
function chooseMole() {
    if (downMole.length > 0) {
        var randMoleIndex = Math.floor(Math.random() * downMole.length);
        console.log(upMole);
        console.log(downMole);
        console.log(randMoleIndex);
        ($("#" + downMole[randMoleIndex].toString())).children().attr('src','img/mole.jpg');
        upMole.push(downMole[randMoleIndex]);
        downMole.splice(randMoleIndex, 1);
        if (speedUp) {
            gameSpeed = gameSpeed * .95;
            clearInterval(moleSpeed);
            moleSpeed = setInterval(chooseMole, gameSpeed);
            speedUp = false;
        }
    }
    else {
        clearInterval(moleSpeed);
        clearInterval(gameTimer);
        $("#gameover").html("Game over! You got " + points.toString() + " points!");
        game = false;
    }
}
// }


$("#points").html(points); // Show points in the "points" span
setTime(); // Run everything


// This sets the click function for when you click on an item
// It sets "hitMole" to the mole's number. If hitMole is in the list of moles that are up, and if
// the game is still running, then the image of that mole is changed, 100 points added, and the
// mole moves from upmole to downmole.
// If the mole is down and the game is still running, you lose 50 points.
// At the end, the "points" html is updated
// {
$(".hole").click(function() {
    var hitMole = $(this).attr("id"); // Changed id from int to string, adjust accordingly
    if (upMole.indexOf(hitMole) != -1 && game === true) {
        ($("#" + hitMole)).children().attr('src', 'img/hole.jpg');
        var hitIndex = upMole.indexOf(hitMole);
        downMole.push(upMole[hitIndex]);
        upMole.splice(parseInt(hitIndex), 1);
        points += 100;
    }
    else if (game === true) {
        points -= 50;
    }
    $("#points").html(points);
});
// }

