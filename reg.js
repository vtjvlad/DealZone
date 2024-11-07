


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

