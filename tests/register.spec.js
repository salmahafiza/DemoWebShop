import {test, expect} from '@playwright/test';
import {registerHooks} from 'node:module';

const {DashboardPage} = require('../pages/DashboardPage');
const {RegisterPage} = require('../pages/RegisterPage');
const {Users, ResgisterData, EmptyData, Url, invalidPassword, invalidEmailFormat} = require('../test-data/Users');

let dashboard;
let register;

test.beforeEach(async ({page}) => {
    dashboard = new DashboardPage(page);
    register = new RegisterPage(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    //await register.navigateToRegistrationPage();
});

test('TC_REGISTER_009: Availability of Registration Page from Landing Page', async () => {
    await register.clickRegisterationBtn();
    await register.verifyRegisterationPage();
});
test(" TC_REGISTER_001 : Verify that a new user can register with valid details.", async () => {
    await register.fillFirstName(ResgisterData.FirstName);
    await register.fillLastName(ResgisterData.LastName);
    await register.fillEmail(ResgisterData.email);
    await register.fillPassword(ResgisterData.Password);
    await register.fillConfirmPassword(ResgisterData.ConfirmPassword);
    await register.clickRegisterButton();
    await register.verifySuccessRegistration();
});
test("Tc_REGISTER_002 : Invalid Registration with empty data ", async ({page}) => {
    await register.clickRegisterButton();
    if (Url.register === page.url()) {
        console.log("Pass");
    } else {
        console.log("Fail");
    }
});
test('Tc_REGISTER_003: Passwaord Mismatch ', async ({page}) => {
    await register.fillFirstName(invalidPassword.FirstName);
    await register.fillLastName(invalidPassword.LastName);
    await register.fillEmail(invalidPassword.email);
    await register.fillPassword(invalidPassword.Password);
    await register.fillConfirmPassword(invalidPassword.ConfirmPassword);
    if (invalidPassword.Password === invalidPassword.ConfirmPassword) {
        console.log("Password and confirm password are  not matched");
        await register.clickRegisterButton();
        if (Url.register === page.url()) {
            console.log("Test case 003 passe");
        } else {
            console.log(" Test Case 003 Failed");
        }
    }
});
test('Tc_REGISTER_004 :Invalid Registration with invalid Email pattern', async ({page}) => {
    await register.fillFirstName(ResgisterData.FirstName);
    await register.fillLastName(ResgisterData.LastName);
    await register.fillEmail(invalidEmailFormat.email);
    await register.fillPassword(ResgisterData.Password);
    await register.fillConfirmPassword(ResgisterData.ConfirmPassword);
    await register.clickRegisterButton();
    if (Url.register === page.url()) {
        console.log("TC_REGISTER_004 Pass");
    } else {
        console.log("TC_REGISTER_004 FAIL");
    }

    test('TC_REGISTER_010: Availability of Registration Page from Login Page', async () => {
        await dashboard.navigateToLoginPage();
        await register.clickRegisterationBtn();
        await register.verifyRegisterationPage();
    });


    test('TC_REGISTER_011: Verify Existence of Clickable Fields and Titles', async () => {
        await register.clickRegisterationBtn();
        await register.verifyAllFieldsAreClickable();
    })

    test('TC_REGISTER_012: Verify that the fields are empty by default when user lands on the registration page.', async () => {
        await register.clickRegisterationBtn();
        await register.verifyAllFieldsAreEmpty();
    })

    test('TC_REGISTER_013: Verify that any text in password and confirm password field should be masked.', async () => {
        await register.clickRegisterationBtn();
        await register.verifyPasswordFieldsAreMasked();
    })

    test('TC_REGISTER_014: Verify Error Messages.', async () => {
        await register.clickRegisterationBtn();
        await register.fillInvalidForm();
        await register.clickSubmitBtn();
        await register.verifyErrorMessages();
    })


});