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
                }
            };
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
        };
    };
    // Checking the carat filter.
    async function checkCarat() {
        I.fillField("#from_carat_value_input", params.caratFrom);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", params.caratTo);
        I.pressKey("Enter");
        const carat = await I.grabTextFromAll('tbody tr td:nth-child(3)');
        for (const elem of carat) {
            if(parseFloat(elem) < parseFloat(params.caratFrom) || parseFloat(elem) > parseFloat(params.caratTo)) {
                console.log('Error in the values obtained from the Carat filter');
                I.dontSee(elem);
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
        I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .from", 150);
        I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .to", -150);
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
    // Functions of metal types filters
    // Option All
    async function checkAllMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
             if(elem !== '18ct White Gold' && elem !== '18ct Yellow Gold' && elem !== '18ct Rose Gold' && elem !== 'Platinum') {
                console.log('Error in values obtained from metal type filter option All');
             }
        }
    };
    // Option White Gold
    async function checkWhiteMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct White Gold") {
                console.log('Error in values obtained from metal type filter option White Gold');
            }
        }
    };
    // Option Yellow Gold
    async function checkYellowMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct Yellow Gold") {
                console.log('Error in values obtained from metal type filter option Yellow Gold');
            }
        }
    };
    // Option Rose Gold
    async function checkRoseMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct Rose Gold") {
                console.log('Error in values obtained from metal type filter option Rose Gold');
            }
        }
    };
    // Option Rose Gold
    async function checkPlatinumMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "Platinum") {
                console.log('Error in values obtained from metal type filter option Platinum');
            }
        }
    };
    // Functions of Price filter
    // 1000 and under
    async function checkPrice1000andUnder() {
        const prices = await I.grabTextFromAll('#ring_list_section .ring_item .price');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) > 1000) {
                console.log('Error in values obtained from Price filter option $1000 and under');
            }
        }
    };
    // 1000 and 2000
    async function checkPrice1000To2000() {
        const prices = await I.grabTextFromAll('#ring_list_section .ring_item .price');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) <= 1000 || ((elem.slice(elem.indexOf('$')+1)).replace(',', '')) > 2000 ) {
                console.log('Error in values obtained from Price filter option $1000 to $2000');
            }
        }
    };
    // 2000 and over
    async function checkPrice2000andOver() {
        const prices = await I.grabTextFromAll('#ring_list_section .ring_item .price');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) < 2000) {
                console.log('Error in values obtained from Price filter option $2000 and over');
            }
        }
    };
    // Search input Ring design
    async function searchInput() {
        I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', 'Allegro accent');
        I.pressKey('Enter');
        const results = await I.grabTextFromAll('#ring_list_section .ring_item .name');
        for (const elem of results) {
            if(!(elem.includes('Allegro Accent'))) {
                console.log('Error in values obtained from input search in Ring Design.');
            }
        }
    };


    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    I.amOnPage("/contact");
    I.forceClick("Start With a Diamond");
    I.seeInCurrentUrl("/engagement-ring/create/diamond");

    // I.click('.round-shape');
    // I.wait(2);
    // I.scrollTo("#body_table_results", 0, 100);
    // I.wait(2);

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
    // I.click("#advanced_filters_button");
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
    // checkSymmetry();
    //------------------------------------------------------------------------------
    // checkRatio();
    //------------------------------------------------------------------------------
    // Reset filters
    // I.click('//*[@id="search_form"]/div[5]/a[2]');
    //------------------------------------------------------------------------------
    // I.wait(2);
    // compareDiamonds();
    //------------------------------------------------------------------------------

    // Choose Diamond
    // I.click('//*[@id="body_table_comparison"]/tr[1]/td[9]/a/div'); //In the results table
    // I.click('//*[@id="body_table_results"]/tr[1]/td[10]/a/div');   //In the comparison table
    
    // Diamond detail
    // I.see('Choose this diamond', 'a');
    // Video
    // I.click('#diamond_detail_section .diamond_detail_tabs .video_tab');
    // I.see('Actual video of the diamond');
    // Certificate
    // I.click('#diamond_detail_section .diamond_detail_tabs .certificate_tab');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('https://www.igi.org/reports/');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');
    // I.click('#diamond_detail_section .diamond_detail_tabs .diamond_picture_tab');
    
    // I.click('#diamond_detail_section .diamond_detail_content_features .er_details_column_one a');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('https://www.igi.org/reports/');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');
    // I.click('20% Deposit Available');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/deposit');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');
    // I.click('Choose this diamond');
    // I.see('CREATE YOUR RING');

    // Select Ring Design
    // pause();
    // I.forceClick('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a');
    I.forceClick('#diamond_list_section .container_steps_title .step_2 .description_2 a');

    // Filter metal type
    // I.forceClick('#metal_type_1');
    // checkAllMetal();
    // I.forceClick('#metal_type_3');
    // checkWhiteMetal();
    // I.forceClick('#metal_type_3');
    // I.forceClick('#metal_type_5');
    // checkYellowMetal();
    // I.forceClick('#metal_type_5');
    // I.forceClick('#metal_type_4');
    // checkRoseMetal();
    // I.forceClick('#metal_type_4');
    // I.forceClick('#metal_type_2');
    // checkPlatinumMetal();
    // I.forceClick('#metal_type_2');
    

    // Filter Price
    // I.forceClick('#setting_price_range_2');
    // checkPrice1000andUnder();
    // I.forceClick('#setting_price_range_2');
    // I.forceClick('#setting_price_range_3');
    // checkPrice1000To2000();
    // I.forceClick('#setting_price_range_3');
    // I.forceClick('#setting_price_range_4');
    // checkPrice2000andOver();
    // I.forceClick('#setting_price_range_4');
    // Search input
    searchInput();

    pause();


});















// INPUTS TYPE RANGE
// I.dragSlider("#search_form .diamond_filter_color_content .from", 100)