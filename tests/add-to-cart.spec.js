import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ATC } = require('../pages/ATC');
const { PDP } = require('../pages/PDP');
const { Checkout } = require('../pages/Checkout');
const { Users,billingAddressData, creditCardDetails, } = require('../test-data/Users');


let login;
let dashboard;
let atc;
let checkout
let pdp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    atc = new ATC(page);
    pdp = new PDP(page);
    await dashboard.accessApplication();
});

test('TC_ShoppingCart_001: Verify user is able to checkout after ticking the terms of service checkbox', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.verifyItemAddedToCart();
    await atc.acceptTermsAndConditions();
    await atc.clickOnCheckoutButton();
});

test('  TC_ShoppingCart_002 : Verify navigation from cart to checckout', async () => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.acceptTermsAndConditions();
    await atc.clickOnCheckoutButton();
    await atc.assertWithCheckoutButton();
});

test('TC_ShoppingCart_003: Verify user can remove item from cart', async () => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await atc.removeItemFromCart();
    await atc.verifyItemRemovedFromCart();
});

test('TC_ShoppingCart_004: verify updating Qty in cart page', async () => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await atc.updateQtyonCart();
    await atc.verifyQtyUpdated();
});

test('TC_ShoppingCart_005: Verify cart shows empty cart message when no items are present', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await atc.removeItemFromCart();
    await atc.verifyItemRemovedFromCart();
    await atc.verifyEmptyCartMessage();
});

test('TC_ShoppingCart_006: verify whether the price of the products changing according to the quantity during shipping', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await atc.updateQtyonCart();
    await atc.verifyQtyUpdated();
    await atc.priceUpdatedWithQty();
});

test('TC_ShoppingCart_007: moving to checkout without agreeing to the terms and conditions', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await checkout.proceedToCheckOut();
    await atc.verifyTermsErrorMessageDisplayed();
});

test('TC_ShoppingCart_008: vVerify user is able to navigate to specific product in cart by clicking on its title', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await atc.navigateToProductFromCart();
});
test('TC_ShoppingCart_009 : verify that user can able to continue shopping from shipping stage ', async () => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.acceptTermsAndConditions();
    await atc.continueShopping();
});

