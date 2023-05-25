// Var for gathering html elemts
var quizBody = document.getElementById('quiz');
var resultsEl = document.getElementById('results');
var finalScoreEl = document.getElementById('finalScore');
var gameoverDiv = document.getElementById('gameover');
var questionsEl = document.getElementById('questions');
var quizTimer = document.getElementById('timer');
var startQuizBtn = document.getElementById('startbtn');
var starQuizDiv = document.getElementById('startpage');
var highscoreContainer = document.getElementById('HighscoreContainer');
var highscoreDiv = document.getElementById('high-scorePage');
var highscoreInputIntials = document.getElementById('intials');
var highscoreDisplayIntials = document.getElementById('highscore-intial');
var EndGameBtns = document.getElementById('EndGamebtns');
var submitbtn = document.getElementById('submitbtn');
var highscoreDisplayScore = document.getElementById('highscore-score');
var buttonA = document.getElementById('a');
var buttonB = document.getElementById('b');
var buttonC = document.getElementById('c');
var buttonD = document.getElementById('d');

//var for quiz questions
var quizQuestions = [
    {
        question: "What does HTML stand for?",
        choiceA:"Hyper Text Markup Language",
        choiceB:"Hyperlinks and Text Markup Language",
        choiceC:"Home Tool Markup Language",
        choiceD:"Hyper Tool Maker Language",
        correctAnswer:"a",
    },
    {
        question: "Who is making the Web standards?",
        choiceA:"Microsoft",
        choiceB:"Google",
        choiceC:"The World Wide Web Consortium",
        choiceD:"Mozilla",
        correctAnswer:"c",
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choiceA:"heah",
        choiceB:"h1",
        choiceC:"h6",
        choiceD:"heading",
        correctAnswer:"b",
    },
    {
        question: "What does DOM stand for?",
        choiceA:"Display Object Model",
        choiceB:"Desktop Oriented Mode",
        choiceC:"Display Object Management",
        choiceD:"Document Object Model",
        correctAnswer:"d",
    },
]

var correct;
var timeLeft =76;
var timerInterval;
var score = 0;
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;


// Function to generate question and answers that cycle through the array
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
}

//Start quiz and timer, hides startup, and display first question
function startQuiz(){
    gameoverDiv.style.display = 'none';
    starQuizDiv.style.display = 'none';
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time Left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        
        }
    }, 1000);
    quizBody.style.display = "block";
}

//Function for the end page for when the quiz finishes or timer ends
function showScore(){
    quizBody.style.display = 'none';
    gameoverDiv.style.display = 'flex';
    clearInterval(timerInterval);
    highscoreInputIntials.value = "";
    finalScoreEl.innerHTML = "You got " + score + "out of " + quizQuestions.length + " correct!";
}

//Sumbit button listen to run function that saves score into the array and to make save it to local storage
//then to run function that shows updated score menu
submitbtn.addEventListener("click", function highscore(){
    if(highscoreInputIntials.value === "") {
        alert("Intials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputIntials.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        EndGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

//Clears scores and redo score menu from local storage
function generateHighscores(){
    highscoreDisplayIntials.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan =document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayIntials.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

//function to show score menu
function showHighscore(){
    starQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    EndGameBtns.style.display = "flex";

    generateHighscores();
}

//clear score funtion from button
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayIntials.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//replay function from button
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    starQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Function to check answer if they are wrong or right and displays an alert
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That is Incorrect.");
        currentQuestionIndex++;
        generateHighscores();
    }else{
        showScore();
    }
}

//start button listener and run quiz 
startQuizBtn.addEventListener("click",startQuiz);