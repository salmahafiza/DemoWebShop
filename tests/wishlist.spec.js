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
 
test.only('TC_Wishlist_005: User should be able to use the wishlist link to view the item(s) added to their Wishlist', async () => {
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