// Функция для скрытия загрузочного экрана
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none'; // Скрываем загрузочный экран
        console.log('Загрузочный экран скрыт'); // Сообщение для отладки
    } else {
        console.log('Не найден элемент с id loadingScreen');
    }
}

// Скрываем загрузочный экран через 4 секунды
setTimeout(hideLoadingScreen, 4000);

/*/ Скрыть загрузочный экран после полной загрузки страницы
window.addEventListener('load', function() {
    console.log('Страница загружена'); // Сообщение для отладки
    hideLoadingScreen();
}); */