import dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_TYPE: process.env.DATABASE_TYPE || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_PORT: process.env.DATABASE_PORT || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.SERVER_PORT || 5000,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  AUTH_TOKEN_TTL: process.env.AUTH_TOKEN_TTL || '1h',
  API_SECRET: process.env.API_SECRET,
};
