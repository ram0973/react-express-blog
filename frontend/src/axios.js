import axios from 'frontend/src/axios';

const instance = axios.create({
  baseUrl: 'http://localhost:4444'
});

export default instance;