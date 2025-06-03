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
        this.forgetpasswordLink = page.locator('a[href="/passwordrecovery"]');
        this.recoverButton = page.locator('.button-1.password-recovery-button');
        this.errorMessage = page.locator('.field-validation-error');
        this.link_register = page.locator("[href='/register']");
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

    async clickRemeberMeCheckbox() {
        await this.checkboxRememberMe.click();
    }

    async verifyRememberMeCheckboxIsFalse() {
        await expect(this.checkboxRememberMe).not.toBeChecked();
    }

    async verifyRememberMeCheckboxIsTrue() {
        await expect(this.checkboxRememberMe).toBeChecked();
    }

    async forgetpasswordClicked(){
 
        await this.forgetpasswordLink.click()
 
    }

    async assertRecoveringButtonVisible() {
    await expect(this.recoverButton).toBeVisible();
    await this.recoverButton.click();
    await expect(this.errorMessage).toBeVisible();
  }
}

module.exports = { LoginPage };
