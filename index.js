
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickPattern=[];
var level=0;
var started = false;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
      if (userClickPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }else {
        $("#level-title").text("Try again!!");
        setTimeout(function () {
            startOver();
        }, 2000);
    }
};

function startOver(){
    $("#level-title").text("Press A Key to Start");
    level=0;
    started=false;
    gamePattern=[];
    userClickPattern=[];
};

function nextSequence(){
    userClickPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
};

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};



