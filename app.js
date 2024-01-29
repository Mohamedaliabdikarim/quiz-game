const myQuestions = [
  {
      question: "What is the largest planet in our solar system?",
      answer: [
          { text: "Mars", correct: false },
          { text: "Jupiter", correct: true },
          { text: "Saturn", correct: false },
          { text: "Earth", correct: false },
      ]
  },
  {
      question: "Which is the most populous country in the world?",
      answer: [
          { text: "India", correct: false },
          { text: "United States", correct: false },
          { text: "China", correct: true },
          { text: "Brazil", correct: false },
      ]
  },
  {
      question: "What is the capital of Australia?",
      answer: [
          { text: "Sydney", correct: false },
          { text: "Melbourne", correct: false },
          { text: "Canberra", correct: true },
          { text: "Brisbane", correct: false },
      ]
  },
  {
      question: "Which is the longest river in the world?",
      answer: [
          { text: "Nile", correct: true },
          { text: "Amazon", correct: false },
          { text: "Yangtze", correct: false },
          { text: "Mississippi", correct: false },
      ]
  }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const messageElement = document.getElementById("message");
const starregel = document.getElementById("regel");
const quizElement = document.querySelector(".quiz");
const h1Element = document.querySelector("h1");
const startButton = document.querySelector(".start");

let currentQuestionIndex = 0;
let score = 0;

function hideElements() {
    startButton.classList.add("hide")
    starregel.classList.remove("hide");
    quizElement.classList.remove("hide");
    h1Element.classList.remove("hide");
  }
 

startButton.addEventListener("click", () => {
  startQuiz();
  hideElements();
});


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  showMessage("Welcome to the Awesome Quiz! Let's have some fun and test your knowledge!");
}


function showQuestion() {
  resetState();
  let currentQuestion = myQuestions[currentQuestionIndex];
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

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

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

function showScore() {
  resetState();
  const percentage = ((score / myQuestions.length) * 100).toFixed(2);
  let message = `You scored ${score} out of ${myQuestions.length}!`;
  if (percentage === '100.00') {
      message += " 🎉 Wow, you got a perfect score! You're a quiz genius!";
  } else if (percentage >= '75.00') {
      message += " 👏 Great job! You really know your stuff!";
  } else if (percentage >= '50.00') {
      message += " 🤔 Not bad! Keep going, and you'll become a quiz master!";
  } else {
      message += " 😅 Don't worry; quizzes are meant for learning! Try again and have fun!";
  }
  startButton.classList.remove("hide")
  questionElement.innerHTML = message;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < myQuestions.length) {
      showQuestion();
  } else {
      showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < myQuestions.length) {
      handleNextButton();
  } else {
      startQuiz();
  }
});
function showMessage(text) {
  messageElement.innerText = text;
  messageElement.style.display = "block";
}
startQuiz();


