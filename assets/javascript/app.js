// Functions
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function ask (i) {
    $('#result').empty();
    $('#gifs').empty();
    $('#question').text(questions[i].question);
    $('#a').text(questions[i].options[0]);
    $('#b').text(questions[i].options[1]);
    $('#c').text(questions[i].options[2]);
    $('#d').text(questions[i].options[3]);

    startTimer();
}

function startTimer () {
    increment = setInterval(decrement, 1000);
}

function decrement () {
    seconds--;
    $('#countdown').text(seconds + " seconds");
    if ( seconds <= 0 ) {
        resetTimer();
        unanswered++;
        console.log(seconds);
        i++;
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
    resetTimer();
    if (choice == questions[i].correct){
        $('#question').empty();
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').empty();
        $('#gifs').html(successGifs[num]);
        $('#result').text("Correct!");

        i++;
        numCorrect++;
        
        setTimeout(function(){
            if (i <= Object.keys(questions).length){
                ask(i);
            } else {
                endGame(numCorrect, numIncorrect, unanswered);
            }
        }, 4000);

        return { i : i, result : 'correct', numCorrect : numCorrect, numIncorrect : numIncorrect }
    } else {
        $('#question').empty();
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').empty();
        $('#gifs').html(failGifs[num]);
        $('#result').text("Nope!");


        i++;
        numIncorrect++;

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
    
    $('#countdown-container').addClass("hidden");
    $('#question').empty();
    $('#a').empty();
    $('#b').empty();
    $('#c').empty();
    $('#d').empty();
    $('#restartbtn').removeClass("hidden");
    $('#result').html("Total correct: " + numCorrect + "<br>" + "Total incorrect: " + numIncorrect + "<br>" + "Total unanswered: " + unanswered);
    $('#restart').removeClass("hidden");

    if (numCorrect > (numIncorrect + unanswered)) {
        $('#gifs').html(successGifs[num]);
    } else {
        $('#gifs').html(failGifs[num]);
    }
}

// Variables
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

// gifs for when a question is answered successfully
var successGifs = [
    '<img src="../assets/images/heart.gif">',
    '<img src="../assets/images/jump.gif">',
    '<img src="../assets/images/suckit.gif">',
    '<img src="../assets/images/delicate2.gif">',
    '<img src="../assets/images/wangbt.gif">',
    '<img src="../assets/images/taylorpark.gif">',
    '<img src="../assets/images/vmas.gif">'
]

// gifs for when a question is answered incorrectly
var failGifs = [
    '<img src="../assets/images/delicate.gif">',
    '<img src="../assets/images/fall.gif">',
    '<img src="../assets/images/loser.gif">',
    '<img src="../assets/images/blankspace.gif">',
    '<img src="../assets/images/vogue.gif">',
    '<img src="../assets/images/ybwm.gif">',
    '<img src="../assets/images/kick.gif">'
]


// Initialize
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
