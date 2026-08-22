import { environment } from '../config/env';

export const credentials = {
  username: environment.username,
  password: environment.password,
} as const;

export const checkoutData = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '2009',
} as const;