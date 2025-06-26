import { expect } from '@playwright/test';
const { Users } = require('../test-data/Users');

class PDP {
  constructor(page) {
    this.page = page;

    //Locators
    this.productReviews = page.locator(".product-review-links");
    this.assertReviews = page.locator("div[class='product-review-list'] div[class='title'] strong");
  }

  async verifyProductReviews(){
    await this.productReviews.click();
    await expect(this.assertReviews).toHaveText('Existing reviews');
  }


}



module.exports = { PDP };