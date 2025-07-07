const {test, expect} = require('@playwright/test');

test.describe('REQRES API CRUD Operations', () => {
    test('GET list of all users', async({request})=>{
        const respone = await request.get('https://reqres.in/api/users?page=2')
        const body = await respone.json()
        await expect(body.data.length).toBeGreaterThan(0)
        await expect(respone.status()).toBe(200)
        console.log('All user',body)
    })
});