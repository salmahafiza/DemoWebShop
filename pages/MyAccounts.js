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
        this.radioButtonGenderMale = page.locator('#gender-male');
        this.radioButtonGenderFemale = page.locator('#gender-female');
        this.emailError = page.locator(".field-validation-error[data-valmsg-for='Email']");
        this.firstNameError = page.locator(".field-validation-error[data-valmsg-for='FirstName']");
        this.lastNameError = page.locator(".field-validation-error[data-valmsg-for='LastName']");
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

   /* async navigateMyAccountMenuItems(myAccountCategory) {
        const menuItem = this.page
            .locator(`[href="/customer/${myAccountCategory}"]`)
            .first();
        await menuItem.click();
    }
    async verifyMyAccountPagesTitle(title) {
        await expect(this.myAccountPageTitle).toHaveText(`My account - ${title}`);
    }*/
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
    async genderMale(){
    await expect(this.radioButtonGenderMale).toBeVisible();
    }

    async genderFemale(){
        await expect(this.radioButtonGenderFemale).toBeVisible();
    }

    async firstNameField(){
        await expect(this.field_firstName).toBeVisible();
    }

    async lastNameField(){
        await expect(this.field_LastName).toBeVisible();
    }

    async emailField(){
        await expect(this.field_registrationEmail).toBeVisible();
    }

    async saveButton(){
        await expect(this.saveBtn).toBeVisible();
        await expect(this.saveBtn).toBeEnabled();
    }
    async updateFirstName(name) {
        await this.field_firstName.fill(name);
    }

    async updateLastName(name) {
        await this.field_LastName.fill(name);
    }

    async updateEmail(email) {
        await this.field_registrationEmail.fill(email);
    }
    async clickSave(){
        await this.saveBtn.click();
    }
    async clearFirstName() {
        await this.field_firstName.fill('');
    }

    async clearLastName() {
        await this.field_LastName.fill('');
    }

}
module.exports = { MyAccountPage };