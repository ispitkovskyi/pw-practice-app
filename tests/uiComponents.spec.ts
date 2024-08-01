import {test, expect} from '@playwright/test'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

// Test
test.describe.only('Form Layouts page', () => {
    test.describe.configure({retries: 2})

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}, testInfo) => {
        if(testInfo.retry){
            // run precondition code
        }

        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially("test2@test.com")

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com1')

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

test('dialog boxes', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // create a listener for a dialog, so it wouldn't be closed immediately
    // when dialog is invoked, this listener will work
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        //close dialog (NOT cancel)
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()

    //assert that the 1st row in the table does NOT contain the deleted email
    await expect(page.getByRole('table').locator('tr').first()).not.toHaveText("mdo@gmail.com")
})

test('web tables part 1', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    
    //1 get the row by any text in this row
    const targetRow1 = page.getByRole('table').getByRole('row', {name: "twitter@outlook.com"})
    await targetRow1.locator('.nb-edit').click()
    
    // because in edit mode, the text value in a cell is reflected in the 'placeholder' attribute, need such locator:
    const ageFieldInEditMode = page.getByRole('table').locator('input-editor').getByPlaceholder('Age')
    await ageFieldInEditMode.clear()
    await ageFieldInEditMode.fill('35')
    await page.locator('.nb-checkmark').click()

    // 2 select a row by ID=11 on page #2
    await page.locator("nav[class*='ng2-smart-pagination-nav']").getByText('2').click()
    const targetRowById = page.getByRole('table')
                                .getByRole('row', {name: '11'}) // returns 2 rows with text '11'
                                .filter({has: page.locator('td') // returns all cells/columns for each of these rows
                                    .nth(1) // we take only cells/columns #2 of each of these rows
                                    .getByText('11')}) //returns only row, whose cell/column #2 contains text '11'
    await targetRowById.locator('.nb-edit').click()

    const emailFieldInEditMode = page.getByRole('table').locator('input-editor').getByPlaceholder('E-mail')
    await emailFieldInEditMode.clear()
    await emailFieldInEditMode.fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // 3 test filter of the table
    const ages = ["20", "30", "40", "200"]
    const ageFilterField = page.getByRole('table').locator('input-filter').getByPlaceholder('Age')
    for(let age of ages){
        await ageFilterField.clear()
        await ageFilterField.fill(age)
        // IMPORTANT: Because Playwright runs fast, we need a delay after the filter value was entered
        // and before the content of table is loaded (according to the filter value specified)
        // await page.waitForTimeout(500)
        await page.locator(`default-table-filter[ng-reflect-query='${age}']`).waitFor({state: 'attached'})
        const filteredRows = page.locator('tbody tr')
        for(let row of await filteredRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age != "200") {
                expect(cellValue).toEqual(age)
            } else {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            }
        }
    }
})

test('date picker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInpuField = page.getByPlaceholder('Form Picker')

    await calendarInpuField.click()
    await page.locator("[class='day-cell ng-star-inserted']").getByText('14').click()
    await calendarInpuField.click()
    await page.locator("[class='day-cell ng-star-inserted']").getByText('1', {exact: true}).click()
    await expect(calendarInpuField).toHaveValue('Jul 1, 2024')
})

test('date picker using Date object', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInpuField = page.getByPlaceholder('Form Picker')
    await calendarInpuField.click()

    // working with JavaScript Date type
    let date = new Date()
    date.setDate(date.getDate() + 200) // set date relatively of today

    const expectedDate = date.getDate().toString() //expected date
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'}) // month of the expected date (short form)
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'}) // month of the expected date (long form)
    const expectedYear = date.getFullYear()                                 // year of the expected date
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await calendarInpuField.click()
    await page.locator("[class='day-cell ng-star-inserted']").getByText(expectedDate, {exact: true}).click()
    await expect(calendarInpuField).toHaveValue(dateToAssert)
})

test('sliders', async({page}) => {
    // change position of slider by setting x, y attributes of it
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // evaluation of JS expression
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '270.955')
        node.setAttribute('cy', '143.429')
    })
    await tempGauge.click() // trigger the event to update elem on page

    // mouse move
    const draggerBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await draggerBox.scrollIntoViewIfNeeded()

    const box = await draggerBox.boundingBox() // playwright create a coordinates around box, which represents web element
    // center of the box
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    await page.mouse.move(x, y) // put mouse to the center of the box
    await page.mouse.down()  // press Left Button on the coordinates above
    await page.mouse.move(x + 100, y) // move horizontally
    await page.mouse.move(x + 100, y + 100) // move vertically down
    await page.mouse.up()  // releae Left Mouse moust button
    await expect(draggerBox).toContainText('30')
})