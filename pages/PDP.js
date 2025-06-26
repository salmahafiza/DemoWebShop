import { expect } from '@playwright/test';

class PDP{
    constructor(page) {
        this.page = page;
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


}

module.exports = { PDP };
