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
    this.addToCart = page.locator('#add-to-cart-button-43');
    this.assertProduct2 = page.locator("img[title='Show details for Used phone']");
    this.emailAFriendButton = page.locator('input[value="Email a friend"]');
    this.friendEmailField = page.locator('#FriendEmail');
    this.yourEmailField = page.locator('#YourEmailAddress');
    this.personalMessageField = page.locator('#PersonalMessage');
    this.sendEmailButton = page.locator('input[name="send-email"]');
    this.successMessage = page.locator('.result');
    this.compare = page.locator('.compare-products-table');
    this.cartQuantityField = page.locator('.cart-qty');
    this.quantityErrorMessage = page.locator(".content");
    this.ratingStars = page.locator("div[class='product-review-box'] div[class='rating'] div");
    this.img = page.locator("#main-product-img-43");
    this.productName = page.locator("div[class='master-wrapper-content'] div:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1) a:nth-child(1)");
    this.relatedProducts = page.locator("div[class='related-products-grid product-grid'] strong");
    this.relatedProductAddToCart = page.locator("div[class='related-products-grid product-grid'] input[value='Add to cart']"); 
    this.productAddedMessage = page.locator('.bar-notification.success');
  }

  async ProductName(){
    await this.productName.click();
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
    await this.page.reload();
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
  async verifyQuantityErrorMessage(expectedMessage = 'Quantity should be positive') {
    const actualMessage = await this.quantityErrorMessage.textContent();
    console.log('Displayed Error Message:', actualMessage.trim());
    await expect(this.quantityErrorMessage).toContainText(expectedMessage);
}
  async clickOnCategory(categoryName) {
    await this.page.locator(`ul.top-menu a:has-text("${categoryName}")`).first().click();
  }
  async clickOnSubCategory(subCategoryName) {
    await this.page.locator(`div.block-category-navigation a:has-text("${subCategoryName}")`).first().click();
  }
  async verifyRatingStars(){
    await expect(this.ratingStars).toBeVisible();
  }
  async verifyImgOfProduct(){
    await expect(this.img).toBeVisible();
  }
  async addRelatedProductToCart() {
    await this.relatedProductAddToCart.click(); 
  }
  async verifyProductAddedMessage() {
    await expect(this.productAddedMessage).toContainText('The product has been added to your shopping cart');
  }
}

module.exports = { PDP };