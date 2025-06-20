const getTimestampEmail = (domain = 'test.com') => {
    return `user${Date.now()}@${domain}`;
};

module.exports = {
    Users: {
        username: 'test123+1@gmail.com',
        password: 'abcd@1234',
        invalidUser: 'invalid@gmail.com',
        invalidPassword: '1nvalidP@word',
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
    }
};