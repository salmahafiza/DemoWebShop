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

test('TC_SERACH_002: Check input functionality in the search bar.', async ({ page }) => {
   await searchbar.SearchbarFieldFill('laptop');     
});

test('TC_SEARCH_003: Check if search works by clicking the search button..', async ({ page }) => {
   await searchbar.SearchbarFieldFill('laptop'); 
   await searchbar.clickOnSearchButton();
});

test('TC_SEARCH_004: Check if pressing Enter triggers the search.', async ({ page }) => {
   await searchbar.SearchbarFieldFill('laptop');
   await searchbar.pressEnterKey(); 
});

test('TC_SEARCH_005:Verify search results for valid queries.', async ({ page }) => {
   await searchbar.SearchbarFieldFill('laptop');
   await searchbar.clickOnSearchButton();
   await searchbar.ValideSearchResults();
});

test('TC_SEARCH_006: Verify product page redirection.', async ({ page }) => {
   await searchbar.SearchbarFieldFill('laptop');
   await searchbar.clickOnSearchButton();
   await searchbar.ValideSearchResults();
   await searchbar.clickOnProductName(); 
});

test('TC_SEARCH_007: Verify search behavior for nonexistent products.', async ({ page }) => {
   await searchbar.SearchbarFieldFill('xyzproduct');
   await searchbar.clickOnSearchButton();
   await searchbar.InValidSearchResults();
});

test('TC_SEARCH_008: Verify case-insensitive search..', async ({ page }) => {
   await searchbar.SearchbarFieldFill('LAPTOP');
   await searchbar.clickOnSearchButton();
   await searchbar.ValideSearchResults();
});