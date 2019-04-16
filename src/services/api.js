import axios from 'axios';

const api = axios.create({
  baseURL: 'https://luris.herokuapp.com',
});

export default api;
