const { expect } = require('@playwright/test');

class SearchPage{
    constructor(page){
        this.page = page;
        this.search_bar= page.locator('//*[@id="small-searchterms"]');
        this.SearchbarField = page.locator('//*[@id="small-searchterms"]');
        this.EnterTextInSearchBox = page.locator('//*[@id="small-searchterms"]');
        this.SearchButton = page.locator('//input[@class="button-1 search-box-button"]');
        this.product_page = page.locator('h2[class=product-title] a');
        //this.advanceSearchCheckBox = page.locator('//input[@id=As]');
    }
    async VerifySearchBarIsVisible(){
        await expect(this.search_bar).toBeVisible();
    }
    async VerifySearchBarFieldIsEditable(){
        await expect(this.SearchbarField).toBeEditable();

    }
    async SearchAnItem(){
        await this.EnterTextInSearchBox.fill("Book");
    }
    async VerifySearchButtonIsClickable(){
        await this.SearchButton.click();
    }
     async VerifyValidProduct(){
        await this.EnterTextInSearchBox.fill("laptop");
        await this.SearchButton.click();
    }
    async VerifyProductPageRedirection(){
        await this.EnterTextInSearchBox.fill("Camera");
        await this.SearchButton.click();
        await this.product_page.click();
    } 
    async VerifyNonExistentProduct(){
        await this.EnterTextInSearchBox.fill("XYZ PRODUCT");
        await this.SearchButton.click();

    }
    async VerifyCaseSensitiveSearch(){
        await this.EnterTextInSearchBox.fill("LAPTOP");
        await this.SearchButton.click();
    }
    
   
    }

module.exports = { SearchPage };

