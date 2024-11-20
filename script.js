const products = [{
    id: 1,
    name: "Продукт 1",
    price: 257,
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
        price: 300,
        description: "Идеальный выбор для ценителей стиля.",
        image: "sery.jpeg"
    },
    {
        id: 4,
        name: "Продукт 4",
        price: 3500,
        description: "Идеальный выбор для ценителей стиля.",
        image: "sery.jpeg"
    },
];



function toggleFlip(event) {
    if (!event.target.classList.contains('add-to-cart') && event.target.tagName !== 'IMG') {
        event.currentTarget.classList.toggle('flipped');
    }
}

/* const burgerButton = document.getElementById('burgerButton');
const menu = document.getElementById('menu');
burgerButton.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'flex' ? 'none': 'flex';
});

document.getElementById('burgerButton').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
    this.classList.toggle('active'); // Добавляем анимацию для кнопки
}); */

const burgerButton = document.getElementById('burgerButton');
const menu = document.getElementById('menu');

// Переключение бургер-меню
burgerButton.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
        // Закрытие меню
        menu.style.maxHeight = '0';
        menu.style.padding = '0';
        setTimeout(() => {
            menu.classList.remove('active'); // Убираем класс после завершения анимации
            menu.style.maxHeight = '700px'; // Сбрасываем инлайновый стиль
            menu.style.padding = '';
        }, 300); // Учитываем длительность анимации
    } else {
        // Открытие меню
        menu.classList.add('active');
        menu.style.maxHeight = menu.scrollHeight + 'px'; // Автоматическая высота
        menu.style.padding = '10px'; // Добавляем отступы
    }
    burgerButton.classList.toggle('active'); // Поворот кнопки
});

// Закрытие меню при выборе элемента
menu.querySelectorAll('a').forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        menu.style.maxHeight = '0';
        menu.style.padding = '0';
        setTimeout(() => {
            menu.classList.remove('active'); // Убираем класс после завершения анимации
            menu.style.maxHeight = '700px'; // Сбрасываем инлайновый стиль
            menu.style.padding = '';
        }, 300); // Учитываем длительность анимации
        burgerButton.classList.remove('active'); // Возвращаем кнопку в исходное состояние
    });
});


function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach((section) => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    const navbar = document.querySelector('.navbar');
    if (sectionId === 'catalog') {
        navbar.style.display = 'flex';
    } else {
        navbar.style.display = 'none';
    }
    const navbarbot = document.querySelector('.navbarbot');
    const sectionsWithNavbar = ['user',
        'catalog',
        'cart',
        'payment',
        'delivery',
        'home']; // вкладки, где отображается нижний бар

    if (sectionsWithNavbar.includes(sectionId)) {
        navbarbot.style.display = 'flex';
    } else {
        navbarbot.style.display = 'none';
    }
}


let cart = [];

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
        cart.push({
            name, price, quantity: 1
        });
    }

    updateCartDisplay();
    updateCartCount();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartSection = document.getElementById('cart');
    const cartList = cartSection.querySelector('.cart-items');

    // Очистка текущего отображения
    cartList.innerHTML = '';

    let totalAmount = 0; // Общая сумма товаров

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <p>${item.name}</p>
        <p>Цена: ${item.price} руб.</p>
        <p>Количество: ${item.quantity}</p>
        <button class="remove-from-cart" onclick="removeFromCart('${item.name}')">Удалить</button>
        `;

        cartList.appendChild(cartItem);

        // Увеличиваем общую сумму на цену текущего товара с учетом его количества
        totalAmount += item.price * item.quantity;
    });

    // Отображаем общую сумму и кнопку для оплаты, если корзина не пуста
    if (cart.length > 0) {
        const totalAmountDisplay = document.createElement('div');
        totalAmountDisplay.classList.add('total-amount');
        totalAmountDisplay.innerText = `Сумма к оплате: ${totalAmount} грн.`;

        const checkoutButton = document.createElement('button');
        checkoutButton.classList.add('checkout-button');
        checkoutButton.innerText = 'Оплатить';
        checkoutButton.onclick = () => {
            // Здесь можно вызвать функцию для обработки оплаты
            const isUserReady = confirm('Перейти к оплате');

            showOrderForm();
        };

        cartList.appendChild(totalAmountDisplay);
        cartList.appendChild(checkoutButton);
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function displayProducts() {
    const catalogSection = document.querySelector("#catalog .products");
    catalogSection.innerHTML = "";

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

// Вызов функции при загрузке страницы
displayProducts();

// Функция для показа формы оформления заказа
function showOrderForm() {
    const orderForm = document.getElementById('order-form');
    orderForm.style.display = 'block';
}

// Добавление обработчика для кнопки "Оплатить"
function addCheckoutButtonListener() {
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            showOrderForm(); // Показываем форму оформления заказа
        });
    }
}

// Функция для обработки отправки формы
document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Здесь можно выполнить действия для отправки заказа на сервер
    console.log("Заказ оформлен:", {
        name, phone, email, address, paymentMethod,
    });
    alert("Ваш заказ успешно оформлен!");

    // Очистка корзины и скрытие формы
    cart = [];
    updateCartDisplay();
    document.getElementById('order-form').style.display = 'none';
});

// Вызов функции для добавления обработчика после обновления корзины
updateCartDisplay();
addCheckoutButtonListener();

document.querySelector('.burger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
});

const toggleNavbarButton = document.getElementById('toggleNavbar');
const navbar = document.querySelector('.navbar');

toggleNavbarButton.addEventListener('click', () => {
    navbar.classList.toggle('hidden');

    // Обновляем текст кнопки в зависимости от состояния
    toggleNavbarButton.innerText = navbar.classList.contains('hidden')
    ? 'Показать навигацию': 'Скрыть навигацию';
});

/*

const categories = {
    category1: [
        {
            id: 1,
            name: "Товар 1",
            price: 100,
            description: "Описание товара 1",
            image: "img/product1.jpg"
        },
        {
            id: 2,
            name: "Товар 2",
            price: 200,
            description: "Описание товара 2",
            image: "img/product2.jpg"
        }
    ],
    category2: [
        {
            id: 3,
            name: "Товар 3",
            price: 300,
            description: "Описание товара 3",
            image: "img/product3.jpg"
        },
        {
            id: 4,
            name: "Товар 4",
            price: 400,
            description: "Описание товара 4",
            image: "img/product4.jpg"
        }
    ]
};
*/
function toggleCategory(header, categoryId) {
    const categoryCard = header.parentElement; // Родительский элемент (карточка категории)
    const categoryContent = document.getElementById(categoryId);
    const background = categoryCard.getAttribute('data-bg'); // Получаем фон категории



    if (categoryCard.classList.contains('expanded')) {
        // Закрываем категорию
        categoryCard.classList.remove('expanded');
    } else {
        // Закрываем другие категории
        document.querySelectorAll('.category-card').forEach(card => card.classList.remove('expanded'));

        // Открываем текущую категорию
        categoryCard.classList.add('expanded');

        // Устанавливаем фон для контента и шапки
        header.style.backgroundImage = `url(${background})`;
        if (categoryContent) {
            categoryContent.style.backgroundImage = `url(${background})`;
        }

        // Загружаем товары, если они ещё не были загружены
        if (categoryContent && categoryContent.innerHTML.trim() === "") {
            renderCategoryProducts(categoryId, categoryContent);
        }
    }
}

function renderCategoryProducts(categoryId, container) {
    container.innerHTML = ""; // Очищаем контейнер
    categories[categoryId].forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">${product.price} руб.</span>
        `;
        container.appendChild(productCard);
    });
}