import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ATC } = require('../pages/ATC');
const { PDP } = require('../pages/PDP');
const { Checkout } = require('../pages/Checkout');
const { Users,billingAddressData} = require('../test-data/Users');


let login;
let dashboard;
let atc;
let pdp;
let checkout;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    atc = new ATC(page);
    pdp = new PDP(page);
    checkout = new Checkout(page);
    await dashboard.accessApplication();
});

test('TC_SHIPPING_003: Verify that user can change shipping option before finalizing order', async ({ page }) => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    //await checkout.gotoCart();
    await checkout.assertShoppingCartPage();
    await checkout.selectCountry('Pakistan');
    await checkout.selectState('Other (Non US)');
    await checkout.enterZipCode('74500');
    await checkout.clickEstimateShipping();
    await checkout.verifyShippingOptionsVisible();
    await checkout.acceptTermsAndCondition();
    await checkout.proceedToCheckOut();
    await checkout.selectAddNewAddress();
    await checkout.fillBillingAddress(billingAddressData);
    await checkout.clickContinue();
    await checkout.clickContinueShippingSave();
    await checkout.selectShippingMethod('Ground (0.00)');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
});

