import { test, expect } from '@playwright/test';

const { DashboardPage } = require('../pages/DashboardPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { Users,ResgisterData,EmptyData , Url} = require('../test-data/Users');



let dashboard;
let register;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    register = new RegisterPage(page);
    await dashboard.accessApplication();
    await dashboard.verifyHomePageTitle();
    await register.navigateToRegistrationPage();
});
test(" TC_REGISTER_001 : Verify that a new user can register with valid details.", async () => {
    await register.fillFirstName(ResgisterData.FirstName);
    await register.fillLastName(ResgisterData.LastName);
    await register.Email(ResgisterData.email);
    await register.fillpassword(ResgisterData.Password);    
    await register.fillConfirmPassword(ResgisterData.ConfirmPassword);
    await register.clickRegisterButton();
    await register.verifySuccessRegistration();
});
test.only("Tc_REGISTER_002 : Invalid Registration with empty data ", async({page})=>{
await register.clickRegisterButton();
   if(Url.register === page.url()){
        console.log("Pass");  
    }
    else{
        console.log("Fail");
    }   
});