const {expect} = require('@playwright/test');

class SearchPage {
    constructor(page) {
        this.page = page;
        this.search_bar = page.locator('//*[@id="small-searchterms"]');
        this.SearchbarField = page.locator('//*[@id="small-searchterms"]');
        this.EnterTextInSearchBox = page.locator('//*[@id="small-searchterms"]');
        this.SearchButton = page.locator('//input[@class="button-1 search-box-button"]');
        this.AdvancedSearchButton = page.locator('//input[@class="button-1 search-button"]');
        this.product_page = page.locator('h2[class=product-title] a');
        this.searchWarning = page.locator('.warning');
        this.longSearchResult = page.locator('.result');
        this.productNameLaptop = page.locator('.product-name');
        this.resultSection = page.locator(".page.search-page");
        this.suggestions = page.locator('.ui-autocomplete li');
        this.errorMessageForNoProducts = page.locator(".result");
        this.searchWarning = page.locator('.warning');
        this.longSearchResult = page.locator('.result');
        this.productNameLaptop = page.locator('.product-name');
        this.resultSection = page.locator(".page.search-page");
        this.suggestions = page.locator('.ui-autocomplete li');
        this.errorMessageForNoProducts = page.locator('.result');
        this.numericTextResult = page.locator('.product-item');
        this.checkBox = page.locator('#As');
        this.priceFrom = page.locator('#Pf');
        this.priceTo = page.locator('#Pt');
        this.priceRangeFilteration = page.locator('.search-results');
        this.categoryComputer = page.locator('#Cid');
        this.searchResults = page.locator('h2.product-title a');
        this.AdvancedSearchCheckBox = page.locator('//*[@id="As"]');
        this.CategoryDropdown = page.locator('//*[@id="Cid"]');
        this.AutomaticallySearchSubCategoriesCheckBox = page.locator('//*[@id="Isc"]');
        this.SearchInProductDescriptionCheckBox = page.locator('//*[@id="Sid"]');
        this.AdnacedSearchButton = page.locator('//input[@class="button-1 search-button"]');
        this.menufecturerDropdown = page.locator('//*[@id="Mid"]');
        this.sortbyPrice = page.locator('#products-orderby');
        this.displayPage = page.locator('#products-pagesize');
        this.ViewAsCheckBox = page.locator('//*[@id="products-viewmode"]');
        this.ProductViewAsGrid = page.locator('.product-grid');
        this.ProductViewAsList = page.locator('.product-list');
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
            expect(dialog.message()).toBe('Please enter some search keyword');
            await dialog.accept();
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
        await this.AdvancedSearchButton.click();
    }
    async advanceSearchForCategorySelection(searchText1) {
        await this.SearchbarField.fill(searchText1);
        await this.SearchButton.click();
    }
    async assertPriceRangeFilteration() {
        await expect(this.priceRangeFilteration).toBeVisible();
    }
    async selectOptionFromCategory(optionText) {
        await this.categoryComputer.click();
        await this.categoryComputer.selectOption({ label: optionText });
        await this.AdvancedSearchButton.click();
    }
    async falsecategorySelectionMsg() {
        await expect(this.errorMessageForNoProducts).toHaveText('No products were found that matched your criteria.');
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

    async clickonViewAsCheckBox(category) {
        await this.ViewAsCheckBox.selectOption({ label: category });
        if (category.toLowerCase() === 'grid') {
            await expect(this.ProductViewAsGrid).toBeVisible();
        } else if (category.toLowerCase() === 'list') {
            await expect(this.ProductViewAsList).toBeVisible();
        }
    }

    async validSearchText(searchText1) {
        await this.SearchbarField.fill(searchText1);
        await this.SearchButton.click();

    }

    async selectOptionFromMenufecturer(menufecturerOptionText) {
        await this.menufecturerDropdown.selectOption({ label: menufecturerOptionText });
        await this.AdvancedSearchButton.click();
    }

    async verifyingVisibilityOfProduct() {
        const productCount = await this.numericTextResult.count();
        if (productCount > 0) {
            console.log('Products are visible.');
            return;
        }
        else {
            await expect(this.errorMessageForNoProducts).toHaveText('No products were found that matched your criteria.');
            console.log('No products are visible.');
            return;
        }
    }

    async sortByPriceLowToHigh() {
        await this.sortbyPrice.selectOption({ label: 'Price: Low to High' });
    }

    async giftSearchText(giftSearchText) {
        await this.SearchbarField.fill(giftSearchText);
        await this.SearchButton.click();
    }

    async selectDisplayPage(displayPageValue) {
        await this.displayPage.selectOption({ label: displayPageValue });
    }

    async verifyingVisibilityOfProductByDisplayPage() {

        await Promise.race([
            this.numericTextResult.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => { }),
            this.errorMessageForNoProducts.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { })
        ]);

        const productCount = await this.numericTextResult.count();
        console.log(`Product Count found: ${productCount}`);

        if (productCount === 4) {
            console.log(' Products are visible as selected in Display Page.');
        } else {
            await expect(this.errorMessageForNoProducts).toHaveText('No products were found that matched your criteria.');
            console.log(' No products are visible.');
        }
    }

}

module.exports = {SearchPage};

