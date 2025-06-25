const {expect} = require('@playwright/test');

class SearchPage {
    constructor(page) {
        this.page = page;
        this.search_bar = page.locator('//*[@id="small-searchterms"]');
        this.SearchbarField = page.locator('//*[@id="small-searchterms"]');
        this.EnterTextInSearchBox = page.locator('//*[@id="small-searchterms"]');
        this.SearchButton = page.locator('//input[@class="button-1 search-box-button"]');
        this.product_page = page.locator('h2[class=product-title] a');
        this.searchWarning = page.locator('.warning');
        this.longSearchResult = page.locator('.result');
        this.productNameLaptop = page.locator('.product-name');
        this.resultSection = page.locator(".page.search-page");
        this.suggestions = page.locator('.ui-autocomplete li');
    }

    async verifySearchBarVisible() {
        await expect(this.search_bar).toBeVisible();
    }
    
    async SearchbarFieldFill(text) {
        await this.SearchbarField.fill(text);
        const inputValue = await this.SearchbarField.inputValue();
        expect(inputValue).toBe(text);
    }

    async clickOnSearchButton() {
        await this.SearchButton.click();
        await expect(this.page).toHaveURL(/.*search/);
    }

    async pressEnterKey() {
        await this.EnterTextInSearchBox.press('Enter');
        await expect(this.page).toHaveURL(/.*search/);
    }
    async minSearchError(){
        const warningText = await this.searchWarning.textContent();
        console.log('Displayed Warning Message:', warningText.trim());
        await expect(this.searchWarning).toHaveText('Search term minimum length is 3 characters');
    }
    async longSearch(){
        const Text = await this.longSearchResult.textContent();
        console.log('Displayed Message:', Text.trim());
        await expect(this.longSearchResult).toHaveText('No products were found that matched your criteria.');
    }
    /*async duplicateSearch(){
        const Text = await this.longSearchResult.textContent();
        console.log('Displayed Message:', Text.trim());
        await expect(this.longSearchResult).toHaveText('No products were found that matched your criteria.');
    }*/
    /*async verifyDuplicateSearchQueries() {
        const searchTerm = 'Laptop';
        await this.EnterTextInSearchBox.fill('14.1-inch Laptop' , searchTerm);
        await this.SearchButton.click();
        const firstResult = await this.productNameLaptop.allTextContents();

        //repeatSearch
         const searchTermRepeat = '14.1-inch Laptop';
        await this.EnterTextInSearchBox.fill('Laptop' , searchTerm);
        await this.SearchButton.click();
        const secondResult = await this.productNameLaptop.allTextContents();
        expect(firstResult).toEqual(secondResult);
    }*/
    async searchProduct(term) {
        await this.EnterTextInSearchBox.fill(term);
        await this.SearchButton.click();
    }

    async getSearchResults() {
        return await this.resultSection.innerText();
    }
    async verifyAutoSuggestions(keyword) {
        await this.EnterTextInSearchBox.fill(keyword);
        await this.page.waitForSelector('.ui-autocomplete li', { timeout: 5000 });

        const count = await this.suggestions.count();
        console.log(`Total Suggestions Displayed: ${count}`);

        for (let i = 0; i < count; i++) {
            const suggestionText = await this.suggestions.nth(i).innerText();
            console.log(`Suggestion ${i + 1}:`, suggestionText);
        }

        // Assertion for suggestion that are visible
        await expect(this.suggestions.first()).toBeVisible();
    }

}

module.exports = {SearchPage};

