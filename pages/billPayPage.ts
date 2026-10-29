const { I } = inject();

interface PayeeDetails {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  account: string;
  amount: string;
}

class BillPayPage {
  locators = {
    billPayNav: 'a[href*="billpay.htm"]',
    payeeName: 'input[name="payee.name"]',
    addressStreet: 'input[name="payee.address.street"]',
    addressCity: 'input[name="payee.address.city"]',
    addressState: 'input[name="payee.address.state"]',
    addressZipCode: 'input[name="payee.address.zipCode"]',
    phoneNumber: 'input[name="payee.phoneNumber"]',
    accountNumber: 'input[name="payee.accountNumber"]',
    verifyAccount: 'input[name="verifyAccount"]',
    amount: 'input[name="amount"]',
    fromAccountId: 'select[name="fromAccountId"]',
    sendPaymentBtn: 'input[value="Send Payment"]',
    billPayResult: '#billpayResult'
  };

  navigate(): void {
    I.waitForVisible(this.locators.billPayNav, 5);
    I.click(this.locators.billPayNav);
    I.waitForVisible(this.locators.payeeName, 8);
  }

  submitBillPayment(details: PayeeDetails): void {
    I.fillField(this.locators.payeeName, details.name);
    I.fillField(this.locators.addressStreet, details.street);
    I.fillField(this.locators.addressCity, details.city);
    I.fillField(this.locators.addressState, details.state);
    I.fillField(this.locators.addressZipCode, details.zipCode);
    I.fillField(this.locators.phoneNumber, details.phone);
    I.fillField(this.locators.accountNumber, details.account);
    I.fillField(this.locators.verifyAccount, details.account);
    I.fillField(this.locators.amount, details.amount);
    I.click(this.locators.sendPaymentBtn);
  }

  verifyPaymentComplete(payeeName: string, amount: string): void {
    I.waitForVisible(this.locators.billPayResult, 8);
    I.see('Bill Payment Complete', `${this.locators.billPayResult} h1.title`);
    I.see(`Bill Payment to ${payeeName} in the amount of $${amount}.00`, this.locators.billPayResult);
    I.see('was successful', this.locators.billPayResult);
  }
}

export default new BillPayPage();
