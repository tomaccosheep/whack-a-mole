/*

Every mole that's hit is 100 points
Every hole that's clicked is -50 points
If the whole screen gets filled with moles, they lose, and the game stops.
Every 10 seconds, increase the rate at which moles appear.
*/

var points = 0;
var gameTimer;
var moleSpeed;
var upMole = [];
var downMole = [];
var speedUp = false;
var game = true;

// This part adds every number into the downmole array. The numbers correspond to images of moles.
// {
for (i = 1; i <= 20; i++) {
    downMole.push(i.toString()); 
}
// }

// This sets an initial gamespeed. when moleSpeed is set, it will run chooseMole at that gamespeed.
// When gameTimer is set, it chooses how quickly the faster method will increase the speed
// {
var gameSpeed = 2000;
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
            moleSpeed = clearInterval();
            moleSpeed = setInterval(chooseMole, gameSpeed);
            speedUp = false;
        }
    }
    else {
        moleSpeed = clearInterval();
        gameTimer = clearInterval();
        $("#gameover").html("Game over! You got " + points.toString() + " points!");
        game = false;
    }
}

$("#points").html(points);
setTime();



// This sets the click function for when you click on an item
// {
$(".hole").click(function() {
    var hitMole = $(this).attr("id"); // Changed id from int to string, adjust accordingly
    if (upMole.indexOf(hitMole) != -1 && game === true) {
        var hitIndex = upMole.indexOf(hitMole);
        ($("#" + hitMole)).children().attr('src', 'img/hole.jpg');
        downMole.push(upMole[hitIndex]);
        upMole.splice(parseInt(hitIndex), 1);
        points += 100;
    }
    else if (game === true) {
        points -= 50;
    }
    $("#points").html(points);
});


