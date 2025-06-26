import { expect } from '@playwright/test';
const { Users } = require('../test-data/Users');

class Checkout {
  constructor(page) {
    this.page = page;


    //Locators
    this.shoppingCartButton = page.locator("a[class='ico-cart'] span[class='cart-label']");
    this.goToCartButton = page.locator("input[value='Go to cart']");
    this.addtocartBtn = page.locator('#add-to-cart-button-43');
    this.assertProductName = page.locator("//h2[@class='product-title']//a[normalize-space()='Smartphone']");
    this.searchBoxText = page.locator("#small-searchterms");
    this.shoppingCartPage = page.locator("//h1[normalize-space()='Shopping cart']");
    this.countryDropdown = page.locator('#CountryId');
    this.stateDropdown = page.locator('#StateProvinceId');
    this.zipCodeField = page.locator('#ZipPostalCode');
    this.estimateButton = page.locator('input[value="Estimate shipping"]');
    this.shippingOptions = page.locator('.shipping-options');
    this.termsAndCondition = page.locator('#termsofservice');
    this.checkOut = page.locator('#checkout');
    this.billingAddressDropdown = page.locator('#billing-address-select');
    this.firstNameField = page.locator('#BillingNewAddress_FirstName');
    this.lastNameField = page.locator('#BillingNewAddress_LastName');
    this.emailField = page.locator('#BillingNewAddress_Email');
    this.countryDropdownB = page.locator('#BillingNewAddress_CountryId');
    this.stateDropdownB = page.locator('#BillingNewAddress_StateProvinceId');
    this.cityField = page.locator('#BillingNewAddress_City');
    this.address1Field = page.locator('#BillingNewAddress_Address1');
    this.zipField = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phoneField = page.locator('#BillingNewAddress_PhoneNumber');
    this.continueButton = page.locator("input[onclick='Billing.save()']");
    this.continueShippingsaveBtn = page.locator("input[onclick='Shipping.save()']");
    this.groundShippingOption = page.locator('#shippingoption_0');  // Adjust selector based on actual HTML
    this.nextDayShippingOption = page.locator('#shippingoption_1');
    this.secondDayShippingOption = page.locator('#shippingoption_2');
    this.continueShippingMethod = page.locator("input[class='button-1 shipping-method-next-step-button']");
    this.COD = page.locator('input#paymentmethod_0');
    this.Check_MoneyOrder = page.locator('input#paymentmethod_1');
    this.creditCard = page.locator('input#paymentmethod_2');
    this.purchaseOrder = page.locator('input#paymentmethod_03');
    this.continuePayment = page.locator("input[class='button-1 payment-method-next-step-button']");
    this.paymentConfirmationText_COD = page.locator("//p[normalize-space()='You will pay by COD']");
    this.continuePaymentInfo = page.locator("input[class='button-1 payment-info-next-step-button']");
    this.cardType = page.locator('#CreditCardType');
    this.cardHolderName = page.locator('#CardholderName');
    this.cardNumber = page.locator('#CardNumber');
    this.expireMonth = page.locator('#ExpireMonth');
    this.expireYear = page.locator('#ExpireYear');
    this.cardCode = page.locator('#CardCode');
    this.continuePaymentViaCard = page.locator("input[class='button-1 payment-info-next-step-button']");
    this.assertConfirmOrder = page.locator("//h2[normalize-space()='Confirm order']");
    this.confirmBtn = page.locator("input[value='Confirm']");
    this.assertOrderConfirmation = page.locator(".section.order-completed");
    this.lastBtn = page.locator("input[value='Continue']");
    this.assertCart = page.locator(".order-summary-content");
    this.qtyInput = page.locator('input.qty-input');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.totalPrice = page.locator('.product-subtotal');
    this.promoCode = page.locator("input[name='discountcouponcode']");
    this.promoBtn = page.locator("input[value='Apply coupon']");
    this.errorMsg = page.locator(".message");
    this.fisrtNameError  = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.FirstName']");
    this.lastNameError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.LastName']");
    this.emailError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.Email']");
    this.countryError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.CountryId']");
    this.cityError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.City']");
    this.streetError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.Address1']");
    this.zipError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.ZipPostalCode']");
    this.phoneNoError = page.locator(".field-validation-error[data-valmsg-for='BillingNewAddress.PhoneNumber']");
    this.confirmOrderDetails = page.locator(".product-name");
    this.assertProduct2 = page.locator("//h2[@class='product-title']//a[contains(text(),'14.1-inch Laptop')]");
    this.addToCartBtn2 = page.locator("#add-to-cart-button-31");
    this.assertShippingAddress = page.locator("//h2[normalize-space()='Shipping address']");
    this.CheckOrder = page.locator("//a[normalize-space()='Click here for order details.']");
    this.OrderInfo = page.locator("//h1[normalize-space()='Order information']");
    this.BillingEmail = page.locator("#BillingNewAddress_Email");
    this.productRowsDetails = page.locator("tr.cart-item-row");
    this.subTotal = page.locator("tbody tr:nth-child(1) td:nth-child(2) span:nth-child(1) span:nth-child(1)");
    this.shipping = page.locator("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ol:nth-child(1) > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)");
    this.paymentFee = page.locator('body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ol:nth-child(1) > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > form:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)');
    this.Total = page.locator("span[class='product-price order-total'] strong");



  }

