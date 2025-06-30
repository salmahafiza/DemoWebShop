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

test('TC_PLP_009: Verify Apparel & Shoes displays various clothing and footwear..', async () => {
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
test('TC_PLP_007 : Verify that on clicking Cameras, pHoto option, related items should displayed', async () => {
    await plp.clickOnCategory('Electronics');
    await plp.clickOnSubCategory('Camera, photo');
    await plp.verifySubCategory('Camera, photo');

});
test('TC_PLP_008: Verify that on clicking Cell Phones, related items should displayed', async () => {
    await plp.clickOnCategory('Electronics');
    await plp.clickOnSubCategory('Cell phones');
    await plp.verifySubCategory('Cell phones');
});
test('TC_PLP_016 : Filter narrowws down the result', async ({ page }) => {
    await plp.clickOnCategory('Apparel & Shoes');
    await plp.verifySubCategory('Apparel & Shoes');
});
test('TC_PLP_017 : Verify that on clicking Price: Low to High, products are sorted accordingly', async ({ page }) => {
    await plp.clickOnCategory('Apparel & Shoes');
    await plp.selectPriceLowToHigh();
    await plp.verifyPriceRange(0, 1000);
});
test('TC_PLP_018 : Verify that on clicking  Name : A to Z, products are sorted accordingly', async ({ page }) => {
    await plp.clickOnCategory('Apparel & Shoes');
    await plp.selectSortForAlphabet();
    await plp.verifySortingOptionsInAlphabeticalOrder();
});
test.only('TC_PLP_019 : Product sorted from Z to A  on PLP', async ({ page }) => {
   await plp.clickOnCategory('Apparel & Shoes');
   await plp.selectReverseSortForAlphabet();
   await plp.verifySortingOptionsInReverseAlphabeticalOrder();
});