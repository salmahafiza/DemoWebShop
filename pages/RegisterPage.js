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
        this.firstNameError = page.locator('span[for="FirstName"]');
        this.LastNameError = page.locator('span[for="LastName"]');
        this.emailError= page.locator('span[for="Email"]');
        this.passwordError =page.locator('span[for="Password"]');
        this.ConfirmPasswordError = page.locator('span[for="ConfirmPassword"]');


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
    async fillPassword(Password) {
        await this.field_registrationPassword.fill(Password);
    }
    async fillConfirmPassword(ConfirmPassword) {
        await this.field_confirmRegistrationPassword.fill(ConfirmPassword);
    }
       async clickRegisterButton(){
        await this.button_register.click();
    }
    async fillEmail(email){
        await this.field_registrationEmail.fill(email)
    }
    
    static generateRandomEmail(){
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

}
module.exports = {RegisterPage};