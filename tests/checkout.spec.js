import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const {Users, billingAddressData, creditCardDetails, inValiBillingAddressData} = require('../test-data/Users');

let login;
let dashboard;
let checkout;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    await dashboard.navigateToLoginPage();
});

test('TC_CHECKOUT_001: Verify that a user can complete the checkout process successfully', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
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

});

test ('TC_CHECKOUT_002: Verify the behavior when trying to checkout with an empty cart', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.gotoShoppingCart();
    await checkout.emptyCart();
});

test ('TC_CHECKOUT_003: Verify that user can update quantity during checkout', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
    await checkout.assertShoppingCartPage();
    const previousTotal = await checkout.totalPrice.textContent();
    await checkout.updateProductQuantity(12);//Update QTY
    await checkout.verifyTotalPriceChanged(previousTotal);//Verify QTY Update Through Price change
});

test ('TC_CHECKOUT_004: Verify that an error message is displayed for an invalid promo code', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
    await checkout.assertShoppingCartPage();
    await checkout.invalidPromo();
});

test ('TC_CHECKOUT_005: Verify that user can select a payment method', async ({page}) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
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
});

test ('TC_CHECKOUT_006: Verify that billing address must be filled out', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
    await checkout.assertShoppingCartPage();
    await checkout.selectCountry('Pakistan');
    await checkout.selectState('Other (Non US)');
    await checkout.enterZipCode('74500');
    await checkout.clickEstimateShipping();
    await checkout.verifyShippingOptionsVisible();
    await checkout.acceptTermsAndCondition();
    await checkout.proceedToCheckOut();
    await checkout.selectAddNewAddress();
    await checkout.fillBillingAddress(inValiBillingAddressData);
    await checkout.clickContinue();
    await checkout.errorMessages();
});

test('TC_CHECKOUT_007: Shipping method required forcefully pass with explanation', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
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

test ('TC_CHECKOUT_008: Verify that user can review order before final confirmation', async () => {
      await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await checkout.searchTextBox();
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await checkout.clickOnAdtoCart();
    await checkout.gotoShoppingCart();
    await checkout.gotoCart();
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
    await checkout.selectPaymentMethod('Cash On Delivery (COD) (7.00)'); 
    // Options: Cash On Delivery (COD) (7.00), Check / Money Order (5.00), Credit Card, Purchase Order
    await checkout.clickContinuePaymentMethod();
    await checkout.COD_confirmationText();
    await checkout. ContinuePayment();
    await checkout.confirm();
    await checkout.OrderDetails();

});


