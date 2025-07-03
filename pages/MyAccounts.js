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
        this.field_LastName = page.locator("input#LastName");
        this.field_registrationEmail = page.locator("input#Email");
        this.radioButtonGenderMale = page.locator('input#gender-male');
        this.radioButtonGenderFemale = page.locator('input#gender-female');
        this.pdfInvoice = page.locator(".button-2.pdf-order-button");
        this.printPDF = page.locator(".button-2.print-order-button");
        this.newTab2;
        this.reorderBtn = page.locator("input[class='button-1 re-order-button']");

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
    async selectGender(gender = "male") {
        if (gender.toLowerCase() === "female") {
            await this.radioButtonGenderFemale.check();
        } else {
            await this.radioButtonGenderMale.check();
        }
    }
    async verifyInputFirstNameField(firstName) {
        await expect(this.field_firstName).toHaveValue(firstName);
    }

    async verifyInputLastNameField(lastName) {
        await expect(this.field_LastName).toHaveValue(lastName);
    }

    async verifyInputEmailField(email) {
        await expect(this.field_registrationEmail).toHaveValue(email);
    }
    async enterRegistrationEmail(email) {

        console.log(email);
        if (email == '' || !email) {
            const randomNumber = Math.floor(Math.random() * 100000);
            const email = `dummy${randomNumber}@test.com`;
            await this.field_registrationEmail.fill(email);
            console.log(email);
        } else {
            await this.field_registrationEmail.fill(email);
            console.log(email);
        }


    }
    async enterLastName(lastName = "Tester") {
        await this.field_LastName.fill(lastName);
        console.log(lastName)
    }

    async clickOnPdfInvoice() {
        await this.pdfInvoice.click();
    }

    async clickOnPrintPDF() {
        const [newTab] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.printPDF.click(),
        ]);
        this.newTab2 = await newTab.url();
    }

    async verifyPrintDialogBox() {
        expect(await this.newTab2).toBe(
            "https://demowebshop.tricentis.com/orderdetails/print/2033331"
        );
    }

    async clickOnReOrderBtn() {
        await this.reorderBtn.click();
    }
}
module.exports = { MyAccountPage };

