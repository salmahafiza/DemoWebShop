const { expect } = require("@playwright/test");

class WishlistPage {
    constructor(page) {
        this.page = page;
        this.wishlistLink = this.page.getByRole('link', { name: 'Wishlist (0)' });
        this.wishlistQty = this.page.locator("//a[@href='/wishlist']//span[@class='wishlist-qty']");
    }
    async navigateToWishlist() {
        await this.wishlistLink.click();
    }
    async assertWishListPage(){
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/wishlist');
    }
}
module.exports = { WishlistPage };