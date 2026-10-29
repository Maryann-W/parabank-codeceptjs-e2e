const { I } = inject();

class AdminPage {
  locators = {
    adminNav: 'a[href*="admin.htm"]',
    adminHeader: '#rightPanel h1.title',
    initializeDbBtn: 'button[value="INIT"]',
    cleanDbBtn: 'button[value="CLEAN"]',
    soapEndpointRadio: 'input[value="soap"]',
    restEndpointRadio: 'input[value="restxml"]',
    submitSettingsBtn: 'input[value="Submit"]'
  };

  navigate(): void {
    I.amOnPage('/admin.htm');
    I.waitForVisible(this.locators.adminHeader, 5);
    I.see('Administration', this.locators.adminHeader);
  }

  reinitializeDatabase(): void {
    I.waitForVisible(this.locators.initializeDbBtn, 5);
    I.click(this.locators.initializeDbBtn);
    I.waitForVisible(this.locators.adminHeader, 8);
    I.see('Database Initialized', '#rightPanel');
  }

  cleanDatabase(): void {
    I.waitForVisible(this.locators.cleanDbBtn, 5);
    I.click(this.locators.cleanDbBtn);
    I.waitForVisible(this.locators.adminHeader, 8);
    I.see('Database Cleaned', '#rightPanel');
  }

  setBackendServiceType(type: 'SOAP' | 'REST'): void {
    const radioLocator = type === 'SOAP' ? this.locators.soapEndpointRadio : this.locators.restEndpointRadio;
    I.waitForVisible(radioLocator, 5);
    I.checkOption(radioLocator);
    I.click(this.locators.submitSettingsBtn);
    I.waitForVisible(this.locators.adminHeader, 5);
  }
}

export default new AdminPage();
