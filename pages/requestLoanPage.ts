const { I } = inject();

class RequestLoanPage {
  locators = {
    loanNav: 'a[href*="requestloan.htm"]',
    loanAmountInput: '#amount',
    downPaymentInput: '#downPayment',
    fromAccountSelect: '#fromAccountId',
    applyButton: 'input[value="Apply Now"]',
    loanStatus: '#loanStatus',
    loanResponseResult: '#requestLoanResult'
  };

  navigate(): void {
    I.waitForVisible(this.locators.loanNav, 5);
    I.click(this.locators.loanNav);
    I.waitForVisible(this.locators.loanAmountInput, 8);
    I.wait(1);
  }

  applyForLoan(amount: string, downPayment: string): void {
    I.fillField(this.locators.loanAmountInput, amount);
    I.fillField(this.locators.downPaymentInput, downPayment);
    I.click(this.locators.applyButton);
  }

  verifyLoanDecision(expectedStatus: 'Approved' | 'Denied'): void {
    I.waitForVisible(this.locators.loanStatus, 8);
    I.see(expectedStatus, this.locators.loanStatus);
  }
}

export default new RequestLoanPage();
