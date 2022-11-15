Feature('ENGAGEMENT RINGS - START WITH A RING DESIGN');

Scenario('START WITH A RING DESIGN', async ({ I }) => {

    const waitTime = 300; //Seconds
    const params = {
        "shapes" : ["Round", "Oval", "Cushion", "Princess", "Emerald", "Pear", "Radiant", "Asscher", "Marquise"],
        "caratFrom" : 2,
        "caratTo" : 4,
        "colour" : {
            "D" : [0, -500],
            "E" : [50, -500],
            "F" : [100, -500],
            "G" : [150, -500],
            "H" : [200, -500],
            "I" : [210, -500],
            "J" : [270, -500],
            "K" : [300, -500],
            "L" : [350, -500],
            "M" : [400, 0],
        },
        "priceFrom" : 15000,
        "priceTo" : 30000,
        "cut" : {
            "Ideal":[0, -500],
            "Excellent":[100, -500],
            "Very Good":[180, -500],
            "Good":[500, 0],
        },
        "clarity" : {
            "IF" : [0, -500],
            "VVS1" : [50, -500],
            "VVS2" : [100, -500],
            "VS1" : [150, -500],
            "VS2" : [230, -500],
            "SI1" : [270, -500],
            "SI2" : [320, -500],
            "I1" : [380, 0]
        },
        "polish" : {
            "Excellent" : [0, -500],
            "Very Good" : [150, -500],
            "Good" : [250, -500]
        },
        "symmetry" : {
            "Excellent" : [0, -500],
            "Very Good" : [150, -500],
            "Good" : [250, -500]
        },
        "reports" : ["IGI", "GIA", "GCAL"],
        "ratioFrom" : 1.26,
        "ratioTo" : 2.00
    }
    const waitResponseInTable = () => {
        I.waitForText('Detail', waitTime, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    };
    const checkDiamondShape = () => {
        for(const shape of params.shapes) {
            I.click(`.${shape.toLocaleLowerCase()}-shape`);            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let i = 0; i < total; i++) {
                                if(!results[0].response.items[i].shape == shape) {
                                    console.log(`>>> Error in values obtained from DIAMOND SHAPE filter: option ${shape.toUpperCase()} expected, but ${results[0].response.items[i].shape.toUpperCase()} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: DIAMOND SHAPE, option ${shape.toUpperCase()}`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
        };
    };
    const checkDiamondCarat = () => {
        I.fillField("#from_carat_value_input", params.caratFrom);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", params.caratTo);
        I.pressKey("Enter");
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamonds')) {
                results.push(await res.json());
                if(results.length >= 2) {
                    results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            if(results[0].response.items[i].carat < parseFloat(params.caratFrom) || results[0].response.items[i].carat > parseFloat(params.caratTo)) {
                                console.log(`>>> Error in values obtained from DIAMOND CARAT filter: option ${params.caratFrom} to ${params.caratTo} expected, but ${results[0].response.items[i].carat} was found.`);
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: DIAMOND CARAT, option ${params.caratFrom} to ${params.caratTo}.`);
                        return true;
                    }
                    return true;
                }
            }
        }, waitTime)
        I.fillField("#from_carat_value_input", 0.30);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", 6);
        I.pressKey("Enter");
    };
    const checkDiamondColour = () => {
        for (const elem of Object.keys(params.colour)) {
            I.dragSlider("#search_form .diamond_filter_color_content .from", params.colour[elem][0]);
            I.dragSlider("#search_form .diamond_filter_color_content .to", params.colour[elem][1]);
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let i = 0; i < total; i++) {
                                if(results[0].response.items[i].color != elem) {
                                    console.log(`>>> Error in values obtained from DIAMOND COLOUR filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].color} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: DIAMOND COLOUR, option ${elem.toUpperCase()}.`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)
            I.dragSlider("#search_form .diamond_filter_color_content .from", -500);
            I.dragSlider("#search_form .diamond_filter_color_content .to", 500);
        };
    };
    const checkDiamondPrice = () => {
        I.fillField("#from_price_value_input", params.priceFrom);
        I.pressKey('Enter');
        I.fillField("#to_price_value_input", params.priceTo);
        I.pressKey('Enter');
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamonds')) {
                results.push(await res.json());
                if(results.length >= 2) {
                    results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            if(results[0].response.items[i].price < params.priceFrom || results[0].response.items[i].price > params.priceTo) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option option ${params.priceFrom} to ${params.priceTo} expected, but ${results[0].response.items[i].price} was found.`)
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: DIAMOND PRICE, option ${params.priceFrom} to ${params.priceTo}.`);
                        return true;
                    }
                    return true;
                }
            }
        }, waitTime)
        I.fillField("#from_price_value_input", 250);
        I.pressKey('Enter');
        I.fillField("#to_price_value_input", 70000);
        I.pressKey('Enter');        
    };
    const checkDiamondCut = () => {
        for (const elem of Object.keys(params.cut)) {
            I.dragSlider("#search_form .diamond_filter_cut_content .from", params.cut[elem][0]);
            I.dragSlider("#search_form .diamond_filter_cut_content .to", params.cut[elem][1]);
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let i = 0; i < total; i++) {
                                if(results[0].response.items[i].cut != elem && results[0].response.items[i].cut != "-") {
                                    console.log(`>>> Error in values obtained from DIAMOND CUT filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].cut} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: DIAMOND CUT, option ${elem.toUpperCase()}.`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)             
            I.dragSlider("#search_form .diamond_filter_cut_content .from", -500);
            I.dragSlider("#search_form .diamond_filter_cut_content .to", 500);
        };
    };
    const checkDiamondClarity = () => {
        for (const elem of Object.keys(params.clarity)) {
            I.dragSlider("#search_form .diamond_filter_clarity_content .from", params.clarity[elem][0]);
            I.dragSlider("#search_form .diamond_filter_clarity_content .to", params.clarity[elem][1]);            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let i = 0; i < total; i++) {
                                if(results[0].response.items[i].clarity != elem) {
                                    console.log(`>>> Error in values obtained from DIAMOND CLARITY filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].clarity} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: DIAMOND CLARITY, option ${elem.toUpperCase()}.`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)
            I.dragSlider("#search_form .diamond_filter_clarity_content .from", -500);
            I.dragSlider("#search_form .diamond_filter_clarity_content .to", 500);
        };
    };
    const checkDiamondPolish = () => {
        for (const elem of Object.keys(params.polish)) {
            I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .from", params.polish[elem][0]);
            I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .to", params.polish[elem][1]);
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let i = 0; i < total; i++) {
                                if(results[0].response.items[i].polish != elem) {
                                    console.log(`>>> Error in values obtained from POLISH filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].polish} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: POLISH, option ${elem.toUpperCase()}.`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)
            I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .from", -500);
            I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .to", 500);
        }

    };
    const checkDiamondSymmetry = () => {
        for (const elem of Object.keys(params.symmetry)) {
            I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .from", params.symmetry[elem][0]);
            I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .to", params.symmetry[elem][1]);
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let i = 0; i < total; i++) {
                                if(results[0].response.items[i].symmetry != elem) {
                                    console.log(`>>> Error in values obtained from SYMMETRY filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].symmetry} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: SYMMETRY, option ${elem.toUpperCase()}.`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)
            I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .from", -500);
            I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .to", 500);
        }
    };
    const checkDiamondReport = () => {
        for (let i = 0; i < params.reports.length; i++) {
            I.forceClick(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/diamonds')) {
                    results.push(await res.json());
                    if(results.length >= 2) {
                        results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                        if(results[0].response.total > 0) {
                            const total = results[0].response.total > 10 ? 10 : results[0].response.total
                            for (let j = 0; j < total; j++) {
                                if(results[0].response.items[j].certificate_laboratory != params.reports[i]) {
                                    console.log(`>>> Error in values obtained from REPORT filter: option ${params.reports[i].toUpperCase()} expected, but ${results[0].response.items[i].certificate_laboratory} was found.`);
                                }
                            }
                        }else{
                            console.log(`>>> No record was found according to the filter: REPORT, option ${params.reports[i].toUpperCase()}.`);
                            return true;
                        }
                        return true;
                    }
                }
            }, waitTime)
            I.forceClick(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
        }
    };
    const checkDiamondRatio = () => {
        I.fillField('#from_ratio_value_input', params.ratioFrom);
        I.pressKey('Enter');
        I.fillField('#to_ratio_value_input', params.ratioTo);
        I.pressKey('Enter');
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamonds')) {
                results.push(await res.json());
                if(results.length >= 2) {
                    results[0].response.total > 0 ? results[0] = results[0] : results[0] = results[1];
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            // The ratio response is null
                            // results[0].response.items[i].ratio < parseFloat(params.ratioFrom) || results[0].response.items[i].ratio > parseFloat(params.ratioTo)
                            if(results[0].response.items[i].ratio != null && (results[0].response.items[i].ratio < parseFloat(params.ratioFrom) || results[0].response.items[i].ratio > parseFloat(params.ratioTo))) {
                                console.log(`>>> Error in values obtained from RATIO filter.`);
                                console.log(`>>> Error in values obtained from RATIO filter: option ${params.ratioFrom} to ${params.ratioTo} expected, but ${results[0].response.items[i].ratio} was found.`);
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: RATIO, option ${params.ratioFrom} to ${params.ratioTo}.`);
                        return true;
                    }
                    return true;
                }
            }
        }, waitTime)
        I.fillField('#from_ratio_value_input', 1);
        I.pressKey('Enter');
        I.fillField('#to_ratio_value_input', 3);
        I.pressKey('Enter');
    };
    const sortByCarat = async (order) => {
        const carat = await I.grabTextFromAll('tbody tr td:nth-child(3)');
        let previousNumber = 0;
        if (order == "higher") {
            previousNumber = Number.MAX_SAFE_INTEGER;
        }
        for (const elem of carat) {
            let actualNumber = Number(elem);
            if(!isNaN(actualNumber)) {
                if(order == "higher") {
                    if(actualNumber > previousNumber) {
                        console.log("Error in the values obtained when organizing the list by major carats.");
                    }
                }else if(order == "smaller") {
                    if(actualNumber < previousNumber) {
                        console.log("Error in the values obtained when organizing the list by minor carats.");
                    }
                }
            }
            previousNumber = actualNumber;
        };
    };
    const sortByReport = async (order) => {
        const report = await I.grabTextFromAll('tbody tr td:nth-child(7)');
        for (const elem of report) {
            if(order == "higher") {
                if(elem != "IGI" && elem != "GIA") {
                    console.log("Error in the values obtained when organizing the list by Report.");
                }
            }else if(order == "smaller") {
                if(elem != "GCAL" && elem != "GIA") {
                    console.log("Error in the values obtained when organizing the list by Report.");
                }
            }
        };
    };
    const checkURLcertificate = async () => {
        let url =  await I.grabCurrentUrl();
        if(!(url.includes('https://www.gcalusa.com/certificate-search.html')) && !(url.includes('https://www.igi.org/reports/'))) {
            console.log('Error in current URL of certificate.');
        }
    };
    const selectDiamond = async () => {
        const diamonds = await I.grabHTMLFromAll('#body_table_results tr td:last-child a');
        let i = 1;
        for (const elem of diamonds) {
            if(elem.includes("img")) {
                return i;
            };
            i++;
        };
    };
    const checkPersonaliseYourRing = () => {
        I.waitForText('PERSONALISE YOUR RING', waitTime, 'h2')
        I.see('PERSONALISE YOUR RING');
        I.say('CLAW STYLE');
        I.click('#personalised_select_claw_style');
        I.click('#eagle_claw_link');
        I.see('Claw Style: Eagle');
        I.click('#personalised_select_claw_style');
        I.click('#square_claw_link');
        I.see('Claw Style: Square');
        I.click('#personalised_select_claw_style');
        I.click('#round_claw_link');
        I.see('Claw Style: Round');
        // Diamond setting
        I.say('DIAMOND SETTING');
        I.click('#personalised_select_stone_setting');
        I.click('#low_height_link');
        I.see('Diamond Setting: Very Low');
        I.click('#personalised_select_stone_setting');
        I.click('#high_height_link');
        I.see('Diamond Setting: Medium-High');
        I.click('#personalised_select_stone_setting');
        I.click('#medium_height_link');
        I.see('Diamond Setting: Medium-Low');
        I.click('#save_store_personalisation');
    };
    const compareDiamonds = () => {
        I.click('//*[@id="body_table_results"]/tr[1]/td[9]/div/span[1]/img');
        I.click('//*[@id="body_table_results"]/tr[2]/td[9]/div/span[1]/img');
        I.click("#to_compare_diamonds_from_diamond_list");
    };

    // ----------------------------------------------------
    // ----------------------------------------------------
    I.amOnPage("/")
    I.forceClick("Start With a Ring Design")
    I.seeInCurrentUrl("/engagement-ring/create/ring")

    // CHECKING RING GUIDE BAR
    //------------------------------------------------------------------------------
    I.say('CHECKING RING GUIDE BAR')
    I.say('STEP - SELECT DIAMOND')
    I.waitForElement('//*[@id="create_engage_ring_container"]/section[3]/div[1]/div[1]/div[3]/div[2]/a', waitTime)
    I.forceClick('Browse diamonds', '//*[@id="create_engage_ring_container"]/section[3]/div[1]/div[1]/div[3]/div[2]/a')
    I.seeInCurrentUrl('/engagement-ring/create/diamond')
    I.say('STEP - RING DESIGN')
    I.waitForElement('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a', waitTime)
    I.forceClick('Browse settings', '//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a')
    I.seeInCurrentUrl('/engagement-ring/create/ring')
    

    //  SELECT A DESIGN
    //----------------------------------------------------------------------------------------------------------
    I.say('SELECT ONE DESIGN')
    I.waitForElement('#ring_list_section .setting_list .ring_detail_link', waitTime)
    I.click('//*[@id="ring_list_section"]/div/div[1]/a')
    // 20% Deposit Available
    I.click('20% Deposit Available');
    I.wait(10);
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/ring');
    // More information
    I.say('MORE INFORMATION');
    I.click('#more_info_link');
    I.waitForText('PRODUCT DETAILS', waitTime, 'h2')
    I.see('PRODUCT DETAILS', 'h2');
    I.click('//*[@id="ring_more_details_box"]/button');
    // Personalise your ring
    I.say('PERSONALISE YOUR RING')
    I.click('//*[@id="personalise_ring_link"]/div/a');
    checkPersonaliseYourRing();
    // TO CHOOSE 'ADD LOOSE DIAMOND TO CART' OPTION
    I.say('CHOOSE THIS DESIGN');
    I.click('//*[@id="ring_detail_content"]/div[9]/div[1]/a[2]');
    waitResponseInTable()

    //----------------------------------------------- SHAPE FILTER -----------------------------------------------
    I.say('CHECKING SHAPE FILTER');
    checkDiamondShape();
    //----------------------------------------------- CARAT FILTER -----------------------------------------------
    I.say('CHECKING CARAT FILTER');
    checkDiamondCarat();
    //----------------------------------------------- COLOUR FILTER -----------------------------------------------
    I.say('CHECKING COLOUR FILTER');
    checkDiamondColour();
    //----------------------------------------------- PRICE FILTER -----------------------------------------------
    I.say('CHECKING PRICE FILTER');
    checkDiamondPrice();
    //----------------------------------------------- CUT FILTER --------------------------------------------------
    I.say('CHECKING CUT FILTER');
    checkDiamondCut();
    //----------------------------------------------- CLARITY FILTER -----------------------------------------------
    I.say('CHECKING CLARITY FILTER');
    checkDiamondClarity();
    //------------------------------------------- BUTTON ADVANCED FILTERS ------------------------------------------
    I.say('BUTTON ADVANCED FILTERS');
    I.click("#advanced_filters_button");
    // CHECKING ADVANCED FILTERS
    //----------------------------------------------- POLISH FILTER ------------------------------------------------
    I.say('CHECKING POLISH FILTER');
    checkDiamondPolish();
    //----------------------------------------------- SYMMETRY FILTER ------------------------------------------------
    I.say('CHECKING SYMMETRY FILTERS');
    checkDiamondSymmetry();
    //----------------------------------------------- REPORT FILTER ------------------------------------------------    
    I.say('CHECKING REPORT FILTER');
    checkDiamondReport();
    //----------------------------------------------- RATIO FILTER ------------------------------------------------
    I.say('CHECKING RATIO FILTER');
    checkDiamondRatio();

    waitResponseInTable()

    // SORT RESULTS
    //------------------------------------------------------------------------------
    // I.say('SORT RESULTS');
    // waitResponseInTable();
    // I.click('#carat_table_header');
    // waitResponseInTable();
    // sortByCarat('higher');
    // I.click('#carat_table_header');
    // waitResponseInTable();
    // sortByCarat('smaller');
    // I.click('#report_table_header');
    // waitResponseInTable();
    // sortByReport('higher');
    // I.click('#report_table_header');
    // waitResponseInTable();
    // sortByReport('smaller');
    // waitResponseInTable();

    I.say('OPTION COMPARE DIAMONDS');
    compareDiamonds();
    // Select Results options form the table
    I.click('#to_diamond_list_from_compare_diamonds');
    // Select one diamond (Click on detail)
    I.say('SELECT ONE DIAMOND');
    const video = await selectDiamond();
    I.wait(4);
    I.click(`//*[@id="body_table_results"]/tr[${video}]/td[10]/a/div`);
    I.seeInCurrentUrl('/engagement-ring/create/ring');
    I.waitForElement('//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]', waitTime)
    // Choose this diamond
    I.click('//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]/a[2]')
    // Add to cart
    I.waitForElement('#add_to_cart_form', waitTime)
    I.wait(2)
    I.click('#add_to_cart_submit')
    // Shopping cart
    I.waitForText('SHOPPING CART', waitTime)
    I.see('SHOPPING CART')
    // Ring Size
    I.selectOption('//*[@id="cart"]/div/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[2]/div/div[3]/select', '2')
    // Checkout
    I.click('//*[@id="cart"]/div/div[2]/div[2]/table/tbody/tr[4]/td/a')

    I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', waitTime, 'h2')
    I.see('WHERE DO YOU WANT THESE ITEMS SENT?', 'h2');
    I.wait(4)
    I.fillField('#shipping_billing_information_form_shippingFirstName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_shippingLastName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_shippingAddressLineOne', 'Test Address');
    I.click('#shipping_billing_information_form_shippingCountry');
    I.selectOption('#shipping_billing_information_form_shippingCountry', 'Australia');
    I.fillField('#shipping_billing_information_form_shippingState', 'Testing');
    I.fillField('#shipping_billing_information_form_shippingSuburb', 'Testing');
    I.fillField('#shipping_billing_information_form_shippingPostcode', '4000');
    I.fillField('#shipping_billing_information_form_shippingPhone', '1234567');
    I.fillField('#shipping_billing_information_form_deliveryInstructions', 'Test form, please ignore this request.');
    I.fillField('#shipping_billing_information_form_customerNotesProposalDate', 'Test form, please ignore this request.');
    I.fillField('#shipping_billing_information_form_shippingEmail', 'testing@testing.com');

    // Use the same address for billing and shipping
    I.say('USE THE SAME ADDRESS FOR BILLING AND SHIPPING');
    I.click('#cart_shipping_content .same_shipping_billing_fields label .form-check');

    I.fillField('#shipping_billing_information_form_billingFirstName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_billingLastName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_billingAddressLineOne', 'Test Address');
    I.click('#shipping_billing_information_form_billingCountry');
    I.selectOption('#shipping_billing_information_form_billingCountry', 'Australia');
    I.fillField('#shipping_billing_information_form_billingState', 'Testing');
    I.fillField('#shipping_billing_information_form_billingSuburb', 'Testing');
    I.fillField('#shipping_billing_information_form_billingPostcode', '4000');
    I.fillField('#shipping_billing_information_form_billingPhone', '123456');
    I.click('#cart_shipping_content .last_row .right_submit input');
    I.seeInCurrentUrl('/cart/payment-information');
});