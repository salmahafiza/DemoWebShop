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
    this.PDPImageGallery = page.locator('div[class="picture-thumbs"] div');
    this.cameraSubcategory = page
      .getByRole("heading", { name: "Camera, photo" })
      .getByRole("link");
    this.computerSubcategory = page
      .getByRole("heading", { name: "Desktop" })
      .getByRole("link");
    this.desktopSubcategory = page
      .getByRole("heading", { name: "Build your own cheap computer" })
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
    this.addBuildYourOwnComputertoCart = page.locator('#add-to-cart-button-72');
    this.pdpDescription = page.locator('.full-description');
    this.quantityErrorMessage = page.locator(".content");
    this.ratingStars = page.locator("div[class='product-review-box'] div[class='rating'] div");
    this.img = page.locator("#main-product-img-43");
    this.productName = page.locator("div[class='master-wrapper-content'] div:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1) a:nth-child(1)");
    this.relatedProducts = page.locator("div[class='related-products-grid product-grid'] strong");
    this.relatedProductAddToCart = page.locator("div[class='related-products-grid product-grid'] input[value='Add to cart']");
    this.productAddedMessage = page.locator('.bar-notification.success');
    this.suggestedProductSection = page.locator("div.product-grid div.item-box");
    this.Message = page.locator(".content");
    this.recipientNameField = page.locator('#giftcard_1_RecipientName');
    this.recipientEmailField = page.locator('#giftcard_1_RecipientEmail');
    this.yourNameField = page.locator('#giftcard_1_SenderName');
    this.yourEmailField = page.locator('#giftcard_1_SenderEmail');
    this.addToCart = page.locator('#add-to-cart-button-1');
    this.errorMessage = page.locator('#bar-notification');
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

  async ProductName(){
    await this.productName.click();
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
  async clickOnComputersSubcategory() {
    await this.computerSubcategory.click();
  }
  async clickOnDesktopSubcategory() {
    await this.desktopSubcategory.click();
  }
  async addBuildYourOwnComputerToCart() {
    await this.addBuildYourOwnComputertoCart.click();

  }
    async verifyProductAddedToCart() {
    const cartNotification = this.page.locator(".bar-notification.success");
    await expect(cartNotification).toBeVisible();
    await expect(cartNotification).toContainText(
      "The product has been added to your shopping cart"
    );
  }
    async VerifyProductDescription() {
    await expect(this.pdpDescription).toBeVisible();
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
  async addSuggestedProductToCart() {
    const suggestedProductSection = await this.suggestedProductSection.nth(1); // Adjust index if needed
    await suggestedProductSection.scrollIntoViewIfNeeded();
    const addToCartButton = suggestedProductSection.locator('input[value="Add to cart"]');
    await addToCartButton.click();
  }
  async verifySuccessMessage(expectedMessage = 'The product has been added to your shopping cart') {
    const message = await this.Message.textContent();
    console.log('Displayed Success Message:', message.trim());
    await expect(this.Message).toContainText(expectedMessage);
  }
  async clickOnProductByName(productName) {
    await this.page.locator(`a:has-text("${productName}")`).click();
  }
  async enterGiftCardDetails(data) {
    await this.recipientNameField.fill(data.recipientName);
    await this.recipientEmailField.fill(data.recipientEmail);
    await this.yourNameField.fill(data.yourName);
    await this.yourEmailField.fill(data.yourEmail);
  }
  async clickAddToCart() {
    await this.addToCart.click();
  }
  async verifyGiftCardErrorMessagesForName() {
    await expect(this.errorMessage).toContainText('Enter valid recipient name')
  }
  async verifyGiftCardErrorMessagesForEmail() {
    await expect(this.errorMessage).toContainText('Enter valid recipient email');
  }
}
    module.exports = { PDP };