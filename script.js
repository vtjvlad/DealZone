const products = [
    {
        id: 1,
        name: "Продукт 1",
        price: 1500,
        description: "Это продукт с высоким качеством и отличным дизайном.",
        image: "sery.jpeg"
    },
    {
        id: 2,
        name: "Продукт 2",
        price: 150,
        description: "Это продукт с высоким качеством и отличным дизайном.",
        image: "sery.jpeg"
    },
    {
        id: 3,
        name: "Продукт 3",
        price: 3500,
        description: "Идеальный выбор для ценителей стиля.",
        image: "sery.jpeg"
    },
    // Добавьте больше товаров по необходимости
];

function toggleFlip(event) {
if (!event.target.classList.contains('add-to-cart') && event.target.tagName !== 'IMG') {
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


let cart = [

];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = productCard.querySelector('.price').innerText;
        
        addToCart(productName, productPrice);
        event.stopPropagation();
    });
});

function addToCart(name, price) {
    const product = cart.find(item => item.name === name);
    
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartSection = document.getElementById('cart');
    const cartList = cartSection.querySelector('.cart-items');
    
    // Очистка текущего отображения
    cartList.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>Цена: ${item.price}</p>
            <p>Количество: ${item.quantity}</p>
        `;
        
        cartList.appendChild(cartItem);
    });
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function displayProducts() {
    const catalogSection = document.querySelector("#catalog .products");
    catalogSection.innerHTML = ""; // Очистка существующего содержимого

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.setAttribute("onclick", "toggleFlip(event)");

        productCard.innerHTML = `
            <div class="product-inner">
                <div class="product-front">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="price">${product.price}</div>
                    <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price}); event.stopPropagation();">В корзину</button>
                </div>
                <div class="product-back">
                    <h3>Описание продукта</h3>
                    <p>${product.description}</p>
                </div>
            </div>
        `;

        catalogSection.appendChild(productCard);
    });
}

// Вызовем функцию при загрузке страницы
displayProducts();



function showSection(sectionId) {
    // Скрываем все разделы
    document.querySelectorAll('.content-section').forEach((section) => {
        section.style.display = 'none';
    });

    // Показываем выбранный раздел
    document.getElementById(sectionId).style.display = 'block';

    // Проверяем, если нижний навигационный бар должен отображаться на этой вкладке
    const navbarbot = document.querySelector('.navbarbot');
    const sectionsWithNavbar = ['user', 'catalog', 'cart', 'payment', 'delivery']; // вкладки, где отображается нижний бар

    if (sectionsWithNavbar.includes(sectionId)) {
        navbarbot.style.display = 'flex';
    } else {
        navbarbot.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('appContent');
    const logoutButton = document.getElementById('logoutButton');

    // Проверка, если Telegram Web App доступен
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        // Инициализируем Telegram Web App
        tg.ready();

        // Получаем информацию о пользователе из Telegram
      const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : undefined;

        if (user) {
            // Если информация о пользователе есть, показываем контент
            showAppContent(user);
        } else {
            alert('Ошибка авторизации через Telegram.');
        }
    } else {
        alert('Telegram Web App не поддерживается в этом браузере.');
    }

    // Функция для показа основного контента с данными о пользователе
    function showAppContent(user) {
        const userInfo = document.createElement('div');
        userInfo.innerHTML = `Welcome, ${user.first_name}! <br> Your username: ${user.username}`;
        userInfo.style.textAlign = 'center';
        document.body.insertBefore(userInfo, appContent);

        appContent.style.display = 'block';
        logoutButton.style.display = 'block';
    }

    // Обработчик нажатия на кнопку выхода (если требуется)
    logoutButton.addEventListener('click', () => {
        Telegram.WebApp.close(); // Закрываем WebApp, если это необходимо
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('appContent');
    const logoutButton = document.getElementById('logoutButton');

    // Проверка, если Telegram Web App доступен
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        // Инициализируем Telegram Web App
        tg.ready();

        // Получаем информацию о пользователе из Telegram
    const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : undefined;

        if (user) {
            // Если информация о пользователе есть, показываем контент
            showAppContent(user);
        } else {
            alert('Ошибка авторизации через Telegram.');
        }
    } else {
        alert('Telegram Web App не поддерживается в этом браузере.');
    }

    // Функция для показа основного контента с данными о пользователе
    function showAppContent(user) {
        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info'); // Добавляем класс для стилизации

         userPhotoUrl = user.photo_url ? user.photo_url : 'default-profile.png'; // Если фото нет, используется изображение по умолчанию
        const userPhoto = `<img src="${userPhotoUrl}" alt="Profile Photo" class="profile-photo">`;

        // Имя пользователя и логин
        const userName = `<h2>${user.first_name}</h2>`;
        const userUsername = user.username ? `<p>@${user.username}</p>` : '';

        // Добавляем информацию в блок
        userInfo.innerHTML = `
            <div class="profile">
                ${userPhoto}
                ${userName}
                ${userUsername}
            </div>
        `;

        // Вставляем блок перед основным контентом
        document.body.insertBefore(userInfo, appContent);

        // Показываем основной контент
        appContent.style.display = 'block';
        logoutButton.style.display = 'block';
    }

    // Обработчик нажатия на кнопку выхода
    logoutButton.addEventListener('click', () => {
        Telegram.WebApp.close(); // Закрываем WebApp
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('appContent');
    const logoutButton = document.getElementById('logoutButton');

    // Проверка, если Telegram Web App доступен
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        // Инициализируем Telegram Web App
        tg.ready();

        // Получаем информацию о пользователе из Telegram
        const user = tg.initDataUnsafe ? tg.initDataUnsafe.user : undefined;

        function showAppContent(user) {
            if (user) {
                const userInfo = document.createElement('div');
                userInfo.innerHTML = `user: ${user.username}! <br> userId: ${user.user_id}`;
                userInfo.style.textAlign = 'center';

                // Добавляем userInfo в appContent
                appContent.appendChild(userInfo);

                appContent.style.display = 'block';
                logoutButton.style.display = 'block';
            } else {
                console.error('User information is not available.');
            }
        }

        showAppContent(user);

        // Обработчик нажатия на кнопку выхода (если требуется)
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                tg.close(); // Закрываем WebApp, если это необходимо
            });
        } else {
            console.error("Element with id 'logoutButton' not found.");
        }
    } else {
        console.error("Telegram Web App is not available.");
    }
});


let login = document.querySelecktor("#username");
let userauth = document.querySelecktor("#userId");
let sumbit = document.getElementById("userInfo");

let users = {};

 
 function user(usernsme, userId){
     this.name = username;
     this.idint = userId;
 }
 
 function createId(users) {
    retern Object.keys(users).length;
 }
 
 sumbit.addEventListener("oneclick",() => {
     const nameUser = name.value;
     const authkey = idint.value;
     
     const user = new user(nameUser, authkey);
     
     const userId = "user" + createId(users);
     
     users [userId] = user;
     console.log(users);
    
 });
const vtj = document.getEkemebtById("user");
const vtj = document.createElement("p");
vtj.innerText = "${users)";
document.body.appendChild(vtj);


