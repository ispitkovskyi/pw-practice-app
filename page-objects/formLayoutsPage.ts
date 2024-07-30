import {Page} from '@playwright/test'

export class FormLayoutsPage {

    private readonly page: Page

    constructor(page) {
        this.page = page
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm= this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)        
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm= this.page.locator('nb-card', {hasText: 'Inline Form'})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)   
        if (rememberMe == true) {
            await inlineForm.getByRole('checkbox').check({force: true})
        }
        await inlineForm.getByRole('button').click()
    }
}