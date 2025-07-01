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

test('TC_ShoppingCart_014: Verify Cart is Empty after the order is placed', async () => {
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
    await checkout.selectPaymentMethod('Credit Card'); 
    // Options: Cash On Delivery (COD) (7.00), Check / Money Order (5.00), Credit Card, Purchase Order
    await checkout.clickContinuePaymentMethod();
    await checkout.PaymentViaCreditCard(creditCardDetails);
    await checkout.ContinueViaCard();
    await checkout.confirm();
    //await expect (page.locator("//h2[normalize-space()='Payment information']")).toBeVisible();
    //await checkout.COD_confirmationText();
    //await checkout. ContinuePayment();
    await checkout.clickConfirmOrder();
    await checkout.OrderConfirmationMsg();
    await checkout.clickContinueLastBtn();
    await checkout.gotoShoppingCart();
    await checkout.emptyCart();
});



