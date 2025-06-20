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
        await this.page.goto('https://demowebshop.tricentis.com/register');

    }
    async fillFirstName(FirstName) {
        await this.field_firstName.fill(FirstName);
    }
    async fillLastName(LastName) {
        await this.field_LastName.fill(LastName);
    }
    async fillpassword(Password) {
        await this.field_registrationPassword.fill(Password);
    }
    async fillConfirmPassword(ConfirmPassword) {
        await this.field_confirmRegistrationPassword.fill(ConfirmPassword);
    }
      async Email(email) {

        console.log(email);
        if(email == '' || !email ){
            const randomNumber = Math.floor(Math.random() * 100000);
            const email = `bsh${randomNumber}@gg.com`;
            await this.field_registrationEmail.fill(email);
            await expect(this.field_registrationEmail).toHaveValue(email);
        }else{
            await this.field_registrationEmail.fill(email);
            await expect(this.field_registrationEmail).toHaveValue(email);
        }
        
    }
    async InvalidEmaildomain(email) {

        console.log(email);
        if(email == '' || !email ){
            const randomNumber = Math.floor(Math.random() * 100000);
            const email = `bsh@gg${randomNumber}.gs`;
            await this.field_registrationEmail.fill(email);
            await expect(this.field_registrationEmail).toHaveValue(email);
        }else{
            await this.field_registrationEmail.fill(email);
            await expect(this.field_registrationEmail).toHaveValue(email);
        }
        
    }

    async verifyRegistrationSucces() {
        await expect(this.resultMessage).toBeVisible();
        await expect(this.resultMessage).toHaveText('Your registration completed');
    }
    async clickRegisterButton() {
        await this.button_register.click();
    }   
    async verifyErrorMessage() {
        await expect(this.error_fieldVaildationMessage).toBeVisible();
        await expect(this.error_fieldVaildationMessage).toHaveText('Please enter your email');
    }
    async verifySuccessRegistration() {
        await expect ( this.page).toHaveURL('https://demowebshop.tricentis.com/registerresult/1');
        await expect(this.resultMessage).toBeVisible();
        await expect(this.resultMessage).toHaveText('Your registration completed');
    }

}

module.exports = { RegisterPage };
