import axios from 'axios';
import config, { validateConfig } from '../config/environment';

validateConfig();

const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (requestConfig) => {
    if (config.ENABLE_API_LOGGING) {
      console.log('🚀 API Request:', requestConfig.method.toUpperCase(), requestConfig.url, requestConfig.data);
    }
    return requestConfig;
  },
  (error) => {
    if (config.ENABLE_API_LOGGING) {
      console.error('❌ API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (config.ENABLE_API_LOGGING) {
      console.log('✅ API Response:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    if (config.ENABLE_API_LOGGING) {
      console.error('❌ API Error:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;