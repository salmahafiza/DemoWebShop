import { expect } from '@playwright/test';
const { Users } = require('../test-data/Users');

class PDP {
  constructor(page) {
    this.page = page;

    //Locators
    this.productReviews = page.locator(".product-review-links");
    this.assertReviews = page.locator("div[class='product-review-list'] div[class='title'] strong");
    this.productPrice = page.locator('.product-price');
    this.availabilityStatus = page.locator('.stock .value');

  }

  async verifyProductReviews(){
    await this.productReviews.click();
    await expect(this.assertReviews).toHaveText('Existing reviews');
  }
  async verifyProductPrice(){
    return await this.productPrice.textContent();
  }
  async getProductAvailability() {
    const availabilityLocator = this.availabilityStatus;
    await availabilityLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await availabilityLocator.textContent();
}

  


}



module.exports = { PDP };