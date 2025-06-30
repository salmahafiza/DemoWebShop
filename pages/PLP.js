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
    this.productPrices = page.locator('.prices');
    this.addToCartButtons = this.page.locator('input.button-2.product-box-add-to-cart-button');
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
  async verifyAllProductPricesDisplayed() {
    const prices = await this.productPrices.allTextContents();
    console.log(`All Product Prices Displayed: ${prices.join(', ')}`);
    expect(prices.length).toBeGreaterThan(0);

    for (const price of prices) {
      expect(price.trim().length).toBeGreaterThan(0);
    }
  }
  async verifyAllAddToCartButtonsDisplayed() {
    const totalProducts = await this.productTitles.count();
    const totalButtons = await this.addToCartButtons.count();

    console.log(`Total Products on Page: ${totalProducts}`);
    console.log(`Total 'Add to Cart' Buttons Found: ${totalButtons}`);

    if (totalButtons < totalProducts) {
      console.warn(`Missing 'Add to cart' buttons for ${totalProducts - totalButtons} products`);
    }

    for (let i = 0; i < totalButtons; i++) {
      const value = await this.addToCartButtons.nth(i).getAttribute('value');
      console.log(`Button ${i + 1} Value: ${value}`);
      expect(value?.trim().toLowerCase()).toBe('add to cart');
    }

    expect(totalButtons).toBeGreaterThan(0);
  }

}

module.exports = { PLP };
