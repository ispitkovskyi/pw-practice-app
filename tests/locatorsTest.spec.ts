import {test} from '@playwright/test'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// Test
test('Locator syntax rules', async({page}) => {

    // by TAG name 'input'
    await page.locator('input').first().click()  // need 'await' because click() - is a Promise;  first() needed to use 1st of found collection of elements
    
    // by ID "inputEmail1"
    await page.locator('#inputEmail1').click()
    
    // by a separate (part of) CLASS value = "shape-rectangle"
    page.locator('.shape-rectangle') // NO need 'await' because locator() - is NOT a Promise
    
    // by value "Email" of ATRRIBUTE "placeholder"
    page.locator('[placeholder="Email"]')

    // by entire CLASS value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine selectors for an element
    page.locator('input[placeholder="Email"][nbinput]')

    // xpath (NOT RECOMMENDED)
    page.locator('//input[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})