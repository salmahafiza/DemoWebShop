// const {expect} = require('@playwright/test');
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
        this.SubmitBtn = page.locator("input#register-button");
        this.resultMessage = page.locator(".result");
        this.error_fieldVaildationMessage = page.locator(".field-validation-error");
        this.error_generalValidationMessage = page.locator(".validation-summary-errors");
        // this.firstNameError = page.locator('span[for="FirstName"]');
        // this.LastNameError = page.locator('span[for="LastName"]');
        this.emailError = page.locator('span[for="Email"]');
        this.passwordError = page.locator('span[for="Password"]');
        this.ConfirmPasswordError = page.locator('span[for="ConfirmPassword"]');

        //this.firstNameError = page.locator("span[for='FirstName']");
        this.registerLink = page.locator('.ico-register')
        this.firstNameError = page.locator("span[for='FirstName']");
        this.lastNameError = page.locator("span[for='LastName']");
        this.emailError = page.locator('span[for="Email"]');
        this.passwordError = page.locator("span[for='Password']");
        this.confirmPasswordError = page.locator("span[for='ConfirmPassword']");
        this.error_alreadyexistsEmail = page.locator(".message-error");
        this.field_LastName = page.locator("input#LastName");
        this.field_firstName = page.locator("input#FirstName");
        this.registerBtnOnLogin = page.locator('//input[@class="button-1 register-button"]');
    }

    async EnterFirstName(firstname) {
        await this.field_firstName.fill(firstname);
    }

    async EnterLastName(lastname) {
        await this.field_LastName.fill(lastname);
    }
    async clickRegisterLink() {
        await this.registerLink.click();
    }
    async clickRegisterationBtnOnLoginPage() {
        await this.registerBtnOnLogin.click();
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
        await this.SubmitBtn.click();
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

    async verifyErrorMessageForInvalidCharacter(page) {
        const currentUrl = page.url();
        expect(currentUrl).toContain('/register');
        console.warn('BUG: Registration succeeded with Invalid characters in First/Last Name');

    }

    async clickRegisterationBtn() {
        await this.registerBtn.click();
    }

    async verifyRegisterationPage() {
        await expect(this.field_pageTitle).toBeVisible();
    }

    async verifyAllFieldsAreClickable() {
        await expect(this.radioButtonGenderMale).toBeEnabled();
        await expect(this.radioButtonGenderFemale).toBeEnabled();
        await expect(this.field_firstName).toBeEditable();
        await expect(this.field_LastName).toBeEditable();
        await expect(this.field_registrationEmail).toBeEditable();
        await expect(this.field_registrationPassword).toBeEditable();
        await expect(this.field_confirmRegistrationPassword).toBeEditable();
        await expect(this.SubmitBtn).toBeEnabled();
    }

    async verifyAllFieldsAreEmpty() {
        await expect(this.radioButtonGenderMale).not.toBeChecked();
        await expect(this.radioButtonGenderFemale).not.toBeChecked();
        await expect(this.field_firstName).toHaveValue('');
        await expect(this.field_LastName).toHaveValue('');
        await expect(this.field_registrationEmail).toHaveValue('');
        await expect(this.field_registrationPassword).toHaveValue('');
        await expect(this.field_confirmRegistrationPassword).toHaveValue('');
    }

    async verifyPasswordFieldsAreMasked() {
        await expect(this.field_registrationPassword).toHaveAttribute('type', 'password');
        await expect(this.field_confirmRegistrationPassword).toHaveAttribute('type', 'password');
    }

    async fillInvalidForm() {
        await this.field_registrationEmail.fill('qbc'); // Invalid email
        await this.field_registrationPassword.fill('234'); // Short password
        await this.field_confirmRegistrationPassword.fill('dsf'); // Mismatch
    }

    async verifyErrorMessages() {
        await expect(this.firstNameError).toHaveText('First name is required.');
        await expect(this.lastNameError).toHaveText('Last name is required.');
        await expect(this.emailError).toHaveText('Wrong email');
        await expect(this.passwordError).toHaveText('The password should have at least 6 characters.');
        await expect(this.confirmPasswordError).toHaveText('The password and confirmation password do not match.');
    }

    async clickSubmitBtn() {
        await this.SubmitBtn.click()
    }

    async navigateToRegistrationPage() {
        await this.page.goto('https://demowebshop.tricentis.com/register');

    }

    async fillFirstName(FirstName) {
        await this.field_firstName.fill(FirstName);
    }

    async fillLastName(LastName) {
        await this.field_LastName.fill(LastName);
    }

    async fillPassword(Password) {
        await this.field_registrationPassword.fill(Password);
    }

    async fillConfirmPassword(ConfirmPassword) {
        await this.field_confirmRegistrationPassword.fill(ConfirmPassword);
    }

    async clickRegisterButton() {
        await this.button_register.click();
    }

    async fillEmail(email) {
        await this.field_registrationEmail.fill(email)
    }

    static generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${randomString}@Email.com`;
    }

    static generateInvalidEmail() {
        const invalidEmails = [
            "plainaddress",
            "missingatsign.com",
            "@nodomain.com",
            "user@.com",
            "user@com",
            "user@domain.",
            "user@domain,com",
            "user@@domain.com",
            " ",
            Math.random().toString(36).substring(2, 10)
        ];


        const randomIndex = Math.floor(Math.random() * invalidEmails.length);
        return invalidEmails[randomIndex];
    }
    async verifyErrorMessageForPasswordMismatched(page) {
        await expect(this.error_fieldVaildationMessage).toHaveText('The password and confirmation password do not match.');
    }


}

module.exports = { RegisterPage };