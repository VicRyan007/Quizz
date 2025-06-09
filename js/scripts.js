// Quiz App Melhorado

document.addEventListener('DOMContentLoaded', () => {
    // Seletores
    const question = document.querySelector('#question');
    const answersBox = document.querySelector('#answers-box');
    const quizContainer = document.querySelector('#quizz-container');
    const scoreContainer = document.querySelector('#score-container');
    const restartBtn = document.querySelector('#restart');
    const letters = ['A', 'B', 'C', 'D'];

    // Estado do quiz
    let points = 0;
    let actualQuestion = 0;

    // Perguntas
    const questions = [
        {
            question: "Qual é a unidade de medida para metros?",
            answers: ["Metro", "Quilômetro", "Centímetro", "Milímetro"],
            correct: 0
        },
        {
            question: "Qual é o maior planeta do sistema solar?",
            answers: ["Terra", "Júpiter", "Marte", "Saturno"],
            correct: 1
        },
        {
            question: "Quem escreveu 'Dom Casmurro'?",
            answers: ["Machado de Assis", "Carlos Drummond de Andrade", "Clarice Lispector", "Manuel Bandeira"],
            correct: 0
        },
        {
            question: "Qual é a capital da França?",
            answers: ["Londres", "Paris", "Roma", "Berlim"],
            correct: 1
        },
        {
            question: "Qual elemento químico tem o símbolo O?",
            answers: ["Ouro", "Oxigênio", "Prata", "Ferro"],
            correct: 1
        }
    ];

    // Inicializa o quiz
    function init() {
        points = 0;
        actualQuestion = 0;
        scoreContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        createQuestion(actualQuestion);
    }

    // Cria uma pergunta na tela
    function createQuestion(i) {
        // Limpa respostas anteriores
        answersBox.innerHTML = '';

        // Atualiza texto da pergunta
        const questionText = document.querySelector('#questions-text');
        const questionNumber = document.querySelector('#question-number');
        questionText.textContent = questions[i].question;
        questionNumber.textContent = i + 1;

        // Cria botões de resposta
        questions[i].answers.forEach((answer, index) => {
            const answerTemplate = document.querySelector('.answer-template').cloneNode(true);
            const letterBtn = answerTemplate.querySelector('.btn-letter');
            const answerText = answerTemplate.querySelector('.question-answer');
            letterBtn.textContent = letters[index];
            answerText.textContent = answer;
            answerTemplate.setAttribute('correct-answer', index === questions[i].correct);
            answerTemplate.classList.remove('hide', 'template');
            answerTemplate.tabIndex = 0;
            answerTemplate.setAttribute('aria-label', `${letters[index]}: ${answer}`);
            answersBox.appendChild(answerTemplate);
            answerTemplate.addEventListener('click', () => checkAnswer(answerTemplate));
            answerTemplate.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.key === ' ') checkAnswer(answerTemplate);
            });
        });
    }

    // Verifica resposta do usuário
    function checkAnswer(btn) {
        const buttons = answersBox.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('correct-answer') === 'true') {
                button.classList.add('correct-answer');
                if (btn === button) points++;
            } else {
                button.classList.add('wrong-answer');
            }
            button.disabled = true;
        });
        setTimeout(nextQuestion, 1000);
    }

    // Próxima pergunta ou resultado final
    function nextQuestion() {
        actualQuestion++;
        if (actualQuestion >= questions.length) {
            showSuccessMessage();
        } else {
            createQuestion(actualQuestion);
        }
    }

    // Exibe tela de resultado
    function showSuccessMessage() {
        quizContainer.classList.add('hide');
        scoreContainer.classList.remove('hide');
        const score = ((points / questions.length) * 100).toFixed(2);
        document.querySelector('#display-score').textContent = score + '%';
        document.querySelector('#correct-answer').textContent = points;
        document.querySelector('#questions-qty').textContent = questions.length;
    }

    // Reinicia o quiz
    restartBtn.addEventListener('click', init);

    // Inicia o quiz ao carregar
    init();
});