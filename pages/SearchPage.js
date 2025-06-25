const { expect } = require('@playwright/test');

class SearchPage {
    constructor(page) {
        this.page = page;
        this.search_bar = page.locator('//*[@id="small-searchterms"]');
        this.SearchbarField = page.locator('//*[@id="small-searchterms"]');
        this.EnterTextInSearchBox = page.locator('//*[@id="small-searchterms"]');
        this.SearchButton = page.locator('//input[@class="button-1 search-box-button"]');
        this.product_page = page.locator('h2[class=product-title] a');
        this.errorMessageForNoProducts = page.locator(".result");
        this.numericTextResult = page.locator('.product-item');
        this.checkBox = page.locator('#As');
        this.priceFrom = page.locator('#Pf');
        this.priceTo = page.locator('#Pt');
        this.priceRangeFilteration = page.locator('.search-results');
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
    async searchWithPartialText(partialSearchText) {
        await this.SearchbarField.fill(partialSearchText);
        await this.SearchButton.click();


    }
    async assertSearchWithPartialTextResult() {

        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/search?q=lap');
    }
    async searchWithSpecialCharacters(specialCharacter) {
        await this.SearchbarField.fill(specialCharacter);
        await this.SearchButton.click();
    }
    async assertWithSPecialCharactersResult() {
        await expect(this.errorMessageForNoProducts).toHaveText('No products were found that matched your criteria.');

    }
    async searchWithNumericValue(numericalSearchText) {
        await this.SearchbarField.fill(numericalSearchText);
        await this.SearchButton.click();

    }
    async assertNumericSearchResult() {
        await expect(this.numericTextResult).toHaveCount(1);

    }
    async searchWithEmptyText(emptySearchText) {
        await this.SearchbarField.fill(emptySearchText);
        await this.SearchButton.click();

    }
    async assertWithNoProductsFound() {
        this.page.once('dialog', async dialog => {
            // Assert the alert message
            expect(dialog.message()).toBe('Please enter some search keyword');
            await dialog.accept(); // Press OK on the alert
        });
    }
    async advanceSearchCheck() {
        await (this.checkBox).check();

    }

    async advanceSearchText(filerText) {
        await this.SearchbarField.fill(filerText);
        await this.SearchButton.click();

    }
    async priceRange(pf, pt) {
        await this.priceFrom.fill(pf);
        await this.priceTo.fill(pt);
        await this.SearchButton.click();

    }
    async assertPriceRangeFilteration() {
        await expect(this.priceRangeFilteration).toBeVisible();
    }

}

module.exports = { SearchPage };

