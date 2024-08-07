import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

// Before test (this is a Hook)
test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('testing with argos ci', async({page}) => {
    const pm: PageManager = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
})