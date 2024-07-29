import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'

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