const gameOverDialog = document.getElementById("gameOverDialog");
const displayHighScore = document.getElementById("displayHighScore");
const highScoreConfirm = document.getElementById("highScoreConfirm");
const highScoreName = document.getElementById("highScoreName");
const skipButton = document.getElementById("skipButton");
const timerContainer = document.getElementById("timerContainer");
const scoreContainer = document.getElementById("scoreContainer");
const timerDisplay = document.getElementById("timerDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const highScoreElem = document.getElementById("highScores");
const questionText = document.getElementById("questionText");
const answerTextA = document.getElementById("answerTextA");
const answerTextB = document.getElementById("answerTextB");
const answerTextC = document.getElementById("answerTextC");
const allAnswers = document.getElementById("answers");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const answerC = document.getElementById("answerC");
const docRoot = document.querySelector(":root");
var currentQuestionIndex = 0;
var questionTime = 15;
var pointsPer = 100;
var playerScore = 0;
var gameTimer;
var timer;

var highScoreList = [
  { name: "rigby", score: 100 },
  { name: "muscle man", score: 400 },
  { name: "modercai", score: 200 },
  { name: "billy mitchell", score: 500 },
];

const chgRootVar = function (setting, val) {
  docRoot.style.setProperty("--" + setting, val);
};

allAnswers.addEventListener("click", (event) => {
  checkAnswer(event.target.dataset.choice);
  console.log(event.target);
});

skipButton.addEventListener("click", () => {
  displayNextQuestion()
})


highScoreConfirm.addEventListener("click", () => {
  addHighScore(highScoreName.value, playerScore);
  gameOverDialog.close()
  init()
});

function endGame() {
  scoreDisplay.innerHTML = playerScore;
  clearInterval(gameTimer);
  displayHighScore.innerHTML = playerScore;
  gameOverDialog.showModal();
  score10 = highScoreList.map(a => a.score).slice(-1)
  if (playerScore > score10) {
    gameOverMessage.innerHTML = "New high score!"
    highScoreName.style.visibility = 'visible'
  }
  else {
    highScoreName.style.visibility = 'hidden'
    gameOverMessage.innerHTML = "Game over!"
  }


}

function updateNavScore() {
  scoreDisplay.innerHTML = playerScore;
  clearInterval(gameTimer);
  startGameTimer();
}

function displayNextQuestion() {
  
  if (currentQuestionIndex < questionList.length) {
    answerTextA.textContent = questionList[currentQuestionIndex].textA;
    answerTextB.textContent = questionList[currentQuestionIndex].textB;
    answerTextC.textContent = questionList[currentQuestionIndex].textC;
    questionText.textContent = questionList[currentQuestionIndex].question;
    currentQuestionIndex++
  } else {
    endGame();
  }
  updateNavScore();
}

function scoreAnswer() {
  playerScore += Math.round(pointsPer * timer / 10);
}

function checkAnswer(answer) {
  if (questionList[currentQuestionIndex]["correctChoice"] == answer) {
    console.log("correct!");
    scoreAnswer();
;
  } else {
    console.log("wrong!");
    ;
  }

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
      displayNextQuestion(); 
    }

    else {
      if (timer < 5){
        timerContainer.classList.add("redify");
      }
    timer--;
    
    setTimeout(() => {
      timerContainer.classList.add("bigify");
    }, 950);
  }
  }, 1000);
}

function addHighScore(name, score) {
  highScoreList.push({ name: name, score: score });
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
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
  if (localStorage.getItem("highScoreList")) {
    highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
  }
  playerScore = 0;
  currentQuestionIndex = 0;
  updateNavScore();
  displayHighScores();
  displayNextQuestion();
}

init();
