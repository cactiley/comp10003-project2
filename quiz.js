let questions = [
    {
        id: 'kickstarter-announcement',
        label: 'When was Exploding Kittens first announced as a Kickstarter project?',
        type: 'date',
        answer: '2015-01-20'
    },
    {
        id: 'kickstarter-backers',
        label: 'How many backers did the project have by the end of the campaign?',
        type: 'number',
        answer: '219382'
    },
    {
        id: 'end-without-drawing-cards',
        label: 'Which cards from the original edition allow you to end your turn WITHOUT drawing a card?',
        type: 'checkbox',
        options: [
            { value: 'skip', label: 'Skip' },
            { value: 'shuffle', label: 'Shuffle' },
            { value: 'nope', label: 'Nope' },
            { value: 'attack', label: 'Attack' },
            { value: 'defuse', label: 'Defuse' }
        ],
        answer: ['skip', 'attack']
    },
    {
        id: 'radio-test',
        label: 'Which cards from the original edition allow you to end your turn WITHOUT drawing a card?',
        type: 'radio',
        options: [
            { value: 'skip', label: 'Skip' },
            { value: 'shuffle', label: 'Shuffle' },
            { value: 'nope', label: 'Nope' },
            { value: 'attack', label: 'Attack' },
            { value: 'defuse', label: 'Defuse' }
        ],
        answer: 'skip'
    }

]

function populatePage(question) {
    const quiz = document.getElementById('quiz');

    // create question container for styling purposes
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question';

    // create question label
    const label = document.createElement('label');
    label.textContent = question.label;
    label.htmlFor = question.id;
    questionContainer.appendChild(label);

    // create question input
    if (question.options) {
        // handle radio and checkbox questions
        question.options.forEach(option => {
            // create option container
            const optionContainer = document.createElement('div');

            // create input
            const input = document.createElement('input');
            input.id = `${question.id}-${option.value}`;
            input.type = question.type;
            input.name = question.id;
            input.value = option.value;
            if (question.type == 'radio') {
                input.required = true;
            }

            // create option labels
            const label = document.createElement('label');
            label.textContent = option.label;
            label.htmlFor = input.id;

            optionContainer.appendChild(input);
            optionContainer.appendChild(label);
            questionContainer.appendChild(optionContainer);
        });
    } else {
        const input = document.createElement('input');
        input.id = question.id;
        input.type = question.type;
        input.required = true;
        questionContainer.appendChild(input);
    }

    // append question container
    quiz.appendChild(questionContainer);
}

function validateQuiz() {
    const userAnswers = {};
    questions.forEach(question => {
        if (question.type == 'radio') {
            // get selected radio button
            userAnswers[question.id] = document.querySelector(`input[name=${question.id}]:checked`).value
        } else if (question.type == 'checkbox') {
            // get all selected checkboxes
            const checked = document.querySelectorAll(`input[name=${question.id}]:checked`);
            userAnswers[question.id] = Array.from(checked).map(box => box.value);
        } else {
            // get text
            userAnswers[question.id] = document.getElementById(`${question.id}`).value;
        }
    })
    return userAnswers;
}

function checkAnswers() {
    const userAnswers = validateQuiz();
    let score = 0;
    questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question.answer;
        if (question.type == 'checkbox') {
            if (userAnswer.length != correctAnswer.length) {
                return;
            } else if (correctAnswer.every(answer => userAnswer.includes(answer)) && userAnswer.every(answer => correctAnswer.includes(answer))) {
                score++;
            }
        }
        else if (userAnswer == correctAnswer) {
            score++;
        }
    })
    const feedback = document.getElementById('feedback');
    feedback.textContent = `you got ${score} out of ${questions.length}!`;
}

document.addEventListener('DOMContentLoaded', function () {
    for (const question of questions) {
        populatePage(question);
    }
    const button = document.createElement('button');
    button.textContent = 'Check your answers! :D';
    button.addEventListener('click', checkAnswers);
    button.type = 'button';
    document.getElementById('quiz').appendChild(button);
});