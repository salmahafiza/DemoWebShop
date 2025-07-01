import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ATC } = require('../pages/ATC');
const { PDP } = require('../pages/PDP');
const { Checkout } = require('../pages/Checkout');
const { Users } = require('../test-data/Users');


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


test('TC_ShoppingCart_012: Verify adding negative values to the cart', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Cell phones');
    await checkout.clickOnProductName();
    await pdp.updateProductQuantity(-1);//Update QTY
    //await checkout.clickOnAdtoCart();
    await pdp.verifyQuantityErrorMessage();
});

test('TC_ShoppingCart_013: Validate Read link to terms of service.', async () => {
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.acceptTermsAndCondition();
});


