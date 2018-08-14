var questions = [
    "In 'Howl's Moving Castle', there is a Fire Demon that is tied to a magical contract with the Wizard Howl; What is its name?",
    "In 'Spirited Away', Chihiro/Sen finds herself stuck in the spirit realm. To fend for herself, she gets a job at what kind of establishment?",
    "In 'Princess Mononoke', Ashitaka saves his village from a giant demon, we later find out that it was the Anceint God Nago. What species was Nago?",
    "In 'Nausica of the Valley of the Wind', Nausica has a pet companion named Teto that was saved from the insects of the Sea of Decay by Master Yupa. What kind of species is Teto?",
    "In 'Ponyo on the Cliff by the Sea', Ponyo's dream is to..."
];

var answers = [
    ["Lucifer", "Calcifer", "Navi", "Suliman"],
    ["Restuarant", "Hotel", "Delivery Service", "Bath House" ],
    ["Boar", "Ox", "Elk", "Gorilla"],
    ["Raccoon Squirrel", "Chipmunk", "Ocelot", "Fox Squirrel"],
    ["...swim across the world.", "...find her parents.", "...be a human and live on land.", "...become the king of the sea."]
];

var correctAnswers = [1,3,0,3,2];

//html for start screen
var startHTML = function() {    
    $(`.container`).append(`<button id="startButton" type="button" class="btn btn-light">Start</button>`);
};

//function to fill the container with <div> tags for the questions and the answers
var triviaHTML = function() {
    $(".container").empty();    
    $(".container").append(
        `<div class="row">
            <div id="timeRemaining" class="col-md-8">
                Time Remaining: 01:30
            </div>
        </div>`);
    for (var i=0; i < 5; i++) {
        $(".container").append(`
            <div class="row">
            <div id="answers" class="col-md-11">
                <div id="question" class="row">
                <div id="question-${i}" class="col-md-10">
                                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <form id="answers-${i}">
                        <fieldset id="form-${i}">

                        </fieldset>
                    </form>
                </div>
            </div>
            `
        );
    };
    $(".container").append(
        `<div class="row">
            <div class="col-md-3">
                <input id="submit" class="btn btn-primary" type="submit" value="Submit">
            </div>
        </div>`
    );
};

//fill the specific divs with their respective questions and answers
var populateQA = function() {
    var j=0;
    for (var i=0; i < 5; i++) {
        const questionTag = $('<h6>');
        questionTag.text(questions[i]);
        $(`#question-${i}`).append(questionTag);
    };
    while (j<5) {
       for (var ix=0; ix<4; ix++)  {
            $(`#form-${j}`).append(
                `<input type="radio" id="q${j}a${ix}" name="q${j}a" value="${ix}"/>
                <label for="q${j}a${ix}">${answers[j][ix]}</label>`
            );
        };
        j++;
    };  
};

//function for displaying results if the time runs out
var timeUp = setTimeout(function() {
    //Collects the User's Answers and puts them in an Array
    timer.stop();
    var userAnswers = [];
    var j=0;
    while (j<5) {
        for (var ix=0; ix<4; ix++)  {
            if ($(`#q${j}a${ix}`).is(`:checked`)) {
                userAnswers.push(parseInt($(`#q${j}a${ix}`).val()));
            };
        };
        j++;
    };  
    
    var i=0;
    var correct=0;
    var incorrect=0;
    var unanswered=0;
    while (i < correctAnswers.length) {
        if (userAnswers === []) { 
            unanswered=5;
            i=5;
        } else if (userAnswers[i] === undefined) { 
            unanswered++;   
        } else if (userAnswers[i] === correctAnswers[i]) {
            correct++;
        } else if (userAnswers[i] !== correctAnswers[i]) {
            incorrect++;
        };
        i++;
    };
    
    //populate html page with results
    $(`.container`).empty();
    const resultTag = $(`<h2>`);
    const scoreTag = $(`<h3>`);
    resultTag.attr(`id`, `resultTitle`);
    scoreTag.attr(`id`, `score`);
    resultTag.text(`Results`);
    scoreTag.html(`
        Correct: ${correct}<br>
        Incorrect: ${incorrect}<br>
        Unanswered: ${unanswered} 
    `);
    $(`.container`).append(resultTag);
    $(`.container`).append(scoreTag);

}, 1000 * 90);

//function for displaying results if the user presses 'submit'
var endScreen = function() {
    //Collects the User's Answers and puts them in an Array
    timer.stop();
    var userAnswers = [];
    var j=0;
    while (j<5) {
        for (var ix=0; ix<4; ix++)  {
            if ($(`#q${j}a${ix}`).is(`:checked`)) {
                userAnswers.push(parseInt($(`#q${j}a${ix}`).val()));
            };
        };
        j++;
    };  
    
    var i=0;
    var correct=0;
    var incorrect=0;
    var unanswered=0;
    while (i < correctAnswers.length) {
        if (userAnswers === []) { 
            unanswered=5;
            i=5;
        } else if (userAnswers[i] === undefined) { 
            unanswered++;   
        } else if (userAnswers[i] === correctAnswers[i]) {
            correct++;
        } else if (userAnswers[i] !== correctAnswers[i]) {
            incorrect++;
        };
        i++;
    };
    
    //populate html page with results
    $(`.container`).empty();
    const resultTag = $(`<h2>`);
    const scoreTag = $(`<h3>`);
    resultTag.attr(`id`, `resultTitle`);
    scoreTag.attr(`id`, `score`);
    resultTag.text(`Results`);
    scoreTag.html(`
        Correct: ${correct}<br>
        Incorrect: ${incorrect}<br>
        Unanswered: ${unanswered} 
    `);
    $(`.container`).append(resultTag);
    $(`.container`).append(scoreTag);

};


var intervalId;
var clockRunning = false;
var timer = {
    time: 90,

    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
            }
    },
    count: function() {
        timer.time--;
        var converted = timer.timeConverter(timer.time);
        $(`#timeRemaining`).text(`Time Remaining: ${converted}`);
    },
    stop: function() {
        clearInterval(intervalId);
    },
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
        seconds = "0" + seconds;
        }

        if (minutes === 0) {
        minutes = "00";
        }
        else if (minutes < 10) {
        minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
  }
};


startHTML();


$(`#startButton`).on(`click`, function() {
    //Changes webpage to trivia form
    triviaHTML();
    populateQA();
    timer.start();
    
    $(`#submit`).on(`click`, function() {
        //Changes the display to show result
        clearTimeout(timeUp);
        endScreen();   
    });
    

});

