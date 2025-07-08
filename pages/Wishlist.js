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
        this.jewelryMenuLink = page.locator('a[href="/jewelry"]').first();
        this.lengthTextbox = this.page.locator('.textbox');
        this.addToWishlistBtn = page.locator('.add-to-wishlist-button');
        this.successMsg = page.locator('#bar-notification .content', { hasText: 'The product has been added to your' });
        this.updateCartBtn = this.page.locator('input[name="updatecart"]');
        this.emailFriendBtn = this.page.locator('.email-a-friend-wishlist-button');
        this.wishlist_emptyMessage = this.page.locator('.wishlist-content');
        this.removeCheckboxes = this.page.locator('input[name="removefromcart"]');
        this.wishlist_emptyMessage = this.page.locator('.wishlist-content');
        this.wishlist_emptyMessage = this.page.locator('.wishlist-content');
    }
    async navigateToWishlist() {
        await this.wishlist_Link.click();
        console.log("Navigated to Wishlist");
    }
    async assertWishlistPageUrl() {
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/wishlist');
        console.log("Wishlist URL is correct");
    }
    async verifyPageTitle(expectedTitle) {
        await expect(this.pageTitle).toHaveText(expectedTitle);
    }
    async navigateToJewelryCategory() {
        await this.jewelryMenuLink.click();
    }
    async clickProduct(productName) {
        const product = this.page.locator('.product-title a', { hasText: productName });
        await product.click();
    }
    async enterLength(expectedLength) {
        await this.lengthTextbox.fill(expectedLength.toString());
    }
    async clickAddToWishlistButton() {
        await this.wishlist_Btn.click();
        console.log("Clicked on Add to Wishlist button");
    }
    async verifyWishlistAddSuccessMsg() {
        await expect(this.successMsg).toBeVisible();
    }
    async verifyItemOnWishlistScreen(productName) {
        const productLink = this.page.locator('.product a', { hasText: productName });
        await expect(productLink).toHaveText(productName);
        await expect(productLink).toBeVisible();
    }
    async removeItemFromWishlist(productName) {
        const productRow = this.page.locator('tr', { hasText: productName });
        const removeCheckbox = productRow.locator('input[name="removefromcart"]');
        await removeCheckbox.check();
    }
    async clickUpdateCartBtn() {
        await this.updateCartBtn.click();
    }
    async addItemToCartFromWishlist(productName) {
        const productRow = this.page.locator('tr', { hasText: productName });
        const addToCartCheckbox = productRow.locator('input[name="addtocart"]');
        await addToCartCheckbox.check();
        await this.addToCartBtn.click();
    }
    async shareWishlistItemViaEmail() {
        await this.emailFriendBtn.click();
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
    async updateProductQuantity(quantity) {
        await this.inputQty.fill(quantity.toString());
        await this.updateBtnonWishhlist.click();
        await expect(this.inputQty).toHaveValue(quantity.toString());
        const expectedQtyText = `(${quantity})`;
        await expect(this.wishlist_Qty).toHaveText(expectedQtyText);
        console.log(`Updated product quantity to: ${quantity}`);
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
    async verifyWishlistEmpty() {
        await expect(this.wishlist_emptyMessage).toBeVisible();
        console.log("Verified Wishlist is empty");

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
    async verifyQuantityLimitExceeded(index, limit = 50) {
        await expect(this.qtyInputs.nth(index)).toBeVisible();
        const value = await this.qtyInputs.nth(index).inputValue();
        const numericValue = parseInt(value, 10);

        if (numericValue > limit) {
            console.log(` Product ${index + 1} quantity (${numericValue}) exceeds the limit of ${limit}.`);
        } else {
            console.log(` Product ${index + 1} quantity (${numericValue}) is within the limit of ${limit}.`);
        }
    }
    async reloadPage() {
        await this.page.reload();
        console.log(" Page reloaded successfully.");
    }
    async updateQtywithEnterkey(index, quantity) {
        await expect(this.qtyInputs.nth(index)).toBeVisible();
        await this.qtyInputs.nth(index).fill(quantity.toString());
        await this.qtyInputs.nth(index).press('Enter');
        await expect(this.qtyInputs.nth(index)).toHaveValue(quantity.toString());
        console.log(`Updated product ${index + 1} quantity to: ${quantity}`);
    }
    async clearWishlist() {
        await this.navigateToWishlist();
        const count = await this.removeCheckboxes.count();
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                await this.removeCheckboxes.nth(i).check();
            }
            await this.updateBtnonWishhlist.click();
            console.log(`Cleared ${count} items from wishlist`);
        } else {
            console.log(`Wishlist already empty`);
        }
    }
    async verifyProductInWishlist(productName) {
        const productRow = this.page.locator('tr.cart-item-row', {
            has: this.page.locator('td.product', { hasText: productName })
        });
        await expect(productRow).toBeVisible();
        console.log(`Item "${productName}" is visible in wishlist`);
    }
    async removeMultipleItemsFromWishlist() {
        const checkboxes = this.page.locator('input.remove-from-cart');
        const checkboxCount = await checkboxes.count();

        console.log(`Found ${checkboxCount} items in wishlist.`);

        for (let i = 0; i < checkboxCount; i++) {
            await checkboxes.nth(i).check();
            console.log(` Checked item ${i + 1}`);
        }
    }

    async verifyWishlistEmpty() {
        await expect(this.wishlist_emptyMessage).toBeVisible();
        console.log("Verified Wishlist is empty");

    }
    async removeMultipleItemsFromWishlist() {
        const checkboxes = this.page.locator('input.remove-from-cart');
        const checkboxCount = await checkboxes.count();

        console.log(`Found ${checkboxCount} items in wishlist.`);

        for (let i = 0; i < checkboxCount; i++) {
            await checkboxes.nth(i).check();
            console.log(` Checked item ${i + 1}`);
        }
    }

    async verifyWishlistEmpty() {
        await expect(this.wishlist_emptyMessage).toBeVisible();
        console.log("Verified Wishlist is empty");

    }
}
module.exports = { WishlistPage };