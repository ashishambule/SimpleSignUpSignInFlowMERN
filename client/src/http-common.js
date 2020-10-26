import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001/users',
  headers: {
    'Content-type': 'application/json',
  },
});
