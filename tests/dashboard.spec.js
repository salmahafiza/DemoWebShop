import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Users } = require('../test-data/Users');

let login;
let dashboard;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    await dashboard.navigateToLoginPage();
});

test('TC_DASHBOARD_001 - Verify that user information is correctly showed on the dashboard page', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
    await dashboard.clickOnUserAccount();
});

test('TC_DASHBOARD_002 - Verify that logout link is working properly', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
    await dashboard.verifyToLogout();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
});
  
test('TC_DASHBOARD_003 - Check the shopping cart displays the correct number of items.', async ({ page }) => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.addItemToCart();
    const cartText = await page.textContent('a.ico-cart');
    const match = cartText.match(/\((\d+)\)/);
    const itemCount = match ? parseInt(match[1]) : 0;
    expect(itemCount).toBe(1);
});

test('TC_DASHBOARD_004: verify the count displayed on wishlist', async () => {
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.searchTextBox();
    await dashboard.clickOnSearchButton();
    await dashboard.clickOnProductName();
    await dashboard.clickOnWishlistBtn();
    await dashboard.accessApplication();
    const wishlistText = await dashboard.verifyWishlistCount();
    console.log('Wishlist Text:', wishlistText);
});

test('TC_DASHBOARD_005: Verify that each category link leads to the correct category page.' , async () => {
    await dashboard.accessApplication();
    await dashboard.verifyBookCategory();
});

test('TC_DASHBOARD_006: Check the functionality of subscribing to the newsletter.' , async () => {
    await dashboard.accessApplication();
    await dashboard.textBoxSubsciptionEmail_validEmail();
    await dashboard.buttonSubscribe();
    await dashboard.assertMessageOnSubsciptionWithValidEmail();
});

test('TC_DASHBOARD_007: Verify user is able to view to view recent products they navigated to' , async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.clickOnProductsFromDashboard();
    await dashboard.verifyRecentlyViewedProducts();
});

test('TC_DASHBOARD_008 - Check that the community poll accepts inputs and submits correctly.', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.voteInCommunityPoll();
    await dashboard.verifyPollSubmission();
});

test('TC_DASHBOARD_009 : Verify that clicking the Gift Cards category link correctly displays gift card products.' , async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.clickonGiftCardFromDashboard();
    await dashboard.verifyUserInfoVisible();
    await dashboard.displayGiftCardName();
});

test('TC_DASHBOARD_014 - Check Add to Cart functionality for featured products', async () => {
     await login.enterUsername(Users.username);
     await login.enterPassword(Users.password);
     await login.clickLoginButton();
     await dashboard.clickFirstFeaturedProductAddToCart();
     await dashboard.verifyAddToCart();
     
});

test('TC_DASHBOARD_015 - Verify website logo and Title is visible and Clickable.', async () => {
    await dashboard.LogoVisibility();
    await dashboard.clickOnLogo();
    await dashboard.assertLogoButton();
    await dashboard.verifyHomePageTitle();  
    
});

test('TC_DASHBOARD_016 - Verify manufacturers are visible and clickable.', async ({ page }) => {
    await dashboard.clickOnTricentisManufacturer();
    await dashboard.verifyTricentisPage();
});


test("TC_DASHBOARD_017: Verify Popular Tags are visible and clickable.", async () => {
  await login.enterUsername(Users.username);
  await login.enterPassword(Users.password);
  await login.clickLoginButton();
  await dashboard.clickOnPopularTagswithAssert("apparel");
  await dashboard.clickOnLogo();
  await dashboard.clickOnPopularTagswithAssert("awesome");
  await dashboard.clickOnLogo();
  await dashboard.clickOnPopularTagswithAssert("computer");
});