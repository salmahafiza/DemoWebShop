const { test, expect } = require("@playwright/test");
const { DashboardPage } = require("../pages/DashboardPage");
const { MyAccountPage } = require("../pages/MyAccounts");
const { LoginPage } = require("../pages/LoginPage");
const { RegisterPage } = require("../pages/RegisterPage");
const { UsersDummy} = require("../test-data/Users");
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
  await login.enterUsername(UsersDummy.username);
  await login.enterPassword(UsersDummy.password);
  await login.clickLoginButton();
  await myAccount.clikcOnMyAccount();
});

test("TC_MyAccount_09: Verify UI Elements on the Address Page", async () => {
    await myAccount.genderMale();
    await myAccount.genderFemale();
    await myAccount.firstNameField();
    await myAccount.lastNameField();
    await myAccount.emailField();
    await myAccount.saveButton();
});

test('TC_MyAccount_010: Verify Updating Personal Information', async () => {
    await myAccount.updateFirstName('Hassan');
    await myAccount.updateLastName('Ali');
    await myAccount.updateEmail('hassan.mehmood@gmail.com');
    await myAccount.clickSave();
    //await page.reload();
    await expect(myAccount.field_firstName).toHaveValue('Hassan');
    await expect(myAccount.field_LastName).toHaveValue('Ali');
    await expect(myAccount.field_registrationEmail).toHaveValue('hassan.mehmood@gmail.com');
});

