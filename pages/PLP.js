import { expect } from '@playwright/test';
class PLP {
  constructor(page) {
    this.page = page;

    // Locators
    this.categoryMenu = page.locator('ul.top-menu');
    this.subCategoryBlock = page.locator('div.block-category-navigation');
    this.pageTitle = page.locator('div.page-title h1');
    this.productTitles = page.locator('.product-title');
    this.productImages = page.locator('.product-item img');
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
  async verifyAllProductTitlesDisplayed() {
    const titles = await this.productTitles.allTextContents();
    console.log(`All Product Titles Displayed: ${titles}`);
    expect(titles.length).toBeGreaterThan(0);
    for (const title of titles) {
      expect(title.trim().length).toBeGreaterThan(0);
    }
  }
  async verifyAllProductImagesDisplayed() {
    const images = await this.productImages.all();
    console.log(`Total Product Images Found: ${images.length}`);
    expect(images.length).toBeGreaterThan(0);

    for (const image of images) {
      await expect(image).toBeVisible();
    }
  }


}

module.exports = { PLP };
