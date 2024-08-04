import {test} from '../test-options'
import {faker} from '@faker-js/faker'

// use 'pageManager' fixture from the test-options.ts instead of default 'page' fixture
test('parameterized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName({firstName: 'John'})
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})