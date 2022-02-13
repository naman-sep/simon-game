//User-defined Variables
var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var count=0;


//User-defined Functions
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function wrongAnswer (){

  var audio = new Audio("sounds/wrong.mp3");
  level=0;
  start=false;
  gamePattern=[];
  userClickedPattern=[];

  audio.play();

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    count++;
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }

  }
  else {
    wrongAnswer();
  }
}

//Function calls

$(document).keydown(function() {
  if (!start) {
    nextSequence();
    start = true;
  }
});

$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});
