import axios from 'axios';
import {API_URL, APP_ID} from '../config/authConfig';

export const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'app-id': APP_ID,
  },
});
