import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ATC } = require('../pages/ATC');
const { Users } = require('../test-data/Users');


let login;
let dashboard;
let atc;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    atc = new ATC(page);
    await dashboard.accessApplication();
});
test('Verify user is able to checkout after ticking the terms of service checkbox', async ({ page }) => {

    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.verifyItemAddedToCart();
    await atc.acceptTermsAndConditions();
    await atc.clickOnCheckoutButton();

}); 