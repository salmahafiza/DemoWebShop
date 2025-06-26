import { test, expect } from '@playwright/test';
const { DashboardPage } = require('../pages/DashboardPage');
const { PDP_Page } = require('../pages/PDP');

let dashboard;
let pdp;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    pdp = new PDP_Page(page);
    await dashboard.accessApplication();
});

test('TC_PDP_001: Verify that product details are displayed correctly', async ({ page }) => {
    await pdp.NavigateToDifferentCategoriesWithAssert('Electronics');
    await pdp.NavigateToSubcategory('Cell phones');
    const { plpProductPrice, plpProductName } = await pdp.getPLPProductDetails();
    await pdp.NavigateToProductPDP('Smartphone');
    await pdp.VerifyandAssertPDPWithPLP(plpProductName, plpProductPrice);
});

test('TC_PDP_002: Verify that product can be added to the cart', async ({ page }) => {
    await pdp.NavigateToDifferentCategoriesWithAssert('Electronics');
    await pdp.NavigateToSubcategory('Cell phones');
    const { plpProductPrice, plpProductName } = await pdp.getPLPProductDetails();
    await pdp.NavigateToProductPDP('Smartphone');
    await pdp.VerifyandAssertPDPWithPLP(plpProductName, plpProductPrice);
    await pdp.addToCart();
    await pdp.verifyProductAddedToCart();
});
