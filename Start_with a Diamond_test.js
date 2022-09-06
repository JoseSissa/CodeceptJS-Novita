Feature('Start with a Diamond');

Scenario('Buy a diamond', ({ I }) => {

    const shapes = ["Round", "Oval", "Cushion", "Princess", "Emerald", "Pear", "Radiant", "Asscher", "Marquise"],
        caratFrom = 2,
        caratTo = 4,
        priceFrom = 2000,
        priceTo = 10000,
        reports = ["IGI", "GIA", "GCAL"],
        ratioFrom = 1.26,
        ratioTo = 2.00;
    // Checking the shape filter.
    function checkShape() {
        for(const shape of shapes) {
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
            for(const elem of shapes) {
                if(elem != shape) {
                    I.dontSee(elem);
                };
            };
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
        };
    }
    // Checking the carat filter.
    async function checkCarat() {
        I.fillField("#from_carat_value_input", caratFrom);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", caratTo);
        I.pressKey("Enter");
        const carat = await I.grabTextFromAll('tbody tr td:nth-child(3)');
        for (const elem of carat) {
            if(parseFloat(elem) < parseFloat(caratFrom) || parseFloat(elem) > parseFloat(caratTo)) {
                console.log('Error in the values obtained from the Carat filter');
            }
        }
    };
    // Check the color filter
    async function checkColour() {
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_color_content .from", 150);
        I.dragSlider("#search_form .diamond_filter_color_content .to", -300);
        I.wait(1);
        const colors = await I.grabTextFromAll('tbody tr td:nth-child(4)');
        for (const elem of colors) {
            if(elem !== "G") {
                console.log('Error in the values obtained from the Colour filter');
            }
        }
    };
    // Check the price filter
    async function checkPrice() {
        I.fillField("#from_price_value_input", priceFrom);
        I.pressKey('Enter');
        I.fillField("#to_price_value_input", priceTo);
        I.pressKey('Enter');
        const prices = await I.grabTextFromAll('tbody tr td:nth-child(1)');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) < priceFrom || ((elem.slice(elem.indexOf('$')+1)).replace(',', '')) > priceTo) {
                console.log('Error in the values obtained from the Price filter');
            }
        }
    };
    // Check the Report filter
    async function checkReport(report) {
        const records = await I.grabTextFromAll('tbody tr td:nth-child(7)');
        for (const elem of records) {
            if(elem != report) {
                console.log('Error in the values obtained from the Report filter');
            }
        }
    };
    // Check the compare option
    function compareDiamonds() {
        I.click('//*[@id="body_table_results"]/tr[1]/td[9]/div/span[1]/img');
        I.click('//*[@id="body_table_results"]/tr[2]/td[9]/div/span[1]/img');
        I.click("#to_compare_diamonds_from_diamond_list");
    };    
    

    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    I.amOnPage("/");
    I.forceClick("Start With a Diamond");
    I.seeInCurrentUrl("/engagement-ring/create/diamond");

    // I.click('.round-shape');
    I.wait(1);
    I.scrollTo("#body_table_results", 0,100);
    // checkShape();
    //------------------------------------------------------------------------------
    // checkCarat();
    //------------------------------------------------------------------------------
    checkColour();
    //------------------------------------------------------------------------------
    // checkPrice();
    //------------------------------------------------------------------------------
    // I.click("#advanced_filters_button");
    // for (let i = 0; i < reports.length; i++) {
    //     I.click(reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    //     checkReport(reports[i]);
    //     I.click(reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    // }
    //------------------------------------------------------------------------------
    // Reset filters
    // I.click('//*[@id="search_form"]/div[5]/a[2]');
    //------------------------------------------------------------------------------
    I.wait(1);
    compareDiamonds();
    pause();
});















// INPUTS TYPE RANGE
// I.dragSlider("#search_form .diamond_filter_color_content .from", 100)