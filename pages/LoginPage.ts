import type { Locator, Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByPlaceholder(loginLocators.username);
    this.password = page.getByPlaceholder(loginLocators.password);
    this.loginButton = page.getByRole('button', { name: loginLocators.loginButton });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}