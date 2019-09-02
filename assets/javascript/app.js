// Functions
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Variables
var q1 = {
    question : "What is Taylor's middle name?",
    options : ["Pat", "Alison", "Melissa", "Britney"],
    correct : 2
}
var q2 = {
    question : "What was the name of Taylor's 3rd album?",
    options : ["Taylor Swift", "Speak Now", "Red", "reputation"],
    correct : 3
}
var q3 = {
    question : "Which of the following is the name of one of Taylor's cats?",
    options : ["Patches", "Muffin", "Fluffy", "Meredith"],
    correct : 4
}

i = 1;

// Document Ready
$(document).ready(function () {

    $('button').on("click", function() {
        // Hide the Start button
        $('#start').addClass("hidden");
        // Show the game container
        $('#game').removeClass("hidden");
    });

});
