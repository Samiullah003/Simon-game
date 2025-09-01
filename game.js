var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var gameArrayLastIndex = gamePattern.length - 1;

$(".btn").on("click", function (event) {
  //adding click event to buttons for user
  var userChosenColor = $(this).attr("id"); //storing the id of clicked button in the variable

  userClickedPattern.push(userChosenColor); //pushing the variable into userClickedPattern array

  playSound(userChosenColor); //calling playSound() function when the button is clicked

  animatePress(userChosenColor); //calling animatePress() function when the button is clicked

  var userArrayLastIndex = userClickedPattern.length - 1;

  checkAnswer(userArrayLastIndex); //calling checkAnswer() function to check the answer
});

//function for playing sound when clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //adding sounds to the clicked color
  audio.play();
}

//function to animate the button when clicked
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

//to start the game on first click
$(document).on("keydown", function () {
  //adding keydown function to start the game
  if (!started) {
    //using flag method to start the game one first press
    $("h1").text("Level " + level);

    nextSequence(); //calling nextSequence on first press
    started = true; //setting started to value true so that nextSequence gets called out on first click not on every click
  }
});

//function for creating gamepattern
function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4); //getting random no between 1 to 3

  var randomChosenColor = buttonColors[randomNumber]; //getting random color from buttonColors array and storing it in variable

  gamePattern.push(randomChosenColor); //pushing that random color in an empty array

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100); // adding animation to the random color generated

  var chosenColor = new Audio("sounds/" + randomChosenColor + ".mp3"); //adding sounds to the chosen color
  chosenColor.play();

  level++;

  $("h1").text("Level " + level);
}

//creating checkAnswer function to check the answers from the user and move to next level or restart
function checkAnswer(currentLevel) {
  //checking if both the arrays have same elements
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //checking if both the array have same length
    if (gamePattern.length === userClickedPattern.length) {
      //calling nextSequence() after 1s
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //if the user makes a mistake he looses
    //playing sound when game is over
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    //adding game-over flash to the body
    $("body").addClass("game-over");

    //removing the flash after 0.2s to make it like animation
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //changing h1 text
    $("h1").text("Game Over, Press Any Key to Restart");

    //caling startover() function to restart the game
    startOver();
  }
}

function startOver() {
  level = 0; //reseting level,gamePattern and flag variable means started
  gamePattern = [];
  started = false;
}
