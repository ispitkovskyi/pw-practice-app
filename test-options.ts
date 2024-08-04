import { test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage: string
    homePageRunsByDefault: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    // This is a FIXTURE
    globalsQaURL: [
        '',
        {option: true}
    ],

    // This is a FIXTURE. To make it be executed BY DEFAULT - put it into array and provide option
    homePageRunsByDefault: [
        async({page}, use) => {
            console.log('formLayoutsPageRunByDefault fixture')
            await page.goto('/')
            await use('')   // means it passes NOTHING into a test
        },
        {auto: true}    // means that this fixture will run AUTOMATICALLY before every test (and any beforeEach / beforeAll method also)
    ],

    // This is a FIXTURE
    formLayoutsPage: async({page}, use) => {
        console.log("formLayoutsPage before-'use' PRECONDITION BLOCK")
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        
        await use('') // means it passes NOTHING into a test

        console.log("formLayoutsPage after-'use' TEARDOWN BLOCK")
    },

    /**
     * 'pageManager' fixture has DEPENDENCY on 'formLayoutsPage' fixture
     * So, whenever the 'pageManager' fixture is run 'formLayoutsPage' will be run BEFORE it
     * @param param0 
     * @param use 
     */
    pageManager: async({page, formLayoutsPage}, use) =>{
        console.log('pageManager fixture')
        const pm = new PageManager(page)
        await use(pm)  // it passes instance of PageManager into a test
    }
})