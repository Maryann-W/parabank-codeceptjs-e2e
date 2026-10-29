const { I } = inject();

class OpenAccountPage {
  locators = {
    openAccountNav: 'a[href*="openaccount.htm"]',
    accountTypeSelect: '#type',
    fromAccountSelect: '#fromAccountId',
    submitButton: 'input[value="Open New Account"]',
    successTitle: '#openAccountResult h1.title',
    newAccountIdLink: '#newAccountId'
  };

  navigate(): void {
    I.waitForVisible(this.locators.openAccountNav, 5);
    I.click(this.locators.openAccountNav);
    I.waitForVisible(this.locators.accountTypeSelect, 8);
    I.wait(1); // Allow dynamic funding accounts to populate
  }

  createNewAccount(type: 'CHECKING' | 'SAVINGS'): void {
    I.selectOption(this.locators.accountTypeSelect, type === 'CHECKING' ? '0' : '1');
    I.click(this.locators.submitButton);
  }

  async grabNewAccountId(): Promise<string> {
    I.waitForVisible(this.locators.newAccountIdLink, 5);
    I.see('Account Opened!', this.locators.successTitle);
    const newId = await I.grabTextFrom(this.locators.newAccountIdLink);
    return newId.trim();
  }
}

export default new OpenAccountPage();
