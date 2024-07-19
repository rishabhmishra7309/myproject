const questions = [
    {
        question: "Who developed and designed TypeScript?",
        answers: [
            { text: "Microsoft", correct: true },
            { text: "Amazon", correct: false },
            { text: "Oracle", correct: false },
            { text: "TypeScript", correct: false },
        ]
    },
    {
        question: "When was the first time TypeScript was made public?",
        answers: [
            { text: "December 2012", correct: false },
            { text: "October 2012", correct: true },
            { text: "October 2013", correct: false },
            { text: "November 2013", correct: false },
        ]
    },
    {
        question: "Which of the following is the typing principle of typescript?",
        answers: [
            { text: "Gradual", correct: false },
            { text: "Dynamic", correct: false },
            { text: "Duck", correct: false },
            { text: "All of the Above", correct: true },
        ]
    },
    {
        question: "Which of the following is a filename extension for typescript?",
        answers: [
            { text: ".tsx", correct: true },
            { text: ".nod", correct: false },
            { text: ".txt", correct: false },
            { text: ".tt", correct: false },
        ]
    },
    {
        question: "Which Object Oriented Terms are Supported by Typescript?",
        answers: [
            { text: "Modulus", correct: false },
            { text: "Interface", correct: false },
            { text: "Classes", correct: false },
            { text: "All of the above", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButton.appendChild(button);
    });

    nextButton.style.display = "none";
}

function resetState() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.addEventListener("click", handleNextButton);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", startQuiz);
    nextButton.style.display = "block";
}

startQuiz();
