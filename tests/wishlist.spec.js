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