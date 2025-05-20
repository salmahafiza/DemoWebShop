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

test.only('TC_001: Verify that user information is correctly shown', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
});

test('TC_002: Verify that login fails with an incorrect email', async () => {
    await login.enterUsername(Users.invalidUser);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await login.verifyInvalidLoginErrorMessageShouldDisplay();
});

test('TC_003: Verify that login fails with an incorrect password', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.invalidPassword);
    await login.clickLoginButton();
    await login.verifyInvalidLoginErrorMessageShouldDisplay();
});

test('TC_004: Verify that login fails if the email field is left empty', async () => {
    await login.enterUsername(" ");
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await login.verifyInvalidLoginErrorMessageShouldDisplay();
});

test('TC_005: Verify that login fails if the password field is left empty', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(" ");
    await login.clickLoginButton();
    await login.verifyInvalidLoginErrorMessageShouldDisplay();
});

test('TC_006: Verify that the Remember me function works as expected', async () => {
    await login.verifyRememberMeCheckboxIsFalse();
    await login.clickRemeberMeCheckbox();
    await login.verifyRememberMeCheckboxIsTrue();
});

test('TC_007: Verify that a user can log out and then log in again successfully', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
    await login.clickLogoutButton();
    await login.verifyUserInfoNotVisible();
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
});

test('TC_008: Verify that login fails if both email and password are incorrect', async () => {
    await login.enterUsername(Users.invalidUser);
    await login.enterPassword(Users.invalidPassword);
    await login.clickLoginButton();
    await login.verifyInvalidLoginErrorMessageShouldDisplay();
});
