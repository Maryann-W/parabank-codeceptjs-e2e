import assert from 'assert';

Feature('Enterprise Banking Operations - Core Validation & Fault Injection');

Before(({ loginPage }) => {
  loginPage.visit();
  // ParaBank default demo credentials
  loginPage.login('john', 'demo');
});

Scenario('Validate fund transfer source deduction and balance integrity', async ({ I, accountOverviewPage, transferFundsPage }) => {
  accountOverviewPage.navigate();

  // Grab dynamic source account and determine transfer amount
  const sourceAccount = await accountOverviewPage.getFirstAvailableAccountId();
  const destAccount = '13344';
  const transferAmount = 20.00;

  const initialSourceBalance = await accountOverviewPage.getBalanceForAccount(sourceAccount);

  // Execute transfer
  transferFundsPage.navigate();
  transferFundsPage.executeTransfer(transferAmount.toString(), sourceAccount, destAccount);
  transferFundsPage.verifyTransferSuccess(transferAmount.toString(), sourceAccount, destAccount);

  // Ledger verification: Source account must reflect deducted balance
  const updatedSourceBalance = await accountOverviewPage.getBalanceForAccount(sourceAccount);
  assert.strictEqual(
    updatedSourceBalance,
    initialSourceBalance - transferAmount,
    `Ledger mismatch: Expected ${initialSourceBalance - transferAmount}, got ${updatedSourceBalance}`
  );
});

Scenario('Negative transfer validation: Prevent non-numeric payloads', async ({ I, transferFundsPage }) => {
  transferFundsPage.navigate();

  // Attempt invalid alphanumeric payload
  I.fillField(transferFundsPage.locators.amountInput, 'INVALID_AMT');
  I.click(transferFundsPage.locators.submitTransferButton);

  // Ensure application refuses invalid transaction
  I.dontSee('Transfer Complete!', '#rightPanel');
});

Scenario('Resilience testing: Mock downstream 500 error on core banking gateway', async ({ I, transferFundsPage }) => {
  transferFundsPage.navigate();

  // Intercept the backend transfer endpoint with HTTP 500
  await I.usePlaywrightTo('intercept transfer endpoint with HTTP 500 fault', async ({ page }) => {
    await page.route('**/services_proxy/bank/transfer*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          fault: {
            faultstring: 'Core banking switch timeout: downstream ledger unreachable',
            errorCode: 'CBS_500_UNAVAILABLE'
          }
        })
      });
    });
  });

  // Attempt transfer while network fault is active
  transferFundsPage.executeTransfer('50.00', '12345', '13344');

  // Verify the application protects transaction boundaries
  I.dontSee('Transfer Complete!', '#rightPanel');

  // Clean up route interceptor
  await I.usePlaywrightTo('unroute interceptor', async ({ page }) => {
    await page.unroute('**/services_proxy/bank/transfer*');
  });
});

Scenario('Security: Session termination invalidates authenticated access', async ({ I, loginPage }) => {
  loginPage.logout();

  // Attempt direct navigation to internal overview
  I.amOnPage('/overview.htm');

  // Verify user is redirected or blocked
  I.waitForVisible(loginPage.locators.usernameInput, 5);
  I.see('Customer Login', '#leftPanel h2');
});
