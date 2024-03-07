import {myQuestions} from './questions.js';

// DOM elements for various parts of the quiz
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const messageElement = document.getElementById("message");
const starregel = document.getElementById("regel");
const quizElement = document.querySelector(".quiz");
const h1Element = document.querySelector("h1");
const startButton = document.querySelector(".start");
const regel = document.querySelector("p");
const goHome = document.querySelector(".home");
const homeButton = document.querySelector("img");

// Variables to track the current question index, user score, and a subset of random questions for the quiz

let currentQuestionIndex = 0;
let score = 0;
let randomQuestions = shuffleArray(myQuestions).slice(0, 10);

// Function to hide various elements and show the quiz
function hideElements() {
  goHome.classList.remove("hide");
  regel.classList.add("hide");
  startButton.classList.add("hide");
  starregel.classList.remove("hide");
  quizElement.classList.remove("hide");
  h1Element.classList.remove("hide");
}

// Event listener for the "Go Home" button
goHome.addEventListener("click", () => {
  showHome();
  

});

// Event listener for the "Home" button
homeButton.addEventListener("click", () => {
  showHome();
});
// Function to show the home page
function showHome() {
  h1Element.classList.add("hide");
  starregel.classList.add("hide");
  startButton.classList.remove("hide");
  starregel.classList.remove("hide");
  quizElement.classList.add("hide");
  resetState();
  regel.classList.remove("hide");
  goHome.classList.add("hide");
}

// Event listener for the "Start" button
startButton.addEventListener("click", () => {
  starregel.classList.add("hide");
  goHome.classList.remove("hide");
  startQuiz();
  hideElements();
  regel.classList.add("hide");
});
// Function to shuffle an array
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Function to initialize the quiz
function startQuiz() {
  goHome.classList.add("hide");
  currentQuestionIndex = 0;
  score = 0;
  randomQuestions = shuffleArray(myQuestions).slice(0, 10);
  nextButton.innerHTML = "Next";
  showQuestion();
  showMessage("Welcome to the Awesome Quiz! Let's have some fun and test your knowledge!");
}

// Function to display the current question
function showQuestion() {
  resetState();
  let currentQuestion = randomQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
// Function to reset the quiz
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle user's answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Function to display the final score and appropriate message
function showScore() {
  resetState();
  const percentage = ((score / randomQuestions.length) * 100).toFixed(2);
  let message = `You scored ${score} out of ${randomQuestions.length}!`;
  if (percentage === "100.00") {
    message += " 🎉 Wow, you got a perfect score! You're a quiz genius!";
  } else if (percentage >= "75.00") {
    message += " 👏 Great job! You really know your stuff!";
  } else if (percentage >= "50.00") {
    message += " 🤔 Not bad! Keep going, and you'll become a quiz master!";
  } else {
    message += " 😅 Don't worry; quizzes are meant for learning! Try again and have fun!";
  }
  starregel.classList.remove("hide");
  startButton.classList.add("hide");
  questionElement.innerHTML = message;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  goHome.classList.remove("hide");
}

// Function to handle the "Next" button click
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < randomQuestions.length) {
    showQuestion();
  } else {
    showScore();
  
  }
}

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < randomQuestions.length) {
    handleNextButton();
  } else {

    startQuiz();
    goHome.classList.remove("hide");

  }
});

// Function to display a message on 
function showMessage(text) {
  messageElement.innerText = text;
  messageElement.style.display = "block";
}

// Initial start of the quiz
startQuiz();