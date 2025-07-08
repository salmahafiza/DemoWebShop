import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Users } = require('../test-data/Users');
const { WishlistPage } = require('../pages/Wishlist');
const { PDP } = require('../pages/PDP');

let login;
let dashboard;
let wishlist;
let pdp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    wishlist = new WishlistPage(page);
    pdp = new PDP(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    await dashboard.navigateToLoginPage();
});

test("TC_WISHLIST_001 : Verify WishList Hyperlink ", async () => {
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();

});

test('TC_WISHLIST_002: Remove an Item from WishList', async () => {
    await wishlist.navigateToJewelryCategory();
    await wishlist.verifyPageTitle('Jewelry');
    await wishlist.clickProduct('Create Your Own Jewelry');
    await wishlist.enterLength(20);
    await wishlist.clickAddToWishListButton();
    await wishlist.verifyWishlistAddSuccessMsg();
    await wishlist.navigateToWishlist();
    await wishlist.verifyPageTitle('Wishlist');
    await wishlist.verifyItemOnWishlistScreen('Create Your Own Jewelry');
    await wishlist.removeItemFromWishlist('Create Your Own Jewelry');
    await wishlist.clickUpdateCartBtn();
});

test('TC_WISHLIST_003: Add an Item to cart from WishList', async () => {
    await wishlist.navigateToJewelryCategory();
    await wishlist.verifyPageTitle('Jewelry');
    await wishlist.clickProduct('Create Your Own Jewelry');
    await wishlist.enterLength(20);
    await wishlist.clickAddToWishListButton();
    await wishlist.verifyWishlistAddSuccessMsg();
    await wishlist.navigateToWishlist();
    await wishlist.verifyPageTitle('Wishlist');
    await wishlist.verifyItemOnWishlistScreen('Create Your Own Jewelry');
    await wishlist.addItemToCartFromWishlist('Create Your Own Jewelry');
});

test('TC_WISHLIST_004: Share item in Wishlist via Email', async () => {
    await wishlist.navigateToJewelryCategory();
    await wishlist.verifyPageTitle('Jewelry');
    await wishlist.clickProduct('Create Your Own Jewelry');
    await wishlist.enterLength(20);
    await wishlist.clickAddToWishListButton();
    await wishlist.verifyWishlistAddSuccessMsg();
    await wishlist.navigateToWishlist();
    await wishlist.verifyPageTitle('Wishlist');
    await wishlist.verifyItemOnWishlistScreen('Create Your Own Jewelry');
    await wishlist.shareWishlistItemViaEmail();
    await wishlist.verifyPageTitle('Email your wishlist to a friend');
});

test('TC_Wishlist_005: User should be able to use the wishlist link to view the item(s) added to their Wishlist', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.clickSharedWishlistLink();
    await wishlist.assertWishlistURL();
});

test('TC_Wishlist_006: User should be able to click on the product name under "Product(s)" to review product details', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.navigateToProductDetailsFromWishlist();
});

test('TC_Wishlist_007: Verify quantity value is updated when user enters any number in the "Qty:" textbox which is within range of a particular item', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateProductQuantity(10);
});

test('TC_Wishlist_008: Verify that the wishlist count is updated according to the total quantity of all items in the wishlist', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Apparel & Shoes');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateProductQuantityByIndex(0, 8);
    await wishlist.updateProductQuantityByIndex(1, 9);
    await wishlist.assertWishlistCountMatchesTotalQty();
});

test('TC_Wishlist_009: Verify the total amount for each item is correct and calculated according to *price x quantity*', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistURL();
    await wishlist.updateProductQuantityByIndex(0, 8);
    await wishlist.priceUpdatedWithQty();
});

test('TC_Wishlist_010: Verify all the data under each heading i.e. Product details, Price and Quantiy added at time of selection are correct', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistURL();
    await wishlist.verifyProductDetailsInWishlist('3rd Album', '1.00', 10, '5.00');
});

test("TC_WISHLIST_011 : Verify setting Quantity to 0 ", async () => {
    await wishlist.navigateToJewelryCategory();
    await wishlist.verifyPageTitle('Jewelry');
    await wishlist.clickProduct('Create Your Own Jewelry');
    await wishlist.enterLength(20);
    await wishlist.clickAddToWishListButton();
    await wishlist.verifyWishlistAddSuccessMsg();
    await wishlist.navigateToWishlist();
    await wishlist.verifyPageTitle('Wishlist');
    await wishlist.updateProductByQuantityByIndex(0, 0);
    await wishlist.verifyWishlistEmpty();
});

test('TC_WISHLIST_012 : Increase Quantity to more than max', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateProductQuantityByIndex(0, 800);
    await wishlist.verifyQuantityLimitExceeded(0);  // index 0 for first product
    await wishlist.assertWishlistCountMatchesTotalQty();
});

test("TC_WISHLIST_013 : Verify adding duplicate product(s) ", async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateProductQuantityByIndex(0, 2);
    await wishlist.assertWishlistCountMatchesTotalQty();
});

test("TC_WISHLIST_014 : Verify Wishlist is persistent ", async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishListButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateProductQuantityByIndex(0, 8);
    await wishlist.reloadPage();
    await wishlist.assertWishlistCountMatchesTotalQty();
});

test('TC_Wishlist_015: User should be able to add items to the Wishlist screen by clicking the Add to Wishlist button under each product', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.verifyProductInWishlist('3rd Album');
});

test('TC_Wishlist_016: Verify an appropriate message is displayed when there are no items added to the wishlist', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.clearWishlist();
    await wishlist.verifyWishlistEmpty();
});

test('TC_Wishlist_017: User should be able to modify the wishlist i.e. modify quantity, remove items and update Wishlist count using the update wishlist button', async ({ browserName }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateProductQuantityByIndex(0, 5);
    await wishlist.clearWishlist();
});

test('TC_Wishlist_018: Update Wishlist Count and Item Quantity using Enter Key', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await pdp.NavigateToDifferentCategoriesWithAssert('Digital downloads');
    await pdp.ProductName();
    await wishlist.clickAddToWishlistButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishlistPageUrl();
    await wishlist.updateQtywithEnterkey(0, 3);
    await wishlist.assertWishlistCountMatchesTotalQty();
});