import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Users } = require('../test-data/Users');

let login;
let dashboard;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    await dashboard.navigateToLoginPage();

});
test('TC_DASHBOARD_001 - Verify that user information is correctly showed on the dashboard page', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
    await dashboard.clickOnUserAccount();      

});
test('TC_DASHBOARD_002 - Verify that logout link is working properly', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
    await dashboard.verifyToLogout();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
});



