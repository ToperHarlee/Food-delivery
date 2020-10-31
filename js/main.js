'use strict';
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min';

//слайдер
//при выходе на основной сайт с пагинацией и другими настройками слайдер ломается
//настройки после перехода не передаются
const swiper = new Swiper('.swiper-container', {
    sliderPerView: 1,
    loop: true,
    autoplay: true,
    effect: 'coverflow'
});

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
    cards = document.querySelector('.cards'),
    sectionHeading = document.querySelector('.section-heading'),
    restaurantTitle = document.querySelector('.restaurant-title'),
    restaurantRating = document.querySelector('.rating'),
    restaurantPrice = document.querySelector('.price'),
    restaurantCategory = document.querySelector('.category'),
    inputSearch = document.querySelector('.input-search');

const modalBody = document.querySelector('.modal-body'),
    modalPriceTag = document.querySelector('.modal-pricetag'),
    btnClearCart = document.querySelector('.clear-cart'),
    inputAddress = document.querySelector('.input-address');

let login = localStorage.getItem('foodDelivery');

const cart = JSON.parse(localStorage.getItem(`foodDelivery_${login}`)) || [];

function saveCart() {
    localStorage.setItem(`foodDelivery_${login}`, JSON.stringify(cart));
}

function downLoadCard() {
    if (localStorage.setItem(`foodDelivery_${login}`)) {
        const data = JSON.parse(localStorage.setItem(`foodDelivery_${login}`));
        cart.push(...data);
        /*data.forEach(function (item) {
            cart.push(item);
        });*/
    }
}

const getData = async function (url) {
    const response = await fetch(url);

    if (!response.ok){
        throw new Error(`Ошибка по адресу ${url}, 
        статус ошибки ${response.status}!`);
    }
    return await response.json();
};


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
    if (modalAuth.classList.contains('is-open')) {
        disableScroll();
    } else {
        enableScroll();
    }
}

function clearForm() {
    loginForm.reset();
}

function returnMain () {
    containerPromo.classList.remove('hide');
    swiper.init();
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
}

