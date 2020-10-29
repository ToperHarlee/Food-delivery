'use strict';
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

//day-1
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth'),
    modalAuth = document.querySelector('.modal-auth'),
    closeAuth = document.querySelector('.close-auth'),
    loginForm = document.querySelector('#logInForm'),
    loginInput = document.querySelector('#login'),
    passwordInput = document.querySelector('#password'),
    userName = document.querySelector('.user-name'),
    buttonOut = document.querySelector('.button-out'),
    buttonLogin = document.querySelector('.button-login'),
    modalFooter = document.querySelector('.modal-footer');

const cardsRestaurants = document.querySelector('.cards-restaurants'),
    containerPromo = document.querySelector('.container-promo'),
    restaurants = document.querySelector('.restaurants'),
    menu = document.querySelector('.menu'),
    logo = document.querySelector('.logo'),
    cardsMenu = document.querySelector('.cards-menu'),
    cards = document.querySelector('.cards');

let login = localStorage.getItem('foodDelivery');

function validName(str) {
    //^-начало $-конец выражения
    const regName = /^[a-zA-Z0-9-_\.]{1,20}$/;
    return regName.test(str);
}

//console.log(validName('Mike'));

function toggleModal() {
    modal.classList.toggle("is-open");
}

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    if (modalAuth.classList.contains('is-open')){
        disableScroll();
    } else {
        enableScroll();
    }
}

function clearForm() {
    loginForm.reset();
}

function autorized() {

    function logOut() {
        login = null;

        localStorage.removeItem('foodDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';

        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    console.log('Авторизован');
    buttonAuth.style.display = 'none';
    userName.textContent = login;
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';

    buttonOut.addEventListener('click', logOut);
}

function notAutorized() {
    console.log('не Авторизован');

    function LogIn (event) {
        event.preventDefault();

        console.log('Логин');
        login = loginInput.value;
        localStorage.setItem('foodDelivery', login);
        toggleModalAuth();

        buttonAuth.removeEventListener('click',toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        loginForm.removeEventListener('submit', LogIn);
        loginForm.reset();
        checkAuth();
    }

    buttonAuth.addEventListener('click',toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', LogIn);
    modalAuth.addEventListener('click', function (event) {
        if (event.target.classList.contains('is-open')){
            toggleModalAuth();
        }
    });
}

//ДЗ.
let blockBtn = () => {
    loginInput.style.borderColor = 'Red';
    passwordInput.style.borderColor = 'Red';
    buttonLogin.setAttribute("disabled", "true");
    let div = document.createElement('div');
    div.classList.add('block-alert');
    div.textContent = 'Заполните все поля';
    loginForm.append(div);
}

let unBlockBtn = () => {
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    buttonLogin.removeAttribute("disabled");
    let divRemove = document.querySelector('.block-alert');
    divRemove.style.display = 'none';
}

function checkAuth() {
    if (login) {
        autorized();
    } else {
        notAutorized();
        buttonLogin.addEventListener('click', () => {
            if (validName(loginInput.value === '' || passwordInput.value === '')){
                blockBtn();
            }
        });
        loginInput.addEventListener('input', unBlockBtn);
        passwordInput.addEventListener('input', unBlockBtn);
        buttonAuth.addEventListener('click', clearForm);
        //cards.addEventListener('click', toggleModalAuth);
    }
}

//day-2
function createCardRestaurants () {
    const card = `
    <a  class="card card-restaurant">
\t\t\t\t\t\t<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title">Тануки</h3>
\t\t\t\t\t\t\t\t<span class="card-tag tag">60 мин</span>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<!-- /.card-heading -->
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="rating">
\t\t\t\t\t\t\t\t\t4.5
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div class="price">От 1 200 ₽</div>
\t\t\t\t\t\t\t\t<div class="category">Суши, роллы</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<!-- /.card-info -->
\t\t\t\t\t\t</div>
\t\t\t\t\t\t<!-- /.card-text -->
\t\t\t\t\t</a>                             
  `;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGoods () {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend',  `
\t\t\t\t\t\t<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title card-title-reg">Пицца Классика</h3>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
\t\t\t\t\t\t\t\t\tгрибы.
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-buttons">
\t\t\t\t\t\t\t\t<button class="button button-primary button-add-cart">
\t\t\t\t\t\t\t\t\t<span class="button-card-text">В корзину</span>
\t\t\t\t\t\t\t\t\t<span class="button-cart-svg"></span>
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t\t<strong class="card-price-bold">510 ₽</strong>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
    `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods (event) {
    const target = event.target;
    //если login есть - значит есть регистрация
    if(login){
        const restaurant = target.closest('.card-restaurant');

        if (restaurant){
            cardsMenu.textContent = '';

            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            createCardGoods();
            createCardGoods();
            createCardGoods();
        }
    } else {
        toggleModalAuth();
    }
}

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

checkAuth();

createCardRestaurants();
createCardRestaurants();
createCardRestaurants();

//слайдер
new Swiper('.swiper-container', {
    sliderPerView: 1,
    loop: true,
    autoplay: true,
    grabCursor: true,
    effect: 'cube',
    cubeEffect: {
        shadow: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

});