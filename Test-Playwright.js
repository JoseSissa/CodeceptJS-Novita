const Helper = require('@codeceptjs/helper');

class TestPlaywright extends Helper {

  
  async getResponseFromApi(filter, option) {

    // await browserContext.route('**/api/product/diamonds', async route => {
    //   const response = await browserContext.request.fetch(route.request());
    //   const results = await response.json();
    //   console.log(results.response.items[0]);
    //   await browserContext.request.dispose();

      // if(results.response.items[0][filter] === option) {
      //   console.log(results.response.items[0][filter]);
      //   console.log('Soy igual');
      // }else {
      //   console.log(results.response.items[0][filter]);
      //   console.log('No soy igual');
      // }
      
    };

  };



module.exports = TestPlaywright;
