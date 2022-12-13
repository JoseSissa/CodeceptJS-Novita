const sendReport = (report) => {
    const suites = report.results[0].suites
    for (const elem of suites) {
      const title = elem.tests[0].title
      const state = elem.tests[0].state
      const err = elem.tests[0].err.message
      console.log({ title, state, err });
    }
}

module.exports = sendReport
