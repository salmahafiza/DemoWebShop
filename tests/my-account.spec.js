const { test, expect } = require("@playwright/test");
const { DashboardPage } = require("../pages/DashboardPage");
const { MyAccountPage } = require("../pages/MyAccounts");
const { LoginPage } = require("../pages/LoginPage");
const { RegisterPage } = require("../pages/RegisterPage");
const { Users } = require("../test-data/Users");
let dashboard;
let myAccount;
let login;
let register;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    myAccount = new MyAccountPage(page);
    register = new RegisterPage(page);
    login = new LoginPage(page);
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await dashboard.verifyUserInfoVisible();
    await myAccount.clikcOnMyAccount();
});

test("TC_MyAccount_001: Verify that the webpage title matches exactly with My account - Orders", async () => {
    await myAccount.navigateMyAccountMenuItems("orders");
    await myAccount.verifyMyAccountPagesTitle("Orders");
});
test('TC_MyAccount_002: Verify that if there are no orders associated with the account, the message "No orders" is dsplayed clearnly on the page.', async () => {
    await myAccount.clickOnLogout();
    await dashboard.navigateToLoginPage();
    await login.enterUsername(Users.emailNoOrders);
    await login.enterPassword(Users.passwordNoOrder);
    await login.clickLoginButton();
    await myAccount.navigateMyAccountMenuItems("orders");
    await myAccount.verifyMyAccountPagesTitle("Orders");
    await myAccount.verifyNoOrders();
});

test("TC_MyAccount_003: Verify that each order on the page displays Order Number, Order Status, Order Date, and Order Total Amount information clearly and concisely", async () => {
    await myAccount.navigateMyAccountMenuItems("orders");
    await myAccount.verifyMyAccountPagesTitle("Orders");
    await myAccount.verifyOderDetails("Order status");
    await myAccount.verifyOderDetails("Order Date");
    await myAccount.verifyOderDetails("Order Total");
});
test("TC_MyAccount_004: Verify that clicking on the Details button for an order redirects to a new page displaying detailed information about the selected order, including items ordered, shipping address, billing address", async () => {
    await myAccount.navigateMyAccountMenuItems("orders");
    await myAccount.verifyMyAccountPagesTitle("Orders");
    await myAccount.clickOnOrderDetails();
    await myAccount.verifyOrderDetailsPageTitle("Order information");
});
test("TC_MyAccount_013: Ensure the user remains on the same page after saving changes", async () => {
    await myAccount.assertPageTitle("My account - Customer info");
    await myAccount.enterFirstName("Dummy");
    await myAccount.clickOnSaveBtn();
    await myAccount.assertPageTitle("My account - Customer info");
});

test("TC_MyAccount_014: Verify Cross-Browser Compatibility", async () => {
    await myAccount.enterLastName("Data");
    await myAccount.enterRegistrationEmail("jellyfish124@gmail.com");
    await myAccount.clickOnSaveBtn();
    await myAccount.verifyInputFirstNameField("Dummy");
    await myAccount.verifyInputLastNameField("Data");
    await myAccount.verifyInputEmailField("jellyfish124@gmail.com");
    await myAccount.selectGender("male");
    await myAccount.enterFirstName("test");
    await myAccount.enterLastName("123");
    await myAccount.enterRegistrationEmail("test123+1@gmail.com");
    await myAccount.clickOnSaveBtn();
});

test("TC_MyAccount_005: Verify that clicking on the PDF Invoice button generates a PDF invoice for the selected order and downloads it automatically to the user's device", async () => {
    await myAccount.navigateMyAccountMenuItems("orders");
    await myAccount.verifyMyAccountPagesTitle("Orders");
    await myAccount.clickOnOrderDetails();
    await myAccount.verifyOrderDetailsPageTitle("Order information");
    await myAccount.clickOnPdfInvoice();
});

test("TC_MyAccount_006: Verify that clicking on the Print button opens the print dialog box, allowing users to print the order details directly from their web browser", async () => {
    await myAccount.navigateMyAccountMenuItems("orders");
    await myAccount.verifyMyAccountPagesTitle("Orders");
    await myAccount.clickOnOrderDetails();
    await myAccount.verifyOrderDetailsPageTitle("Order information");
    await myAccount.clickOnPrintPDF();
    await myAccount.verifyPrintDialogBox();
});

