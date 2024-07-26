import {test, expect} from '@playwright/test'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

// Test
test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially("test2@test.com")

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com')

        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially("test3@test.com", {delay: 500})

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test3@test.com')
    })

    test('radio buttons', async({page}) => {
        const usingTheGridForm= page.locator('nb-card', {hasText: 'Using the Grid'})
        
        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        // generic assertion
        const radioStatus = usingTheGridForm.getByLabel('Option 1').isChecked()
        expect(radioStatus).toBeTruthy()

        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        // locator assertion
        await expect(usingTheGridForm.getByLabel('Option 2')).toBeChecked()
        
        // other assertions having await function inside the expect() method
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
    })
})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    const toasterConfigForm= page.locator('nb-card', {hasText: 'Toaster configuration'})
    
    await toasterConfigForm.getByRole('checkbox', {name: 'Hide on click'}).click({force: true})
    await toasterConfigForm.getByRole('checkbox', {name: 'Hide on click'}).check({force: true})

    await toasterConfigForm.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    await toasterConfigForm.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    const allChekcboxes = page.getByRole('checkbox')
    for (const box of await allChekcboxes.all()) {
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }

    for (const box of await allChekcboxes.all()) {
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('lists and dropdowns', async({page}) => {
    // const dropDownMenu = page.getByRole('button', {name: 'Light'})
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // when the list has UL tag
    page.getByRole('listitem') //when the list has LI tag

    // const optionListItems = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Cosmic'}).click()

    // assert page background color
    const header = page.locator("nb-layout-header")
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // assert page background color for ALL possible items in the list
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    
    for(const color in colors) {
        await dropDownMenu.click()
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }
})

test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipPlacementsCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipPlacementsCard.getByRole('button', {name: 'Top'}).hover()

    // const tooltip = page.getByRole('tooltip', {name: 'This is a tooltip'}) // work ONLY if you have a role tooltip created
    const tooltip = page.locator('nb-tooltip', {hasText: 'This is a tooltip'})
    await expect(tooltip).toContainText('This is a tooltip')
    // or
    const tooltipText = await tooltip.textContent()
    expect(tooltipText).toEqual('This is a tooltip')
})