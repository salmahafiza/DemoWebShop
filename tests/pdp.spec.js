import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const { PDP } = require('../pages/PDP');
const { Users } = require('../test-data/Users');

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

test('TC_PDP_003: Verify that user can update quantity during checkout', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.updateProductQuantity(12);//Update QTY
    const cartQty = await pdp.getCartQuantity();
    console.log('Cart Quantity:', cartQty);


});

test('TC_PDP_004: Verify that product reviews are visible', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.verifyProductReviews();
});

test('TC_PDP_005: Verify that the price of the product is displayed correctly', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    const price = await pdp.verifyProductPrice();
    console.log(`Product Price: ${price?.trim()}`);
    expect(price).not.toBeNull();
});

test('TC_PDP_006: Verify the availability status of the product', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    const availability = await pdp.getProductAvailability();
    console.log(`Availability Status: ${availability?.trim()}`);
    expect(availability).toMatch(/In stock|Out of stock/i);
});

test('TC_PDP_007: Verify that products can be added to compare', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.clickOnAddToCompare();
    await checkout.searchTextBox('used phone');
    await dashboard.clickOnSearchButton();
    await pdp.clickOnProduct2();
    await pdp.clickOnAddToCompare();
    await pdp.verifyCompareProducts();
    console.log(' Both products successfully added to compare list.');
});

test('TC_PDP_008: Verify that User emails product details to friend', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.clickEmailAFriend();
    await pdp.fillEmailForm('xyz@gmail.com', 'abc@gmail.com', 'check this Phone');
    await pdp.sendEmail();
    await pdp.verifySuccessMessage();
    console.log('Email to friend sent successfully.');
});
test('TC_PDP_009 - Verify that clicking on the product image enlarges it', async ({ page }) => {
    await pdp.navigateToDifferentCategoriesWithAssert("Electronics");
    await pdp.clickOnElectronicsSubcategory();
    await pdp.NavigateToProductPDP("1MP 60GB Hard Drive Handycam Camcorder");
    await pdp.VerifyProductImageGallery();
});
test('TC_PDP_010 - Verify Product Description Loads Properly on Different Devices', async ({ page }) => {
    await pdp.navigateToDifferentCategoriesWithAssert("Electronics");
    await pdp.clickOnElectronicsSubcategory();
    await pdp.NavigateToProductPDP("1MP 60GB Hard Drive Handycam Camcorder");
    await pdp.VerifyPDPisVisible();
    //run Command: npx playwright test pdp.spec.js --project=chromium
    //run Command: npx playwright test pdp.spec.js --project=firefox
    //run Command: npx playwright test pdp.spec.js --project=webkit
});






