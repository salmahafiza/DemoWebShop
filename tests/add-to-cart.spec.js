import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { ATC } = require('../pages/ATC');

let login;
let dashboard;
let atc;

test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  dashboard = new DashboardPage(page);
  atc = new ATC(page);
  await dashboard.accessApplication();
});

test('TC_ATC_003: Verify user can remove item from cart', async () => {
  await atc.clickOnAddToCartButton();
  await atc.verifyItemAddedToCart();
  await atc.navigateToShoppingCart();
  await atc.removeItemFromCart();
  await atc.verifyItemRemovedFromCart();
});
