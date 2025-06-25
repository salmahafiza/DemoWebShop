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
}

module.exports = {SearchPage};

