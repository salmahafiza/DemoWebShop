import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Users } = require('../test-data/Users');
const {WishlistPage} = require('../pages/Wishlist');


let login;
let dashboard;
let wishlist;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    wishlist = new WishlistPage(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    await dashboard.navigateToLoginPage();

});
test('TC_WISHLIST_001 : Verify clicking on the Wishlist URL navigates user to the Wishlist screen', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await wishlist.navigateToWishlist();
    await wishlist.assertWishListPage();
});
test('TC_WISHLIST_002 : Verify the Wishlist link displays the correct number of items in the Wishlist', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await wishlist.navigateToWishlist();
    const wishlistQty = await wishlist.wishlistQty.textContent();
    expect(wishlistQty).toBe('0');
});