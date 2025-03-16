let body = document.querySelector("body");
let crd = document.querySelector(".card");
let pg = document.querySelector(".playGround");
let level = document.querySelector("h4");
let help = document.querySelector(".help");
let close = document.querySelector("#close-instructions");
let help_steps = document.querySelector(".how-to-play");
let action_btn = document.querySelector(".action-btn");
let play_again = document.querySelector("#play-again");
let scores = document.querySelector("h3");
let next_lvl = document.querySelector("#Next-level");
let start = document.querySelector(".start-btn");

let colors = ["red", "green", "blue", "yellow"];

let started = false;
let userArr = [];
let patternSeq = [];
let clicks = 0;
let num = 0;
let score = 0;
let lvl = 1;

body.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    level.innerText = `Level - ${lvl}`;
    console.log("Game Started");

    GenSeq();
    showBlink();
  }
});

start.addEventListener("click", () => {
  if (!started) {
    started = true;
    level.innerText = `Level - ${lvl}`;
    console.log("Game Started");

    GenSeq();
    showBlink();
  }
});

function GenSeq() {
  for (let i = 0; i < colors.length; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    patternSeq.push(randomColor);
  }
  console.log(patternSeq);
}

function showBlink() {
  let i = 0;
  const interval = setInterval(() => {
    if (i < patternSeq.length) {
      blinkTheBox(patternSeq[i]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 800);
}

function blinkTheBox(color) {
  const tile = document.getElementById(color);
  if (!tile) {
    console.error(`Element with ID '${color}' not found`);
    return;
  }

  tile.classList.add("blink");
  setTimeout(() => tile.classList.remove("blink"), 500);
}

pg.addEventListener("click", (event) => {
  if (started && event.target.classList.contains("box")) {
    userArr.push(event.target.id);
    clicks++;
    console.log(patternSeq);
    console.log(userArr);
    check();
  }
});

function playAgain() {
  lvl = 1;
  score = 0;
  userArr = [];
  patternSeq = [];
  clicks = 0;
  num = 0;
  started = true;

  GenSeq();
  showBlink();
  play_again.style.display = "none";
  next_lvl.style.display = "none";
}

function nextLevel() {
  lvl++;
  level.innerText = `Level - ${lvl}`;

  userArr = [];
  patternSeq = [];
  clicks = 0;
  num = 0;

  setTimeout(() => {
    GenSeq();
    showBlink();
  }, 700);

  play_again.style.display = "none";
  next_lvl.style.display = "none";
}

function check() {
  if (userArr[clicks - 1] !== patternSeq[clicks - 1]) {
    level.innerText = "You have lost the game!";
    play_again.style.display = "flex";
    next_lvl.style.display = "none";
  } else {
    num++;
  }

  if (num === patternSeq.length && num !== 0) {
    score += 10;
    scores.innerText = `Score : ${score}`;
    level.innerText = "You win!!!";
    play_again.style.display = "flex";
    next_lvl.style.display = "flex";
  }
}

help.addEventListener("click", () => {
  pg.style.display = "none";
  help_steps.style.display = "block";
  level.style.display = "none";
  scores.style.display = "none";
  help.style.display = "none";
});
close.addEventListener("click", () => {
  pg.style.display = "flex";
  help_steps.style.display = "none";
  level.style.display = "block";
  scores.style.display = "block";
  help.style.display = "block";
});

play_again.addEventListener("click", playAgain);
next_lvl.addEventListener("click", nextLevel);
