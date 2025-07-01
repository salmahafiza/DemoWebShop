import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const { ATC } = require('../pages/ATC');
const { Users } = require('../test-data/Users');


let login;
let dashboard;
let atc;
let checkout

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    atc = new ATC(page);
    await dashboard.accessApplication();
});

test('TC_ShoppingCart_001: Verify user is able to checkout after ticking the terms of service checkbox', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.verifyItemAddedToCart();
    await atc.acceptTermsAndConditions();
    await atc.clickOnCheckoutButton();
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

test('TC_ShoppingCart_016: verify that user should receive an error on clicking " add gift card" without adding a giftcard code', async ({ page }) => {
    await atc.clickOnAddToCartButton();
    await atc.verifyItemAddedToCart();
    await atc.navigateToShoppingCart();
    await atc.clickOnAddGiftCardButton();
    await atc.verifyEmptyGiftCardCodeErrorMessage();
});
