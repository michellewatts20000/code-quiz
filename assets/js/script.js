// Access element by ID using .querySelector()
var timerBtn = document.querySelector("#start-timer");
var test = document.querySelector("#test");
var startButton = document.querySelector("button");
var timerEl = document.getElementById('timer');
var starterText = document.getElementById('starterText');
var questionsText = document.getElementById('questions');

//where the question and answers go
var questionEl = document.querySelector("#questionHere");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");



// when user clicks button the timer starts
startButton.addEventListener("click", countdown)

var questions = [{
        question: "Question 1:",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "choice a"
    },
    {
        question: "Question 2",
        answers: ["choice a", "choice b", "choice c", "choice d"],
        correctAnswer: "choice a"
    }
];

// Timer that counts down from 5
function countdown() {

    starterText.style.display = "none";
    questionsText.style.display = "block";
    questionCount = 0;
    var timeLeft = 5;

    
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            displayMessage();
        }
    }, 1000);
}

// Displays the message once time is out
function displayMessage() {
    test.textContent = 'Game Over';
    // test.appendChild(imgEl);
}













// Create img element
var imgEl = document.createElement("img");

// // Sets changeP to have multiple style attributes
// timerBtn.setAttribute("style", "font-size: 20px; font-weight: bold;");
imgEl.setAttribute("src", "http://placekitten.com/200/300");

// // Add text to #test ID
// test.textContent = "";

// append img to #test ID


// var id= 0;
//     questionEl.textContent = questions[id].question;
//     answer1.textContent = questions[id].answers[0];
//     answer2.textContent = questions[id].answers[1];
//     answer3.textContent = questions[id].answers[2];
//     answer4.textContent = questions[id].answers[3];