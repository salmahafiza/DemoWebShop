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
}

module.exports = { ATC };
