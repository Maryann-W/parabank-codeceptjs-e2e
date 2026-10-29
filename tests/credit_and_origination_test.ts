Feature('Origination, Payments & Credit Risk Evaluation');

Before(({ loginPage }) => {
  loginPage.visit();
  loginPage.login('john', 'demo');
});

Scenario('Account Origination: Open new savings account and verify ledger reflection', async ({ I, openAccountPage, accountOverviewPage }) => {
  openAccountPage.navigate();
  openAccountPage.createNewAccount('SAVINGS');

  const newAccountId = await openAccountPage.grabNewAccountId();

  // Navigate to overview and wait for the ledger to hydrate with the new account ID
  accountOverviewPage.navigate();
  I.waitForText(newAccountId, 8, accountOverviewPage.locators.accountTable);
});

Scenario('Bill Payment: Execute external creditor payment transaction', ({ billPayPage }) => {
  billPayPage.navigate();
  billPayPage.submitBillPayment({
    name: 'Nairobi Power & Lighting',
    street: 'Harambee Avenue',
    city: 'Nairobi',
    state: 'Nairobi',
    zipCode: '00100',
    phone: '0700123456',
    account: '998877',
    amount: '45'
  });

  billPayPage.verifyPaymentComplete('Nairobi Power & Lighting', '45');
});

Scenario('Credit Risk Workflow: Evaluate loan origination with valid down payment ratio', ({ requestLoanPage }) => {
  requestLoanPage.navigate();
  // Request $1,000 with a $200 down payment (qualifying ratio)
  requestLoanPage.applyForLoan('1000', '200');
  requestLoanPage.verifyLoanDecision('Approved');
});

Scenario('Network Latency Resilience: Verify UI stability under degraded core network latency', async ({ I, billPayPage }) => {
  billPayPage.navigate();

  // Inject 2.5 second artificial latency to simulate core switch lag
  await I.usePlaywrightTo('simulate network latency on payment gateway', async ({ page }) => {
    await page.route('**/services_proxy/bank/billpay*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 2500));
      await route.continue();
    });
  });

  billPayPage.submitBillPayment({
    name: 'Safaricom Home Fiber',
    street: 'Waiyaki Way',
    city: 'Nairobi',
    state: 'Nairobi',
    zipCode: '00100',
    phone: '0711000000',
    account: '112233',
    amount: '30'
  });

  billPayPage.verifyPaymentComplete('Safaricom Home Fiber', '30');

  // Teardown route interceptor
  await I.usePlaywrightTo('restore normal network conditions', async ({ page }) => {
    await page.unroute('**/services_proxy/bank/billpay*');
  });
});
