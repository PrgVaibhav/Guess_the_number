const result = document.querySelector("#result");
const guessInput = document.querySelector(".guess");
const guessBtn = document.querySelector("#btn");
const restartBtn = document.querySelector("#again");
const attempts = document.querySelector(".attempts");
const score = document.querySelector(".high_score");
const gameContainer = document.querySelector(".container");

// Generating random number
let secretRandomNumber = Math.trunc(Math.random() * 20) + 1;

// Taking User name
var userInfo = prompt("What is your name?");

// Setting attempts and high score
let attemptsRemaining = 20;
let highScore = 0;
attempts.textContent = attemptsRemaining;
score.textContent = highScore;

// Adding audios
const clickAudio = new Audio("click.wav");
const winAudio = new Audio("win.wav");
const loseAudio = new Audio("lose.wav");

function displayMessage(message) {
  result.textContent = message;
}

// Adding functionality on what should happen on a click!!
guessBtn.addEventListener("click", () => {
  //Converting string to number
  const inputValue = Number(guessInput.value);

  // Audio will play on clicking button
  clickAudio.play();

  //If user doesn't provide name just set it to stranger
  if (!userInfo) {
    userInfo = `Stranger`;
  }

  //   Checking if the input is empty or not

  if (!inputValue) {
    displayMessage(`Fill the number field before guessing ${userInfo} 🤷‍♂️`);
  } else if (inputValue > 20) {
    displayMessage(`Guess between 1 to 20 ${userInfo} 😒`);
  }

  // Winning moment
  else if (inputValue === secretRandomNumber) {
    displayMessage(`Yay!! You guessed it correct ${userInfo} 🏆`);
    gameContainer.classList.add("win");
    winAudio.play();
    guessBtn.disabled = true;
    if (attemptsRemaining > highScore) {
      highScore = attemptsRemaining;
      score.textContent = highScore;
    }

    // Wrong guess
  } else if (inputValue !== secretRandomNumber) {
    if (attemptsRemaining > 1) {
      displayMessage(
        inputValue > secretRandomNumber
          ? `You guessed higher number ${userInfo} 🐱‍🏍`
          : `You guessed lower number ${userInfo} 🥱`
      );

      attemptsRemaining--;
      attempts.textContent = attemptsRemaining;
    } else {
      displayMessage(`Sorry ${userInfo} you lose the game 😞💔`);
      guessBtn.disabled = true;
      attempts.textContent = 0;
      loseAudio.play();
      gameContainer.classList.add("loose");
    }
  }
});

// Restarting the game
restartBtn.addEventListener("click", () => {
  attemptsRemaining = 20;
  secretRandomNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start Guessing.. 👀");
  attempts.textContent = attemptsRemaining;
  guessInput.value = "";
  if (gameContainer.classList.contains("win")) {
    gameContainer.classList.remove("win");
  } else if (gameContainer.classList.contains("loose")) {
    gameContainer.classList.remove("loose");
  }
  guessBtn.disabled = false;
});
