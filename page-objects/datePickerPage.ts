import {Page, expect} from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase{
    
    constructor(page: Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInpuField = this.page.getByPlaceholder('Form Picker')
        await calendarInpuField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInpuField).toHaveValue(dateToAssert)
    }

    async selectCommonDatePickerWithRangeFromToday(startDateFromToday: number, endDateFromToda: number){
        const calendarInpuField = this.page.getByPlaceholder('Range Picker')
        await calendarInpuField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDateFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(startDateFromToday)
        
        const dateRangeToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInpuField).toHaveValue(dateRangeToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday) // set date relatively of today
        const expectedDate = date.getDate().toString() //expected date
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'}) // month of the expected date (short form)
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'}) // month of the expected date (long form)
        const expectedYear = date.getFullYear()                                 // year of the expected date
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator(".day-cell.ng-star-inserted").getByText(expectedDate, {exact: true}).click()

        return dateToAssert
    }
}