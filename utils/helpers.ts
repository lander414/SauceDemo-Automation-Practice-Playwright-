import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from './testData';

export async function login(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(credentials.username, credentials.password);
}