Feature('Start with a Diamond');

Scenario('Buy a diamond', ({ I }) => {

    const params = {
        "shapes" : ["Round", "Oval", "Cushion", "Princess", "Emerald", "Pear", "Radiant", "Asscher", "Marquise"],
        "caratFrom" : 2,
        "caratTo" : 4,
        "colour" : {
            "D" : [0, 450],
            "E" : [50, 400],
            "F" : [100, 350],
            "G" : [150, 300],
            "H" : [200, 250],
            "I" : [250, 200],
            "J" : [300, 150],
            "K" : [350, 100],
            "L" : [400, 50],
            "M" : [450, 0],
        },
        "priceFrom" : 2000,
        "priceTo" : 10000,
        "reports" : ["IGI", "GIA", "GCAL"],
        "ratioFrom" : 1.26,
        "ratioTo" : 2.00
    }

    // Checking the shape filter.
    function checkShape() {
        for(const shape of params.shapes) {
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
            for(const elem of params.shapes) {
                if(elem != shape) {
                    I.dontSee(elem);
                };
            };
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
        };
    }
    // Checking the carat filter.
    async function checkCarat() {
        I.wait(1);
        I.fillField("#from_carat_value_input", params.caratFrom);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", params.caratTo);
        I.pressKey("Enter");
        const carat = await I.grabTextFromAll('tbody tr td:nth-child(3)');
        for (const elem of carat) {
            if(parseFloat(elem) < parseFloat(params.caratFrom) || parseFloat(elem) > parseFloat(params.caratTo)) {
                console.log('Error in the values obtained from the Carat filter');
            }
        }
    };
    // Check the color filter
    async function checkColour(option) {
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_color_content .from", params.colour[option][0]);
        I.dragSlider("#search_form .diamond_filter_color_content .to", -(params.colour[option][1]));
        I.wait(1);
        const colors = await I.grabTextFromAll('tbody tr td:nth-child(4)');
        for (const elem of colors) {
            console.log(elem);
            if(elem !== option) {
                console.log('Error in the values obtained from the Colour filter');
            }
        }
    };
    // Check the price filter
    async function checkPrice() {
        I.fillField("#from_price_value_input", params.priceFrom);
        I.pressKey('Enter');
        I.fillField("#to_price_value_input", params.priceTo);
        I.pressKey('Enter');
        const prices = await I.grabTextFromAll('tbody tr td:nth-child(1)');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) < params.priceFrom || ((elem.slice(elem.indexOf('$')+1)).replace(',', '')) > params.priceTo) {
                console.log('Error in the values obtained from the Price filter');
            }
        }
    };
    // Check the cut option
    function checkCut() {
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_cut_content .from", 57);
        I.dragSlider("#search_form .diamond_filter_cut_content .to", -200);
        I.dontSee('Ideal', 'td');
        I.dontSee('Very Good', 'td');
        I.dontSee('Good', 'td');

    };
    // Check the clarity option
    async function checkClarity() {
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_clarity_content .from", 300);
        I.dragSlider("#search_form .diamond_filter_clarity_content .to", -100);
        const clarity = await I.grabTextFromAll('tbody tr td:nth-child(5)');
        for (const elem of clarity) {
            if(elem !== "SI1") {
                console.log('Error in the values obtained from the Clarity filter');
            }
        }
    }
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

    I.amOnPage("/contact");
    I.forceClick("Start With a Diamond");
    I.seeInCurrentUrl("/engagement-ring/create/diamond");

    // I.click('.round-shape');
    I.wait(1);
    I.scrollTo("#body_table_results", 0, 100);
    // checkShape();
    //------------------------------------------------------------------------------
    // checkCarat();
    //------------------------------------------------------------------------------
    // checkColour("G");
    //------------------------------------------------------------------------------
    // checkPrice();
    //------------------------------------------------------------------------------
    // checkCut();
    //------------------------------------------------------------------------------
    // I.wait(1);
    checkClarity();
    //------------------------------------------------------------------------------
    // I.click("#advanced_filters_button");
    // for (let i = 0; i < params.reports.length; i++) {
    //     I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    //     checkReport(params.reports[i]);
    //     I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    // }
    //------------------------------------------------------------------------------
    // Reset filters
    // I.click('//*[@id="search_form"]/div[5]/a[2]');
    //------------------------------------------------------------------------------
    // I.wait(1);
    // compareDiamonds();
    //------------------------------------------------------------------------------

    pause();
});















// INPUTS TYPE RANGE
// I.dragSlider("#search_form .diamond_filter_color_content .from", 100)