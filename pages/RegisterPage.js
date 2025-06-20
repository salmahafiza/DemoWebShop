const { expect } = require('@playwright/test');
const Users = require('../test-data/Users');

class RegisterPage {
    constructor(page) {
        this.page = page;

        /** LOCATORS **/
        this.field_pageTitle = page.locator(".page-title");
        this.radioButtonGenderMale = page.locator("#gender-male");
        this.radioButtonGenderFemale = page.locator("#gender-female");
        this.field_FirstName = page.locator("input#FirstName");
        this.field_LastName = page.locator("input#LastName");
        this.field_registrationEmail = page.locator("input#Email");
        this.field_registrationPassword = page.locator("input#Password");
        this.field_confirmRegistrationPassword = page.locator("input#ConfirmPassword");
        this.button_register = page.locator("input#register-button");
        this.resultMessage = page.locator(".result");
        this.error_fieldVaildationMessage = page.locator(".field-validation-error");
        this.error_generalValidationMessage = page.locator(".validation-summary-errors");
        this.error_alreadyexistsEmail = page.locator(".message-error");
    }

    async EnterFirstName(firstname) {
        await this.field_FirstName.fill(firstname);
    }

    async EnterLastName(lastname) {
        await this.field_LastName.fill(lastname);
    }
    
    async EnterEmail(email) {
        await this.field_registrationEmail.fill(email);
    }

    async EnterPassword(password) {
        await this.field_registrationPassword.fill(password);
    }

    async EnterConfirmPassword(password) {
        await this.field_confirmRegistrationPassword.fill(password);
    }

    async ClickRegisterButton() {
        await this.button_register.click();
    }

    async verifySuccessfulRegistration() {
        await expect(this.resultMessage).toHaveText(/Your registration completed/i);
    }

    async verifyErrorMessageForExistingEmail() {
        await expect(this.error_alreadyexistsEmail).toHaveText(/The specified email already exists/i);
    }

    async verifyErrorMessageForShortPassword() {
        await expect(this.error_fieldVaildationMessage).toHaveText(/The password should have at least 6 characters./i);
    }
}

module.exports = { RegisterPage };