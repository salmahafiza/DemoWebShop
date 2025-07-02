const getTimestampEmail = (domain = 'test.com') => {
    return `user${Date.now()}@${domain}`;
};

const { RegisterPage } = require('../pages/RegisterPage');

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
    UsersDummy: {
        username: 'MahHas123@randonm.com',
        password: '123456',
        invalidUser: 'invalid@gmail.com',
        invalidPassword: '1nvalidP@word',
        EmptyEmail: '',
        EmptyPassword: '',
        UnRegEmail: 't+e+s+t+1+2+3@gmail.com',
        InvalidEmail: 'abc1234gmail.com',
    },
    ResgisterData: {
        FirstName: 'Test',
        LastName: 'User',
        email: RegisterPage.generateRandomEmail(),
        Password: 'Test@1234',
        ConfirmPassword: 'Test@1234',
    },
    Url: {
        register: "https://demowebshop.tricentis.com/register",
        dashboard: "https://demowebshop.tricentis.com/",
        login: "https://demowebshop.tricentis.com/login",
        registeredurl: "https://demowebshop.tricentis.com/registerresult/1"
    },
    invalidPassword: {
        FirstName: 'Test',
        LastName: 'User',
        email: RegisterPage.generateRandomEmail(),
        Password: 'Test@1234',
        ConfirmPassword: 'Thja@1234',
    },
    invalidEmailFormat: {
        FirstName: 'Test',
        LastName: 'User',
        email: RegisterPage.generateInvalidEmail(),
        Password: 'Test@1234',
        ConfirmPassword: 'Test@1234',
    },
    Register: {
        firstName: 'Dummy',
        lastName: 'Tester',
        Email: getTimestampEmail(),
        Password: 'abcd@1234',
        existingEmail: 'test@gmail.com',
        shortpassword: 'short',
        InvalidFirstName: 'Dummy@123',
        InvalidLastName: 'Tester!@#',
    },
    billingAddressData: {
        firstName: 'Hassan',
        lastName: 'Mehmood',
        email: 'hassan.mehmood@test.com',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: 'Karachi',
        address1: '123 Street',
        zip: '74000',
        phone: '03001234567'
    },
    shippingAddressData: {
        firstName: 'Hassan',
        lastName: 'Mehmood',
        email: 'hassan.mehmood@test.com',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: 'Karachi',
        address1: '123 Street',
        zip: '74000',
        phone: '03001234567'
    },
    InvalidshippingAddressData: {
        firstName: 'Hassan',
        lastName: 'Mehmood',
        email: 'hassan.mehmood@test.com',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: '111i',
        address1: 'xyz',
        zip: '74000',
        phone: '03001234567'
    },
    missingCityInBillingAddressData: {
        firstName: 'Hassan',
        lastName: 'Mehmood',
        email: 'hassan.mehmood@test.com',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: '',
        address1: '123 Street',
        zip: '74000',
        phone: '03001234567'
    },
    MissingFirstNameInBillingAddressData: {
        firstName: '',
        lastName: 'Mehmood',
        email: 'hassan.mehmood@test.com',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: 'Karachi',
        address1: '123 Street',
        zip: '74000',
        phone: '03001234567'
    },
    misshongEmailInBillingAddressData: {
        firstName: 'Hassan',
        lastName: 'Mehmood',
        email: '',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: 'Karachi',
        address1: '123 Street',
        zip: '74000',
        phone: '03001234567'
    },
    missingLastNameInBillingAddressData: {
        firstName: 'Hassan',
        lastName: '',
        email: 'hassan.mehmood@test.com',
        country: 'Pakistan',
        state: 'Other (Non US)',
        city: 'Karachi',
        address1: '123 Street',
        zip: '74000',
        phone: '03001234567'
    },
    inValiBillingAddressData: {
        firstName: '',
        lastName: '',
        email: '',
        //country: '',
        //state: '',
        city: '',
        address1: '',
        zip: '',
        phone: ''
    },
    creditCardDetails: {
        cardType: 'Visa',
        holderName: 'Hassan Mehmood',
        cardNumber: '4111111111111111',
        expireMonth: '12',
        expireYear: '2030',
        cardCode: '123'
    },
    searchData: {
        partialSearchText: 'lap',
        searchText: 'computer',
        specialCharacter: "Lapt@p#123",
        emptySearchText: '',
        invalidSearchText: 'invalidsearchtext1234567890',
        numericalSearchText: '14.1',
        filerText: 'gift',
        priceRange: {
            pf: '5',
            pt: '50',
        },
        searchText1: 'Laptop',
        optionText: 'Computers',
    },
    GiftCardDetails: {
        recipientName: '',
        recipientEmail: '',
        yourName: 'Hassan',
        yourEmail: 'abc@gmail.com',
    },
    withoutEmailGiftCardDetails: {
        recipientName: 'abc',
        recipientEmail: '',
        yourName: 'Hassan',
        yourEmail: 'abc@gmail.com',
    },
    withoutNameGiftCardDetails: {
        recipientName: '',
        recipientEmail: 'xyz@gmail.com',
        yourName: 'Hassan',
        yourEmail: 'abc@gmail.com',
        menufecturerOptionText: 'Tricentis',
        displayPageValue: '4',
        giftSearchText: 'gift',
    },
    pdpData:{
        email:'sam123@gmail.com',
        friendEmail : 'sana123@gmail.com',
        message: 'recomended',
    }
};