function toggleFlip(event) {
if (!event.target.classList.contains('add-to-cart ') && event.target.tagName !== 'IMG') {
        event.currentTarget.classList.toggle('flipped');
    } 
}
const burgerButton = document.getElementById('burgerButton'); const menu = document.getElementById('menu'); burgerButton.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'flex' ? 'none': 'flex';
        });


function showSection(sectionId) {
    //Скрываем все разделы
    document.querySelectorAll('.content-section').forEach((section) => {
        section.style.display = 'none';
    });

    // Показываем выбранный раздел
    document.getElementById(sectionId).style.display = 'block';
}

