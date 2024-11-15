import axios from 'axios';

export const PrivateAxiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});
