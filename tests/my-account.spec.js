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