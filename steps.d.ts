/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file').default;
type loginPage = typeof import('./pages/loginPage').default;
type accountOverviewPage = typeof import('./pages/accountOverviewPage').default;
type transferFundsPage = typeof import('./pages/transferFundsPage').default;
type openAccountPage = typeof import('./pages/openAccountPage').default;
type billPayPage = typeof import('./pages/billPayPage').default;
type requestLoanPage = typeof import('./pages/requestLoanPage').default;
type portalPage = typeof import('./pages/portalPage').default;
type adminPage = typeof import('./pages/adminPage').default;

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, accountOverviewPage: accountOverviewPage, transferFundsPage: transferFundsPage, openAccountPage: openAccountPage, billPayPage: billPayPage, requestLoanPage: requestLoanPage, portalPage: portalPage, adminPage: adminPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
