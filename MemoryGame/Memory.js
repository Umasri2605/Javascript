var board = document.getElementById('board');
var resetButton = document.getElementById('reset-button');
var cardsArray = [];
var flippedCards = [];
var matchedCards = 0;

// Generate the cards
var generateCards = () => {
    var values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    var shuffledValues = [...values, ...values].sort(() => Math.random() - 0.5); // Shuffle the cards

    shuffledValues.forEach(value => {
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cardsArray.push(card);
    });
};

// Flip the card            
var flipCard = (event) => {
    var card = event.target;

    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
};

// Check if the flipped cards match
var checkMatch = () => {
    var [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cardsArray.length) {
            setTimeout(() => {
                alert('You won!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
};

// Reset the game
var resetGame = () => {
    flippedCards = [];
    matchedCards = 0;
    board.innerHTML = '';
    cardsArray = [];
    generateCards();
};

// Initialize the game
generateCards();

// Reset button event
resetButton.addEventListener('click', resetGame);