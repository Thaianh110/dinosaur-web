import axios from '../axios';

export const apiRegister = (data) =>
  axios({
    url: '/user/register',
    method: 'post',
    data
  });
export const apiFinalRegister = (token) =>
  axios({
    url: '/user/finalregister/' + token,
    method: 'put'
  });
export const apiLogin = (data) =>
  axios({
    url: '/user/login',
    method: 'post',
    data
  });
export const apiForgotPassword = (data) =>
  axios({
    url: '/user/forgotpassword',
    method: 'post',
    data
  });
export const apiResetPassword = (data) =>
  axios({
    url: '/user/resetpassword',
    method: 'put',
    data
  });
export const apiGetCurrent = (data) =>
  axios({
    url: '/user/current',
    method: 'get',
    data
  });
export const apiLogout = (data) =>
  axios({
    url: '/user/logout',
    method: 'get',
    data
  });
export const apiGetAllUser = (params) =>
  axios({
    url: '/user/',
    method: 'get',
    params
  });
export const apiUpdateUserByAdmin = (data, uid) =>
  axios({
    url: '/user/' + uid,
    method: 'put',
    data
  });
export const apiDeleteUserByAdmin = (uid) =>
  axios({
    url: '/user/' + uid,
    method: 'delete'
  });
export const apiUpdateUser = (data) =>
  axios({
    url: '/user/current/',
    method: 'put',
    data
  });
  export const apiAddProductInCart = (data) =>
    axios({
      url: '/user/cart',
      method: 'put',
      data
    });
    export const apiRemoveProductInCart = (pid,color) =>
      axios({
        url: `/user/remove-cart/${pid}/${color}`,
        method: 'delete',
      });
  