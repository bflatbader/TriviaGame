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
}

function checkAnswer (i, choice) {
    if (choice == questions[i].correct){
        $('#question').text("Correct!");
        $('#a').empty();
        $('#b').empty();
        $('#c').empty();
        $('#d').html('<img src="../assets/images/heart.gif">');

        i++;
        ask(i);
        return i
    } else {
        console.log("incorrect answer");
    }
}

// Variables
var questions = {
    1 : {
        question : "What is Taylor's middle name?",
        options : ["Pat", "Alison", "Melissa", "Britney"],
        correct : 'b'
    },
    2 : {
        question : "What was the name of Taylor's 3rd album?",
        options : ["Taylor Swift", "Speak Now", "Red", "reputation"],
        correct : 'c'
    },
    3 : {
        question : "Which of the following is the name of one of Taylor's cats?",
        options : ["Patches", "Muffin", "Fluffy", "Meredith"],
        correct : 'd'   
    }
}

i = 1;

// Document Ready
$(document).ready(function () {

    // On start button click, hide the button and then unhide the game container
    $('button').on("click", function() {
        // Hide the Start button
        $('#start').addClass("hidden");
        // Show the game container
        $('#game').removeClass("hidden");
    });

    ask(i);

    // 
    $('.answers').on("click", function() {
        var choice = $(this).attr('id');
        i = checkAnswer(i, choice);
    });

});
