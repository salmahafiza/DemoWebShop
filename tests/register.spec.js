import { test, expect } from '@playwright/test';
import { Register } from '../test-data/Users';
const { DashboardPage } = require('../pages/DashboardPage');
const { RegisterPage } = require('../pages/RegisterPage');

let dashboard;
let register;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    register = new RegisterPage(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    await dashboard.navigateToRegisterPage();
});

test('TC_REGISTER_005: Verify that registration fails if the email is already in use.', async ({ page }) => {
    await register.EnterFirstName(Register.firstName);
    await register.EnterLastName(Register.lastName);
    await register.EnterEmail(Register.existingEmail);
    await register.EnterPassword(Register.Password);
    await register.EnterConfirmPassword(Register.Password);
    await register.ClickRegisterButton();
    await register.verifyErrorMessageForExistingEmail();
});

test('TC_REGISTER_006: Verify that registration fails if the password is too short.', async ({ page }) => {
    await register.EnterFirstName(Register.firstName);
    await register.EnterLastName(Register.lastName);
    await register.EnterEmail(Register.Email);
    await register.EnterPassword(Register.shortpassword);
    await register.EnterConfirmPassword(Register.shortpassword);
    await register.ClickRegisterButton();
    await register.verifyErrorMessageForShortPassword();
});

test('TC_REGISTER_007: Verify that registration not fails if no gender is selected', async ({ page }) => {
    await register.EnterFirstName(Register.firstName);
    await register.EnterLastName(Register.lastName);
    await register.EnterEmail(Register.Email);
    await register.EnterPassword(Register.Password);
    await register.EnterConfirmPassword(Register.Password);
    await register.ClickRegisterButton();
    await register.verifySuccessfulRegistration();
});

test.only('TC_REGISTER_008: Verify that registration fails if names contain invalid characters.', async ({ page }) => {
    await register.EnterFirstName(Register.InvalidFirstName);
    await register.EnterLastName(Register.InvalidLastName);
    await register.EnterEmail(Register.Email);
    await register.EnterPassword(Register.Password);
    await register.EnterConfirmPassword(Register.Password);
    await register.ClickRegisterButton();
    await register.verifyErrorMessageForInvalidCharacter(page);
});



