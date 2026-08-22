import 'dotenv/config';

export const environment = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
  username: process.env.SAUCEDEMO_USERNAME ?? '',
  password: process.env.SAUCEDEMO_PASSWORD ?? '',
} as const;