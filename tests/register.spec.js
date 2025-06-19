import { test, expect } from '@playwright/test';
const { DashboardPage } = require('../pages/DashboardPage');
const { RegisterPage } = require('../pages/RegisterPage');

let dashboard;
let register;

test.beforeEach(async ({ page }) => {
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

test('TC_REGISTER_010: Availability of Registration Page from Login Page', async () => {
    await dashboard.navigateToLoginPage();
    await register.clickRegisterationBtn();
    await register.verifyRegisterationPage();
});
 
test('TC_REGISTER_011: Verify Existence of Clickable Fields and Titles', async() => {
    await register.clickRegisterationBtn();
    await register.verifyAllFieldsAreClickable();


})

