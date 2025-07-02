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

test.only("TC_MyAccount_001: Verify that the webpage title matches exactly with My account - Orders", async () => {
  await myAccount.navigateMyAccountMenuItems("orders");
  await myAccount.verifyMyAccountPagesTitle("Orders");
});