let attemptsLeft = 5; // Счетчик оставшихся попыток отказа
let noClickCount = 0; // Счетчик для статистики


// Массив сообщений для кнопки "Нет"
const persuasionMessages = [
    "😊 Ты уверен(а)? Передумай!",
    "🥺 Ну пожалуйста! Я буду самым лучшим!",
    "💕 Без тебя этот день не имеет смысла...",
    "💖 Ты же моя половинка!",
    "❤️ Не разбивай моё сердечко!"
];


// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Страница загружена! Осталось попыток: " + attemptsLeft);
    updateAttemptsDisplay();
    initButtons();
    addAnimations();
    createSurpriseCard(); // Создаём открытку внутри пустого модального окна
    setupModalCloseButtons(); // Добавляем обработчики для закрытия
});


// ========== СОЗДАНИЕ ОТКРЫТКИ С СЮРПРИЗОМ ==========
function createSurpriseCard() {
    const modal = document.getElementById('surpriseModal');
    if (!modal) return;


    // Очищаем модальное окно и наполняем его содержимым
   


    // Добавляем стили
    addCardStyles();


    // Настраиваем обработчики для кнопок
    setupCardButtons();
}


// ========== НАСТРОЙКА КНОПОК ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ==========
function setupModalCloseButtons() {
    // Добавляем обработчик на крестик в HTML (если он есть)
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.onclick = function(e) {
            e.preventDefault();
            closeSurpriseModal();
        };
    }


    // Добавляем обработчик на кнопку в HTML (если она есть)
    const modalBtn = document.querySelector('.modal-btn');
    if (modalBtn) {
        modalBtn.onclick = function(e) {
            e.preventDefault();
            closeSurpriseModal();
        };
    }
}


// ========== ДОБАВЛЕНИЕ СТИЛЕЙ ==========
function addCardStyles() {
    if (document.getElementById('cardStyles')) return;


    const style = document.createElement('style');
    style.id = 'cardStyles';
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            overflow: auto;
        }


        .surprise-card {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            border-radius: 25px;
            padding: 25px;
            max-width: 450px;
            width: 90%;
            margin: 50px auto;
            position: relative;
            box-shadow: 0 15px 40px rgba(255, 71, 87, 0.3);
            animation: cardPop 0.4s ease-out;
        }


        @keyframes cardPop {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }


        .close-card {
            position: absolute;
            right: 15px;
            top: 5px;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
            color: #fff;
            z-index: 10;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s;
        }


        .close-card:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }


        .card-front {
            text-align: center;
            padding: 30px 15px;
        }


        .heart-animation {
            font-size: 100px;
            animation: heartbeat 1.5s ease-in-out infinite;
        }


        @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.2); }
            35% { transform: scale(1.1); }
            45% { transform: scale(1.3); }
            55% { transform: scale(1); }
        }


        .card-title {
            font-size: 36px;
            color: #fff;
            text-shadow: 2px 2px 4px rgba(255, 71, 87, 0.3);
            margin: 15px 0;
        }


        .card-subtitle {
            font-size: 18px;
            color: #fff;
            margin-bottom: 25px;
        }


        .open-card-btn {
            background: #fff;
            border: none;
            padding: 12px 35px;
            font-size: 18px;
            border-radius: 50px;
            color: #ff4757;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }


        .open-card-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(255, 71, 87, 0.3);
        }


        .card-inside {
            background: #fff9f9;
            border-radius: 20px;
            padding: 25px;
            position: relative;
            overflow: hidden;
            min-height: 350px;
        }


        .floating-hearts {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
        }


        .floating-hearts span {
            position: absolute;
            font-size: 24px;
            animation: float 3s ease-in-out infinite;
        }


        .floating-hearts span:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .floating-hearts span:nth-child(2) { top: 20%; right: 15%; animation-delay: 0.5s; }
        .floating-hearts span:nth-child(3) { bottom: 30%; left: 20%; animation-delay: 1s; }
        .floating-hearts span:nth-child(4) { top: 40%; right: 25%; animation-delay: 1.5s; }


        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
        }


        .love-title {
            font-size: 28px;
            color: #ff4757;
            text-align: center;
            margin: 15px 0;
            position: relative;
            z-index: 1;
        }


        .love-message {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            margin: 15px 0;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.1);
            position: relative;
            z-index: 1;
        }


        .love-message p {
            font-size: 16px;
            color: #333;
            margin: 8px 0;
            line-height: 1.5;
        }


        .signature {
            text-align: right;
            font-style: italic;
            margin: 15px 0;
            font-size: 14px;
            color: #666;
            position: relative;
            z-index: 1;
        }


        .hug-btn {
            background: #ff4757;
            color: #fff;
            border: none;
            padding: 12px 30px;
            font-size: 18px;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s;
            width: 100%;
            font-weight: bold;
            position: relative;
            z-index: 1;
            box-shadow: 0 5px 15px rgba(255, 71, 87, 0.3);
        }


        .hug-btn:hover {
            background: #ff6b81;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
}


