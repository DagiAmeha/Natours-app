import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  console.log(process.env.NODE_ENV);
  const hostName =
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000'
      : 'https://natours-dag.onrender.com';
  try {
    const url =
      type === 'password'
        ? `${hostName}/api/v1/users/updateMyPassword`
        : `${hostName}/api/v1/users/updateMe`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()}  updated successfully!`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
  }
};
