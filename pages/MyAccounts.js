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
        this.orderDetailsPageTitle = page.locator("div[class='page-title'] h1");
        this.orderDetailButton = page.locator(".button-2.order-details-button");
        this.field_firstName = page.locator("input#FirstName");
        this.saveBtn = page.locator(
            "input[class='button-1 save-customer-info-button']"
        );
        this.pageTitle = page.locator("div[class='page-title'] h1");


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
    async verifyOderDetails(orderDetailTitle) {
        let num;
        let expectedText;
        if (orderDetailTitle === "Order status") {
            num = 1;
            expectedText = "Order status: Pending";
        } else if (orderDetailTitle === "Order Date") {
            num = 2;
            expectedText = "Order Date:  7/1/2025 11:28:35 AM";
        } else if (orderDetailTitle === "Order Total") {
            num = 3;
            expectedText = "Order Total: 200.00";
        }
        const orderDetails = this.page.locator(
            `body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(${num})`
        );
        expect(orderDetails).toHaveText(expectedText);
    }
    async verifyOrderDetailsPageTitle(title) {
        await expect(this.orderDetailsPageTitle).toHaveText(title);
    }

    async clickOnOrderDetails() {
        await this.orderDetailButton.first().click();
    }
    async assertPageTitle(title) {
        await expect(this.pageTitle).toHaveText(title);
    }
    async wait() {
        await this.page.waitForTimeout(3000);
    }
    async enterFirstName(firstName = "Ali") {
        await this.field_firstName.fill(firstName);
        console.log(firstName)
    }
    async clickOnSaveBtn() {
        await this.saveBtn.click();
    }

}
module.exports = { MyAccountPage };

