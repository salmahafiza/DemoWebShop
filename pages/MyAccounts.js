import { expect } from "@playwright/test";
class MyAccountPage {
    constructor(page) {
        this.page = page;
        this.hyperLinkMyAccount = page.locator(
            "div[class='header-links'] a[class='account']"
        );
        this.myAccountPageTitle = page.locator("div[class='page-title'] h1");
        this.noOrderText = page.locator(".order-list");
        this.logoutHyperLink = page.locator(".ico-logout");


    }

    async navigateMyAccountMenuItems(myAccountCategory) {
        const menuItem = this.page
            .locator(`[href="/customer/${myAccountCategory}"]`)
            .first();
        await menuItem.click();
    }
    async verifyMyAccountPagesTitle(title) {
        await expect(this.myAccountPageTitle).toHaveText(`My account - ${title}`);
    }
    async clikcOnMyAccount() {
        await this.hyperLinkMyAccount.click();
    }

    async navigateMyAccountMenuItems(myAccountCategory) {
        const menuItem = this.page
            .locator(`[href="/customer/${myAccountCategory}"]`)
            .first();
        await menuItem.click();
    }
    async verifyMyAccountPagesTitle(title) {
        await expect(this.myAccountPageTitle).toHaveText(`My account - ${title}`);
    }
    async verifyNoOrders() {
        await expect(this.noOrderText).toHaveText("No orders");
    }
    async clickOnLogout() {
        await this.logoutHyperLink.click();
    }
}
module.exports = { MyAccountPage };

