import { expect } from '@playwright/test';
class PLP {
  constructor(page) {
    this.page = page;

    // Locators
    this.categoryMenu = page.locator('ul.top-menu');
    this.subCategoryBlock = page.locator('div.block-category-navigation');
    this.pageTitle = page.locator('div.page-title h1');
    this.productTitles = page.locator('.product-title');
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
    // Wait for at least one price to be visible after navigation/sorting
    await priceLocator.first().waitFor({ state: 'visible', timeout: 5000 });
    const prices = await priceLocator.allTextContents();
    console.log(`Verifying Price Range: ${minPrice} - ${maxPrice}`);
    for (const price of prices) {
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
      expect(numericPrice).toBeGreaterThanOrEqual(minPrice);
      expect(numericPrice).toBeLessThanOrEqual(maxPrice);
    }
  }
  
}

module.exports = { PLP };
