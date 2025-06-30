import { expect } from '@playwright/test';
class PLP {
  constructor(page) {
    this.page = page;

    // Locators
    this.categoryMenu = page.locator('ul.top-menu');
    this.subCategoryBlock = page.locator('div.block-category-navigation');
    this.pageTitle = page.locator('div.page-title h1');
    this.productTitles = page.locator('.product-title');
    this.productPerPage = page.locator("#products-pagesize");
    this.productGridItems = page.locator(".product-item");
    this.nextPage = page.locator(".next-page");
    this.previousPage = page.locator(".previous-page");
    this.listViewProducts = page.locator('.product-list');
    this.gridViewProducts = page.locator('.product-grid');
    this.viewModeDropdown = page.locator('#products-viewmode');
    this.ratingStars = page.locator('.rating');

  }

  async clickOnCategory(categoryName) {
    console.log(`Clicking on Category: ${categoryName}`);
    await this.categoryMenu.locator(`a:has-text("${categoryName}")`).first().click();
  }
  async clickOnSubCategory(subCategoryName) {
    console.log(`Clicking on Subcategory: ${subCategoryName}`);
    await this.subCategoryBlock.locator(`a:has-text("${subCategoryName}")`).first().click();
  }
  async verifyPageTitle(expectedTitle) {
    const title = await this.pageTitle.textContent();
    console.log(`Page Title Displayed: "${title.trim()}"`);
    expect(title.trim()).toBe(expectedTitle);
  }
  async verifySubCategory(subCategoryText) {
    const subCategory = this.subCategoryBlock.locator(`a:has-text("${subCategoryText}")`);
    console.log(`Verifying Subcategory is Visible: ${subCategoryText}`);
    await expect(subCategory).toBeVisible();
  }
  async selectProductsPerPage(count) {
    console.log(`Selecting ${count} products per page`);
    await this.productPerPage.selectOption(count.toString());
    await this.productGridItems.first().waitFor({ state: 'visible', timeout: 5000 });
  }
  async getDisplayedProductCount() {
    const count = await this.productGridItems.count();
    console.log(`Displayed Product Count: ${count}`);
    return count;
  }
  async clickNextPage() {
    await this.nextPage.click();
  }
  async clickPreviousPage(){
    await this.previousPage.click();
  }
  async isNextButtonVisible() {
    return await this.nextPage.isVisible();
  }
  async switchToListView() {
    await this.viewModeDropdown.selectOption({ label: 'List' });
  }
  async switchToGridView() {
    await this.viewModeDropdown.selectOption({ label: 'Grid' });
  }
  async verifyListViewVisible() {
    return await this.listViewProducts.isVisible();
  }

  async verifyGridViewVisible() {
    return await this.gridViewProducts.isVisible();
  }
  async verifyRatingsDisplay() {
    const ratingVisible = await this.ratingStars.first().isVisible();
    console.log('Ratings Visible:', ratingVisible);
    return ratingVisible;
  }


}

module.exports = { PLP };
