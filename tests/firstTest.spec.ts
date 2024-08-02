import {test} from '@playwright/test'

// Before all tests (this is a Hook)
// test.beforeAll(async({page}) => {
//     console.log("Executed before all tests once")
// })

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

// Test
// test('The first test', async ({page}) => {
//     await page.getByText('Forms').click()
//     await page.getByText('Form Layouts').click()
// })

// test('navigate to datepicker page', async ({page}) => {
//     await page.getByText('Forms').click()
//     await page.getByText('Datepicker').click()
// })

// test.afterEach(async({page}) => {
//     console.log("Executed after each test")
// })

// Test Suite
test.describe('test suite 1', () => {
// Before test (this is a Hook)
test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    // Test
    test('The first test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

// Test Suite 2
test.describe('test suite 2', () => {
    // Before test (this is a Hook)
    test.beforeEach(async({page}) => {
            await page.getByText('Forms').click()
        })
    
        // Test
        test('The first test', async ({page}) => {
            await page.getByText('Form Layouts').click()
        })
    
        test('navigate to datepicker page', async ({page}) => {
            await page.getByText('Datepicker').click()
        })
    })