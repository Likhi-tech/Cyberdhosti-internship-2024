document.getElementById('startQuizBtn').addEventListener('click', () => {
    document.getElementById('hero').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    loadQuiz();
});

function showForm(formId) {
    document.getElementById('feedback-form').classList.add('hidden');
    document.getElementById('contact-form').classList.add('hidden');
    document.getElementById(formId).classList.remove('hidden');
}

const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Bill Gates",
        b: "Elon Musk",
        c: "Steve Jobs",
        d: "Jeff Bezos",
        correct: "b"
    },
    {
        question: "What is the most used programming language in 2021?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "Who wrote 'Harry Potter'?",
        a: "J.R.R. Tolkien",
        b: "J.K. Rowling",
        c: "George R.R. Martin",
        d: "Agatha Christie",
        correct: "b"
    },
    {
        question: "What is the capital of Japan?",
        a: "Seoul",
        b: "Tokyo",
        c: "Beijing",
        d: "Bangkok",
        correct: "b"
    }
];

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h3>${quizData[currentQuiz].question}</h3>
            <ul>
                <li><input type="radio" name="answer" value="a"> ${quizData[currentQuiz].a}</li>
                <li><input type="radio" name="answer" value="b"> ${quizData[currentQuiz].b}</li>
                <li><input type="radio" name="answer" value="c"> ${quizData[currentQuiz].c}</li>
                <li><input type="radio" name="answer" value="d"> ${quizData[currentQuiz].d}</li>
            </ul>
        </div>
    `;
}

function submitQuiz() {
    const answerElements = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) {
            selectedAnswer = answerElement.value;
        }
    });

    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById('result').innerHTML = `You scored ${score} out of ${quizData.length}`;
    }
}
