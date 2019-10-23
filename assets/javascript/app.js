$(document).ready(function () {
    var questions = [
        {
            question: "Where do you first start your adventure in the world of Maplestory?",
            choices: ["Henesys", "Kerning city", "Amherst", "Lith harbour"],
            answer: 3,
            pic: "../images/answer1.jpg"
        },
        {
            question: "What class can choose their job at level 8 as opposed to level 10?",
            choices: ["Theif", "Hero", "Mage", "Pirate"],
            answer: 2,
            pic: "../images/ans3.png"
        },
        {
            question: "Who was the first player to reach level 200?",
            choices: ["Fangblade", "Tiger", "Zezima", "zhong"],
            answer: 0,
            pic: "../images/ans2.jpg"
        },
        {
            question: "Who is the main villian in the Maple world?",
            choices: ["Black mage", "Hilla", "Horntail", "Will"],
            answer: 0,
            pic: "../images/ans4.jpg"
        },
        {
            question: "Whats the most iconic Maplestory monster?",
            choices: ["Ribbon pig", "Orange mushroom", "Shroom", "Crow"],
            answer: 1,
            pic: "../images/png.png"
        }];



    var timer = 30;
    var guess = "";
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var theInterval;
    var timerRunning = false;
    var choice;
    var randomQ;
    var picArray = [];
    var holderArray = [];
    var questionL = questions.length;
    
    $("#playAgain").hide();
    
    $("#start").on("click", function() {
        $("#start").hide();
        showQuestion();
        startTimer();
        for (i = 0; i < questions.length; i++) {
            holderArray.push(questions[i]);
        }
    });
    
    function startTimer() {
        if (!timerRunning) {
            theInterval = setInterval(decrement, 1000);
            timerRunning = true;
        };
    };
   
    function decrement() {
        $("#timer").html("<h2>Time left: " + timer + "</h2>");
        timer --;
        if (timer === 0) {
            unanswered++;
            stop();
            $("#answers").html("<p>The right answer was: " + choice.choices[choice.answer] + "</p>");
            hidePic();
        };
    };
    
    function stop() {
        timerRunning = false;
        clearInterval(theInterval);
    };
    
    function showQuestion() {
        randomQ = Math.floor(Math.random()*questions.length);
        choice = questions[randomQ];
        $("#question").html("<h2>" + choice.question + "</h2>");
        for (var i = 0; i < choice.choices.length; i++) {
            var playerChoice = $("<div>");
            playerChoice.addClass("answerChoice");
            playerChoice.html(choice.choices[i]);
            playerChoice.attr("data-guess", i);
            $("#answers").append(playerChoice);
        };
    };
    
    $(".answerChoice").on("click", function() {
        guess = parseInt($(this).attr("data-guess"));
        if (guess === choice.answer) {
            stop();
            correct ++;
            guess = "";
            $("#answers").html("<p>Correct!</p>");
            hidePic();
        } else {
            stop();
            wrong ++;
            guess = "";
            $("#answers").html("<p>Incorrect! The correct answer was: " + choice.choices[choice.answer] + "</p>");
            hidePic();
        };
    });
    
    function hidePic() {
        $("#answers").append("<img src=" + choice.photo + ">");
        picArray.push(choice);
        questions.splice(randomQ, 1);
        var picHide = setTimeout(function() {
            $("#answers").empty();
            timer = 20;
        if ((wrong + correct + unanswered) === questionL) {
            $("#question").empty();
            $("#question").html("<h2>Game Over! Results: </h2>");
            $("#answers").append("<h3> Correct: " + correct + "</h3>");
            $("#answers").append("<h3> Incorrect: " + wrong + "</h3>");
            $("#answers").append("<h3> Unanswered: " + unanswered + "</h3>");
            $("#playAgain").show();
            correct = 0;
            wrong = 0;
            unanswered = 0;
        } else {
            startTimer();
            showQuestion();
        };
        }, 3000);
    };
    
    $("#playAgain").on("click", function() {
        $("#playAgain").hide();
        $("#answers").empty();
        $("#question").empty();
        for (var i = 0; i < holderArray.length; i++) {
            questions.push(holderArray[i]);
        };
        startTimer();
        showQuestion();
    });
    
    
});
    