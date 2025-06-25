import { test, expect } from '@playwright/test';
const { DashboardPage } = require('../pages/DashboardPage');
const { SearchPage } = require ('../pages/SearchPage');
const {searchData} = require('../test-data/Users');


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
}); //saniya
test('TC_SEARCH_009 : Verify search with partial keywords.', async ({ page }) => {
   await searchbar.searchWithPartialText(searchData.partialSearchText);
   await searchbar.assertSearchWithPartialTextResult();

});
test('TC_SEARCH_010: Verify search with special characters.', async ({ page }) => {
   await searchbar.searchWithSpecialCharacters(searchData.specialCharacter);
   await searchbar.assertWithSPecialCharactersResult();
});