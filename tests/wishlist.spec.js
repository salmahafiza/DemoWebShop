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