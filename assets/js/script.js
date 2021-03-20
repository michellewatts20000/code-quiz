// Access element by ID using .querySelector()
var timerBtn = document.querySelector("#start-timer");
var test = document.querySelector("#test");
var startButton = document.querySelector("button");
var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');

// when user clicks button the timer starts
startButton.addEventListener("click", countdown)

var questions = [{
        title: "Question 1:",
        choices: ["choice a", "choice b", "choice c", "choice d"],
        answer: "choice a"
    },
    {
        title: "Question 2",
        choices: ["choice a", "choice b", "choice c", "choice d"],
        answer: "choice a"
    }
]

// Timer that counts down from 5
function countdown() {
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

}






// Create img element
// var imgEl = document.createElement("img");

// // Sets changeP to have multiple style attributes
// timerBtn.setAttribute("style", "font-size: 20px; font-weight: bold;");
// imgEl.setAttribute("src", "http://placekitten.com/200/300");

// // Add text to #test ID
// test.textContent = "";

// // append img to #test ID
// test.appendChild(imgEl);