const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './test/**/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      show: false,
      // url: 'https://novitadiamonds.com/',
      // url: 'http://novitadiamonds.localhost',
      url: 'https://manmadediamonds.com.au/',
      waitForAction: 400,
      waitForNavigation: 'load',
      windowSize: "1300x650"
    },
  },
  include: {
    I: './steps_file.js'
  },
  name: 'codecepJS'
}