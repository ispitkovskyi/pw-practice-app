import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config()

export default defineConfig<TestOptions>({
  use: {
    baseURL: 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
  },


  projects: [
    {
      name: 'chromium',
    },
  ],
});
