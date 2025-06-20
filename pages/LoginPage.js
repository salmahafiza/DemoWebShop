const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        /** LOCATORS **/
        this.usernameField = page.locator('input#Email');
        this.passwordField = page.locator('input#Password');
        this.loginButton = page.locator('input[value="Log in"]');
        this.logoutButton = page.locator("[href='/logout']");
        this.invalidLoginError = page.locator('.message-error');
        this.checkboxRememberMe = page.locator('#RememberMe');
        this.link_register = page.locator("[href='/register']");
        this.forget_password = page.locator("a[href='/passwordrecovery']");
        this.forget_password_email = page.locator("#Email");
        this.recover_Button = page.locator("input[value='Recover']");
        this.recovery_Error = page.locator(".result");
        this.recovery_sent = page.locator(".result");
        this.invalidEmailError = page.locator("span[for='Email']");
        this.errorMessage = page.locator('.field-validation-error');
    }

    async enterUsername(username) {
        await this.usernameField.fill(username);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async verifyUserInfoNotVisible() {
        await expect(this.link_register).toBeVisible();
    }

    async verifyInvalidLoginErrorMessageShouldDisplay() {
        await expect(this.invalidLoginError.first())
            .toHaveText(/Login was unsuccessful. Please correct the errors and try again/i);
    }

    async verifyRecoveryErrorMessageShouldDisplay() {
        await expect(this.recovery_Error.first())
            .toHaveText(/Email not found./i);
    }

    async verifyRecoverySentMessageSuccesfully() {
        await expect(this.recovery_sent.first())
            .toHaveText(/Email with instructions has been sent to you./i);
    }

    async clickRemeberMeCheckbox() {
        await this.checkboxRememberMe.click();
    }

    async verifyRememberMeCheckboxIsFalse() {
        await expect(this.checkboxRememberMe).not.toBeChecked();
    }

    async verifyRememberMeCheckboxIsTrue() {
        await expect(this.checkboxRememberMe).toBeChecked();
    }

    async clickForgetPassword() {
        await this.forget_password.click();
    }

    async enter_forget_Password_Email(UnRegEmail) {
        await this.forget_password_email.fill(UnRegEmail);
    }

   async clickRecoveryButton() {
        await this.recover_Button.click();
    }

    async verifyInvalidEmailErrorMessageShouldDisplay() {
        await expect(this.invalidEmailError.first())
            .toHaveText(/Wrong email/i);
    }
  
    async assertRecoveringButtonVisible() {
        await this.recover_Button.click();
        await expect(this.errorMessage).toBeVisible();
    }

    async navigatetorecoverypage(){
        await this.page.goto('https://demowebshop.tricentis.com/passwordrecovery');
    }

    async clickForgotPasswordLink() {
        await this.link_forgotPassword.click();
    }

    async verifyForgetLinkPassword(){
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
    }

    async EmptyName(EmptyEmail) {
        await this.usernameField.fill(EmptyEmail);
    }

    async EmptyPassword(EmptyPassword){
        await this.passwordField.fill(EmptyPassword);
    }

}

module.exports = { LoginPage };