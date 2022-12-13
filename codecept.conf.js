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
        "verbose": true,
        "steps": true,
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
    const res = require('./output/mochawesome.json')
    const me = 'Cool, one of the workers have finished'

    const suites = res.results[0].suites
    for (const elem of suites) {
      const title = elem.tests[0].title
      const state = elem.tests[0].state
      const err = elem.tests[0].err.message
      console.log({me, title, state, err});
    }

  },
  async teardownAll() {
    console.log('All workers have finished running tests so we should clean up the temp folder');
    // fs.rmdirSync(tempFolder);
  },
  include: {
    I: './steps_file.js'
  },
  name: 'codecepJS'
}