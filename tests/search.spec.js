import { test, expect } from '@playwright/test';
const { DashboardPage } = require('../pages/DashboardPage');
const { SearchPage } = require('../pages/SearchPage');
const { searchData } = require('../test-data/Users');


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

test('TC_SEARCH_009 : Verify search with partial keywords.', async ({ page }) => {
   await searchbar.searchWithPartialText(searchData.partialSearchText);
   await searchbar.assertSearchWithPartialTextResult();
});

test('TC_SEARCH_010: Verify search with special characters.', async ({ page }) => {
   await searchbar.searchWithSpecialCharacters(searchData.specialCharacter);
   await searchbar.assertWithSPecialCharactersResult();
});

test('TC_SEARCH_011: Verify search with numeric values.', async ({ page }) => {
   await searchbar.searchWithNumericValue(searchData.numericalSearchText);
   await searchbar.assertNumericSearchResult();
});

test('TC_SEARCH_012: Verify search with empty text.', async ({ page }) => {
   await searchbar.searchWithEmptyText(searchData.emptySearchText);
   await searchbar.assertWithNoProductsFound();
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

test('TC_SEARCH_016: Verify auto-suggestions appear as user types', async () => {
   const keyword = 'pho';
   await searchbar.verifyAutoSuggestions(keyword);
});

test("TC_SEARCH_017 : Search should filter the result with price range", async ({ page }) => {
    await searchbar.advanceSearchText(searchData.filerText);
    await searchbar.advanceSearchCheck();
    await searchbar.priceRange(searchData.priceRange.pf, searchData.priceRange.pt);
    await searchbar.assertPriceRangeFilteration();
});

test('TC_SEARCH_018  : Search should respect Category selection while searching', async ({ page }) => {
    await searchbar.advanceSearchForCategorySelection(searchData.searchText1);
    await searchbar.advanceSearchCheck();
    await searchbar.selectOptionFromCategory(searchData.optionText);
    await searchbar.falsecategorySelectionMsg();
});

test('TC_SEARCH_019: Verify functionality of Automatically search sub categories', async ({ page }) => {
   await searchbar.SearchbarFieldFill('Laptop');
   await searchbar.clickOnSearchButton();
   await searchbar.ClickonAdvancedSearchCheckBox();
   await searchbar.SelectCategoryFromDropdown('Computers');
   await searchbar.ClickonAutomaticallySearchSubCategoriesCheckBox();
   await searchbar.ClickonAdnacedSearchButton();
});

test('TC_SEARCH_020: Verify functionality of "Search in product descriptions"', async ({ page }) => {
   await searchbar.SearchbarFieldFill('Computer');
   await searchbar.clickOnSearchButton();
   await searchbar.ClickonAdvancedSearchCheckBox();
   await searchbar.SelectCategoryFromDropdown('Computers');
   await searchbar.ClickonAutomaticallySearchSubCategoriesCheckBox();
   await searchbar.ClickonSearchInProductDescriptionCheckBox();
   await searchbar.ClickonAdnacedSearchButton();
});

test('TC_SEARCH_0025: Verify functionality of Filter - View As Grid', async ({ page }) => {
   await searchbar.SearchbarFieldFill('Computer');
   await searchbar.clickOnSearchButton();
   await searchbar.ClickonAdvancedSearchCheckBox();
   await searchbar.SelectCategoryFromDropdown('Computers');
   await searchbar.ClickonAutomaticallySearchSubCategoriesCheckBox();
   await searchbar.ClickonSearchInProductDescriptionCheckBox();
   await searchbar.ClickonAdnacedSearchButton();
   await searchbar.clickonViewAsCheckBox('Grid');
});

test('TC_SEARCH_026: Verify functionality of Filter - View As List', async ({ page }) => {
   await searchbar.SearchbarFieldFill('Computer');
   await searchbar.clickOnSearchButton();
   await searchbar.ClickonAdvancedSearchCheckBox();
   await searchbar.SelectCategoryFromDropdown('Computers');
   await searchbar.ClickonAutomaticallySearchSubCategoriesCheckBox();
   await searchbar.ClickonSearchInProductDescriptionCheckBox();
   await searchbar.ClickonAdnacedSearchButton();
   await searchbar.clickonViewAsCheckBox('List');
});
