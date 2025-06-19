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
        this.registerBtn = page.locator('.ico-register')

        /** TEST DATA **/
        let firstName = "Dummy";
        let lastName = "Tester";
        let email = '';
        let registrationEmailPrefix = "auto+";
        let registrationPassword = "abcd@1234";

    }

    async clickRegisterationBtn() {
        await this.registerBtn.click();
    }
    async verifyRegisterationPage(){
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
    await expect(this.registerBtn).toBeEnabled();
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


   

}



module.exports = { RegisterPage };
