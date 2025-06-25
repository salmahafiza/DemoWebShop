const {expect} = require('@playwright/test');

class SearchPage {
    constructor(page) {
        this.page = page;
        this.search_bar = page.locator('//*[@id="small-searchterms"]');
        this.SearchbarField = page.locator('//*[@id="small-searchterms"]');
        this.EnterTextInSearchBox = page.locator('//*[@id="small-searchterms"]');
        this.SearchButton = page.locator('//input[@class="button-1 search-box-button"]');
        this.product_page = page.locator('h2[class=product-title] a');
        this.searchResults = page.locator('h2.product-title a');
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

    async ValideSearchResults() {
        const searchResults = await this.searchResults.allTextContents();
        expect(searchResults.length).toBeGreaterThan(0);
        for (const result of searchResults) {
            expect(result.toLowerCase()).toContain('laptop');
        }
    }
}

module.exports = {SearchPage};

