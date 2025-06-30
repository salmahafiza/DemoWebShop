import { expect } from '@playwright/test';
class PLP {
  constructor(page) {
    this.page = page;

    // Locators
    this.categoryMenu = page.locator('ul.top-menu');
    this.subCategoryBlock = page.locator('div.block-category-navigation');
    this.pageTitle = page.locator('div.page-title h1');
    this.productTitles = page.locator('.product-title a');

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
  async selectPriceLowToHigh() {
    console.log('Selecting Price: Low to High');
    await this.page.locator('#products-orderby').selectOption({ label: 'Price: Low to High' });
  }
  async verifyPriceRange(minPrice, maxPrice) {
    const priceLocator = this.page.locator("//span[@class='price actual-price']");

    await priceLocator.first().waitFor({ state: 'visible', timeout: 5000 });
    const prices = await priceLocator.allTextContents();
    console.log(`Verifying Price Range: ${minPrice} - ${maxPrice}`);
    for (const price of prices) {
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
      expect(numericPrice).toBeGreaterThanOrEqual(minPrice);
      expect(numericPrice).toBeLessThanOrEqual(maxPrice);
    }
  }
  async selectSortForAlphabet() {
    console.log('Selecting Name: A to Z');
    await this.page.locator('#products-orderby').selectOption({ label: 'Name: A to Z' });
  }
  async verifySortingOptionsInAlphabeticalOrder() {
    console.log('Verifying products displayed are sorted alphabetically A to Z');
    await this.productTitles.first().waitFor({ state: 'visible', timeout: 5000 });

    const productNames = await this.productTitles.allTextContents();

    const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));

    expect(productNames).toEqual(sortedProductNames);

    console.log(' Products are sorted alphabetically A to Z.');
  }


}

module.exports = { PLP };
