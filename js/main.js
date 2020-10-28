const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day-1

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

let login = localStorage.getItem('foodDelivery');

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
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
  document.querySelector('.block-alert').remove();
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
    if (loginInput.value === '' || passwordInput.value === ''){
      blockBtn();
    }
    loginInput.addEventListener('change', () => {
      unBlockBtn();
    });
    passwordInput.addEventListener('change', () => {
      unBlockBtn();
    });
  }
}
checkAuth();



