const {test, expect} = require('@playwright/test');

test.describe('REQRES API CRUD Operations', () => {

    test('GET list of all users', async({request})=>{
        const respone = await request.get('https://reqres.in/api/users?page=2')
        const body = await respone.json()
        await expect(body.data.length).toBeGreaterThan(0)
        await expect(respone.status()).toBe(200)
        console.log('All user',body)
    })

    test('GET Signle user', async({request})=>{
        const response = await request.get('https://reqres.in/api/users/2')
        const body = await response.json()
        expect(response.status()).toBe(200)
        console.log('Single user',body)
        expect(body.data.id).toBe(2)
        expect(body.data.first_name).toBe("Janet")
    })
});