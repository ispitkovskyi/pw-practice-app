import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const navigateTo: NavigationPage = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.smartTablePage()
    await navigateTo.datepickerPage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('submit Using the Grid form', async({page}) => {
    const navigateTo: NavigationPage = new NavigationPage(page)
    const formLayoutsPage: FormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true)
})