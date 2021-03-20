// Access element by ID using .querySelector()
var startButton = document.querySelector("#start-timer");
var test = document.querySelector("#test");
var timerEl = document.getElementById('timer');
var starterText = document.getElementById('starterText');
var questionsText = document.getElementById('questions');
var highScores = document.getElementById('highScores');
var ansBtn = document.querySelectorAll("button.ansBtn");
var viewScores = document.getElementById('scores');

// for local storage
var initial = document.getElementById("msg");
var saveButton = document.getElementById("save");

// 
var allPlayers = document.querySelector("#allPlayers");
var scoreList = document.querySelector("#score-list");


//where the question and answers go
var questionEl = document.querySelector("#questionHere");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");


var timerInterval;
var timeLeft = 55;
var questionCount = 0;

var allPlayers = [];

// when user clicks button the timer starts
startButton.addEventListener("click", quizTime)

// when user clicks button the timer starts
viewScores.addEventListener("click", displayScores)

// stores questions as objects
var questions = [{
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

// when the user clicks an answer for a question run the checkanswer function
ansBtn.forEach(item => {
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
    if (questionCount === 4) {
        gameOver();
    }
    // call setQuestion to bring in next question when any ansBtn is clicked
    setQuestion(questionCount);
}


function countdown() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " sec";

        if (timeLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
           
            questionsText.style.display = "none";

        }
    }, 1000);
}


// Displays the message once time is out or all 5 questions have been answered
function gameOver() {
    clearInterval(timerInterval);
    high.innerHTML = '<p>Game Over! Your score is: ' + timeLeft + '</p>';
    questionsText.style.display = "none";
    highScores.style.display = "block";
    timerEl.style.display = "none";
}



console.log(initial);
var storage = [];
var user = [];
// User clicks save and it stores their score in local storage
saveButton.addEventListener("click", addScore)

function addScore(event)

{
    event.preventDefault();
    var user = {
        initial: initial.value.trim(),
        score: timeLeft
      };
    
      localStorage.setItem("user", JSON.stringify(user));
    
    
    // Save related form data as an object
    storage.push(user)

    console.log(storage);
    // sort scores
    storage = storage.sort((a, b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });


    scoreList.innerHTML = "";
    for (let i = 0; i < storage.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${storage[i].initials}: ${storage[i].score}`;
        scoreList.append(li);
    }

    // Add to local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("storage", JSON.stringify(storage));
}

function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    let storedstorage = JSON.parse(localStorage.getItem("storage"));

    // If scores were retrieved from localStorage, update the storage array to it
    if (storedstorage !== null) {
        storage = storedstorage;
    }
}



