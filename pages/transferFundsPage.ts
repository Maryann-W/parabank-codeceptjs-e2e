const { I } = inject();

class TransferFundsPage {
  locators = {
    transferNav: 'a[href*="transfer.htm"]',
    amountInput: '#amount',
    fromAccountSelect: '#fromAccountId',
    toAccountSelect: '#toAccountId',
    submitTransferButton: 'input[value="Transfer"]',
    confirmationHeader: '#showResult h1.title',
    confirmationMessage: '#showResult p'
  };

  navigate(): void {
    I.waitForVisible(this.locators.transferNav, 5);
    I.click(this.locators.transferNav);
    I.waitForVisible(this.locators.amountInput, 8);
    I.wait(1);
  }

  executeTransfer(amount: string, fromAccount: string, toAccount: string): void {
    I.fillField(this.locators.amountInput, amount);
    I.selectOption(this.locators.fromAccountSelect, fromAccount);
    I.selectOption(this.locators.toAccountSelect, toAccount);
    I.click(this.locators.submitTransferButton);
  }

  verifyTransferSuccess(amount: string, fromAccount: string, toAccount: string): void {
    I.waitForVisible(this.locators.confirmationHeader, 5);
    I.see('Transfer Complete!', this.locators.confirmationHeader);
    I.see(`$${amount}.00 has been transferred from account #${fromAccount} to account #${toAccount}`, this.locators.confirmationMessage);
  }
}

export default new TransferFundsPage();
