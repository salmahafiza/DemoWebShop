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

test('TC_001: Verify that user information is correctly shown', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
});

test('TC_002:  Verify that login fails with an incorrect email', async () => {
    await login.enterUsername(Users.invalidUser);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await login.verifyInvalidLoginErrorMessageShouldDisplay();
});
