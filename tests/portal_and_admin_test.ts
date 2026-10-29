Feature('Public Portal Navigation, Customer Services & Admin Management');

Scenario('Portal Navigation: Switch across top-level public links and header shortcuts', ({ I, portalPage }) => {
  portalPage.visitHome();

  // Test About Us routing
  I.click(portalPage.locators.aboutUsLink);
  I.waitForVisible('#rightPanel', 5);
  I.see('ParaBank is a demo site', '#rightPanel');

  // Test Services catalog routing
  I.click(portalPage.locators.servicesLink);
  I.waitForVisible('#rightPanel', 5);
  I.see('Available RESTful services', '#rightPanel');

  // Return Home using header icon
  I.click(portalPage.locators.homeIcon);
  I.waitForVisible('#rightPanel', 5);
  I.see('ATM Services', '#rightPanel');
});

Scenario('Services Showcase: Verify ATM and Online Services modules on landing page', ({ I, portalPage }) => {
  portalPage.visitHome();

  // Assert ATM Services offerings are present
  I.see('ATM Services', '#rightPanel');
  I.see('Withdraw Funds', '#rightPanel');
  I.see('Transfer Funds', '#rightPanel');
  I.see('Check Balances', '#rightPanel');
  I.see('Make Deposits', '#rightPanel');

  // Assert Online Services offerings are present
  I.see('Online Services', '#rightPanel');
  I.see('Bill Pay', '#rightPanel');
  I.see('Account History', '#rightPanel');

  // Clicking "Read More" navigates to the services directory
  I.click('#rightPanel a[href*="services.htm"]');
  I.waitForVisible('#rightPanel', 5);
  I.see('Available RESTful services', '#rightPanel');
});

Scenario('Customer Care Workflow: Submit contact inquiry and verify acknowledgment', ({ portalPage }) => {
  portalPage.visitHome();
  portalPage.navigateToContact();

  portalPage.sendCustomerCareMessage({
    name: 'Maryann Wanjiku',
    email: 'm.wanjiku@enterprise-qa.io',
    phone: '+254791020406',
    message: 'Inquiry regarding automated corporate payroll clearing latency thresholds.'
  });

  portalPage.verifyContactSubmission('Maryann Wanjiku');
});

Scenario('System Administration: Database re-initialization and backend service toggle', ({ adminPage }) => {
  adminPage.navigate();

  // Re-seed and initialize mock banking database
  adminPage.reinitializeDatabase();

  // Configure backend endpoint mode to SOAP
  adminPage.setBackendServiceType('SOAP');
});
