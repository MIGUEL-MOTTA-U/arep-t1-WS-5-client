// src/config/environment.js

const config = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
  ENV: process.env.REACT_APP_ENV || 'development',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  ENABLE_API_LOGGING: process.env.REACT_APP_ENABLE_API_LOGGING === 'true' || process.env.NODE_ENV === 'development',
  DEV_SERVER_PORT: process.env.PORT || '3000',
  DEV_SERVER_HOST: process.env.HOST || 'localhost',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export const validateConfig = () => {
  const requiredVars = ['API_BASE_URL'];
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (!config[varName]) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  if (config.isDevelopment) {
    console.log('🔧 Environment Configuration:', {
      API_BASE_URL: config.API_BASE_URL,
      ENV: config.ENV,
      API_TIMEOUT: config.API_TIMEOUT,
      ENABLE_API_LOGGING: config.ENABLE_API_LOGGING,
      DEV_SERVER_PORT: config.DEV_SERVER_PORT,
      DEV_SERVER_HOST: config.DEV_SERVER_HOST
    });
  }
};

export default config;