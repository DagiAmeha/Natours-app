/* eslint-disable */
import '@babel/polyfill';
import { signup, login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const mapBox = document.getElementById('map');
const signUpForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const hamburgerMenu = document.querySelector('.hamburger-icon');
const overlay = document.querySelector('.blur-overlay');

if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  displayMap(locations);
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submitted');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    logout();
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.querySelector('.form__upload').files[0]);

    console.log(form);
    updateSettings(form, 'data');
  });
}
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    console.log('clicked');
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', (e) => {
    console.log('Hamburger menu clicked');
    const nav = document.querySelector('.user-view__menu');
    nav?.classList.toggle('user-view__menu--active');
    overlay.classList.toggle('blur-overlay--active');
  });
}

if (overlay) {
  overlay.addEventListener('click', (e) => {
    console.log('Overlay clicked');
    nav.classList.remove('user-view__menu--active');
    overlay.classList.remove('blur-overlay--active');
  });
}

window.addEventListener('pageshow', () => {
  const nav = document.querySelector('.user-view__menu');
  const overlay = document.querySelector('.blur-overlay');

  if (nav) nav.classList.remove('user-view__menu--active');
  if (overlay) overlay.classList.remove('blur-overlay--active');
});
