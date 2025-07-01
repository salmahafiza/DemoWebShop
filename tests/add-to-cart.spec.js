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
test('TC_ShoppingCart_010 : Verify product is removed using checkbox and update', async () => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.removeItemFromCart();
    await atc.verifyItemRemovedFromCart();
});
test('TC_ShoppingCart_011 : Verify error message appears for wrong coupon code', async () => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await atc.clickOnAddToCartButton();
    await atc.navigateToShoppingCart();
    await atc.applyDiscountCoupon('FAKE123');
    await atc.clickOnApplyCouponButton();
    await atc.assertingWithDiscountCoupon();

});