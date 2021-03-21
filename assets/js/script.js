// array to store user score and initials
var scoreList = [];

// Access element by ID using .querySelector()
var startButton = document.querySelector("#start-timer");
var timerEl = document.getElementById('timer');
var starterText = document.getElementById('starterText');
var questionsText = document.getElementById('questions');
var userResults = document.getElementById('userResults');
var highScores = document.getElementById('highScores');
var userChoice = document.querySelectorAll("button.userChoice");
var listStyle = document.querySelectorAll("li");
var listStyles = document.querySelectorAll("ol.listStyle");
var viewScores = document.getElementById('scoresView');
var clearScrBtn = document.querySelector("#clearscores");
var again = document.querySelector("#again");
var hs = document.querySelector("#hs");
var validator = document.querySelector("#validator");

// for local storage
var initialsInput = document.getElementById("msg");
var saveButton = document.getElementById("save");

// where the li elements will appear
var scoreListShow = document.querySelector("#score-list");

//where the question and answers go
var questionHere = document.querySelector("#questionHere");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");



var timeLeft = 60;

// when user clicks button the timer starts
startButton.addEventListener("click", quizTime)
viewScores.addEventListener("click", checkif)



function checkif(){
    if (!initialsInput.value){
        alert("There are no high scores yet!")
        return;
    }

if(starterText.style.display === "block"){
    again.style.display = "none";
}

    if (highScores.style.display === "none") {
        highScores.style.display = "block";
        return;

    } else (highScores.style.display === "block"); {
        highScores.style.display = "none";
        return;
    }; 
    
};


// stores questions as objects
const questions = [{
        question: "When was JavaScript invented?",
        answers: ["1990", "1995", "1998", "2000"],
        correctAnswer: "2"
    },
    {
        question: "What does 'Boolean' mean?",
        answers: ["an object wrapper that contains a 'true' and a 'false'", "a pasta dish", "an insult", "a program that will be able to do your job shortly"],
        correctAnswer: "1"
    },
    {
        question: "What are the 3 main coding languages of the web?",
        answers: ["HTML, Java, C++", "CSS, Python, Javascript", "HTML, CSS, JavaScript", "Python, React, Javascript"],
        correctAnswer: "3"
    },
    {
        question: "How long did it take Brendan Eich to create JavaScript?",
        answers: ["3 years", "10 days", "6 months", "still creating it"],
        correctAnswer: "2"
    },
    {
        question: "Where is JavaScript used?",
        answers: ["browsers", "servers", "in this webpage", "all of the above"],
        correctAnswer: "4"
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

function setQuestion(i) {
    if (i < questions.length) {
        questionHere.textContent = questions[i].question;
        answer1.textContent = questions[i].answers[0];
        answer2.textContent = questions[i].answers[1];
        answer3.textContent = questions[i].answers[2];
        answer4.textContent = questions[i].answers[3];
    }
}


// make sure user enters their intials
saveButton.addEventListener("click", function () {
    if (!initialsInput.value) {
        alert("you need to enter your initials!")
    } else {
        addScore();
    }
});


// when the user clicks an answer for a question run the checkanswer function
userChoice.forEach(item => {
    item.addEventListener('click', checkAnswer);
});


function checkAnswer(event) {
    event.preventDefault();
    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        validator.style.display = "block";
        validator.style.color = "rgb(27, 232, 16)";
        validator.textContent = "You got it right!";

    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        validator.style.display = "block";
        validator.style.color = "red";
        validator.textContent = "You got it wrong!";
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
            userResults.style.display = "block";
            questionsText.style.display = "none";
            yourScore.innerHTML = '<p>Game Over! Your score is ' + timeLeft + '</p>';
        } else if (timeLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            userResults.style.display = "block";
            questionsText.style.display = "none";
            yourScore.innerHTML = '<p>Game Over! Your score is ' + timeLeft + '</p>';

        }
    }, 1000);
}



function addScore() {
    // event.preventDefault();
    userResults.style.display = "none";
    highScores.style.display = "block";
    again.style.display = "inline";

    var init = initialsInput.value.toUpperCase();
    scoreList.push({
        initials: init,
        score: timeLeft
    });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });


    scoreListShow.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials} ${scoreList[i].score}`;
        scoreListShow.append(li);

        li.classList.add("style-list");
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
    hs.style.display = "block";
    
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

   
}



// // Clear the scores
// clearScrBtn.addEventListener("click", clearScores);

// // clear scores
// function clearScores() {
//     localStorage.clear();
//     scoreListShow.innerHTML = "";
//     initialsInput.value = "";
//     clearscores.style.display = "none";
//     hs.style.display = "none";
// }


// clear scores
function showScores() {
    userResults.style.display = "none";
    highScores.style.display = "block";
    starterText.style.display = "none";
}

again.addEventListener("click", function () {
    highScores.style.display = "none";
    validator.style.display = "none";
    starterText.style.display = "block";
    timeLeft = 75;
    timerEl.textContent = timeLeft + " sec";
});