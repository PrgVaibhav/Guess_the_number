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

// Adding audios
const clickAudio = new Audio("/click.wav");
const winAudio = new Audio("/win.wav");
const loseAudio = new Audio("/lose.wav");

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
    result.textContent = `Fill the number field before guessing ${userInfo} 🤷‍♂️`;
  }
  // Winning moment
  else if (inputValue === secretRandomNumber) {
    result.textContent = `Yay!! You guessed it correct ${userInfo} 🏆`;
    highScore.textContent = attemptsRemaining;
    gameContainer.classList.add("win");
    winAudio.play();
    guessBtn.disabled = true;
    if (attemptsRemaining > highScore) {
      highScore = attemptsRemaining;
      score.textContent = highScore;
    }
  }
  // Higher number moment
  else if (inputValue > secretRandomNumber) {
    if (attemptsRemaining > 1) {
      result.textContent = `You guessed higher number ${userInfo} 🐱‍🏍`;
      attemptsRemaining--;
      attempts.textContent = attemptsRemaining;
    } else {
      result.textContent = `Sorry ${userInfo} you lose the game 😞💔`;
      guessBtn.disabled = true;
      attempts.textContent = 0;
      loseAudio.play();
      gameContainer.classList.add("loose");
    }
  }
  // smaller number moment
  else if (inputValue < secretRandomNumber) {
    if (attemptsRemaining > 1) {
      result.textContent = `You guessed lower number ${userInfo} 🥱`;
      attemptsRemaining--;
      attempts.textContent = attemptsRemaining;
    } else {
      result.textContent = `Sorry ${userInfo} you lose the game 😞💔`;
      loseAudio.play();
      guessBtn.disabled = true;
      attempts.textContent = 0;
      gameContainer.classList.add("loose");
    }
  }
});

// Restarting the game
restartBtn.addEventListener("click", () => {
  attemptsRemaining = 20;
  secretRandomNumber = Math.trunc(Math.random() * 20) + 1;
  result.textContent = "Start Guessing.. 👀";
  attempts.textContent = attemptsRemaining;
  guessInput.value = "";
  if (gameContainer.classList.contains("win")) {
    gameContainer.classList.remove("win");
  } else if (gameContainer.classList.contains("loose")) {
    gameContainer.classList.remove("loose");
  }
  guessBtn.disabled = false;
});
