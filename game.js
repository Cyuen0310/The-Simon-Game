// keep track of whether if the game has started or not
let started = false;

// create a new empty array called gamePattern
let gamePattern = [];

// create a new empty array with the name userClickedPattern
let userClickedPattern = [];

// Create a new variable called level and start at level 0.
let level = 0;

// create a new array called buttonColours
// and set it to hold the sequence "red", "blue", "green", "yellow" .
let buttonColours = ["red", "blue", "green", "yellow"];

// create a new function called nextSequence()
let nextSequence = () => {
  //
  userClickedPattern = [];

  // random number (0-3) randomNumber
  let randomNumber = Math.floor(Math.random() * 4);

  // Create a new variable called randomChosenColour
  // and use the randomNumber to select a random colour from the buttonColours array.
  let randomChosenColour = buttonColours[randomNumber];

  // Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // animate a flash to the button selected
  $(`#${gamePattern[gamePattern.length - 1]}`)
    .fadeOut(250)
    .fadeIn(250);

  playSound(gamePattern[gamePattern.length - 1]);

  // increase the level by 1 every time nextSequence() is called
  level++;

  // update the h1 with this change in the value of level.
  $("#level-title").text(`Level ${level}`);
};

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// Inside the handler,
// create a new variable called userChosenColour to store the id of the button that got clicked.
$(".btn").click(function () {
  if (started) {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    // check current level answer
    checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).keydown(() => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Create a new function called playSound() that takes a single input parameter called name.
let playSound = (name) => {
  // when a user clicks on a button, the corresponding sound should be played
  let sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
};

// Create a new function called animatePress(), it should take a single input parameter called currentColour.
let animatePress = (currentColour) => {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => $(`#${currentColour}`).removeClass("pressed"), 100);
};

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
let checkAnswer = (currentLevel) => {
  // Write an if statement inside checkAnswer()
  // check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong".
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel + 1 !== gamePattern.length) {
      console.log("continue");
    } else {
      console.log("next level");
      setTimeout(nextSequence(), 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    let sound = new Audio("./sounds/wrong.mp3");
    sound.play();
    startOver();
  }
};

// Create a new function called startOver().
// Inside this function, you'll need to reset the values of level, gamePattern and started variables.
let startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
