export const config = {
  tests: './tests/*_test.ts',
  output: './output',
  require: ['tsx/esm'],
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://parabank.parasoft.com/parabank',
      show: process.env.HEADLESS !== 'true',
      restart: 'keep',
      waitForTimeout: 10000,
      waitForNavigation: 'networkidle'
    }
  },
  include: {
    I: './steps_file.ts',
    loginPage: './pages/loginPage.ts',
    accountOverviewPage: './pages/accountOverviewPage.ts',
    transferFundsPage: './pages/transferFundsPage.ts',
    openAccountPage: './pages/openAccountPage.ts',
    billPayPage: './pages/billPayPage.ts',
    requestLoanPage: './pages/requestLoanPage.ts',
    portalPage: './pages/portalPage.ts',
    adminPage: './pages/adminPage.ts'
  },
  name: 'parabank-codeceptjs-e2e',
  plugins: {
    screenshot: {
      enabled: true
    }
  }
};
