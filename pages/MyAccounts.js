import { expect } from "@playwright/test";
class MyAccountPage {
    constructor(page) {
        this.page = page;
        this.hyperLinkMyAccount = page.locator(
            "div[class='header-links'] a[class='account']"
        );
        this.myAccountPageTitle = page.locator("div[class='page-title'] h1");


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
}
module.exports = { MyAccountPage };

