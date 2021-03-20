// Access element by ID using .querySelector()
var startButton = document.querySelector("#start-timer");
var test = document.querySelector("#test");
var timerEl = document.getElementById('timer');
var starterText = document.getElementById('starterText');
var questionsText = document.getElementById('questions');
var highScores = document.getElementById('highScores');
var highScores2 = document.getElementById('highScores2');
var userChoice = document.querySelectorAll("button.userChoice");
var viewScores = document.getElementById('scoresView');
var clearScrBtn = document.querySelector("#clearscores");

var goBackBtn = document.querySelector("#back-btn");

// for local storage
var initialsInput = document.getElementById("msg");
var saveButton = document.getElementById("save");

// 
var allPlayers = document.querySelector("#allPlayers");
var scoreList2 = document.querySelector("#score-list");


//where the question and answers go
var questionEl = document.querySelector("#questionHere");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");


var timerInterval;
var timeLeft = 75;

// when user clicks button the timer starts
startButton.addEventListener("click", quizTime)

viewScores.addEventListener("click", function () {
    if (highScores2.style.display === "none") {
        highScores2.style.display = "block";
    } else if (highScores2.style.display === "block") {
        highScores2.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});

// stores questions as objects
const questions = [{
        question: "Question 1:",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "1"
    },
    {
        question: "Question 2",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "1"
    },
    {
        question: "Question 3",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "1"
    },
    {
        question: "Question 4",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "1"
    },
    {
        question: "Question 5",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "1"
    }
];


function quizTime() {
    starterText.style.display = "none";
    questionsText.style.display = "block";
    questionCount = 0;
    // start the timer
    countdown();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        answer1.textContent = questions[id].answers[0];
        answer2.textContent = questions[id].answers[1];
        answer3.textContent = questions[id].answers[2];
        answer4.textContent = questions[id].answers[3];
    }
}

saveButton.addEventListener("click", addScore);


// when the user clicks an answer for a question run the checkanswer function
userChoice.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

function checkAnswer(event) {
    event.preventDefault();
    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {} else if (questions[questionCount].correctAnswer !== event.target.value) {
        timeLeft = timeLeft - 10;
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // when all the questions are done run the gameOver function

    // call setQuestion to bring in next question when any userChoice is clicked
    setQuestion(questionCount);
}


function countdown() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " sec";

        if (questionCount === 5) {
            clearInterval(timerInterval);
            highScores.style.display = "block";
            questionsText.style.display = "none";
            high.innerHTML = '<p>Game Over! Your score is: ' + timeLeft + '</p>';
        }
        
        else if (timeLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            highScores.style.display = "block";
            questionsText.style.display = "none";
            high.innerHTML = '<p>Game Over! Your score is: ' + timeLeft + '</p>';

        }
    }, 1000);
}

var scoreList = [];

function addScore(event) {
    event.preventDefault();

    highScores.style.display = "none";
    highScores2.style.display = "block";
  

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: timeLeft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreList2.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreList2.append(li);
    }

    // Add to local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}



// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// clear scores
function clearScores() {
    localStorage.clear();
    scoreList2.innerHTML="";
}


// clear scores
function showScores() {
    highScores.style.display = "none";
    highScores2.style.display = "block";
    starterText.style.display = "none";
}



// Check answers loop
userChoice.forEach(item => {
    item.addEventListener('click', checkAnswer);
});






goBackBtn.addEventListener("click", function () {
    highScores2.style.display = "none";
    starterText.style.display = "block";
    secondsLeft = 75;
    timerEl.textContent = timeLeft + " sec";
});

