import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PLP } = require('../pages/PLP')


let login;
let dashboard;
let plp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    plp = new PLP(page);
    await dashboard.accessApplication();
});

test('TC_PLP_001: Verify Books category displays correct products', async () => {
    await plp.clickOnCategory('Books');
    await plp.verifyPageTitle('Books');
});

test('TC_PLP_002: Verify Computers category displays desktops, notebooks, and accessories', async () => {
    await plp.clickOnCategory('Computers');
    await plp.verifyPageTitle('Computers');
    await plp.verifySubCategory('Desktops');
    await plp.verifySubCategory('Notebooks');
    await plp.verifySubCategory('Accessories');
});

test('TC_PLP_003: Verify Desktops category displays desktop items', async () => {
    await plp.clickOnCategory('Computers');
    await plp.clickOnSubCategory('Desktops');
    await plp.verifyPageTitle('Desktops');
});

test('TC_PLP_004: Verify Notebooks category displays notebook items', async () => {
    await plp.clickOnCategory('Computers');
    await plp.clickOnSubCategory('Notebooks');
    await plp.verifyPageTitle('Notebooks');
});

test('TC_PLP_005: Verify Accessories category displays accessories', async () => {
    await plp.clickOnCategory('Computers');
    await plp.clickOnSubCategory('Accessories');
    await plp.verifyPageTitle('Accessories');
});

test('TC_PLP_006: Verify Electronics category displays cameras, photo, and cell phones', async () => {
    await plp.clickOnCategory('Electronics');
    await plp.verifyPageTitle('Electronics');
    await plp.verifySubCategory('Camera, photo');
    await plp.verifySubCategory('Cell phones');
});

test('TC_PLP_009: Verify Apparel & Shoes displays various clothing and footwear', async () => {
    await plp.clickOnCategory('Apparel & Shoes');
    await plp.verifyPageTitle('Apparel & Shoes');
});

test('TC_PLP_010: Verify Jewelry category displays variety of jewelry products', async () => {
    await plp.clickOnCategory('Jewelry');
    await plp.verifyPageTitle('Jewelry');
});

test('TC_PLP_011: Verify Gift Cards category displays different types of gift cards', async () => {
    await plp.clickOnCategory('Gift Cards');
    await plp.verifyPageTitle('Gift Cards');
});

test('TC_PLP_020: Verify products displayed within display per page', async () => {
    await plp.clickOnCategory('Digital downloads');
    await plp.selectProductsPerPage(4);
    const displayedCount = await plp.getDisplayedProductCount();
    expect(displayedCount).toBeLessThanOrEqual(4);
});

test('TC_PLP_021: Verify user can navigate to next page', async () => {
    await plp.clickOnCategory('Books');
    await plp.selectProductsPerPage(4);

    const initialProductCount = await plp.getDisplayedProductCount();
    expect(initialProductCount).toBeGreaterThan(0);

    await plp.clickNextPage();
    const newProductCount = await plp.getDisplayedProductCount();
    expect(newProductCount).toBeGreaterThan(0);
});

test('TC_PLP_022: Verify user can navigate to previous page', async () => {
    await plp.clickOnCategory('Books');
    await plp.selectProductsPerPage(4);
    await plp.clickNextPage();
    await plp.clickPreviousPage();
    const ProductCount = await plp.getDisplayedProductCount();
    expect(ProductCount).toBeGreaterThan(0);
});

test('TC_PLP_023: Verify no next button on last page', async () => {
    await plp.clickOnCategory('Books');
    await plp.selectProductsPerPage(4);
    while (await plp.isNextButtonVisible()){
        await plp.clickNextPage();
    }

    console.log('Reached last page, verifying no next button');

});

test('TC_PLP_024: Verify switching between Grid and List view', async () => {
    await plp.clickOnCategory('Books');
    console.log('Switched to List View');
    await plp.switchToListView();
    await plp.verifyListViewVisible();
    console.log('List View Verified');

    console.log('Switched to Grid View');
    await plp.switchToGridView();
    await plp.verifyGridViewVisible();
    console.log('Grid View Verified');
});

test('TC_PLP_025: Verify product ratings are visible', async () => {
    await plp.clickOnCategory('Books');
    const hasRatings = await plp.verifyRatingsDisplay();
    expect(hasRatings).toBe(true);
    console.log('Ratings Verified on PLP');
});



