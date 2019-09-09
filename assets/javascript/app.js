// FUNCTIONS //
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Empty unneeded divs, load question/answer divs 
function ask (i) {
    $('#result').empty();
    $('#gifs').empty();
    $('#question').text(questions[i].question);
    $('#a').text(questions[i].options[0]);
    $('#b').text(questions[i].options[1]);
    $('#c').text(questions[i].options[2]);
    $('#d').text(questions[i].options[3]);

    // Begin the timer
    startTimer();
}

function startTimer () {
    increment = setInterval(decrement, 1000);
}

function decrement () {
    // Subtract from seconds, every 1 second
    seconds--;
    // Display the timer 
    $('#countdown').text(seconds + " seconds");
    // When seconds equals 0, reset the timer, increment unanswered questions and i
    if ( seconds === 0 ) {
        resetTimer();
        unanswered++;
        i++;
        // If i is less than the number of questions, ask another, otherwise end the game
        if (i <= Object.keys(questions).length){
            ask(i);
        } else {
            endGame(numCorrect, numIncorrect, unanswered);
        }
    }
}

function resetTimer () {
    seconds = 10;
    clearInterval(increment);
    $('#countdown').text(seconds + " seconds");
}

function checkAnswer (i, choice, numCorrect, numIncorrect, unanswered) {
    // Randomize number for success/fail gifs
    num = randomNumber(1, 6);
    // Reset timer while answer is being checked
    resetTimer();
    // If the user's choice and the correct answer match:
    if (choice == questions[i].correct){
        // Empty all of the question/answer divs, display the result and a success gif
        $('#question').empty();
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').empty();
        $('#gifs').html(successGifs[num]);
        $('#result').text("Correct!");

        // Increment i and the number of correct answers
        i++;
        numCorrect++;
        
        // Allow the Gif, etc. to be displayed for 4 seconds, then ask a new question or end the game if there are no questions left
        setTimeout(function(){
            if (i <= Object.keys(questions).length){
                ask(i);
            } else {
                endGame(numCorrect, numIncorrect, unanswered);
            }
        }, 4000);

        return { i : i, result : 'correct', numCorrect : numCorrect, numIncorrect : numIncorrect }
    } else {
        // Answer was incorrect, empty all of the question/answer divs, display the result and a failure gif
        $('#question').empty();
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').empty();
        $('#gifs').html(failGifs[num]);
        $('#result').text("Nope!");

        // Increment i and the number of incorrect answers
        i++;
        numIncorrect++;

        // Allow the Gif, etc. to be displayed for 4 seconds, then ask a new question or end the game if there are no questions left
        setTimeout(function(){
            if (i <= Object.keys(questions).length){
                ask(i);
            } else {
                endGame(numCorrect, numIncorrect, unanswered);
            }
        }, 4000);

        return { i : i, result : 'incorrect' , numCorrect : numCorrect, numIncorrect : numIncorrect }
    }
}

function endGame (numCorrect, numIncorrect, unanswered) {
     // Randomize number for success/fail gifs
     num = randomNumber(1, 6);
    
     // Hide countdown, empty all question/answer divs
    $('#countdown-container').addClass("hidden");
    $('#question').empty();
    $('#a').empty();
    $('#b').empty();
    $('#c').empty();
    $('#d').empty();
    // Unhide the restart button and display the final result
    $('#result').html("Total correct: " + numCorrect + "<br>" + "Total incorrect: " + numIncorrect + "<br>" + "Total unanswered: " + unanswered);
    $('#restart').removeClass("hidden");

    // If the number of correct answers is higher than the unanswered and incorrect, display a successful gif
    if (numCorrect > (numIncorrect + unanswered)) {
        $('#gifs').html(successGifs[num]);
    } else {
        // Otherwise, display a failure gif
        $('#gifs').html(failGifs[num]);
    }
}

// VARIABLES //

// Define questions, options, and correct answer
var questions = {
    1 : {
        question : "What is Taylor's middle name?",
        options : ["Amanda", "Alison", "Melissa", "Elizabeth"],
        correct : 'b'
    },
    2 : {
        question : "What was the name of Taylor's 3rd album?",
        options : ["Lover", "Speak Now", "Red", "reputation"],
        correct : 'c'
    },
    3 : {
        question : "Taylor has lived in which environment?",
        options : ["Geodesic dome home", "Missle silo ", "Christmas tree farm", "Lighthouse"],
        correct : 'c'   
    },
    4 : {
        question : "Which of the following is the name of one of Taylor's cats?",
        options : ["Patches", "Muffin", "Fluffy", "Meredith"],
        correct : 'd'   
    },
    5 : {
        question : "Taylor was the spokesperson for what NHL team?",
        options : ["Predators", "Penguins", "Flyers", "Lightning"],
        correct : 'a'   
    },
    6 : {
        question : "What year was Taylor born?",
        options : ["1986", "1999", "1991", "1989"],
        correct : 'd'   
    }
}

// Gifs for when a question is answered successfully
var successGifs = [
    '<img src="assets/images/heart.gif">',
    '<img src="assets/images/jump.gif">',
    '<img src="assets/images/suckit.gif">',
    '<img src="assets/images/delicate2.gif">',
    '<img src="assets/images/wangbt.gif">',
    '<img src="assets/images/taylorpark.gif">',
    '<img src="assets/images/vmas.gif">'
]

// Gifs for when a question is answered incorrectly
var failGifs = [
    '<img src="assets/images/delicate.gif">',
    '<img src="assets/images/fall.gif">',
    '<img src="assets/images/loser.gif">',
    '<img src="assets/images/blankspace.gif">',
    '<img src="assets/images/vogue.gif">',
    '<img src="assets/images/ybwm.gif">',
    '<img src="assets/images/kick.gif">'
]


// Initialize global variables
var i = 1;
var numCorrect = 0;
var numIncorrect = 0;
var unanswered = 0;
var seconds = 10;
var increment;


// Document Ready
$(document).ready(function () {

    // On start button click, hide the button and then unhide the game container
    $('#startbtn').on("click", function() {
        // Hide the Start button
        $('#start').addClass("hidden");
        // Show the game container
        $('#game').removeClass("hidden");
        // Ask the first question
        ask(i, unanswered);
    });

    // When an answer is clicked, check to see if it was correct, add to tally
    $('.answers').on("click", function() {
        var choice = $(this).attr('id');
        check = checkAnswer(i, choice, numCorrect, numIncorrect, unanswered);
        i = check.i;
        numCorrect = check.numCorrect;
        numIncorrect = check.numIncorrect;
    });

    // Restart button is clicked at the end of the game
    $('#restartbtn').on("click", function() {
        // Reset all variables
        i = 1;
        numCorrect = 0;
        numIncorrect = 0;
        unanswered = 0;
        seconds = 10;
        increment;

        // Re-hide restart div
        $('#restart').addClass("hidden");

        // Unhide the timer
        $('#countdown-container').removeClass("hidden");

         // Ask the first question
         ask(i, unanswered);
    });

});
