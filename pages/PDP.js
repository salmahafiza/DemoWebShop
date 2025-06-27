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
    this.addtoCompare = page.locator("input[value='Add to compare list']");
    this.QtyUpdate = page.locator("#addtocart_43_EnteredQuantity");
    this.addToCart = page.locator("#add-to-cart-button-43");
    this.assertProduct2 = page.locator("img[title='Show details for Used phone']");
    this.emailAFriendButton = page.locator('input[value="Email a friend"]');
    this.friendEmailField = page.locator('#FriendEmail');
    this.yourEmailField = page.locator('#YourEmailAddress');
    this.personalMessageField = page.locator('#PersonalMessage');
    this.sendEmailButton = page.locator('input[name="send-email"]');
    this.successMessage = page.locator('.result');
    this.compare = page.locator('.compare-products-table');
    this.cartQuantityField = page.locator('.cart-qty');
    this.PDPproductName = page.locator('.product-name');
    this.PDPproductPrice = page.locator("//span[@class='price-value-43']");
    this.PLPtitle = page.getByRole("link", { name: "Smartphone", exact: true, });
    this.PLPPrice = page.locator(".product-item").nth(0).locator("span.price.actual-price");
    this.PLPproductPrice = page
          .locator(".product-item")
          .nth(0)
          .locator("span.price.actual-price");
   this.addToCartButton = page.locator("#add-to-cart-button-43");
    // this.addToWishlistButton = page.locator('.add-to-wishlist-button');
    // this.productDescriptionTab = page.locator('#product-tabs .product-description-tab');
      // this.productReviewsTab = page.locator('#product-tabs .product-reviews-tab');
      // this.productReviewsCount = page.locator('.review-count');
      // this.GoToElectronicCategory = page.locator('.Electronics');
  }

    async NavigateToDifferentCategoriesWithAssert(category) {
        await this.page
            .locator(`//li[@class='inactive']//a[normalize-space()='${category}']`)
            .click();
        await expect(
            this.page.locator(`//h1[normalize-space()='${category}']`)
        ).toHaveText(category);
    }

    async NavigateToSubcategory(subcategory) {
        const heading = await this.page.getByRole("heading", { name: subcategory }).first();
        await heading.locator("a").click();
    }

    async getPLPProductDetails() {
        const PLPPrice = (await this.PLPPrice.textContent()).trim();
        const PLPTitle = (await this.PLPtitle.textContent()).trim();
        console.log(`PLP Product Name: ${PLPTitle}`);
        console.log(`PLP Product Price: ${PLPPrice}`);
        return { plpProductPrice: PLPPrice, plpProductName: PLPTitle };
    }

    async NavigateToProductPDP(ProductName) {
        await this.page.locator(`//a[normalize-space()='${ProductName}']`).click();
        await expect(await this.page.locator(`//h1[normalize-space()='${ProductName}']`)).toBeVisible();
    }

    async VerifyandAssertPDPWithPLP(plpProductName, plpProductPrice) {
        await expect(this.PDPproductName).toBeVisible();
        await expect(this.PDPproductPrice).toBeVisible();
        const pdpProductName = (await this.PDPproductName.textContent()).trim();
        const pdpProductPrice = (await this.PDPproductPrice.textContent()).trim();
        console.log(`PDP Product Name: ${pdpProductName}`);
        console.log(`PDP Product Price: ${pdpProductPrice}`);
        expect(pdpProductName).toBe(plpProductName);
        expect(pdpProductPrice).toBe(plpProductPrice);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async verifyProductAddedToCart() {
        const cartNotification = this.page.locator(".bar-notification.success");
        await expect(cartNotification).toBeVisible();
        await expect(cartNotification).toContainText(
            "The product has been added to your shopping cart"
        );
    }

  async getCartQuantity() {
    return await this.cartQuantityField.textContent();
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
  async updateProductQuantity(quantity) {
    await this.QtyUpdate.fill(''); // Clear existing quantity
    await this.QtyUpdate.type(quantity.toString());
    await this.addToCart.click();
  }
  async clickOnProduct2(){
    await this.assertProduct2.click();
  }
  async clickOnAddToCompare(){
    await this.addtoCompare.click();
  }
  async verifyCompareProducts(){
    const compareList = await this.compare
    await expect(compareList).toContainText('Used phone');
    await expect(compareList).toContainText('Smartphone');

  }
  async clickEmailAFriend() {
    await this.emailAFriendButton.click();
  }
  async fillEmailForm(friendEmail, yourEmail, message) {
    await this.friendEmailField.fill(friendEmail);
    await this.yourEmailField.fill(yourEmail);
    await this.personalMessageField.fill(message);
  }
  async sendEmail() {
    await this.sendEmailButton.click();
  }
  async verifySuccessMessage() {
    await expect(this.successMessage).toHaveText("Your message has been sent.");
  }
}

module.exports = { PDP };