  async gotoShoppingCart(){
    await this.shoppingCartButton.click();
  }
  async gotoCart(){
    await this.goToCartButton.click();
  }
  async searchTextBox(searchTerm) {
    await this.searchBoxText.fill(searchTerm);
}
 /* async searchTextBox() {
    await this.searchBoxText.fill("Smartphone");
  }
  async searchTextBox2() {
    await this.searchBoxText.fill("14.1-inch Laptop");
  }*/
  async clickOnProductName() {
    await this.assertProductName.click();
  }
  async clickOnProduct2(){
    await this.assertProduct2.click();
  }
  async clickOnAdtoCart(){
    await this.addtocartBtn.click();
  }
  async clickOnAddtocart2(){
    await this.addToCartBtn2.click();
  }
  async assertShoppingCartPage(){
    await expect(this.shoppingCartPage).toHaveText('Shopping cart');
  }
  async selectCountry(country) {
    await this.countryDropdown.selectOption({ label: country });
  }
  async selectState(state) {
    await this.stateDropdown.selectOption({ label: state });
  }
  async enterZipCode(zip) {
    await this.zipCodeField.fill(zip);
  }
  async clickEstimateShipping() {
    await this.estimateButton.click();
  }
  async verifyShippingOptionsVisible() {
    await this.shippingOptions.waitFor({ state: 'visible' });
  }
  async acceptTermsAndCondition(){
    await this.termsAndCondition.click();
  }
  async proceedToCheckOut(){
    await this.checkOut.click();
  }
  async selectAddNewAddress() {
    await this.billingAddressDropdown.selectOption({ label: 'New Address' });
  }
  async fillBillingAddress(data) {
    await this.firstNameField.fill(data.firstName);
    await this.lastNameField.fill(data.lastName);
    await this.emailField.fill(data.email);
    await this.countryDropdownB.selectOption({ label: data.country });
    
    if (await this.stateDropdownB.isVisible()) {
        await this.stateDropdownB.selectOption({ label: data.state });
    }
    await this.cityField.fill(data.city);
    await this.address1Field.fill(data.address1);
    await this.zipField.fill(data.zip);
    await this.phoneField.fill(data.phone);
  }
  async clickContinue() {
    await this.continueButton.click();
  }
  async clickContinueShippingSave(){
    await this.continueShippingsaveBtn.click();
  }
  async selectShippingMethod(method = 'Ground (0.00)') {
    if (method === 'Ground (0.00)') {
        await this.groundShippingOption.check();
    } else if (method === 'Next Day Air (0.00)') {
        await this.nextDayShippingOption.check();
    } else if (method === '2nd Day Air (0.00)') {
        await this.secondDayShippingOption.check();
    }
  }
  async clickContinueShippingMethod() {
    await this.continueShippingMethod.click();
  }
  async selectPaymentMethod(method = 'Cash On Delivery (COD) (7.00)'){
    if (method === 'Cash On Delivery (COD) (7.00)'){
        await this.COD.check();
    }else if (method === 'Check / Money Order (5.00)'){
        await this.Check_MoneyOrder.check();
    }else if (method === 'Credit Card'){
        await this.creditCard.check();
    }else if (method === 'Purchase Order'){
        await this.purchaseOrder.check();
    }
  }
  async clickContinuePaymentMethod(){
    await this.continuePayment.click();
  }
  async COD_confirmationText(){
    await expect(this.paymentConfirmationText_COD).toHaveText('You will pay by COD');
  }
  async ContinuePayment(){
    await this.continuePaymentInfo.click();
  }
  
