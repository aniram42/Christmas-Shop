// БУРГЕР-МЕНЮ
const burger = document.querySelector('.burger-menu');
const navigation = document.querySelector('.navigation');
const body = document.body;

// Открытие/закрытие меню
burger.addEventListener('click', function(e) {
    e.stopPropagation();
    burger.classList.toggle('active');
    navigation.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Закрытие при клике на ссылку
document.querySelectorAll('.item-nav a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navigation.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});

// Закрытие при клике вне меню
document.addEventListener('click', function(event) {
    if (!burger.contains(event.target) && !navigation.contains(event.target)) {
        burger.classList.remove('active');
        navigation.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});

// При >768px сбрасываем классы
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        burger.classList.remove('active');
        navigation.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});



// СЛАЙДЕР
const sliderRow = document.querySelector('.slider-row');
const btnLeft = document.querySelector('.button-slider-left');
const btnRight = document.querySelector('.button-slider-right');

let currentStep = 0;          // текущий шаг (0 = начало)
let totalSteps = 3;           // общее количество шагов (по умолчанию 3)
let stepSize = 0;             // размер одного шага в пикселях

// Функция расчета размеров
function updateSlider() {
    if (!sliderRow) return;

    const container = document.querySelector('.row');
    const containerWidth = container.clientWidth;
    const sliderWidth = sliderRow.scrollWidth;
    const diff = sliderWidth - containerWidth;

// Определяем количество шагов в зависимости от ширины экрана
    if (window.innerWidth > 768) {
    totalSteps = 3;
} else {
    totalSteps = 6;
}
    stepSize = diff / totalSteps;
    currentStep = 0;
    sliderRow.style.transform = `translateX(0px)`;
    updateButtons();
}

// Функция обновления состояния кнопок
function updateButtons() {
// Левая кнопка: неактивна в начале (currentStep = 0)
    if (currentStep <= 0) {
        btnLeft.classList.add('disabled');
        btnLeft.classList.remove('active');
} else {
        btnLeft.classList.remove('disabled');
        btnLeft.classList.add('active');
}

// Правая кнопка: неактивна в конце (currentStep = totalSteps)
    if (currentStep >= totalSteps) {
        btnRight.classList.add('disabled');
        btnRight.classList.remove('active');
} else {
        btnRight.classList.remove('disabled');
        btnRight.classList.add('active');
}
}

// Прокрутка вправо
function slideRight() {
    if (currentStep >= totalSteps) return;  // уже в конце

    currentStep++;
    const newPosition = -currentStep * stepSize;
    sliderRow.style.transform = `translateX(${newPosition}px)`;
    updateButtons();
}

// Прокрутка влево
function slideLeft() {
    if (currentStep <= 0) return;  // уже в начале

    currentStep--;
    const newPosition = -currentStep * stepSize;
    sliderRow.style.transform = `translateX(${newPosition}px)`;
    updateButtons();
}

// Назначаем обработчики
btnLeft.addEventListener('click', slideLeft);
btnRight.addEventListener('click', slideRight);

// При изменении размера окна
window.addEventListener('resize', function() {
    updateSlider();
});

// Инициализация
updateSlider();



// ТАЙМЕР
function updateTimer() {
    const now = new Date();
    const nowUTC = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
    );

    const nextYear = nowUTC.getFullYear() + 1;
    const newYear = new Date(Date.UTC(nextYear, 0, 1, 0, 0, 0));

    const diff = newYear - nowUTC;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);



// РАНДОМ КАРТОЧЕК
// Массив для хранения всех карточек
let allCards = [];

// Загрузка JSON файла
async function loadCards() {
    try {
    const response = await fetch('cards.json');
    allCards = await response.json();
    showRandomCards();
} catch (error) {
    console.error('Ошибка загрузки:', error);
}
}

// Функция для получения 4 рандомных карточек
function getRandomCards(count) {
    const shuffled = [...allCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
    return shuffled.slice(0, count);
}

// Функция для определения цвета по категории
function getCategoryClass(category) {
    switch(category) {
    case 'For Work': return 'h4--purple';
    case 'For Health': return 'h4--green';
    case 'For Harmony': return 'h4--pink';
    default: return 'h4--purple';
}
}

// Функция для получения иконки по категории
function getIcon(category) {
    switch(category) {
        case 'For Work': return 'icons/gift-for-work.png';
        case 'For Health': return 'icons/gift-for-health.png';
        case 'For Harmony': return 'icons/gift-for-harmony.png';
        default: return 'icons/gift-for-work.png';
}
}

// Отображение рандомных карточек
function showRandomCards() {
    const container = document.getElementById('random-cards');
    if (!container) return;

    const randomCards = getRandomCards(4);

// Очищаем контейнер
container.innerHTML = '';

// Создаем карточки
randomCards.forEach(card => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-item';
    cardItem.innerHTML = `
                <div class="card-item-image">
                    <img src="${getIcon(card.category)}" alt="${card.name}" class="image-item">
                </div>
                <div class="text-card">
                    <span class="h4 ${getCategoryClass(card.category)}">${card.category}</span>
                    <span class="h3">${card.name}</span>
                </div>
            `;
    container.appendChild(cardItem);
});
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadCards();
});



