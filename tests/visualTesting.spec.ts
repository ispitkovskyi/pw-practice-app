import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('/') 
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.only('visual testing of radio buttons', async({page}) => {
    const usingTheGridForm= page.locator('nb-card', {hasText: 'Using the Grid'})
    await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
    const radioStatus = usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()

    // During the FIRST run, this method will generate a "baseline-screenshot" to be used as sample in future runs
    await expect(usingTheGridForm).toHaveScreenshot() 
    await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150}) 
})