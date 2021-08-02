let scoreUser = 0;
const score = document.querySelector("#score");
const gameChoices = ["rock", "paper", "scissors", "lizard", "spock"];
let userChoice = "";
let houseChoice = "";
const choices = [
  ...document.querySelector("[data-step='1']").querySelectorAll("[data-choice"),
];
const step1 = document.querySelector("[data-step='1']");
const step2 = document.querySelector("[data-step='2']");
const result = document.querySelector(".result");
const playAgain = document.querySelector(".play");
const house = document.querySelector("[data-choice='house']");
const user = document.querySelector("[data-choice='user']");

const rulesBtn = document.querySelector(".btn__rules");
const rules = document.querySelector(".rules");
const closeBtn = document.querySelector(".btn__close");

rulesBtn.addEventListener("click", () => {
  rules.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
  rules.classList.add("hide");
});

choices.forEach((item) => {
  item.addEventListener("click", (e) => {
    userChoice = e.target.dataset.choice;
    goToStep2();
  });
});

function goToStep2() {
  step1.classList.add("hide");
  step2.classList.remove("hide");
  user.classList.remove("win");
  house.classList.remove("win");

  const houseChoice = gameChoices[Math.floor(Math.random() * 5)];
  setUserChoice();
  randomHouse();
}

function setUserChoice() {
  user.children[0].innerHTML = `<img src="../images/icon-${userChoice}.svg" alt="" />`;
  user.setAttribute("data-choice", userChoice);
}

function setHouseChoice(houseChoice) {
  house.children[0].innerHTML = `<img src="../images/icon-${houseChoice}.svg" alt="" />`;
  house.setAttribute("data-choice", houseChoice);
}

function randomHouse() {
  let index = 0;
  let intervalID = setInterval(() => {
    if (index === 5) {
      index = 0;
    }
    houseChoice = gameChoices[index];
    setHouseChoice(houseChoice);
    index++;
  }, 100);

  setTimeout(() => {
    clearInterval(intervalID);

    whoWins(gameChoices[Math.floor(Math.random() * 5)]);
  }, 1000);
}

function whoWins(houseChoice) {
  setHouseChoice(houseChoice);
  let win = false;

  if ((userChoice === "scissors" || "lizard") && houseChoice == "paper") {
    win = true;
  } else if ((userChoice === "rock" || "scissors") && houseChoice == "lizard") {
    win = true;
  } else if ((userChoice === "rock" || "spock") && houseChoice == "scissors") {
    win = true;
  } else if ((userChoice === "paper" || "lizard") && houseChoice == "spock") {
    win = true;
  } else if ((userChoice === "paper" || "spock") && houseChoice == "rock") {
    win = true;
  }

  setTimeout(() => setScore(win), 200);
}

function resetGame() {
  step1.classList.remove("hide");
  step2.classList.add("hide");
  result.classList.add("hide");
}

function setScore(win) {
  result.classList.remove("hide");
  if (win === true) {
    document.querySelector("#result-text").textContent = "YOU WIN";
    scoreUser++;
    score.textContent = scoreUser;
    user.classList.add("win");
  } else {
    document.querySelector("#result-text").textContent = "YOU LOSE";
    house.classList.add("win");
  }

  result.addEventListener("click", () => resetGame());
}
