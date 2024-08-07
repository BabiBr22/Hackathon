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
            <p><strong>Pergunta:</strong> ${flashcard.question}</p>
            <p><strong>Resposta:</strong> ${flashcard.answer}</p>
            <button class="edit-btn" onclick="editFlashcard(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteFlashcard(${index})">Excluir</button>
        `;
        
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
}

function deleteFlashcard(index) {
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    flashcards.splice(index, 1);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    displayFlashcards();
    alert('Flashcard excluído com sucesso!');
}

function editFlashcard(index) {
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const flashcard = flashcards[index];
    
    document.getElementById('category').value = flashcard.category;
    document.getElementById('question').value = flashcard.question;
    document.getElementById('answer').value = flashcard.answer;
    
    editingIndex = index;
    showSection('create');
}
