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
            "I" : [210, 200],
            "J" : [250, 150],
            "K" : [300, 100],
            "L" : [350, 50],
            "M" : [400, 0],
        },
        "priceFrom" : 15000,
        "priceTo" : 30000,
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
                }else {
                    I.see(elem);
                };
            };
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
        };
    };
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
                I.dontSee(elem);
                break;
            }
        }
    };
    // Check the color filter
    async function checkColour() {
        const option = "J";
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_color_content .from", 150);
        I.dragSlider("#search_form .diamond_filter_color_content .to", -300);
        I.wait(1);
        const colors = await I.grabTextFromAll('tbody tr td:nth-child(4)');
        for (const elem of colors) {
            if(elem !== option) {
                I.see(option, 'td');
                console.log('Error in the values obtained from the Colour filter');
                break;
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
                I.dontSee(elem);
                break;
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
    };
    // Check the Polish filter
    function checkPolish() {
        I.wait(1);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .from", 150);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .to", -150);
    };
    // Check the Report filter
    async function checkReport(report) {
        const records = await I.grabTextFromAll('tbody tr td:nth-child(7)');
        for (const elem of records) {
            if(elem != report) {
                console.log('Error in the values obtained from the Report filter');
                break;
            }
        }
    };
    // Check the Symmetry filter
    function checkSymmetry() {
        I.wait(1);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .from", 150);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .to", -150);
    };
    // Check the Ratio filter 
    function checkRatio() {
        I.wait(1);
        I.fillField('#from_ratio_value_input', 1.5);
        I.pressKey('Enter');
        I.fillField('#to_ratio_value_input', 2);
        I.pressKey('Enter');
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

    //------------------------------------------------------------------------------
    // checkShape();
    //------------------------------------------------------------------------------
    // checkCarat();
    //------------------------------------------------------------------------------
    // checkColour();
    //------------------------------------------------------------------------------
    // checkPrice();
    //------------------------------------------------------------------------------
    // checkCut();
    //------------------------------------------------------------------------------
    // checkClarity();
    //------------------------------------------------------------------------------
    I.click("#advanced_filters_button");
    //------------------------------------------------------------------------------
    // I.wait(1);
    // checkPolish();
    //------------------------------------------------------------------------------
    // I.wait(1);
    // for (let i = 0; i < params.reports.length; i++) {
    //     I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    //     checkReport(params.reports[i]);
    //     I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    // }
    //------------------------------------------------------------------------------
    checkSymmetry();
    //------------------------------------------------------------------------------
    checkRatio();
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