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
    await register.navigateToRegistrationPage();
});


