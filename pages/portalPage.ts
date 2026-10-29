const { I } = inject();

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

class PortalPage {
  locators = {
    // Navigation links
    aboutUsLink: 'a[href*="about.htm"]',
    servicesLink: 'a[href*="services.htm"]',
    adminLink: 'a[href*="admin.htm"]',

    // Header shortcut icons
    homeIcon: 'li.home a, a[href*="index.htm"]',
    contactIcon: 'li.contact a, a[href*="contact.htm"]',

    // Content container
    rightPanel: '#rightPanel',

    // Contact Us Form
    contactName: '#name, input[name="name"]',
    contactEmail: '#email, input[name="email"]',
    contactPhone: '#phone, input[name="phone"]',
    contactMessage: '#message, textarea[name="message"]',
    submitContactBtn: 'input[value="Send to Customer Care"]',
    contactConfirmation: '#rightPanel'
  };

  visitHome(): void {
    I.amOnPage('/index.htm');
    I.waitForVisible(this.locators.rightPanel, 5);
    I.waitForText('ATM Services', 5, this.locators.rightPanel);
  }

  navigateToContact(): void {
    I.click(this.locators.contactIcon);
    I.waitForVisible(this.locators.contactName, 5);
  }

  sendCustomerCareMessage(data: ContactMessage): void {
    I.fillField(this.locators.contactName, data.name);
    I.fillField(this.locators.contactEmail, data.email);
    I.fillField(this.locators.contactPhone, data.phone);
    I.fillField(this.locators.contactMessage, data.message);
    I.click(this.locators.submitContactBtn);
  }

  verifyContactSubmission(senderName: string): void {
    I.waitForVisible(this.locators.contactConfirmation, 5);
    I.see(`Thank you ${senderName}`, this.locators.contactConfirmation);
    I.see('A Customer Care Representative will be contacting you.', this.locators.contactConfirmation);
  }
}

export default new PortalPage();
