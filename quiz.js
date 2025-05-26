document.addEventListener('DOMContentLoaded', function () {
    let questions = [
        { id: 'kickstarter-announcement', label: 'When was Exploding Kittens first announced as a Kickstarter project?', answer: '2015-01-20', type: 'date' },
        { id: 'kickstarter-backers', label: 'How many backers did the project have by the end of the campaign?', answer: '219382', type: 'number' }
    ]

    function populatePage(question) {
        const quiz = document.getElementById('quiz');
        const br = document.createElement('br');
        // create question label
        const label = document.createElement('label');
        label.textContent = question.label;
        label.htmlFor = question.id;

        // create question input
        const input = document.createElement('input');
        input.id = question.id;
        input.type = question.type;

        // append label and input
        quiz.appendChild(label);
        quiz.appendChild(input);
    }

    for (question of questions) {
        populatePage(question);
    }
});