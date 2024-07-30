import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{  // export is required in order to make this class visible for imports in other files

    constructor(page: Page){  // ': Page' - is the TypeScript way to specify a type of an argument
        super(page) // call constructor of the super-class
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForSeconds(2) // function from the SUPER-CLASS
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded')
        if (isExpanded == 'false') {
            await groupMenuItem.click()
        }
    }
}