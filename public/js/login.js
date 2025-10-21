/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const hostName =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000'
    : 'https://natours-dag.onrender.com';

export const signup = async (name, email, password, passwordConfirm) => {
  console.log(process.env.NODE_ENV);

  try {
    const res = await axios({
      method: 'POST',
      url: `${hostName}/api/v1/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Signup successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${hostName}/api/v1/users/login`,
      data: {
        email,
        password,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${hostName}/api/v1/users/logout`,
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
