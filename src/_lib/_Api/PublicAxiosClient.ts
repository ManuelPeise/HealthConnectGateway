import axios from 'axios';

export const PublicAxiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
});
