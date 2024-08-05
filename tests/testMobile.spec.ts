import { test, expect } from '@playwright/test'

test('input fields', async ({ page }, testInfo) => {
    await page.goto('/')
    //run for mobile only
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    //run for mobile only
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.type("test2@test.com")
})