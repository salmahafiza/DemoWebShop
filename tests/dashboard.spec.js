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


test('TC_DASHBOARD_004: verify the count displayed on wishlist', async () => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.searchTextBox();
    await dashboard.clickOnSearchButton();
    await dashboard.clickOnProductName();
    await dashboard.clickOnWishlistBtn();
    await dashboard.accessApplication();
    const wishlistText = await dashboard.verifyWishlistCount();
    console.log('Wishlist Text:', wishlistText);
});

test('TC_DASHBOARD_005: Verify that each category link leads to the correct category page.' , async () => {
    await dashboard.accessApplication();
    await dashboard.verifyBookCategory();

});
