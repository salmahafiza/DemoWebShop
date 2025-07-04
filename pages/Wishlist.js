const { expect } = require("@playwright/test");

class WishlistPage {
    constructor(page) {
        this.page = page;
        this.wishlist_Link = this.page.getByRole('link', { name: /Wishlist/i }).first();
        this.wishlist_Qty = this.page.locator("//a[@href='/wishlist']//span[@class='wishlist-qty']");
        this.wishlist_Btn = this.page.getByRole('button', { name: 'Add to wishlist' });
        this.wishlist_ShareLink = this.page.locator('.share-info');
        this.addToCartBtn = this.page.locator('input[value="Add to cart"]');
        this.productLinkInWishlist = page.locator('.wishlist-content .product a');
        this.productTitleOnPDP = page.locator('div.product-name h1');
        this.qtyInputs = page.locator('input.qty-input');
        this.updateBtnonWishhlist = this.page.locator('input[name="updatecart"]');
        this.pricePerItemElement = page.locator('span.product-unit-price');
        this.totalPriceElement = page.locator('span.product-subtotal');
    }
    async navigateToWishlist() {
        await this.wishlist_Link.click();
        console.log("Navigated to Wishlist");
    }
    async assertWishlistPageUrl() {
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/wishlist');
        console.log("Wishlist URL is correct");
    }
    async clickAddToWishlistButton() {
        await this.wishlist_Btn.click();
        console.log("Clicked on Add to Wishlist button");
    }
    async clickSharedWishlistLink() {
        await this.wishlist_ShareLink.click();
        console.log("Clicked on Shared Wishlist link");
    }
    async assertWishlistURL() {
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/wishlist');
        await expect(this.addToCartBtn).toBeVisible();
        console.log("Verify WishList URL $ Add to Cart button is visible.");
    }
    async navigateToProductDetailsFromWishlist() {
        const productName = await this.productLinkInWishlist.textContent();
        await this.productLinkInWishlist.click();
        await expect(this.productTitleOnPDP).toHaveText(productName.trim());
        console.log(`Navigated to PDP for product: ${productName.trim()}`);
    }
    async updateProductQuantityByIndex(index, quantity) {
        await expect(this.qtyInputs.nth(index)).toBeVisible();
        await this.qtyInputs.nth(index).fill(quantity.toString());
        await this.updateBtnonWishhlist.click();
        await expect(this.qtyInputs.nth(index)).toHaveValue(quantity.toString());
        console.log(`Updated product ${index + 1} quantity to: ${quantity}`);
    }
    async assertWishlistCountMatchesTotalQty() {
        const count = await this.qtyInputs.count();
        let totalQty = 0;
        for (let i = 0; i < count; i++) {
            const value = await this.qtyInputs.nth(i).inputValue();
            totalQty += parseInt(value, 10);
        }
        const expectedQtyText = `(${totalQty})`;
        await expect(this.wishlist_Qty).toHaveText(expectedQtyText);
        console.log(`Wishlist badge count (${expectedQtyText}) matches total quantity (${totalQty})`);
    }
    async priceUpdatedWithQty() {
        const count = await this.qtyInputs.count();
        for (let i = 0; i < count; i++) {
            const qty = parseInt(await this.qtyInputs.nth(i).inputValue(), 10);
            const priceText = await this.pricePerItemElement.nth(i).textContent();
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            const totalText = await this.totalPriceElement.nth(i).textContent();
            const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));
            const expected = price * qty;
            console.log(`Item ${i + 1}:
                        Quantity: ${qty}
                        Price per item: ${price}
                        Expected Total: ${expected}
                        Displayed Total: ${total}
                                `);
            expect(total).toBeCloseTo(expected, 2);
        }
        console.log(`Price updated with quantity`);
    }
    async verifyProductDetailsInWishlist(expectedName, expectedPrice, expectedQty, expectedTotal) {
        const productRow = this.page.locator('tr.cart-item-row', { hasText: expectedName });
        const name = productRow.locator('.product a');
        const unitPrice = productRow.locator('.product-unit-price');
        const quantity = productRow.locator('input.qty-input');
        const total = productRow.locator('.product-subtotal');
        await expect(name).toHaveText(expectedName);
        await expect(unitPrice).toHaveText(expectedPrice);
        await expect(quantity).toHaveValue(expectedQty.toString());
        await expect(total).toHaveText(expectedTotal);

        console.log(`Verified product: ${expectedName}`);
        console.log(`Price: ${expectedPrice}, Qty: ${expectedQty}, Total: ${expectedTotal}`);
    }
}
module.exports = { WishlistPage };