  async PaymentViaCreditCard(cardData){
    await this.cardType.selectOption({ label: cardData.cardType });
    await this.cardHolderName.fill(cardData.holderName);
    await this.cardNumber.fill(cardData.cardNumber);
    await this.expireMonth.selectOption(cardData.expireMonth);
    await this.expireYear.selectOption(cardData.expireYear);
    await this.cardCode.fill(cardData.cardCode);
  }
  async ContinueViaCard(){
    await this.continuePaymentViaCard.click();
  }
  async confirm(){
    await expect(this.assertConfirmOrder).toHaveText('Confirm order')
  }
  async clickConfirmOrder(){
    await this. confirmBtn.click();
  }
  async OrderConfirmationMsg(){
    await expect(this.assertOrderConfirmation).toContainText('Your order has been successfully processed!')
  }
  async clickContinueLastBtn(){
    await this.lastBtn.click();
  }
  async emptyCart(){
    await expect(this.assertCart).toHaveText('Your Shopping Cart is empty!');
  }
  async updateProductQuantity(quantity) {
    await this.qtyInput.fill(''); // Clear existing quantity
    await this.qtyInput.type(quantity.toString());
    await this.updateCartButton.click();
  }
  async verifyTotalPriceChanged(previousPrice) {
    const newPrice = await this.totalPrice.textContent();
    expect(newPrice.trim()).not.toBe(previousPrice.trim());
    console.log('updated Price is: ',newPrice)
  }
  async invalidPromo(){
    await this.promoCode.fill('123456');
    await this.promoBtn.click();
    await expect(this.errorMsg).toHaveText("The coupon code you entered couldn't be applied to your order");
  }
  async errorMessages(){
    await expect(this.fisrtNameError).toContainText('First name is required.');
    await expect(this.lastNameError).toHaveText('Last name is required.');
    await expect(this.emailError).toHaveText('Email is required.');
    await expect(this.countryError).toHaveText('Country is required.');
    await expect(this.cityError).toHaveText('City is required');
    await expect(this.streetError).toHaveText('Street address is required');
    await expect(this.zipError).toHaveText('Zip / postal code is required');
    await expect(this.phoneNoError).toHaveText('Phone is required');
  }
  /*async OrderDetails(){
    await expect(this.confirmOrderDetails).toHaveText('Smartphone');
  }*/
  async AssertShippingAddress(){
    await expect(this.assertShippingAddress).toHaveText('Shipping address');
  }
  async missingFirstName(){
    await expect(this.fisrtNameError).toContainText('First name is required.');
  }
  async missingEmail(){
    await expect(this.emailError).toHaveText('Email is required.');
  }
  async missinglastName(){
    await expect(this.lastNameError).toHaveText('Last name is required.');
  }
  async missingCity(){
    await expect(this.cityError).toHaveText('City is required');
  }
  async assertOrderDetails(){
    await this.CheckOrder.click();
    await expect(this.OrderInfo).toHaveText('Order information');
  }
  async verifyPrefilledEmail(expectedEmail){
    await expect(this.BillingEmail).toHaveValue(expectedEmail);
  }
async OrderDetails() { 
    console.log('\n ORDER SUMMARY DETAILS:');

    const productRows = this.page.locator('tr.cart-item-row');
    
    // Wait for at least one row to appear
    await productRows.first().waitFor();

    const rowCount = await productRows.count();
    console.log(`Total Product Rows Found: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
        const row = productRows.nth(i);

        const productName = await row.locator('td.product a.product-name').textContent();
        const price = await row.locator('td.unit-price span.product-unit-price').textContent();
        const qty = await row.locator('td.qty span').nth(1).textContent();
        const total = await row.locator('td.subtotal span.product-subtotal').textContent();

        console.log(`→ Product ${i + 1}: ${productName?.trim()}`);
        console.log(`   Price: ${price?.trim()}`);
        console.log(`   Quantity: ${qty?.trim()}`);
        console.log(`   Total: ${total?.trim()}\n`);
    }

    const subTotal = await this.subTotal.textContent();
    const shipping = await this.shipping.textContent();
    const paymentFee = await this.paymentFee.textContent();
    const totalAmount = await this.Total.textContent();

    console.log(`Sub-Total: ${subTotal?.trim()}`);
    console.log(`Shipping: ${shipping?.trim()}`);
    console.log(`Payment Fee: ${paymentFee?.trim()}`);
    console.log(`Grand Total: ${totalAmount?.trim()}`);
}

}

module.exports = { Checkout };

