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
        this.emailError = page.locator(".field-validation-error[data-valmsg-for='Email']");
        this.firstNameError = page.locator(".field-validation-error[data-valmsg-for='FirstName']");
        this.lastNameError = page.locator(".field-validation-error[data-valmsg-for='LastName']");
        this.editButtonOnAddress = page.locator('//input[@class ="button-2 edit-address-button"]');
        this.addNewAddressButton = page.locator('//input[@class="button-1 add-address-button"]');
        this.deleteAddressButton = page.locator('//input[@class="button-2 delete-address-button"]');
        this.nameOnAddressPage = page.locator("//ul[@class='info']/li[@class='name']");
        this.emailOnAddressPage = page.locator("//ul[@class='info']/li[@class='email']");
        this.phoneOnAddressPage = page.locator("//ul[@class='info']/li[@class='phone']");
        this.companyOnAddresspage = page.locator("//ul[@class='info']/li[@class='company']");
        this.faxOnAddressPage = page.locator("//ul[@class='info']/li[@class='fax']");
        this.countryOnAddressPage = page.locator("//ul[@class='info']/li[@class='country']");
        this.address1OnAddressPage = page.locator("//ul[@class='info']/li[@class='address1']");
        this.cityZipCodeOnAddressPage = page.locator("//ul[@class='info']/li[@class='city-state-zip']");
        this.firstNameForAddress = page.locator('input#Address_FirstName');
        this.lastNameForAddress = page.locator('input#Address_LastName');
        this.emailForAddress = page.locator('input#Address_Email');
        this.companyForAddress = page.locator('input#Address_Company');
        this.contouryForAddress = page.locator('select#Address_CountryId');
        this.stateForAddress = page.locator('select#Address_StateProvinceId');
        this.cityForAddress = page.locator('input#Address_City');
        this.address1ForAddress = page.locator('input#Address_Address1');
        this.address2ForAddress = page.locator('input#Address_Address2');
        this.zipCodeForAddress = page.locator('input#Address_ZipPostalCode');
        this.phoneNumberForAddress = page.locator('input#Address_PhoneNumber');
        this.faxNumberForAddress = page.locator('input#Address_FaxNumber');
        this.saveAddressButton = page.locator('//input[@class = "button-1 save-address-button"]');
        this.firstNameValidationError = page.locator(".field-validation-error[data-valmsg-for='Address.FirstName']");
        this.lastNameValidationError = page.locator(".field-validation-error[data-valmsg-for='Address.LastName']");
        this.emailValidationError = page.locator(".field-validation-error[data-valmsg-for='Address.Email']");
        this.cityValidationError = page.locator(".field-validation-error[data-valmsg-for='Address.City']");
        this.streetValidationError = page.locator(".field-validation-error[data-valmsg-for='Address.Address1']");
        this.zipValidationError = page.locator(".field-validation-error[data-valmsg-for='Address.ZipPostalCode']");
        this.phoneValidationError = this.page.locator("span[for='Address_PhoneNumber']");

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
        if (email === '' || !email) {
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
    /////////////////////////////////////////////////////

    async genderMale() {
        await expect(this.radioButtonGenderMale).toBeVisible();
    }

    async genderFemale() {
        await expect(this.radioButtonGenderFemale).toBeVisible();
    }

    async firstNameField() {
        await expect(this.field_firstName).toBeVisible();
    }

    async lastNameField() {
        await expect(this.field_LastName).toBeVisible();
    }

    async emailField() {
        await expect(this.field_registrationEmail).toBeVisible();
    }

    async saveButton() {
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
    async clickSave() {
        await this.saveBtn.click();
    }
    async clearFirstName() {
        await this.field_firstName.fill('');
    }

    async clearLastName() {
        await this.field_LastName.fill('');
    }
    async clickOnEditButtonOnAddress() {
        await this.editButtonOnAddress.click();
    }

    async verifyEditButtonOnAddress() {
        await expect(this.editButtonOnAddress).toBeVisible();
    }
    async clickOnAddNewAddressButton() {
        await this.addNewAddressButton.click();
    }
    async verifyAddNewAddressButton() {
        await expect(this.addNewAddressButton).toBeVisible();
    }
    async clickOnDeleteAddressButton() {
        await this.deleteAddressButton.click();
    }
    async verifyDeleteAddressButton() {
        await expect(this.deleteAddressButton).toBeVisible();
    }
    async checkVisibilityOfNameOnAddressPage() {
        await expect(this.nameOnAddressPage).toBeVisible();
    }
    async checkVisibilityOfEmailOnAddressPage() {
        await expect(this.emailOnAddressPage).toBeVisible();
    }
    async checkVisibilityOfPhoneOnAddressPage() {
        await expect(this.phoneOnAddressPage).toBeVisible();
    }
    async checkVisibilityOfFaxOnAddressPage() {
        await expect(this.faxOnAddressPage).toBeVisible();
    }

    async checkVisibilityOfCountryOnAddressPage() {
        await expect(this.countryOnAddressPage).toBeVisible();
    }
    async checkVisibilityOfAddress1OnAddressPage() {
        await expect(this.address1OnAddressPage).toBeVisible();
    }
    async checkVisibilityOfCityZipCodeOnAddressPage() {
        await expect(this.cityZipCodeOnAddressPage).toBeVisible();
    }
    async clickOnmenuItemAddress() {
        await this.page.locator(`[href="/customer/addresses"]`).first().click();

    }
    async enterFirstNameForAddress(firstName) {
        await this.firstNameForAddress.fill(firstName);
        console.log("FirstName : ", firstName);
    }
    async enterLastNameForAddress(lastName) {
        await this.lastNameForAddress.fill(lastName);
        console.log(" Last Name ", lastName);
    }
    async enterEmailForAddress(email) {
        await this.emailForAddress.fill(email);
        console.log("Email ", email);
    }
    async enterCompanyForAddress(company) {
        await this.companyForAddress.fill(company);
        console.log("Company  Name ", company)
    }
    async selectCountryForAddress(country) {
        await this.contouryForAddress.selectOption({ label: country });
        console.log("Country : ", country)
    }
    async selectStateForAddress(state) {
        await this.stateForAddress.selectOption({ label: state });
        console.log(" State ", state)
    }
    async enterCityForAddress(city) {
        await this.cityForAddress.fill(city);
        console.log("City ", city)
    }
    async enterAddress1ForAddress(address1) {
        await this.address1ForAddress.fill(address1);
        console.log(" Address 1 : ", address1)
    }
    async enterAddress2ForAddress(address2) {
        await this.address2ForAddress.fill(address2);
        console.log(" Address 1 : ", address2)

    }
    async enterZipCodeForAddress(zipCode) {
        await this.zipCodeForAddress.fill(zipCode);
        console.log(" Zip Code : ", zipCode)

    }
    async enterPhoneNumberForAddress(phone) {
        await this.phoneNumberForAddress.fill(phone);
        console.log("Phone  : ", phone)

    }
    async enterFaxNumberForAddress(faxNumber) {
        await this.faxNumberForAddress.fill(faxNumber);
    }
    async clickOnSaveAddressButton() {
        await this.saveAddressButton.click();
    }
    async verifyAndAssertEditedAddress(firstName, company, lastName) {
        const fullName = `${firstName} ${lastName}`;
        await expect(this.nameOnAddressPage).toHaveText(fullName, { normalizeWhitespace: true });

        await expect(this.companyOnAddresspage).toHaveText("Tech Company");
        console.log("Edited First Name :", firstName);
        console.log("Edited Company : ", company)
    }
    async verifyRequiredFieldValidation(field) {
        if (field === "FirstName") {
            await expect(this.firstNameValidationError).toHaveText("First name is required.");
        }
        else if (field === "LastName") {
            await expect(this.lastNameValidationError).toHaveText("Last name is required.");
        }
        else if (field === "Email") {
            await expect(this.emailValidationError).toHaveText("Email is required.");
        }
        else if (field === "City") {
            await expect(this.cityValidationError).toHaveText("City is required");
        }
        else if (field === "Street") {
            await expect(this.streetValidationError).toHaveText("Street address is required");
        }
        else if (field === "Zip") {
            await expect(this.zipValidationError).toHaveText("Zip / postal code is required");
        }
        else if (field === "Phone") {
            await expect(this.phoneValidationError).toHaveText("Phone is required");
        }
    }

}
module.exports = { MyAccountPage };
