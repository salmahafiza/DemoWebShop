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
        this.AdvancedSearchCheckBox = page.locator('//*[@id="As"]');   
        this.CategoryDropdown = page.locator('//*[@id="Cid"]');
        this.AutomaticallySearchSubCategoriesCheckBox = page.locator('//*[@id="Isc"]');
        this.SearchInProductDescriptionCheckBox = page.locator('//*[@id="Sid"]');
        this.AdnacedSearchButton = page.locator('//input[@class="button-1 search-button"]');
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

    async clickOnProductName() {
        await this.product_page.click();
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/141-inch-laptop');
    }

    async InValidSearchResults() {
        const searchResults = await this.searchResults.allTextContents();
        expect(searchResults.length).toBe(0);
        for (const result of searchResults) {
            expect(result.toLowerCase()).toContain('No products were found that matched your criteria.');
        }
    }

    async ClickonAdvancedSearchCheckBox() {
        await this.AdvancedSearchCheckBox.click();
    }

    async SelectCategoryFromDropdown(category) {
        await this.CategoryDropdown.selectOption({ label: category });
    }

    async ClickonAutomaticallySearchSubCategoriesCheckBox() {
        await this.AutomaticallySearchSubCategoriesCheckBox.click();
    }

    async ClickonSearchInProductDescriptionCheckBox() {
        await this.SearchInProductDescriptionCheckBox.click();
    }

    async ClickonAdnacedSearchButton() {
        await this.AdnacedSearchButton.click();
        await expect(this.page).toHaveURL(/.*search/);
    }
}

module.exports = {SearchPage};

