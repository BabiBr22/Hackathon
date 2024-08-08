document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('flashcardForm').addEventListener('submit', addOrUpdateFlashcard);
    document.getElementById('searchForm').addEventListener('submit', searchFlashcards);
    displayFlashcards();
});

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

let editingIndex = -1;

function addOrUpdateFlashcard(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;

    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    if (editingIndex === -1) {
        flashcards.push({ category, question, answer });
        alert('Flashcard adicionado com sucesso!');
    } else {
        flashcards[editingIndex] = { category, question, answer };
        editingIndex = -1;
        alert('Flashcard atualizado com sucesso!');
    }

    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    document.getElementById('flashcardForm').reset();
    displayFlashcards();
}

function displayFlashcards(flashcards = JSON.parse(localStorage.getItem('flashcards')) || []) {
    const flashcardsContainer = document.getElementById('flashcardsContainer');
    flashcardsContainer.innerHTML = '';

    flashcards.forEach((flashcard, index) => {
        const flashcardElement = document.createElement('div');
        flashcardElement.className = 'flashcard';

        flashcardElement.innerHTML = `
            <h3>${flashcard.category}</h3>
            <p class="question">${flashcard.question}</p>
            <p class="answer hidden">${flashcard.answer}</p>
            <button class="show-answer">Mostrar Resposta</button>
            <button class="edit-btn" onclick="editFlashcard(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteFlashcard(${index})">Excluir</button>
        `;

        const showAnswerButton = flashcardElement.querySelector('.show-answer');
        showAnswerButton.addEventListener('click', () => {
            const answerElement = flashcardElement.querySelector('.answer');
            answerElement.classList.toggle('hidden');
            showAnswerButton.textContent = answerElement.classList.contains('hidden') ? 'Mostrar Resposta' : 'Ocultar Resposta';
        });

        flashcardsContainer.appendChild(flashcardElement);
    });
}

function searchFlashcards(event) {
    event.preventDefault();

    const searchCategory = document.getElementById('searchCategory').value.toLowerCase();
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();

    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const filteredFlashcards = flashcards.filter(flashcard => {
        const categoryMatch = flashcard.category.toLowerCase().includes(searchCategory);
        const termMatch = flashcard.question.toLowerCase().includes(searchTerm) || flashcard.answer.toLowerCase().includes(searchTerm);
        return categoryMatch && termMatch;
    });

    displayFlashcards(filteredFlashcards);

    const reviewButton = document.getElementById('reviewButton');
    reviewButton.classList.remove('hidden');
}

function startReview() {
    const searchCategory = document.getElementById('searchCategory').value.toLowerCase();
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const filteredFlashcards = flashcards.filter(flashcard => flashcard.category.toLowerCase() === searchCategory);

    if (filteredFlashcards.length === 0) {
        alert('Nenhum flashcard encontrado para essa categoria.');
        return;
    }

    shuffleArray(filteredFlashcards);

    let currentCardIndex = 0;
    const reviewContainer = document.getElementById('reviewContainer');
    const reviewFlashcard = document.getElementById('reviewFlashcard');
    const questionElement = reviewFlashcard.querySelector('.question');
    const answerElement = reviewFlashcard.querySelector('.answer');
    const showAnswerButton = document.getElementById('showAnswerButton');
    const nextButton = document.getElementById('nextButton');
    const closeReviewButton = document.getElementById('closeReview');

    function showNextCard() {
        if (currentCardIndex < filteredFlashcards.length) {
            const currentCard = filteredFlashcards[currentCardIndex];
            questionElement.textContent = currentCard.question;
            answerElement.textContent = currentCard.answer;
            answerElement.classList.add('hidden');
            showAnswerButton.textContent = 'Mostrar Resposta';
        }
    }

    function checkAnswer() {
        answerElement.classList.remove('hidden');
        showAnswerButton.textContent = 'Ocultar Resposta';
    }

    showAnswerButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', () => {
        currentCardIndex++;
        if (currentCardIndex < filteredFlashcards.length) {
            showNextCard();
        } else {
            alert('Fim da revisão!');
            showSection('study');
        }
    });
    closeReviewButton.addEventListener('click', () => {
        showSection('study');
    });

    showSection('reviewContainer');
    showNextCard();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
