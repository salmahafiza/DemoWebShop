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

}

module.exports = { PLP };
