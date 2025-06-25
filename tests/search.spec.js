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

test('TC_SEARCH_013: Verify search queries less than 3 characters', async () => {
   await searchbar.SearchbarFieldFill('a');
   await searchbar.pressEnterKey(); 
   await searchbar.minSearchError();
});

test('TC_SEARCH_014: Long search terms should not break functionality.', async () => {
   
   const lonInput = 'a'.repeat(500);
   await searchbar.SearchbarFieldFill(lonInput);
   await searchbar.pressEnterKey(); 
   await searchbar.longSearch();
});

/*test('TC_SEARCH_015: System should handle repeated queries properly.', async () => {
   
   const Input = 'Laptop'.repeat(2);
   await searchbar.SearchbarFieldFill(Input);
   await searchbar.pressEnterKey(); 
   await searchbar.duplicateSearch();
});*/
test('TC_SEARCH_015: Verify System should handle repeated queries properly.', async () => {
   //await searchbar.verifyDuplicateSearchQueries();
   await searchbar.searchProduct('Laptop');
   const first = await searchbar.getSearchResults();

   await searchbar.searchProduct('Laptop');
   const second = await searchbar.getSearchResults();

   expect(second.trim()).toBe(first.trim());
});


