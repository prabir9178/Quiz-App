let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

function showCategoryScreen() {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('category-screen').style.display = 'block';
}

function startQuiz(category) {
  generateQuestions(category);
  document.getElementById('category-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  loadQuestion();
}

function generateQuestions(category) {
  questions = [];
  for (let i = 0; i < 10; i++) {
    let num1, num2;

    if (category === 'Subtraction') {
      num1 = Math.ceil(Math.random() * 10);
      num2 = Math.floor(Math.random() * num1);
    } else {
      num1 = Math.ceil(Math.random() * 10);
      num2 = Math.ceil(Math.random() * 10);
    }

    let question = { text: `${num1} + ${num2}`, answer: num1 + num2 };

    if (category === 'Subtraction') {
      question = { text: `${num1} - ${num2}`, answer: num1 - num2 };
    } else if (category === 'Multiplication') {
      question = { text: `${num1} * ${num2}`, answer: num1 * num2 };
    } else if (category === 'Division' && num2 !== 0) {
      question = { text: `${num1} / ${num2}`, answer: num1 / num2 };
    }
    questions.push(question);
  }
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').innerText = question.text;
  document.getElementById('user-answer').value = '';
}

function appendNumber(num) {
  const answerInput = document.getElementById('user-answer');
  answerInput.value += num;
}

function appendDecimal() {
  const answerInput = document.getElementById('user-answer');
  if (!answerInput.value.includes('.')) {
    answerInput.value += '.';
  }
}

function undoAnswer() {
  const answerInput = document.getElementById('user-answer');
  answerInput.value = answerInput.value.slice(0, -1);
}

function submitAnswer() {
  const userAnswer = parseFloat(document.getElementById('user-answer').value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  userAnswers.push({
    question: questions[currentQuestionIndex].text,
    correct: correctAnswer,
    userAnswer: userAnswer,
    isCorrect: Math.abs(userAnswer - correctAnswer) < 0.01,
  });

  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    alert("Correct!");
    score++;
  } else {
    alert("Incorrect!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < 10) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  const resultDetails = document.getElementById('result-details');
  resultDetails.innerHTML = '';
  userAnswers.forEach((answer, index) => {
    const resultText = document.createElement('p');
    resultText.innerText = `${index + 1}. ${answer.question} = ${answer.correct.toFixed(2)} | Your Answer: ${answer.userAnswer.toFixed(2)} ${answer.isCorrect ? '✓' : '✗'}`;
    resultDetails.appendChild(resultText);
  });

  document.getElementById('score-display').innerText = `Score: ${score} / 10`;
}

function backToCategories() {
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('category-screen').style.display = 'block';
  resetQuiz();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
}

function exitQuiz() {
  // Clear any existing results
  resetQuiz();

  // Hide all screens and show the welcome screen
  document.getElementById('welcome-screen').style.display = 'block';
  document.getElementById('category-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'none';

  // Optionally display an exit message
  alert("Quiz Exited.");
}

function handleExitButtonClick() {
  if (confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
    exitQuiz();
  }
}

// Add this function to handle the decimal button click
function addDecimal() {
  const answerInput = document.getElementById('user-answer');
  if (!answerInput.value.includes('.')) {
    answerInput.value += '.';
  }
}

// Add an exit button and a decimal button to the quiz screen in your HTML
// Example:
// <button onclick="handleExitButtonClick()">Exit Quiz</button>
// <button onclick="addDecimal()">.</button>