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

test('TC_PLP_002: Verify Computers category displays desktops, notebooks, and accessories', async () => {
    await plp.clickOnCategory('Computers');
    await plp.verifyPageTitle('Computers');
    await plp.verifySubCategory('Desktops');
    await plp.verifySubCategory('Notebooks');
    await plp.verifySubCategory('Accessories');
});

test('TC_PLP_003: Verify Desktops category displays desktop items', async () => {
    await plp.clickOnCategory('Computers');
    await plp.clickOnSubCategory('Desktops');
    await plp.verifyPageTitle('Desktops');
});

test('TC_PLP_004: Verify Notebooks category displays notebook items', async () => {
    await plp.clickOnCategory('Computers');
    await plp.clickOnSubCategory('Notebooks');
    await plp.verifyPageTitle('Notebooks');
});