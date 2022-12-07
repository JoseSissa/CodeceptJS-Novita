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
  "mocha": {
    "codeceptjs-cli-reporter": {
      "stdout": "-",
      "options": {
        "verbose": false,
        "steps": false,
      }
    },
    "reporterOptions": {
        "reportDir": "output",
        "reportFilename": "report"
    }
  },
  helpers: {
    Playwright: {
      browser: 'chromium',
      disableScreenshots: true,
      show: false,
      url: 'https://manmadediamonds.com.au/',
      waitForAction: 500,
      waitForNavigation: 'load',
      windowSize: "1300x650"
    },
  },
  include: {
    I: './steps_file.js'
  },
  name: 'codecepJS'
}