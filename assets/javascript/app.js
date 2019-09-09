// Functions
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function ask (i) {
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
        $('#question').text("Correct!");
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').html(successGifs[num]);

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
        $('#question').text("Nope!");
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').html(failGifs[num]);

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
    $('#question').html("Total correct: " + numCorrect + "<br>" + "Total incorrect: " + numIncorrect + "<br>" + "Total unanswered: " + unanswered);
    $('#a').empty();
    $('#b').empty();
    $('#c').empty();
    
    if (numCorrect > (numIncorrect + unanswered)) {
        $('#d').html(successGifs[num]);
    } else {
        $('#d').html(failGifs[num]);
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
    $('button').on("click", function() {
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

});
