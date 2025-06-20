const {RegisterPage} = require('../pages/RegisterPage'); 

module.exports = {
    Users: {
        username: 'test123+1@gmail.com',
        password: 'abcd@1234',
        invalidUser: 'invalid@gmail.com',
        invalidPassword: '1nvalidP@word',
        EmptyEmail: '',
        EmptyPassword: '',
        UnRegEmail: 't+e+s+t+1+2+3@gmail.com',
        InvalidEmail: 'abc1234gmail.com',
    },
    ResgisterData :{
        FirstName: 'Test',
        LastName: 'User',
        email: RegisterPage.generateRandomEmail(),
        Password: 'Test@1234',
        ConfirmPassword: 'Test@1234',
    },
     Url:{
        register:"https://demowebshop.tricentis.com/register",
        dashboard:"https://demowebshop.tricentis.com/",
        login:"https://demowebshop.tricentis.com/login",
        registeredurl:"https://demowebshop.tricentis.com/registerresult/1"
    
    },
    invalidPassword : {
        FirstName: 'Test',
        LastName: 'User',
        email: RegisterPage.generateRandomEmail(),
        Password: 'Test@1234',
        ConfirmPassword: 'Thja@1234',
    },
    invalidEmailFormat :{
        FirstName: 'Test',
        LastName: 'User',
        email: RegisterPage.generateInvalidEmail(),
        Password: 'Test@1234',
        ConfirmPassword: 'Test@1234',
    }

};
