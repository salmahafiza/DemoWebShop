import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const { PLP } = require('../pages/PLP');
const { Users, billingAddressData, creditCardDetails, RegisterdEmail, inValiBillingAddressData, missingCityInBillingAddressData, missingLastNameInBillingAddressData, MissingFirstNameInBillingAddressData, misshongEmailInBillingAddressData } = require('../test-data/Users');

let login;
let dashboard;
let checkout;
let plp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    plp = new PLP(page);
    await dashboard.navigateToLoginPage();
});

test('TC_SHIPPING_014: validate website logo redirected to home page', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await plp.clickOnCategory('Books');
    await dashboard.clickOnLogo();
    await dashboard.LogoVisibility();
});

test('TC_SHIPPING_015: Verify user can enter a new Shipping Address different from Billing Address', async () => {
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
    await checkout.selectAddNewAddressShipping();
    await checkout.fillShippingAddress(shippingAddressData);
    await checkout.clickContinueShippingSave();
    await checkout.selectShippingMethod('Ground (0.00)');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
});