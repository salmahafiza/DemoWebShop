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
    this.PDPImageGallery = page.locator('div[class="picture-thumbs"] div');
    this.cameraSubcategory = page
      .getByRole("heading", { name: "Camera, photo" })
      .getByRole("link");
    this.logoutHyperLink = page.locator(".ico-logout");
    this.PDPbox = page.locator('.product-essential');
    this.AvailabilityStatus = page.locator('.value');
    this.PDPAddtoCartButton = page.locator('#add-to-cart-button-13');
    this.EmailaFriendButton = page.locator('//input[@value="Email a friend"]');
    this.FriednEmailInput = page.locator('//input[@id="FriendEmail"]');
    this.SenderEmailInput = page.locator('//input[@id="YourEmailAddress"]');
    this.MessageInput = page.locator('//textarea[@id="PersonalMessage"]');
    this.SendEmailButton = page.locator('//input[@name="send-email"]');
    this.ThankYouMessage = page.locator('.result');
  }


  async getCartQuantity() {
    return await this.cartQuantityField.textContent();
  }
  async verifyProductReviews() {
    await this.productReviews.click();
    await expect(this.assertReviews).toHaveText('Existing reviews');
  }
  async verifyProductPrice() {
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
  async clickOnProduct2() {
    await this.assertProduct2.click();
  }
  async clickOnAddToCompare() {
    await this.addtoCompare.click();
  }
  async verifyCompareProducts() {
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
  async VerifyProductImageGallery() {
    let GalleryCount = await this.PDPImageGallery.count();
    if (GalleryCount > 0) {
      await this.PDPGalleryImage.click();
      await expect(this.POPUpImage).toBeVisible();
    }
    else {
      console.log("No Image Gallery Found in this Product.");
    }
  }
  async navigateToDifferentCategoriesWithAssert(category) {
    await this.page
      .locator(`//li[@class='inactive']//a[normalize-space()='${category}']`)
      .click();
    await expect(
      this.page.locator(`//h1[normalize-space()='${category}']`)
    ).toHaveText(category);
  }
  async clickOnElectronicsSubcategory() {
    await this.cameraSubcategory.click();
  }
  async clickOnLogout() {
    await this.logoutHyperLink.click();
  }

  async assertPageTitle(title) {
    await expect(this.pageTitle).toHaveText(title);
  }
  async wait() {
    await this.page.waitForTimeout(3000);
  }
  async NavigateToProductPDP(ProductName) {
    await this.page.locator(`//a[normalize-space()='${ProductName}']`).click();
    await expect(await this.page.locator(`//h1[normalize-space()='${ProductName}']`)).toBeVisible();
  }
  async VerifyPDPisVisible() {
    await expect(this.PDPbox).toBeVisible();
  }
  async verifyAvailability() {
    let Status = await this.AvailabilityStatus.textContent();
    if (Status.trim() === "In stock") {
      let PDPAddtoCartButtonText = "";
      if (!this.page.isClosed()) {
        const count = await this.PDPAddtoCartButton.count();
        if (count > 0) {
          PDPAddtoCartButtonText = await this.PDPAddtoCartButton.textContent();
        }
        else {
          PDPAddtoCartButtonText = "";
        }
      }
      if (PDPAddtoCartButtonText.trim() === "Add to cart") {
        console.log("Product is available and can be added to cart");
      }
      if (PDPAddtoCartButtonText.trim() === "") {
        console.log("Product is available but cannot be added to cart");
      }
    }
    else {
      console.log("Product is not available");
    }
  }
  async navigateToLoginPage() {
    await this.page.goto("https://demowebshop.tricentis.com/login");
  }
  async ClickOnEmailaFriendButton() {
    await this.EmailaFriendButton.click();
  }
  async FillDetailsForEmailAFriend(email, friendEmail, message) {
    await this.FriednEmailInput.fill(email);
    await this.SenderEmailInput.fill(friendEmail);
    await this.MessageInput.fill(message);
    await this.SendEmailButton.click();
  }
  async VerifyEmailSent() {
    let ThankyouMessageCount = 0;
    ThankyouMessageCount = await this.ThankYouMessage.count();
    let ErrorMessages = ["FriendEmail", "YourEmailAddress"];
    if (ThankyouMessageCount === 0) {
      for (let i = 0; i < ErrorMessages.length; i++) {
        let errorMessage = this.page.locator(`.field-validation-error[data-valmsg-for="${ErrorMessages[i]}"]`);
        if (await errorMessage.isVisible()) {
          console.log(`Error message for ${ErrorMessages[i]}: ${await errorMessage.textContent()}`);
        }
      }
      return;
    }
    else {
      await expect(this.ThankYouMessage).toBeVisible();
      await expect(this.ThankYouMessage).toContainText("Your message has been sent.");
    }
  }
}



module.exports = { PDP };