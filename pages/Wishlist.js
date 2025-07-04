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


}
module.exports = { WishlistPage };