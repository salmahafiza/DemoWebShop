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
        this.continueShoppingButton = page.locator('button.button-2 continue-shopping-button');
        this.discountCopun =page.locator('input.discount-coupon-code');
        this.errorOnWrongCoupon = page.locator('.message');
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
    async continueShopping() {
        await this.continueShoppingButton.click();
        console.log('Continuing shopping');
    }
    async assertWithCheckoutButton() {
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/onepagecheckout');
    }
    async applyDiscountCoupon(couponCode) {
        await this.discountCopun.fill(couponCode);
        console.log(`Applying discount coupon: ${couponCode}`);
      
    }
    async clickOnApplyCouponButton() {
        await this.discountCopunButton.click();
        console.log('Clicking on Apply Coupon button');
    }
    async assertingWithDiscountCoupon() {
        await expect(this.errorOnWrongCoupon).toHaveText("The coupon code you entered couldn't be applied to your order");
    }

}

module.exports = { ATC };