// МОДАЛЬНОЕ ОКНО ДЛЯ ПОДАРКОВ
// Функция создания снежинок
function createSnowflakes(value) {
    let snowflakes = '';
    const activeCount = Math.min(Math.floor(value / 100), 5);
    for (let i = 0; i < 5; i++) {
        if (i < activeCount) {
            snowflakes += '<img src="icons/snowflake-modal.svg" alt="snowflake" class="snowflake-active">';
        } else {
            snowflakes += '<img src="icons/snowflake-modal.svg" alt="snowflake" class="snowflake-inactive">';
        }
    }
    return snowflakes;
}

// Открытие модального окна
function openModal(giftName) {
    const gift = allCards.find(item => item.name === giftName);
    if (!gift) return;

    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;

    document.getElementById('modalIcon').src = getIcon(gift.category);

    const modalCategory = document.getElementById('modalCategory');
    modalCategory.textContent = gift.category;
    modalCategory.className = 'h4 ' + getCategoryClass(gift.category);

    document.getElementById('modalName').textContent = gift.name;
    document.getElementById('modalDescription').textContent = gift.description || 'Магический подарок для Нового 2025 года!';

    const powersContainer = document.getElementById('modalSuperpowers');
    powersContainer.innerHTML = '';

    const powers = gift.superpowers || gift.powers || { Live: 300, Create: 300, Love: 300, Dream: 300 };

    const powerNames = ['Live', 'Create', 'Love', 'Dream'];
    powerNames.forEach(powerName => {
        let value = powers[powerName.toLowerCase()] || 300;
        if (typeof value === 'string') {
            value = parseInt(value.replace('+', ''), 10);
        }
        if (isNaN(value)) value = 300;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-modal';
        itemDiv.innerHTML = `
            <p class="paragraph">${powerName}</p>
            <p class="paragraph">+${value}</p>
            <div class="snowflake-modal">${createSnowflakes(value)}</div>
        `;
        powersContainer.appendChild(itemDiv);
    });

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Навешиваем обработчики на карточки
function attachModalHandlers() {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.removeEventListener('click', card.modalHandler);
        card.modalHandler = function() {
            const title = this.querySelector('.h3').textContent;
            openModal(title);
        };
        card.addEventListener('click', card.modalHandler);
    });
}

// Наблюдатель за появлением новых карточек
const modalObserver = new MutationObserver(function() {
    attachModalHandlers();
});
modalObserver.observe(document.getElementById('random-cards'), { childList: true });

// Настройка закрытия
document.getElementById('modalCloseBtn').onclick = closeModal;
document.getElementById('modalOverlay').onclick = function(e) {
    if (e.target === this) closeModal();
};
document.onkeydown = function(e) {
    if (e.key === 'Escape') closeModal();
};

// Запускаем обработчики после загрузки карточек
setTimeout(attachModalHandlers, 500);