// ========== НАСТРОЙКА КНОПОК ОТКРЫТКИ ==========
function setupCardButtons() {
    console.log("🔧 Настройка кнопок открытки");


    const closeCardBtn = document.getElementById('closeCardBtn');
    const hugBtn = document.getElementById('hugBtn');
    const openCardBtn = document.getElementById('openCardBtn');
    const modal = document.getElementById('surpriseModal');


    // Закрытие по крестику
    if (closeCardBtn) {
        console.log("✅ Крестик найден");
        closeCardBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSurpriseModal();
            return false;
        };
    }


    // Закрытие по кнопке "Обнимаю"
    if (hugBtn) {
        console.log("✅ Кнопка 'Обнимаю' найдена");
        hugBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSurpriseModal();
            return false;
        };
    }


    // Открытие открытки
    if (openCardBtn) {
        console.log("✅ Кнопка открытия найдена");
        openCardBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            openCard();
            return false;
        };
    }


    // Закрытие при клике на фон
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeSurpriseModal();
            }
        };
    }
}


// ========== ОТКРЫТИЕ ОТКРЫТКИ ==========
function openCard() {
    console.log("📬 Открытие открытки");
    const cardFront = document.querySelector('.card-front');
    const cardInside = document.getElementById('cardInside');


    if (cardFront && cardInside) {
        cardFront.style.display = 'none';
        cardInside.style.display = 'block';
        startMiniConfetti();
    }
}


// ========== МИНИ-КОНФЕТТИ ==========
function startMiniConfetti() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['❤️', '💖', '💘', '✨', '⭐'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
            confetti.style.animation = 'fallConfetti 2s ease-out';
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }, i * 50);
    }
}


// ========== ОБНОВЛЕНИЕ СЧЕТЧИКА ==========
function updateAttemptsDisplay() {
    const attemptsSpan = document.getElementById('attemptsLeft');
    if (attemptsSpan) {
        attemptsSpan.textContent = attemptsLeft;
    }


    const tryMessage = document.getElementById('tryMessage');
    if (tryMessage) {
        if (attemptsLeft > 0) {
            tryMessage.innerHTML = `💝 Осталось <span style="color: #ff4757; font-weight: bold; font-size: 24px;">${attemptsLeft}</span> попыток отказаться 💝`;
        } else {
            tryMessage.innerHTML = "😊 Попытки закончились! Пора сказать ДА! 😊";


            const noBtn = document.getElementById('noBtn');
            if (noBtn) {
                noBtn.disabled = true;
                noBtn.style.opacity = '0.5';
                noBtn.style.cursor = 'not-allowed';
            }
        }
    }
}


// ========== ИНИЦИАЛИЗАЦИЯ КНОПОК ==========
function initButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');


    if (yesBtn) {
        yesBtn.onclick = function(e) {
            e.preventDefault();
            handleYesClick();
            return false;
        };
    }


    if (noBtn) {
        noBtn.onclick = function(e) {
            e.preventDefault();
            handleNoClick();
            return false;
        };


        noBtn.addEventListener('mouseover', function(e) {
            if (attemptsLeft > 0 && !noBtn.disabled) {
                moveNoButton();
            }
        });


        noBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (attemptsLeft > 0 && !noBtn.disabled) {
                moveNoButton();
            }
        });
    }
}


// ========== КНОПКА ДА ==========
function handleYesClick() {
    console.log("💖 НАЖАТО ДА!");


    const modal = document.getElementById('surpriseModal');
    if (modal) {
        modal.style.display = 'block';


        const cardFront = document.querySelector('.card-front');
        const cardInside = document.getElementById('cardInside');
        if (cardFront && cardInside) {
            cardFront.style.display = 'block';
            cardInside.style.display = 'none';
        }


        // Перенастраиваем кнопки при открытии
        setTimeout(setupCardButtons, 50);
    }


    const tryMessage = document.getElementById('tryMessage');
    if (tryMessage) {
        tryMessage.innerHTML = "🎉 УРА! ТЫ СОГЛАСИЛСЯ! 🎉";
        tryMessage.style.color = '#ff4757';
        tryMessage.style.fontWeight = 'bold';
        tryMessage.style.fontSize = '20px';
    }


    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.style.display = 'none';
    }


    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }


    startConfetti();
}


