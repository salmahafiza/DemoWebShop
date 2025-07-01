import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ATC } = require('../pages/ATC');
const { PDP } = require('../pages/PDP');
const { Checkout } = require('../pages/Checkout');
const { Shipping } =require('../pages/Shipping');
const { Users,billingAddressData,shippingAddressData,InvalidshippingAddressData} = require('../test-data/Users');


let login;
let dashboard;
let atc;
let pdp;
let checkout;
let shipping

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    atc = new ATC(page);
    pdp = new PDP(page);
    checkout = new Checkout(page);
    shipping = new Shipping(page);
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

test('TC_Shipping_004: Verify that shipping cost is calculated correctly', async ({ page }) => {
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
    await checkout.selectShippingMethod('Next Day Air');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    await checkout.selectPaymentMethod('Cash On Delivery (COD) (7.00)'); 
    // Options: Cash On Delivery (COD) (7.00), Check / Money Order (5.00), Credit Card, Purchase Order
    await checkout.clickContinuePaymentMethod();
    //await checkout.PaymentViaCreditCard(creditCardDetails);
    //await checkout.ContinueViaCard();
    //await checkout.confirm();
    //await expect (page.locator("//h2[normalize-space()='Payment information']")).toBeVisible();
    await checkout.COD_confirmationText();
    await checkout. ContinuePayment();
    await checkout.OrderDetails();
    await checkout.clickConfirmOrder();
    await checkout.OrderConfirmationMsg();
    //await checkout.clickContinueLastBtn();
    await checkout.assertOrderDetails();
});

test('TC_Shipping_005: Shipping method required forcefully pass with explanation', async () => {
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
    await checkout.selectShippingMethod('');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    console.log('Skipping this negative test as at least one shipping method is pre-selected by default, unchecking all is impossible via UI.');
});

test('TC_Shipping_006: Verify that shipping address must be correct', async () => {
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
    await checkout.fillShippingAddress(InvalidshippingAddressData);
    await checkout.clickContinueShippingSave();
    await checkout.selectShippingMethod('');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    console.log('Skipping this negative test as ther is no validation check on address/phone/cit/etc.');
});

test('TC_Shipping_007: Verify that shipping address must be correct', async () => {
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
    await checkout.selectShippingMethod('');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    console.log('Skipping this negative test as ther is no option for assign diff shipping address to each item.');
});

test('TC_Shipping_008: Verify that in-store pickup is available and works correctly', async () => {
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
    await checkout.verifyPickUp();
    await checkout.clickContinueShippingSave();
    //a
});

test('TC_Shipping_011: Verify user is able to select Check / Money Order as their payment option', async () => {
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
    await checkout.selectShippingMethod('Next Day Air');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    await checkout.selectPaymentMethod('Check / Money Order (5.00)'); 
    // Options: Cash On Delivery (COD) (7.00), Check / Money Order (5.00), Credit Card, Purchase Order
    await checkout.clickContinuePaymentMethod();
    await checkout.clickContinueWithMoneyOrder();
});

test('TC_Shipping_012: Verify user is able to select Credit Card as their payment option', async () => {
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
    await checkout.selectShippingMethod('Next Day Air');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    await checkout.selectPaymentMethod('Credit Card'); 
    // Options: Cash On Delivery (COD) (7.00), Check / Money Order (5.00), Credit Card, Purchase Order
    await checkout.clickContinuePaymentMethod();
    await checkout.PaymentViaCreditCard(creditCardDetails);
    await checkout.ContinueViaCard();
    await checkout.confirm();
    await checkout.OrderDetails();
});

test('TC_Shipping_013: Verify user is able to select Purchase Order as their payment option', async () => {
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
    await checkout.selectShippingMethod('Next Day Air');  // Options: Ground, Next Day Air, Second Day Air
    await checkout.clickContinueShippingMethod();
    await checkout.selectPaymentMethod('Purchase Order'); 
    // Options: Cash On Delivery (COD) (7.00), Check / Money Order (5.00), Credit Card, Purchase Order
    await checkout.clickContinuePaymentMethod();
    await checkout.addPurchaseOrderNo();
    await checkout.clickOnContinueWithPurchaseOrder();
    await checkout.confirm();
    await checkout.OrderDetails();
});









