import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config()

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000
  },

  retries: 1,
  reporter: 'html',

  // Runtime settings
  use: {
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
            : process.env.STAGING == '1' ? 'http://localhost:4202'
            : 'http://localhost:4200',

    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },


  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
      },
    },

    {
      name: 'chromium', // default
      timeout: 60000
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {
          mode: 'on',
          size: {width: 1920, height: 1080}
        }
      },
    },

    {
      name: 'pageObjectFullScreen',
      testMatch:'usePageObjects.spec.ts',  // Which tests I want to run
      use: {
        viewport: {width: 1920, height: 1080}
      }
    }
  ],
});
