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
        this.recentlyViewedProducts = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]//h2")
        this.computersCaegories = page.locator("xpath=/html/body/div[4]/div[1]/div[2]/ul[1]/li[2]/a");
        this.assertComputersName = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[1]");
        this.assertVirtualGiftCardName = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div/form/table/tbody/tr/td[3]/a");
        this.addToCartButtonGiftCard = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[3]/div[1]/div/div[2]/div[3]/div[2]/input");
        this.searchBoxText = page.locator("#small-searchterms");
        this.buttonSearch = page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[3]/form/input[2]");
        this.assertJewelryName = page.locator("xpath=/html/body/div[4]/div[1]/div[4]/div[2]/div/div[2]/div[3]/div[1]/div/div/div[2]/h2/a");
        this.pollOption = '#pollanswers-1';
        this.voteBtn = '#vote-poll-1';
        this.pollResults = '.poll-results';
        this.pollResultItem = "div[class='block block-poll'] li:nth-child(2)";

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

    async clickOnAddToCartfromDashboard() {
        await this.addToCartButton.click();

    }

    async clickOnAddToCartButton() {
        await this.addToCartButtonPage2.click();

    }

    async textFieldRecipientsName() {
        await this.fieldRecipientsName.fill("saba");

    }

    async textFieldRecipientsEmail() {
        await this.fieldRecipientsEmail.fill("abc@gmail.com");

    }


    async clickOnbuttonADddToCard_VirtualGiftCard() {
        await this.addToCartButtonGiftCard.click();

    }

    async searchTextBox() {
        await this.searchBoxText.fill("jewelry");

    }

    async clickOnSearchButton() {
        await this.buttonSearch.click();

    }

    async displayJewelryName() {
        await expect(this.assertJewelryName).toHaveText('Create Your Own Jewelry');
    }
    async voteInCommunityPoll(page) {
        const pollText = await this.page.locator('#poll-block-1').textContent();

        if (
            pollText?.includes('Excellent') ||
            pollText?.includes('Good') ||
            pollText?.includes('Bad') ||
            pollText?.includes('Very bad')
        ) {
            const resultsText = await this.page.locator(this.pollResults).textContent();
            expect(resultsText?.trim().length).toBeGreaterThan(0);
        } else {
            await this.page.locator(this.pollOption).first().check();
            await this.page.locator(this.voteBtn).click();
        }
    }

    async verifyPollSubmission(page) {
        const resultsText = await this.page.locator(this.pollResults).textContent();
        expect(resultsText?.trim().length).toBeGreaterThan(0);
        const results = this.page.locator('.poll-results li');
        await expect(results.first()).toBeVisible();

    }




}


module.exports = { DashboardPage };
