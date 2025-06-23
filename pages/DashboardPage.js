import { expect } from '@playwright/test';
const { Users } = require('../test-data/Users');

class DashboardPage {
    constructor(page) {
        this.page = page;

        // LOCATORS
        this.logoutButton = page.locator("[href='/logout']");
        this.field_pageTitle = page.locator(".page-title");
        this.logo = page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[1]");
        this.hyerlink_shoppingCart = page.locator("xpath=//*[@id='topcartlink']/a");
        this.emptyShoppingCartMessage = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div/div[2]/div[2]");
        this.giftCard = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[3]/div/div/div[3]/div[2]");
        this.addToCartButton = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[3]/div/div/div[3]/div[2]/div/div[2]/div[3]/div[2]");
        this.addToCartButtonPage2 = page.locator("add-to-cart-button-2");
        this.fieldRecipientsName = page.locator("giftcard_2_RecipientName");
        this.fieldRecipientsEmail = page.locator("giftcard_2_RecipientEmail");
        this.hyperlink_wishList = page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[2]/div[1]/ul/li[4]/a/span[1]");
        this.wishListItemFirst = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div[1]/form/table/tbody/tr[1]/td[4]");
        this.wishlistItemSecond = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div[1]/form/table/tbody/tr[2]/td[4]");
        this.fieldNewsLetterEmail = page.locator("xpath=//*[@id='newsletter-email']");
        this.newsLetterSubscribeButton = page.locator("xpath=//*[@id='newsletter-subscribe-button']");
        this.assertVerificationEmailMessageOnSuccess = page.locator("xpath=//*[@id='newsletter-result-block']");
        this.assertMessageOnInvalidEmailOnSubscriptionButton = page.locator("xpath =//*[@id='newsletter-result-block']");
        this.assertGiftCardsName = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[1]");
        this.buttonGiftCardsFromDashboard = page.locator("xpath=/html/body/div[4]/div[1]/div[2]/ul[1]/li[7]/a");
        this.buttonJewelryFromDashboard = page.locator("xpath=/html/body/div[4]/div[1]/div[2]/ul[1]/li[6]/a");
                this.recentlyViewedProducts = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[1]/strong");
        this.computersCaegories = page.locator("xpath=/html/body/div[4]/div[1]/div[2]/ul[1]/li[2]/a");
        this.assertComputersName = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[1]");
        this.assertVirtualGiftCardName = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div/form/table/tbody/tr/td[3]/a");
        this.addToCartButtonGiftCard = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[3]/div[1]/div/div[2]/div[3]/div[2]/input");
        this.searchBoxText = page.locator("#small-searchterms");
        this.buttonSearch = page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[3]/form/input[2]");
        this.assertJewelryName = page.locator("//a[normalize-space()='Create Your Own Jewelry']");
        this.addtoWishlistBtn = page.locator("#add-to-wishlist-button-43");
        this.wishlistCount = page.locator('.wishlist-qty');
        this.assertProductName = page.locator("//a[normalize-space()='Smartphone']");
        this.booksPage= page.locator("div[class='block block-category-navigation'] li:nth-child(1) a:nth-child(1)")
        this.ComputersPage = page.locator("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)");
        this.electronicsPage = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ul[1]/li[3]/a[1]");
        this.apparelPage = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ul[1]/li[4]/a[1]");
        this.digitalPage = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ul[1]/li[5]/a[1]");
        this.jewelryPage = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ul[1]/li[6]/a[1]");
        this.giftcardsPage = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[4]/div[1]/div[1]/div[2]/ul[1]/li[7]/a[1]");
        this.assertBookPage = page.locator("//h1[normalize-space()='Books']");
        this.assertComputerPage = page.locator("//h1[normalize-space()='Computers']");
        this.assertElectronicPage = page.locator("//h1[normalize-space()='Electronics']");
        this.assertApparelPage = page.locator("//h1[normalize-space()='Apparel & Shoes']");
        this.assertDigitalPage = page.locator("//h1[normalize-space()='Digital downloads']");
        this.assertJewelryPage = page.locator("//h1[normalize-space()='Jewelry']");
        this.assertGiftcardsPage = page.locator("//h1[normalize-space()='Gift Cards']");
        this.selectproduct1FromDashboard = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[3]/div/div/div[3]/div[3]/div/div[2]/h2/a");
        this.selectproduct2FromDashboard = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[3]/div/div/div[3]/div[2]/div/div[2]/h2/a");
        this.selectproduct3FromDashboard =page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[3]/div/div/div[3]/div[7]/div/div[2]/h2/a")


       
        



        //TEST DATA//
        let recipientsName = "saba";
        let recipientEmail = "autester78@gmail.com";
        let invalidEmailOnSubscriptionLetter = "abc";
        let validEmailOnSubscriptionLetter = "abc@gmail.com"
        //let productNameFirst = "50's Rockabilly Polka Dot Top JR Plus Size";
        //let productNameSecond = "Create Your Own Jewelry";

    

    }
    async accessApplication() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }

    async verifyHomePageTitle() {
        await expect(this.page).toHaveTitle(/Demo Web Shop/);
    }

    async verifyUserInfoVisible() {
        await expect(this.page.locator('a.account').nth(0)).toHaveText(Users.username);
    }

    async navigateToLoginPage() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
    }

    async navigateToRegisterPage() {
        await this.page.goto('https://demowebshop.tricentis.com/register');
    }

    async verifyToLogout() {
        await this.page.logoutButton.click();
    }

    async clickHyperlinkShoppingCart() {
        await this.hyerlink_shoppingCart.click();
    }
    async verifyCartIsEmptyMessage() {
        await expect(this.emptyShoppingCartMessage).toHaveText(/Your Shopping Cart is empty!/);
    }

    async clickOnLogo() {
        await this.logo.click();
    }

    async clickOnWishListHyperlink() {
        await this.hyperlink_wishList.click();
    }
    async assertWishListItemFirst() {
        await expect(this.wishListItemFirst).toHaveText(/50's Rockabilly Polka Dot Top JR Plus Size/);
    }
    
    async assertWishListItemsSecond() {
        await expect(this.wishlistItemSecond).toHaveText(/Create Your Own Jewelry/);
    }

    async textBoxSubsciptionEmail_invalidEmail() {
        await this.fieldNewsLetterEmail.fill("abccc");
    }

    async buttonSubscribe() {
        await this.newsLetterSubscribeButton.click();
    }

    async assertMessageOnSubsciptionWithInvalidEmail(errorMessage = "Enter valid email") {
        await expect(this.assertMessageOnInvalidEmailOnSubscriptionButton).toHaveText(errorMessage);
        console.log(errorMessage);
    }

    async textBoxSubsciptionEmail_validEmail() {
        await this.fieldNewsLetterEmail.fill("saba@gmail.com");
    }

    async assertMessageOnSubsciptionWithValidEmail(successMessage = "Thank you for signing up! A verification email has been sent. We appreciate your interest.") {
        await expect(this.assertVerificationEmailMessageOnSuccess).toHaveText(successMessage);
        console.log(successMessage);
    }

    async clickonGiftCardFromDashboard() {
        await this.buttonGiftCardsFromDashboard.click();
    }
    
 async displayGiftCardName() {
await expect(this.assertGiftCardsName).toHaveText('Gift Cards');
}

 async clickOnJwelryNameFromDashboard() {
await this.buttonJewelryFromDashboard.click();
}

async clickOnComputersFromDashboard() {
await this.computersCaegories.click();
}

    
 async displayComputersName() {
await expect(this.assertComputersName).toHaveText('Computers');
}

async clickOnAddToCartfromDashboard()
{
    await this.addToCartButton.click();
    
}

async clickOnAddToCartButton()
{
    await this.addToCartButtonPage2.click();
    
}

async textFieldRecipientsName()
{
    await this.fieldRecipientsName.fill("saba");
    
}

async textFieldRecipientsEmail()
{
    await this.fieldRecipientsEmail.fill("abc@gmail.com");
    
}


async clickOnbuttonADddToCard_VirtualGiftCard()
{
    await this.addToCartButtonGiftCard.click();
    
}

async searchTextBox()
{
    await this.searchBoxText.fill("Smartphone");
    
}

async clickOnSearchButton()
{
    await this.buttonSearch.click();
    
}

 async displayJewelryName() {
await expect(this.assertJewelryName).toHaveText('Create Your Own Jewelry');
}


async clickOnProductName(){
    await this.assertProductName.click();
}
async clickOnWishlistBtn(){
    await this.addtoWishlistBtn.click();
}
async verifyWishlistCount(){
    const WishlistQty= await this.wishlistCount.innerText();
    return WishlistQty;
    
}
async verifyBookCategory() {
    await this.booksPage.click();
    await expect(this.assertBookPage).toHaveText('Books');
    await this.ComputersPage.click();
    await expect(this.assertComputerPage).toHaveText('Computers');
    await this.electronicsPage.click();
    await expect(this.assertElectronicPage).toHaveText('Electronics');
    await this.apparelPage.click();
    await expect(this.assertApparelPage).toHaveText('Apparel & Shoes');
    await this.digitalPage.click();
    await expect(this.assertDigitalPage).toHaveText('Digital downloads');
    await this.jewelryPage.click();
    await expect(this.assertJewelryPage).toHaveText('Jewelry');
    await this.giftcardsPage.click();
    await expect(this.assertGiftcardsPage).toHaveText('Gift Cards');

}
async verifyRecentlyViewedProducts() {
    await expect(this.recentlyViewedProducts).toBeVisible();
}

async clickOnProductsFromDashboard() {
    await this.selectproduct1FromDashboard.click();
    await this.logo.click();
    await expect (this.page).toHaveURL('https://demowebshop.tricentis.com/');
 }





    
}








module.exports = { DashboardPage };
