'use strict';

const DECK = document.getElementById('deck');
const CONTAINER = document.getElementById('cards');

function shuffle(array) {
  let i = array.length;
  while (i !== 0) {
    let r = Math.floor(Math.random() * i);
    i--;
    [array[i], array[r]] = [array[r], array[i]];
  }
}

var questions = [...QUESTIONS];
shuffle(questions);

let draggingCard = null;

function updateDeck() {
	DECK.innerHTML = `Cards: ${questions.length}`;
}

updateDeck();

function draw() {
	if (questions.length === 0) {
		return;
	}
	let card = document.createElement('div');
	const questionText = questions.pop();
	card.textContent = questionText;
	card.className = 'card card-shaped';
	card.draggable = true;
	const cardData = {
		element: card,
		question: questionText,
	};

	card.addEventListener('dragstart', function() {
		card.classList.add('dragging');
		draggingCard = cardData;
	});

	card.addEventListener('dragend', function() {
		card.classList.remove('dragging');
		draggingCard = null;
	});

	card.addEventListener('dragover', function(e) {
		e.preventDefault();
		if (draggingCard && draggingCard.element !== card) {
			let dragIndex = Array.prototype.indexOf.call(CONTAINER.children, draggingCard.element);
			let targetIndex = Array.prototype.indexOf.call(CONTAINER.children, card);
			CONTAINER.insertBefore(draggingCard.element, dragIndex >= targetIndex ? card : card.nextSibling);
		}
	});
	
	CONTAINER.insertBefore(card, DECK.nextSibling);
	updateDeck();
}

function deckAccept(e) {
	e.preventDefault();
	DECK.innerHTML = '↪ Shuffle';
}

function deckCancel() {
	updateDeck();
}

function shuffleIn() {
	// DECK.textContent = '';
	draggingCard.element.remove();
	questions.push(draggingCard.question);
	let r = Math.floor(Math.random() * questions.length);
    [questions[questions.length - 1], questions[r]] = [questions[r], questions.at(-1)];
	updateDeck();
}