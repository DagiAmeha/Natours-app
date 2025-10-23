import axios from 'axios';
import { showAlert } from './alerts';

const hostName =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://natours-dag.onrender.com';
// type is either 'password' or 'data'
export const forgotPassword = async (email) => {
  try {
    const url = `${hostName}/api/v1/users/forgotPassword`;

    const res = await axios({
      method: 'POST',
      url,
      data: {
        email,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', `Email sent successfully!`);
      //   window.setTimeout(() => {
      //     location.reload(true);
      //   }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};
// type is either 'password' or 'data'
export const passwordReset = async (password, passwordConfirm) => {
  const token = window.location.pathname.split('/').pop();
  console.log(token);

  try {
    const url = `${hostName}/api/v1/users/resetPassword/${token}`;

    const res = await axios({
      method: 'POST',
      url,
      data: {
        password,
        passwordConfirm,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', `Password updated successfully!`);
      window.setTimeout(() => {
        location.assign(`${hostName}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};
