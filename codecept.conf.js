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
      disableScreenshots: true,
      show: false,
      // url: 'https://manmadediamonds.com.au/',
      url: 'https://novitadiamonds.com/',
      waitForAction: 500,
      waitForNavigation: 'load',
      windowSize: "1300x650"
    },
  },
  "mocha": {
    "reporterOptions": {
        "reportDir": "output"
    },
    "mochawesome": {
      "stdout": "./output/console.log",
      "options": {
        "reportDir": "./output",
        "reportFilename": "report"
      }
    }
  },
  plugins: {
    tryTo: {
      enabled: true
    }
  },
  async teardown() {
    const report = require('./output/mochawesome.json')
    const sendReport = require('./sendReport/sendReport.js')
    sendReport(report)
  },
  include: {
    I: './steps_file.js'
  },
  name: 'codecepJS'
}