const { I } = inject();

class AccountOverviewPage {
  locators = {
    overviewLink: 'a[href*="overview.htm"]',
    accountTable: '#accountTable',
    accountTableRows: '#accountTable tbody tr td a'
  };

  navigate(): void {
    I.waitForVisible(this.locators.overviewLink, 5);
    I.click(this.locators.overviewLink);
    I.waitForVisible(this.locators.accountTableRows, 8);
  }

  async getFirstAvailableAccountId(): Promise<string> {
    this.navigate();
    const accountId = await I.grabTextFrom('#accountTable tbody tr:first-child td a');
    return accountId.trim();
  }

  async getBalanceForAccount(accountNumber: string): Promise<number> {
    this.navigate();
    const balanceText = await I.grabTextFrom(`//tr[td[a[text()='${accountNumber}']]]/td[2]`);
    return parseFloat(balanceText.replace(/[$,]/g, ''));
  }
}

export default new AccountOverviewPage();
