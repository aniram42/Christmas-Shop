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



// КНОПКА "ПРОКРУТКА ВВЕРХ"
const scrollBtn = document.getElementById('scrollToTopBtn');
function toggleScrollButton() {
// Проверяем ширину экрана и прокрутку
        if (window.innerWidth <= 768 && window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
    if (scrollBtn) {
        window.addEventListener('scroll', toggleScrollButton);
        window.addEventListener('resize', toggleScrollButton); // ← добавить для отслеживания изменения ширины
        scrollBtn.addEventListener('click', scrollToTop);
        toggleScrollButton();
    }



// РАНДОМ КАРТОЧЕК
let allCards = [];

// Загрузка JSON
fetch('cards.json')
    .then(res => res.json())
    .then(data => {
        allCards = data;
        showCards('all');
        setupButtons();
    })
    .catch(err => console.log('Ошибка:', err));

function showCards(category) {
    let cardsToShow = [];

    if (category === 'all') {
        const work = allCards.filter(c => c.category === 'For Work');
        const health = allCards.filter(c => c.category === 'For Health');
        const harmony = allCards.filter(c => c.category === 'For Harmony');

        cardsToShow = [
            ...getRandom(work, 12),
            ...getRandom(health, 12),
            ...getRandom(harmony, 12)
        ];
        cardsToShow = shuffle(cardsToShow);
    }
    else if (category === 'work') {
        const work = allCards.filter(c => c.category === 'For Work');
        cardsToShow = getRandom(work, 12);
    }
    else if (category === 'health') {
        const health = allCards.filter(c => c.category === 'For Health');
        cardsToShow = getRandom(health, 12);
    }
    else if (category === 'harmony') {
        const harmony = allCards.filter(c => c.category === 'For Harmony');
        cardsToShow = getRandom(harmony, 12);
    }

    renderCards(cardsToShow);
    updateActiveTab(category);
}

function getRandom(arr, count) {
    if (!arr.length) return [];
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function updateActiveTab(category) {
    const allBtn = document.getElementById('tab-all');
    const workBtn = document.getElementById('tab-work');
    const healthBtn = document.getElementById('tab-health');
    const harmonyBtn = document.getElementById('tab-harmony');

    // Убираем класс active у всех кнопок
    const allButtons = [allBtn, workBtn, healthBtn, harmonyBtn];
    allButtons.forEach(btn => {
        if (btn) {
            btn.classList.remove('tabs-items-active');
            btn.classList.add('tabs-items');
        }
    });

    // Добавляем класс active выбранной кнопке
    let activeBtn = null;
    if (category === 'all') activeBtn = allBtn;
    else if (category === 'work') activeBtn = workBtn;
    else if (category === 'health') activeBtn = healthBtn;
    else if (category === 'harmony') activeBtn = harmonyBtn;

    if (activeBtn) {
        activeBtn.classList.remove('tabs-items');
        activeBtn.classList.add('tabs-items-active');
    }
}

function getCategoryClass(category) {
    if (category === 'For Work') return 'h4--purple';
    if (category === 'For Health') return 'h4--green';
    if (category === 'For Harmony') return 'h4--pink';
    return 'h4--purple';
}

function getIcon(category) {
    if (category === 'For Work') return 'icons/gift-for-work.png';
    if (category === 'For Health') return 'icons/gift-for-health.png';
    if (category === 'For Harmony') return 'icons/gift-for-harmony.png';
    return 'icons/gift-for-work.png';
}

function renderCards(cards) {
    const container = document.getElementById('gifts-cards');
    if (!container) return;
    container.innerHTML = '';

    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
            <div class="card-item-image">
                <img src="${getIcon(card.category)}" alt="${card.name}" class="image-item">
            </div>
            <div class="text-card">
                <span class="h4 ${getCategoryClass(card.category)}">${card.category}</span>
                <span class="h3">${card.name}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

function setupButtons() {
    const allBtn = document.getElementById('tab-all');
    const workBtn = document.getElementById('tab-work');
    const healthBtn = document.getElementById('tab-health');
    const harmonyBtn = document.getElementById('tab-harmony');

    if (allBtn) {
        allBtn.onclick = function() {
            showCards('all');
        };
    }

    if (workBtn) {
        workBtn.onclick = function() {
            showCards('work');
        };
    }

    if (healthBtn) {
        healthBtn.onclick = function() {
            showCards('health');
        };
    }

    if (harmonyBtn) {
        harmonyBtn.onclick = function() {
            showCards('harmony');
        };
    }
}



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
modalObserver.observe(document.getElementById('gifts-cards'), { childList: true });

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







