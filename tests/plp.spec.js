import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PLP } = require('../pages/PLP')
const { PDP } = require('../pages/PDP');


let login;
let dashboard;
let plp;
let pdp
test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    pdp = new PDP(page);
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

test('TC_PLP_012: Ensure all products title should be displayed', async () => {
    await plp.clickOnCategory('Books');
    await plp.verifyAllProductTitlesDisplayed();
});

test('TC_PLP_013: Ensure Each Product has image', async () => {
    await plp.clickOnCategory('Books');
    await plp.verifyAllProductImagesDisplayed();
});

test('TC_PLP_014: Price should be diisplayed on all products on PLP', async () => {
    await plp.clickOnCategory('Books');
    await plp.verifyAllProductPricesDisplayed();
});

test('TC_PLP_015: Add to cart button should exists on each item', async () => {
    await plp.clickOnCategory('Books');
    await plp.verifyAllAddToCartButtonsDisplayed();
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

test('TC_PLP_019 : Product sorted from Z to A  on PLP', async ({ page }) => {
   await plp.clickOnCategory('Apparel & Shoes');
   await plp.selectReverseSortForAlphabet();
   await plp.verifySortingOptionsInReverseAlphabeticalOrder();
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

test('TC_PLP_026 : Verify Add to Cart Button disables when product is out of stock or unavailable',async ({ page }) => {
    await pdp.NavigateToDifferentCategoriesWithAssert('Books');
    await pdp.NavigateToProductPDP('Computing and Internet');
    await plp.verifyAvailabilityStatus();
});



