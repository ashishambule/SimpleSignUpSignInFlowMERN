import http from '../http-common';
const register = (data) => {
  return http.post('/add-user', JSON.stringify(data));
};
const login = (data) => {
  return http.post('/login', JSON.stringify(data));
};

export default {
  register,
  login,
};
