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

//where the question and answers go
var questionEl = document.querySelector("#questionHere");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");


var timerInterval;
var timeLeft = 55;
var questionCount = 0;



// when user clicks button the timer starts
startButton.addEventListener("click", quizTime)

// when user clicks button the timer starts
viewScores.addEventListener("click", showScores)

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
    if (questions[questionCount].correctAnswer === event.target.value) {
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        timeLeft = timeLeft - 10;
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }

    if (questionCount === 4){
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


function showScores(event){
    event.preventDefault();
    questionsText.style.display = "none";
    highScores.style.display = "block";
    timerEl.style.display = "none";
    starterText.style.display = "none";
   showHighScores();

}




// Displays the message once time is out or all 5 questions have been answered
function gameOver() {   
    high.innerHTML = '<p>Game Over! Your score is: ' + timeLeft + '</p>';
    questionsText.style.display = "none";
    highScores.style.display = "block";
    timerEl.style.display = "none";
     
}



function saveScore() {
    // Save related form data as an object
    var playersDetails = {
      score: timeLeft,
      initial: initial.value.trim()
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("playersDetails", JSON.stringify(playersDetails));
  }

  saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveScore();
    showHighScores();
    });




    function showHighScores() {
        // Use JSON.parse() to convert text to JavaScript object
        var lastPlayer = JSON.parse(localStorage.getItem("playersDetails"));
        // Check if data is returned, if not exit out of the function
        if (lastPlayer !== null) {
        
        document.getElementById("saved-comment").innerHTML = lastPlayer.initial;
        document.getElementById("their-score").innerHTML = lastPlayer.score;
        } else {
          return;
        }
      }
      


