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