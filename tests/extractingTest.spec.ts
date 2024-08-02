import {test, expect} from '@playwright/test'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('/') // ('/') - means, that PW needs to look for baseURL env variable inside playwright.config.ts
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// Test
test('Extracting values', async({page}) => {
    // single text value
    const basicForm = page.locator('nb-card', {hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual("Submit")

    // all text values from radio buttons group in "Using the Grid" form and assert that at least one of them has 'Option1'
    const allRadioButtonsText = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsText).toContain("Option 1")

    // input field value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()

    expect(emailValue).toEqual('test@test.com')

    // get value of attribute
    const emailFieldPlaceholder = await emailField.getAttribute('Placeholder')
    expect(emailFieldPlaceholder).toEqual('Email')
})