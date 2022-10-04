const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://novitadiamonds.com/',
      // url: 'http://novitadiamonds.localhost',
      // url: 'https://manmadediamonds.com.au/',
      show: true,
      browser: 'chromium',
      waitForAction: 2000,
      waitForNavigation: "domcontentloaded",
      windowSize: "1300x650"
    },
    JSONResponse: {
      requestHelper: 'Playwright',
    },
    MyHelper: {
      require: './Test-Playwright.js'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'codecepJS'
}