// ========== КНОПКА НЕТ ==========
function handleNoClick() {
    console.log("💔 НАЖАТО НЕТ!");


    if (attemptsLeft <= 0) {
        alert("😊 У тебя больше нет попыток отказаться! Пора сказать ДА! 😊");
        return;
    }


    attemptsLeft--;
    noClickCount++;


    console.log("Осталось попыток отказа: " + attemptsLeft);
    updateAttemptsDisplay();


    const noCountSpan = document.getElementById('noCount');
    if (noCountSpan) {
        noCountSpan.textContent = noClickCount;
    }


    addMessage();


    const tryMessage = document.getElementById('tryMessage');
    if (tryMessage) {
        if (attemptsLeft === 1) {
            tryMessage.innerHTML = `❤️ Последняя попытка! Подумай хорошо! ❤️`;
        } else if (attemptsLeft > 0) {
            tryMessage.innerHTML = `😊 Осталось ${attemptsLeft} попыток`;
        }
    }


    moveNoButton();
    createMiniHearts();
}


// ========== ДОБАВЛЕНИЕ СООБЩЕНИЯ ==========
function addMessage() {
    const container = document.getElementById('messagesContainer');
    if (!container) return;


    const randomIndex = Math.floor(Math.random() * persuasionMessages.length);
    const message = persuasionMessages[randomIndex];


    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';
    messageElement.innerHTML = `<i>❤️</i> ${message}`;


    container.appendChild(messageElement);


    while (container.children.length > 5) {
        container.removeChild(container.firstChild);
    }
}


// ========== ФУНКЦИЯ ПЕРЕМЕЩЕНИЯ КНОПКИ НЕТ ==========
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn || attemptsLeft <= 0 || noBtn.disabled) return;


    const container = document.querySelector('.buttons-container') || document.body;
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();


    const maxX = Math.max(0, containerRect.width - btnRect.width - 20);
    const maxY = Math.max(0, containerRect.height - btnRect.height - 20);


    let newX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    let newY = Math.max(0, Math.min(Math.random() * maxY, maxY));


    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'left 0.2s, top 0.2s';


    let currentSize = parseFloat(noBtn.style.transform?.match(/scale\(([^)]+)\)/)?.[1]) || 1;
    if (currentSize > 0.6) {
        noBtn.style.transform = `scale(${currentSize - 0.05})`;
    }


    const yesBtn = document.getElementById('yesBtn');
    if (yesBtn) {
        let yesSize = parseFloat(yesBtn.style.transform?.match(/scale\(([^)]+)\)/)?.[1]) || 1;
        if (yesSize < 1.5) {
            yesBtn.style.transform = `scale(${yesSize + 0.03})`;
        }
    }
}


// ========== СОЗДАНИЕ СЕРДЕЧЕК ==========
function createMiniHearts() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.innerHTML = ['❤️', '💖', '💘'][Math.floor(Math.random() * 3)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = '30px';
            heart.style.animation = 'floatHeart 1s ease-out';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
}


// ========== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ==========
function closeSurpriseModal() {
    console.log("🔴 Закрытие модального окна");
    const modal = document.getElementById('surpriseModal');
    if (modal) {
        modal.style.display = 'none';


        const cardFront = document.querySelector('.card-front');
        const cardInside = document.getElementById('cardInside');
        if (cardFront && cardInside) {
            cardFront.style.display = 'block';
            cardInside.style.display = 'none';
        }


        console.log("✅ Модальное окно закрыто");
    } else {
        console.log("❌ Модальное окно не найдено!");
    }
}


// ========== КОНФЕТТИ ==========
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;


    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const confetti = [];
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 3,
            speed: Math.random() * 4 + 2,
            color: ['#ff4757', '#ff6b81', '#ff8787', '#ffa7a7'][Math.floor(Math.random() * 4)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 4 + 1
        });
    }


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        let active = false;
        confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation * Math.PI / 180);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
            ctx.restore();


            c.y += c.speed;
            c.rotation += c.rotationSpeed;


            if (c.y < canvas.height) active = true;
            if (c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        });


        if (active) requestAnimationFrame(animate);
    }


    animate();


    setTimeout(() => {
        canvas.style.display = 'none';
    }, 3000);
}


// ========== ДОБАВЛЕНИЕ АНИМАЦИЙ ==========
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fallConfetti {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }


        @keyframes floatHeart {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}


// ========== ОБРАБОТКА РАЗМЕРА ОКНА ==========
window.addEventListener('resize', function() {
    const noBtn = document.getElementById('noBtn');
    if (noBtn && noBtn.style.position === 'absolute') {
        noBtn.style.position = 'relative';
        noBtn.style.left = '';
        noBtn.style.top = '';
    }
});


// ========== ОБРАБОТКА КЛАВИШИ ESC ==========
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('surpriseModal');
        if (modal && modal.style.display === 'block') {
            closeSurpriseModal();
        }
    }
});


// ========== ЭКСПОРТ ФУНКЦИЙ ==========
window.handleYesClick = handleYesClick;
window.handleNoClick = handleNoClick;
window.closeSurpriseModal = closeSurpriseModal;
window.openCard = openCard;