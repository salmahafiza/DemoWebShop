const { expect } = require('@playwright/test');

class RegisterPage {
    constructor(page) {
        this.page = page;

        /** LOCATORS **/
        this.field_pageTitle = page.locator(".page-title");
        this.radioButtonGenderMale = page.locator("#gender-male");
        this.radioButtonGenderFemale = page.locator("#gender-female");
        this.field_firstName = page.locator("input#FirstName");
        this.field_LastName = page.locator("input#LastName");
        this.field_registrationEmail = page.locator("input#Email");
        this.field_registrationPassword = page.locator("input#Password");
        this.field_confirmRegistrationPassword = page.locator("input#ConfirmPassword");
        this.button_register = page.locator("input#register-button");
        this.resultMessage = page.locator(".result");
        this.error_fieldVaildationMessage = page.locator(".field-validation-error");
        this.error_generalValidationMessage = page.locator(".validation-summary-errors");

        /** TEST DATA **/
        let firstName = "Dummy";
        let lastName = "Tester";
        let email = '';
        let registrationEmailPrefix = "auto+";
        let registrationPassword = "abcd@1234";

    }

    async navigateToRegistrationPage() {
        await this.page.goto("https://demowebshop.tricentis.com/register");
    }

    async verifyPageTitle() {
        await expect(this.field_pageTitle).toHaveText('Register');
    }

    async selectGender(gender = "male") {
        if (gender.toLowerCase() === "female") {
            await this.radioButtonGenderFemale.check();
        } else {
            await this.radioButtonGenderMale.check();
        }
    }

    async enterFirstName(firstName = "Ali") {
        await this.field_firstName.fill(firstName);
        console.log(firstName)
    }

    async enterLastName(lastName = "Tester") {
        await this.field_LastName.fill(lastName);
        console.log(lastName)
    }

    async enterRegistrationEmail(email) {

        console.log(email);
        if(email == '' || !email ){
            const randomNumber = Math.floor(Math.random() * 100000);
            const email = `dummy${randomNumber}@test.com`;
            await this.field_registrationEmail.fill(email);
            console.log(email);
        }else{
            await this.field_registrationEmail.fill(email);
            console.log(email);
        }
        
    }

    async enterRegistrationPassword(password = 'abc1234') {
        await this.field_registrationPassword.fill(password);
        console.log(password);
    }

    async enterRegistrationConfirmPassword(password= 'abc1234') {
        await this.field_confirmRegistrationPassword.fill(password);
        console.log(password);

    }

    async clickOnRegisterButton() {
        await this.button_register.click();
    }

    async verifySuccessfulRegistration() {
        await expect(this.resultMessage).toHaveText(/Your registration completed/i);
    }

    async verifyRequiredFieldErrorMessageIsDisplayed(message) {
        const regex = new RegExp(message, 'i');
        await expect(this.error_fieldVaildationMessage).toHaveText(regex);
        console.log('Displayed Error Message : ',message);
    }
    async verifyGeneralErrorMessageIsDisplayed(message){
        const regex = new RegExp(message, 'i');
        await expect(this.error_generalValidationMessage).toHaveText(regex);
        console.log('Displayed Error Message : ',message);
    }
}

module.exports = { RegisterPage };
