import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const {Users, billingAddressData, creditCardDetails, RegisterdEmail,inValiBillingAddressData,missingCityInBillingAddressData ,missingLastNameInBillingAddressData ,MissingFirstNameInBillingAddressData,misshongEmailInBillingAddressData} = require('../test-data/Users');

let login;
let dashboard;
let checkout;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    await dashboard.navigateToLoginPage();
});
test('TC_SHIPPING_001 :Verify that basic shipping option works correctly', async ({ page }) => {
     test.setTimeout(60000);
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
    
    });
    test('TC_SHIPPING_002 :Verify availability of express shipping options', async ({ page }) => {
     test.setTimeout(60000);
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
        await checkout.selectShippingMethod('Next Day Air (0.00)');  // Options: Ground, Next Day Air, Second Day Air
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