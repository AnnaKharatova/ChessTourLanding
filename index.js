import { cardsData, stepsCards } from './utils/constants.js'

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const allCards = document.getElementById('length');
const countItems = document.getElementById('count');
const carousel = document.getElementById('carousel');
const stepsCarousel = document.getElementById("steps-carusel");
const pagination = document.getElementById('pagination');
const prevStepsButton = document.getElementById('steps-prevButton');
const nextStepsButton = document.getElementById('steps-nextButton');

let currentStepCardIndex = 0;
let currentIndex = 0;
let displyedItems = 3;
let intervalId

prevButton.addEventListener('click', showPrev);
nextButton.addEventListener('click', showNext);
prevStepsButton.addEventListener('click', showPreviousStep);
nextStepsButton.addEventListener('click', showNextStep);

allCards.textContent = `/${cardsData.length}`

if (window.innerWidth < 880) {
    displyedItems = 1
    countItems.textContent = 1
} else if (window.innerWidth < 1280) {
    displyedItems = 2
    countItems.textContent = 2
} else {
    displyedItems = 3
    countItems.textContent = 3
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function removeBr() {
    const subtitle = document.querySelector('.header__subtitle');
    const br = subtitle.querySelector('br')
    if (window.innerWidth < 600) {
        br.remove()
    }
}

function createCards() {
    const visibleCards = cardsData.slice(currentIndex, currentIndex + displyedItems);
    visibleCards.forEach(cardData => {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `
        <img class="card__image" src=${cardData.image} alt='фото участника'/>
        <p class="card__name">${cardData.name}</p>
        <p class="card__status">${cardData.status}</p>
        <button class="card__button">Подробнее</button>
        `;
        carousel.appendChild(card);
    });
}

function showNext() {
    carousel.innerHTML = '';
    currentIndex += displyedItems;
    if (currentIndex >= cardsData.length) {
        currentIndex = 0;
    }
    if (window.innerWidth < 880) {
        countItems.textContent = currentIndex + 1
    }
    createCards();
}

function startCarousel() {
    intervalId = setInterval(showNext, 4000);
}

function showPrev() {
    carousel.innerHTML = '';
    currentIndex -= displyedItems;
    if (currentIndex < 0) {
        currentIndex = cardsData.length - displyedItems;
    }
    if (window.innerWidth < 880) {
        countItems.textContent = currentIndex + 1
    }
    createCards();
}

function createStepsCards() {
    stepsCarousel.innerHTML = '';
    stepsCarousel.innerHTML = `<div class="card-number">${stepsCards[0].content}</div>`;
}

function createPagination() {
    stepsCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });
    updatePagination();
}

function updatePagination() {
    const dots = pagination.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentStepCardIndex);
    });
}

function goToSlide(index) {
    currentStepCardIndex = index;
    updatePagination();
    updateButtons();
}

function showNextStep() {
    if (currentStepCardIndex < stepsCards.length - 1) {
        currentStepCardIndex++;
        updatePagination();
        updateButtons();
    }
    stepsCarousel.innerHTML = `<div>${stepsCards[currentStepCardIndex].content}</div>`;
}

function showPreviousStep() {
    if (currentStepCardIndex > 0) {
        currentStepCardIndex--;
        updatePagination();
        updateButtons();
    }
    stepsCarousel.innerHTML = `<div>${stepsCards[currentStepCardIndex].content}</div>`;
}

function updateButtons() {
    prevStepsButton.disabled = currentStepCardIndex === 0;
    nextStepsButton.disabled = currentStepCardIndex === stepsCards.length - 1;
}

createStepsCards();
createPagination();
updateButtons();
removeBr();
startCarousel();
createCards();

