const { I } = inject();

class LoginPage {
  locators = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'input[value="Log In"]',
    errorMessage: '#rightPanel p.error',
    logoutLink: 'a[href*="logout.htm"]'
  };

  visit(): void {
    I.amOnPage('/index.htm');
  }

  login(username: string, password: string): void {
    I.waitForVisible(this.locators.usernameInput, 5);
    I.fillField(this.locators.usernameInput, username);
    I.fillField(this.locators.passwordInput, password);
    I.click(this.locators.loginButton);
  }

  logout(): void {
    I.waitForVisible(this.locators.logoutLink, 5);
    I.click(this.locators.logoutLink);
  }
}

export default new LoginPage();
