import { expect } from '@playwright/test';

class ATC {
    constructor(page) {
        this.page = page;

        // Locators
        this.addToCartButtons = page.locator('input.button-2.product-box-add-to-cart-button');
        this.clickOnCart = this.page.locator('a.ico-cart:has(span.cart-label:has-text("Shopping cart"))');
        this.cartCount = page.locator('.cart-qty');
        this.removeItemCheckbox = page.locator('input[name="removefromcart"]');
        this.updateCartBtn = this.page.locator('input[name="updatecart"]');
        this.quantityInput = page.locator('input.qty-input');
        this.checkTermsConditions = page.locator('input#termsofservice');
        this.checkoutButton = page.locator('button#checkout');
        this.emptyCartMessage = page.locator('.order-summary-content');
        this.ProductPriceOnCart = page.locator('.product-unit-price');
        this.pricePerItemElement = page.locator('span.product-unit-price');
        this.totalPriceElement = page.locator('span.product-price.order-total > strong');
        this.termsErrorMessageBox = page.locator('#terms-of-service-warning-box');
        this.productTitleLinkOnCart = page.locator('a.product-name');
        this.AddGiftCardButton = page.locator('//input[@name="applygiftcardcouponcode"]');
        this.giftCardErrorMessageBox = page.locator('.message');
        this.discountCopunButton = page.locator("//input[@class='button-2 apply-discount-coupon-code-button']");

    }

    async clickOnAddToCartButton() {
        await this.addToCartButtons.nth(1).click();
        console.log('Clicking on Add to Cart button');
    }

    async navigateToShoppingCart() {
        await this.clickOnCart.click();
        console.log('Navigating to Shopping Cart');
    }

    async verifyItemAddedToCart() {
        const quantityValue = await this.page.locator('div.quantity span').textContent();
        console.log(`Quantity is: ${quantityValue.trim()}`);
        expect(quantityValue.trim()).toBe('1');
    }

    async removeItemFromCart() {
        await this.removeItemCheckbox.first().check();
        await this.updateCartBtn.click();
        console.log('Removing item from cart');
    }

    async verifyItemRemovedFromCart() {
        const countText = await this.cartCount.textContent();
        console.log(`Cart Count Displayed: "${countText.trim()}"`);
        expect(countText.trim()).toBe('(0)');
    }

    async updateQtyonCart() {
        const quantityInput = this.quantityInput.first();
        await quantityInput.fill('2');
        await this.updateCartBtn.click();
        console.log('Updating quantity in cart');
    }

    async verifyQtyUpdated() {
        const updatedQuantity = await this.page.locator('div.quantity span').textContent();
        console.log(`Updated Quantity is: ${updatedQuantity.trim()}`);
        expect(updatedQuantity.trim()).toBe('2');
    }

    async acceptTermsAndConditions() {
        await this.checkTermsConditions.check();
        console.log('Accepting terms and conditions');

    }

    async clickOnCheckoutButton() {
        await this.checkoutButton.click();
        console.log('Clicking on Checkout button');
    }

    async verifyEmptyCartMessage() {
        const message = this.emptyCartMessage;
        await expect(message).toHaveText('Your Shopping Cart is empty!');
        console.log('Verifying empty cart message');
    }

    async priceUpdatedWithQty() {
        const qty = await this.quantityInput.first().inputValue();
        console.log(`Quantity: ${qty}`);

        const priceText = await this.pricePerItemElement.first().textContent();
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        console.log(`Price per item: ${price}`);

        const expectedTotal = price * parseInt(qty);

        const totalText = await this.totalPriceElement.textContent();
        const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));
        console.log(`Total displayed: ${total}`);

        expect(total).toBeCloseTo(expectedTotal, 2);
        console.log(`Price updated with quantity: ${expectedTotal}`);
    }

    async verifyTermsErrorMessageDisplayed() {
        await expect(this.termsErrorMessageBox).toHaveText('Please accept the terms of service before the next step.');
        console.log('Verifying terms error message is displayed');
    }

    async navigateToProductFromCart() {
        const productTitle = await this.productTitleLinkOnCart.textContent();
        console.log(`Product Title: ${productTitle}`);
        await this.productTitleLinkOnCart.click();
        const currentUrl = this.page.url();
        console.log(`Current URL: ${currentUrl}`);
        const expectedSlug = productTitle
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
        expect(currentUrl).toContain(expectedSlug);
        console.log(`Navigated to product page: ${expectedSlug}`);
    }

    async clickOnAddGiftCardButton() {
        await this.AddGiftCardButton.click();
        console.log('Clicking on Add Gift Card button');
    }

    async verifyEmptyGiftCardAndCouponCodeErrorMessage() {
        await expect(this.giftCardErrorMessageBox).toHaveText("The coupon code you entered couldn't be applied to your order");
        console.log('Verifying empty gift card code error message is displayed');
    }

    async clickOnApplyCouponButton() {
        await this.discountCopunButton.click();
        console.log('Clicking on Apply Coupon button');
    }
}

module.exports = { ATC };

