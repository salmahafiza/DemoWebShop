import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PLP } = require('../pages/PLP')


let login;
let dashboard;
let plp;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    plp = new PLP(page);
    await dashboard.accessApplication();
});

test('TC_PLP_001: Verify Books category displays correct products', async () => {
    await plp.clickOnCategory('Books');
    await plp.verifyPageTitle('Books');
});