import { test, expect } from '@playwright/test';
const { DashboardPage } = require('../pages/DashboardPage');
const { SearchPage } = require ('../pages/SearchPage');

let dashboard;
let searchbar;


test.beforeEach(async ({ page }) => {
   
   dashboard = new DashboardPage(page);
   searchbar = new SearchPage(page);
   await dashboard.accessApplication();
});

test('TC_SEARCH_001: Verify that the search bar is visible on the dashboard page', async ({ page }) => {
    await searchbar.verifySearchBarVisible();
});   
