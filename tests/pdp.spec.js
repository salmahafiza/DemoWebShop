import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const {PDP} = require('../pages/PDP');
const {Users} = require('../test-data/Users');

let login;
let dashboard;
let checkout;
let pdp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    pdp = new PDP(page);
    await dashboard.navigateToLoginPage();
});

test ('TC_PDP_003: Verify that user can update quantity during checkout', async () => {
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
    const previousTotal = await checkout.totalPrice.textContent();
    await checkout.updateProductQuantity(12);//Update QTY
    await checkout.verifyTotalPriceChanged(previousTotal);//Verify QTY Update Through Price change
});

test ('TC_PDP_004: Verify that product reviews are visible', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.verifyProductReviews()
});



