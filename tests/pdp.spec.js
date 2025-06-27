import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Checkout } = require('../pages/Checkout');
const {PDP} = require('../pages/PDP');
const {Users} = require('../test-data/Users');

let login;
let dashboard;
let checkout;
let pdp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    checkout = new Checkout(page);
    pdp = new PDP(page);
    //await dashboard.navigateToLoginPage();
    await dashboard.accessApplication();
});

test ('TC_PDP_003: Verify that user can update quantity during checkout', async () => {
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.updateProductQuantity(12);//Update QTY
    await page.reload();
    const cartQty = await pdp.getCartQuantity();
    console.log('Cart Quantity:', cartQty);
});

test ('TC_PDP_004: Verify that product reviews are visible', async () => {
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    await pdp.verifyProductReviews();
});

test ('TC_PDP_005: Verify that the price of the product is displayed correctly', async () => {

    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    const price = await pdp.verifyProductPrice();
    console.log(`Product Price: ${price?.trim()}`);
    expect(price).not.toBeNull();
});

test ('TC_PDP_006: Verify the availability status of the product', async () => {
    await checkout.searchTextBox('Smartphone');
    await dashboard.clickOnSearchButton();
    await checkout.clickOnProductName();
    const availability = await pdp.getProductAvailability();
    console.log(`Availability Status: ${availability?.trim()}`);
    expect(availability).toMatch(/In stock|Out of stock/i); 
});

test ('TC_PDP_007: Verify that products can be added to compare', async ({page}) => {
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

test ('TC_PDP_008: Verify that User emails product details to friend', async () => {
    await dashboard.navigateToLoginPage();
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

test('TC_PDP_013: Verify invalid quantities show appropriate error on PDP', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Cell phones');
    await checkout.clickOnProductName();
// Test with negative quantity
    await pdp.updateProductQuantity(-1);//Update QTY
    await checkout.clickOnAdtoCart();
    await pdp.verifyQuantityErrorMessage();
// Test with non-numeric quantity
    await pdp.updateProductQuantity('a');//Update QTY
    await checkout.clickOnAdtoCart();
    await pdp.verifyQuantityErrorMessage();
// Test with zero quantity
    await pdp.updateProductQuantity(0);//Update QTY
    await checkout.clickOnAdtoCart();   
    await pdp.verifyQuantityErrorMessage();
});

test('TC_PDP_014: Add Product to Cart with Empty Quantity field.', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Cell phones');
    await checkout.clickOnProductName();
// Test with zero quantity
    await pdp.updateProductQuantity(0);//Update QTY
    await checkout.clickOnAdtoCart();   
    await pdp.verifyQuantityErrorMessage();
});

test ('TC_PDP_015: Verify the Product added quantity matches the Cart quantity', async ({page}) => {
    //Repeated test case TC_PDP_003
    //await dashboard.navigateToLoginPage();
    //await login.enterUsername(Users.username);
    //await login.enterPassword(Users.password);
    //await login.clickLoginButton();
    //await checkout.searchTextBox('Smartphone');
    //await dashboard.clickOnSearchButton();
    //await checkout.clickOnProductName();
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Cell phones');
    await checkout.clickOnProductName();
    await pdp.updateProductQuantity(12);//Update QTY
    await page.reload();
    const cartQty = await pdp.getCartQuantity();
    console.log('Cart Quantity:', cartQty);
});

test('TC_PDP_016: Verify that product rating stars are visible.', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Cell phones');
    await checkout.clickOnProductName();
    await pdp.verifyRatingStars();
    console.log('Rating stars are visible on the Product Detail Page.');
});

test('TC_PDP_017: Verify that the product picture is displayed', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Cell phones');
    await checkout.clickOnProductName();
    await pdp.verifyImgOfProduct();
    console.log('Image is visible on th Product Detail Page.')
});

test('TC_PDP_018: Veirfy user is able to add  a related product to cart', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Camera, photo');
    await pdp.ProductName();
    await pdp.addRelatedProductToCart();
    await pdp.verifyProductAddedMessage();
    console.log('Related product successfully added to cart.');

});

test('TC_PDP_019: Veirfy user is able to add  a Customers who bought this item also bought product to cart', async () => {
    await pdp.clickOnCategory('Electronics');
    await pdp.clickOnSubCategory('Camera, photo');
    await pdp.ProductName();
    await pdp.addSuggestedProductToCart();
    await pdp.verifySuccessMessage();


});









