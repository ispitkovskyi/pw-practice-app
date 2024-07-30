import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

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

test('parameterized methods', async({page}) => {
    const navigateTo: NavigationPage = new NavigationPage(page)
    const formLayoutsPage: FormLayoutsPage = new FormLayoutsPage(page)
    const datePickerPage: DatePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true)
    await navigateTo.datepickerPage()
    await datePickerPage.selectCommonDatePickerDateFromToday(5)
    await datePickerPage.selectCommonDatePickerWithRangeFromToday(5, 10)
})