import {test, expect} from '@playwright/test'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('/') // ('/') - means, that PW needs to look for baseURL env variable inside playwright.config.ts
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// Test
test('Assertions', async({page}) => {
    // General assertions
    const basicFormButton = page.locator('nb-card', {hasText: "Basic form"}).locator('button')
    const buttonText = await basicFormButton.textContent() // 'await' needed to wait for the element before getting the text
    expect(buttonText).toEqual("Submit")

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit5') // assertion will fail, but test will NOT stop here
    await basicFormButton.click()
})