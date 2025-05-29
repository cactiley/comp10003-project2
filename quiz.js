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
        id: '2017-employees',
        label: 'How many full-time employees were there in 2017?',
        type: 'number',
        answer: '30'
    }, {
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
        id: 'nope-stack',
        label: 'True or False: You can stack Nope cards.',
        type: 'radio',
        options: [
            { value: 'true', label: 'True' },
            { value: 'false', label: 'False' }
        ],
        answer: 'true'
    },
    {
        id: 'number-of-exploding-kittens',
        label: 'If you play with 5 people, how many Exploding Kittens should be shuffled into the deck?',
        type: 'number',
        answer: '4'
    },
    {
        id: 'end-of-draw-pile',
        label: 'True or False: It\'s possible to reach the end of the draw pile with multiple players remaining.',
        type: 'radio',
        options: [
            { value: 'true', label: 'True' },
            { value: 'false', label: 'False' }
        ],
        answer: 'false'
    }, {
        id: 'attack-card-behavior',
        label: 'After an attack card is played:',
        type: 'radio',
        options: [
            { value: 'player-draws', label: 'The person playing it must end their turn by drawing a card.' },
            { value: 'player-does-not-draw', label: 'The person playing it does not draw any cards.' },
            { value: 'next-plays-cat', label: 'The next player has to play a cat card.' },
            { value: 'next-plays-as-usual', label: 'The next player continues play as usual.' }
        ],
        answer: 'player-does-not-draw'
    },
    {
        id: 'cat-cards',
        label: 'Name a Cat card.',
        type: 'text',
        answer: ['cattermelon', 'hairy potato', 'hairy potato cat', 'beard', 'beard cat', 'tacocat', 'rainbow-ralphing cat', 'rainbow-ralphing']
    },
    {
        id: 'defuse-card-behavior',
        label: 'A defuse card:',
        type: 'checkbox',
        options: [
            { value: 'steal', label: 'Can be stolen by another player.' },
            { value: 'usable-thrice', label: 'Can be used up to 3 times.' },
            { value: 'cancel-others', label: 'Can be used to cancel another player\'s defuse card.' },
            { value: 'usable-once', label: 'Can only be used once.' }
        ],
        answer: ['steal', 'usable-once']
    }]

let questionCounter = 1;

function populatePage(question) {
    const quiz = document.getElementById('quiz');

    // create question and input containers for styling purposes
    const questionContainer = document.createElement('div');
    questionContainer.className = 'quiz-question';
    const inputContainer = document.createElement('div');
    inputContainer.className = 'quiz-inputs';

    // create question label
    const label = document.createElement('label');
    label.textContent = `${questionCounter++}. ${question.label}`;
    label.htmlFor = question.id;
    questionContainer.appendChild(label);

    // create question input
    if (question.options) {
        // handle radio and checkbox questions
        question.options.forEach(option => {
            // create option container
            const optionContainer = document.createElement('div');
            optionContainer.className = 'quiz-option';

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
            inputContainer.appendChild(optionContainer);
        });
    } else {
        const input = document.createElement('input');
        input.id = question.id;
        input.type = question.type;
        input.required = true;
        input.className = 'answer'
        inputContainer.appendChild(input);
    }
    questionContainer.appendChild(inputContainer);

    // create feedback container for correctness check later
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback-container';
    feedback.id = `${question.id}-feedback`;
    questionContainer.appendChild(feedback);

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
        let isCorrect = false;
        const questionFeedback = document.getElementById(`${question.id}-feedback`);

        // clear previous feedback
        questionFeedback.innerHTML = '';

        // create feedback text
        const feedbackText = document.createElement('p');
        let answerHint = null;

        // check answer correctness
        if (question.type == 'checkbox') {
            if (userAnswer.length == correctAnswer.length && correctAnswer.every(answer => userAnswer.includes(answer)) && userAnswer.every(answer => correctAnswer.includes(answer))) {
                isCorrect = true;
            }
        } else if (typeof userAnswer == 'string') {
            const normalizedUser = userAnswer.trim().toLowerCase();
            if (Array.isArray(correctAnswer)) {
                if (correctAnswer.includes(normalizedUser)) {
                    isCorrect = true;
                }
            } else if (userAnswer == correctAnswer) {
                isCorrect = true;
            }
        } else if (userAnswer == correctAnswer) {
            isCorrect = true;
        }

        // feedback generation (front-end? for the user, basically)
        if (isCorrect) {
            score++;
            feedbackText.textContent = 'correct !! :)'
        } else {
            feedbackText.textContent = 'wrong :('
            answerHint = document.createElement('p');
            if (Array.isArray(question.answer)) {
                answerHint.innerHTML = `highlight with your cursor for the correct answers! → <span class="hidden-text">${correctAnswer.join(', ')}</span>`;
            } else {
                answerHint.innerHTML = `highlight with your cursor for the correct answer! → <span class="hidden-text">${correctAnswer}</span>`;
            }
        }
        questionFeedback.appendChild(feedbackText);
        if (answerHint) {
            questionFeedback.appendChild(answerHint);
        }

    })
    const feedback = document.getElementById('feedback');
    feedback.textContent = `you got ${score} out of ${questions.length}!`;
}

document.addEventListener('DOMContentLoaded', function () {
    questionCounter = 1;
    const form = document.getElementById('quiz');

    for (const question of questions) {
        populatePage(question);
    }
    // add button
    const button = document.createElement('button');
    button.textContent = 'Check your answers! :D';
    button.className = 'quiz-button'
    form.appendChild(button);

    // submit
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent actual form submission
        checkAnswers();
    });
});