function autorized() {

    function logOut() {
        login = null;
        cart.length = 0;
        localStorage.removeItem('foodDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        cartButton.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
        returnMain();
    }

    console.log('Авторизован');
    buttonAuth.style.display = 'none';
    userName.textContent = login;
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    //day4
    cartButton.style.display = 'flex';
    buttonOut.addEventListener('click', logOut);
}

function notAutorized() {
    console.log('не Авторизован');

    function LogIn(event) {
        event.preventDefault();

        if (validName(loginInput.value || passwordInput.value)) {
            console.log('Логин');
            login = loginInput.value;
            localStorage.setItem('foodDelivery', login);
            toggleModalAuth();
            downLoadCard();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            loginForm.removeEventListener('submit', LogIn);
            loginForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = 'Red';
            passwordInput.style.borderColor = 'Red';
            loginInput.value = '';
            passwordInput.value = '';
        }
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', LogIn);
    modalAuth.addEventListener('click', function (event) {
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth();
        }
    });
}

let div = document.createElement('div');
div.classList.add('block-alert');
//ДЗ.
let blockBtn = () => {
    loginInput.style.borderColor = 'Red';
    passwordInput.style.borderColor = 'Red';
    buttonLogin.setAttribute("disabled", "true");
    div.textContent = 'Заполните все поля';
    loginForm.append(div);
}

let unBlockBtn = () => {
    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
    buttonLogin.removeAttribute("disabled");
    div.style.display = 'none';
}

function checkAuth() {
    if (login) {
        autorized();
    } else {
        notAutorized();
        buttonLogin.addEventListener('click', () => {
            if (loginInput.value === '' || passwordInput.value === '') {
                blockBtn();
            }
        });
        loginInput.addEventListener('input', () => unBlockBtn());
        passwordInput.addEventListener('input', () => unBlockBtn());
        buttonAuth.addEventListener('click', clearForm);
        //cards.addEventListener('click', () => {
        //    if (login) {
        //       openGoods;
        //    } else {toggleModalAuth();}
        // );
    }
}

//day-2
function createCardRestaurants({ image, kitchen, price, stars, name, products, time_of_delivery: timeOfDelivery }) {
    //console.log(restaurant);

    const cardRestaurantsHeading = document.createElement('a');
    cardRestaurantsHeading.className = 'card card-restaurant';
    cardRestaurantsHeading.products = products;
    cardRestaurantsHeading.info = { kitchen, price, stars, name };

    const card = `
            <img src="${image}" alt="image" class="card-image"/>
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${timeOfDelivery}</span>
              </div>
              <!-- /.card-heading -->
              <div class="card-info">
                 <div class="rating">
                 ${stars}
                 </div>
                 <div class="price">от ${price}</div>
                <div class="category">${kitchen}</div>
               </div>
              <!-- /.card-info -->
             </div>
             <!-- /.card-text -->                             
  `;
    cardRestaurantsHeading.insertAdjacentHTML('beforeend', card);
    cardsRestaurants.insertAdjacentElement('beforeend', cardRestaurantsHeading);
}

function createCardGoods({ description, id, image, name, price}) {
    //console.log(goods);

    const card = document.createElement('div');
    card.className = 'card';
    //card.id = id;
    card.insertAdjacentHTML('beforeend', `
            <img src="${image}" alt=${name} class="card-image"/>
            <div class="card-text">
            <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
            <div class="ingredients">${description}
             </div>
            </div>
            <div class="card-buttons">
                  <button class="button button-primary button-add-cart" id="${id}">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                  </button>
                <strong class="card-price card-price-bold">${price} ₽</strong>
              </div>
            </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;
    //если login есть - значит есть регистрация
    if (login) {
        const restaurant = target.closest('.card-restaurant');

        if (restaurant) {
            //console.log(restaurant.dataset.products);
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            swiper.destroy(false);
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            const { name, kitchen, price, stars } = restaurant.info;

            restaurantTitle.textContent = name;
            restaurantRating.textContent = stars;
            restaurantPrice.textContent = `от ${price}₽`;
            restaurantCategory.textContent = kitchen;

            getData(`./db/${restaurant.products}`)
                .then(function (data) {
                    // console.log(data);
                    data.forEach(createCardGoods);
                });
        }
    } else {
        toggleModalAuth();
    }
}

function addToCart (event) {
    const target = event.target;
    //console.log(event.target);
    const buttonAddToCart = target.closest('.button-add-cart');
    if(buttonAddToCart){
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(function (item) {
            return item.id === id;
        });

        if (food){
            food.count++;
        } else {
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }
        saveCart();
    }
}

function renderCard () {
    modalBody.textContent = '';

    cart.forEach(function ({id, title, cost, count}) {
        const itemCart = `
        <div class="food-row">
          <span class="food-name">${title}</span>
          <strong class="food-price">${cost}</strong>
        <div class="food-counter">
           <button class="counter-button counter-minus" data-id=${id}>-</button>
           <span class="counter">${count}</span>
           <button class="counter-button counter-plus" data-id=${id}>+</button>
         </div>
        </div>
        `;
        modalBody.insertAdjacentHTML('afterbegin', itemCart);
    });

    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost) * item.count);
    }, 0);

    modalPriceTag.textContent = totalPrice + ' ₽';
    saveCart();
}

function changeCount (event) {
    const target = event.target;

    if (target.classList.contains('counter-button')) {
        const food = cart.find(function (item) {
            return item.id === target.dataset.id;
        });
        if (target.classList.contains('counter-minus')){
            food.count--;
            if (food.count === 0){
                //удаляем элемент из массива чтобы в минус не уйти(т.е удалит последный оставшийся элемент найденный по id -- indexOf)
                cart.splice(cart.indexOf(food), 1);
            }
        }
        if (target.classList.contains('counter-plus')){
            food.count++;
        }
    }
    renderCard();
}

function search() {
    //console.log(/^[\w ]$/.test(event.key))
    const value = event.target.value.trim();

    if (!value && event.charCode === 13) {
        event.target.style.backgroundColor = 'red';
        event.target.value = '';
        setTimeout(function () {
            event.target.style.backgroundColor = '';
        }, 1500);
        return;
    }
    //живой поиск
    if (!/^[А-Яа-яЁё ]$/.test(event.key)) return;
    if (value.length < 3) return;

    getData('./db/partners.json')
        .then(function (data) {
            return data.map(function (partner) {
                return partner.products;
            });
        })
        .then(function (linkProducts) {
            cardsMenu.textContent = '';
            linkProducts.forEach(function (link) {
                getData(`./db/${link}`)
                    .then(function (data) {

                        const resultSearch = data.filter(function (item) {
                            const name = item.name.toLowerCase()
                            return name.includes(value.toLowerCase());
                        })

                        containerPromo.classList.add('hide');
                        swiper.destroy(false);
                        restaurants.classList.add('hide');
                        menu.classList.remove('hide');

                        restaurantTitle.textContent = 'Результат поиска';
                        restaurantCategory.textContent = '';
                        restaurantPrice.textContent = '';
                        restaurantRating.textContent = '';
                        resultSearch.forEach(createCardGoods)
                    })
            });
        })
}

function init () {
    getData('./db/partners.json')
        .then(function (data) {
            // console.log(data);
            data.forEach(createCardRestaurants)
        });

    btnClearCart.addEventListener('click', function (){
        cart.length = 0;
        renderCard();
        toggleModal();

    });

    modalBody.addEventListener('click', changeCount);

    cardsRestaurants.addEventListener('click', openGoods);

    logo.addEventListener('click', () => {
        containerPromo.classList.remove('hide');
        swiper.init();
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    });

    cartButton.addEventListener("click", function () {
        renderCard();
        toggleModal();
    });

    cardsMenu.addEventListener('click', addToCart);

    close.addEventListener("click", toggleModal);

    checkAuth();

    inputSearch.addEventListener('keypress', function (event) {
        search();
    });
    inputAddress.addEventListener('keypress', function (event) {
        search();
    });
// createCardRestaurants();
// createCardRestaurants();
// createCardRestaurants();
}

init();




//пример асинхронной функции
/*function sleep(ms){
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    })
}

(async function (param) {
    console.log('Start' + new Date().toLocaleTimeString())
    await sleep(5000);
    console.log('End' + new Date().toLocaleTimeString())
})();*/


