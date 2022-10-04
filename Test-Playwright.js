const Helper = require('@codeceptjs/helper');

class TestPlaywright extends Helper {

  async example() {
    const { browserContext } = this.helpers.Playwright;
    // console.log(browserContext.newPage());
    // const page = await browserContext.newPage();
    // await page.goto('https://novitadiamonds.com/');
    
    await browserContext.route('**/api/product/diamonds', async route => {
      const response = await browserContext.request.fetch(route.request());
      let results = await response.json();
      console.log(results.response.items[0]);
      route.abort();
    });
  };

}

module.exports = TestPlaywright;
