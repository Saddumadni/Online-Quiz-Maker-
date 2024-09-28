let quizzes = [];
let currentQuizIndex = 0;
let currentQuestionIndex = 0;

// Show/Hide elements
function toggleVisibility(element, show) {
    element.classList.toggle('hidden', !show);
}

// Initialize Event Listeners
document.getElementById('createQuizBtn').addEventListener('click', showQuizForm);
document.getElementById('takeQuizBtn').addEventListener('click', showQuizListing);
document.getElementById('addQuestionBtn').addEventListener('click', addQuestion);
document.getElementById('submitQuizBtn').addEventListener('click', submitQuiz);
document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);

function showQuizForm() {
    toggleVisibility(document.getElementById('quizForm'), true);
    toggleVisibility(document.getElementById('quizListing'), false);
}

function showQuizListing() {
    toggleVisibility(document.getElementById('quizListing'), true);
    toggleVisibility(document.getElementById('quizForm'), false);
    displayQuizzes();
}

function addQuestion() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <input type="text" placeholder="Question" required>
        <input type="text" placeholder="Correct Answer" required>
        <input type="text" placeholder="Wrong Answer 1" required>
        <input type="text" placeholder="Wrong Answer 2" required>
        <input type="text" placeholder="Wrong Answer 3" required>
    `;
    questionsContainer.appendChild(questionDiv);
}

function submitQuiz() {
    const quizTitle = document.getElementById('quizTitle').value;
    const questions = Array.from(document.querySelectorAll('#questionsContainer div')).map(div => {
        const inputs = div.querySelectorAll('input');
        return {
            question: inputs[0].value,
            correct: inputs[1].value,
            options: [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value].sort(() => Math.random() - 0.5)
        };
    });

    quizzes.push({ title: quizTitle, questions });
    toggleVisibility(document.getElementById('quizForm'), false);
}

function displayQuizzes() {
    const quizList = document.getElementById('quizList');
    quizList.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        li.textContent = quiz.title;
        li.addEventListener('click', () => startQuiz(index));
        quizList.appendChild(li);
    });
}

function startQuiz(index) {
    currentQuizIndex = index;
    currentQuestionIndex = 0;
    toggleVisibility(document.getElementById('quizTaking'), true);
    displayQuestion();
}

function displayQuestion() {
    const quiz = quizzes[currentQuizIndex];
    const question = quiz.questions[currentQuestionIndex];
    document.getElementById('takingQuizTitle').textContent = quiz.title;
    document.getElementById('questionDisplay').innerHTML = `
        <p>${question.question}</p>
        ${question.options.map(option => `<button class="answerBtn">${option}</button>`).join('')}
    `;
    document.querySelectorAll('.answerBtn').forEach(button => {
        button.addEventListener('click', checkAnswer);
    });
}

function checkAnswer(event) {
    const quiz = quizzes[currentQuizIndex];
    const question = quiz.questions[currentQuestionIndex];
    const selectedAnswer = event.target.textContent;
    if (selectedAnswer === question.correct) {
        alert('Correct!');
    } else {
        alert('Wrong! The correct answer was: ' + question.correct);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    toggleVisibility(document.getElementById('quizTaking'), false);
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.innerHTML = `<p>You have completed the quiz!</p>`;
    toggleVisibility(resultDisplay, true);
}