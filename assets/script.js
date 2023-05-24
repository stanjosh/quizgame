
var currentQuestionIndex = 0;
var questionTime = 10;
var pointsPer = 100;
var playerScore = 0;
var gameTimer;
var timer;

const gameOverDialog = document.getElementById("gameOverDialog");
const displayHighScore = document.getElementById("displayHighScore");
const highScoreConfirm = document.getElementById("highScoreConfirm");
const highScoreName = document.getElementById("highScoreName");
const scoreBuzzer = document.getElementById("scoreBuzzer");
const timerContainer = document.getElementById("timerContainer");
// const scoreContainer = document.getElementById("scoreContainer");
const timerDisplay = document.getElementById("timerDisplay");
//const scoreDisplay = document.getElementById("scoreDisplay");
const highScoreElem = document.getElementById("highScores");
const questionText = document.getElementById("questionText");
const answerTextA = document.getElementById("answerTextA");
const answerTextB = document.getElementById("answerTextB");
const answerTextC = document.getElementById("answerTextC");
const allChoices = document.getElementById("choices");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");


document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('titleScreen').close();
  init()})

var highScoreList = [
  { name: "rigby", score: 20 },
  { name: "muscle man", score: 23 },
  { name: "modercai", score: 22 },
  { name: "billy mitchell", score: 41 },
];

allChoices.addEventListener("click", (event) => {
  checkAnswer(event.target.dataset.choice);

});

highScoreConfirm.addEventListener("click", () => {
  addHighScore(highScoreName.value, timer);
  gameOverDialog.close();
  location.reload()
});

function endGame() {
  //scoreDisplay.innerHTML = playerScore;
  displayHighScore.innerHTML = timer;
  playerScore = timer
  clearInterval(gameTimer);
  currentQuestionIndex = 0;
  
  gameOverDialog.showModal();
  score10 = highScoreList.map((a) => a.score).slice(-1);
  if (timer > score10) {
    gameOverMessage.innerHTML = "New high score!";
    highScoreName.style.visibility = "visible";
  } else {
    highScoreName.style.visibility = "hidden";
    gameOverMessage.innerHTML = "Game over!";
  }
}

//function updateNavScore() {
//  scoreDisplay.innerHTML = playerScore;
//}

function displayNextQuestion() {
  //clearInterval(gameTimer);

  if (currentQuestionIndex < questionList.length) {
    //startGameTimer();
    answerTextA.textContent = questionList[currentQuestionIndex].textA;
    answerTextB.textContent = questionList[currentQuestionIndex].textB;
    answerTextC.textContent = questionList[currentQuestionIndex].textC;
    choiceA.textContent = questionList[currentQuestionIndex].textA;
    choiceB.textContent = questionList[currentQuestionIndex].textB;
    choiceC.textContent = questionList[currentQuestionIndex].textC;
    questionText.textContent = questionList[currentQuestionIndex].question;
  } else {
    endGame();
  }
  // updateNavScore();
}

//function scoreAnswer() {
//  playerScore += Math.round((pointsPer * timer) / 10);
//}

function checkAnswer(answer) {
  if (questionList[currentQuestionIndex]["correctChoice"] == answer) {
    scoreBuzzer.textContent = "right!";
    scoreBuzzer.style.color = "var(--panelColor)";
    punchFade(scoreBuzzer);
    //scoreAnswer();
  } else {
    timer -= 10
    if (timer <= 0) {
      timer = 0
      endGame()
    }
    scoreBuzzer.textContent = "wrong!";
    scoreBuzzer.style.color = "var(--lightColor)";
    punchFade(scoreBuzzer);
  }
  currentQuestionIndex++;
  displayNextQuestion();
}

function startGameTimer() {
  timer = questionTime;
  timerDisplay.innerHTML = timer;
  timer--;
  gameTimer = setInterval(() => {
    timerDisplay.innerHTML = timer;
    timerContainer.classList.remove("redify");
    timerContainer.classList.remove("bigify");
    if (timer <= 0) {
      checkAnswer(0);
    } else {
      if (timer <= 5) {
        timerContainer.classList.add("redify");
      }
      timer--;
      setTimeout(() => {
        timerContainer.classList.add("bigify");
      }, 850);
    }
  }, 1000);
}

function addHighScore(name, score) {
  highScoreList.push({ name: name, score: score });
  localStorage.setItem(
    "highScoreList",
    JSON.stringify(highScoreList.slice(0, 10))
  );
}

function displayHighScores() {
  let tableRowNumber = 1;
  highScoreElem.innerHTML = "";
  for (var highScore in highScoreList
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)) {
    let elem = highScoreElem.appendChild(document.createElement("tr"));
    let numberCell = elem.appendChild(document.createElement("td"));
    let nameCell = elem.appendChild(document.createElement("td"));
    let scoreCell = elem.appendChild(document.createElement("td"));
    nameCell.innerHTML = highScoreList[highScore].name;
    scoreCell.innerHTML = highScoreList[highScore].score;
    numberCell.innerHTML = "# " + tableRowNumber;
    tableRowNumber++;
  }
}

function init() {

  playerScore = 0;
  currentQuestionIndex = 0;
  //updateNavScore();


  displayNextQuestion();
  startGameTimer() // for full-game timer instead of question based
}

function punchFade(elem) {
  elem.style.opacity = 1;
  let opacity = 50;
  elem.classList.add("bigify");
  setInterval(() => {
    if (opacity > 0) {
      opacity--;
      elem.style.opacity = opacity / 50;
      elem.classList.remove("bigify");
    }
  }, 50);
  opacity = 50;
}


document.getElementById('titleScreen').showModal()
if (localStorage.getItem("highScoreList")) {
  highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
}
displayHighScores();