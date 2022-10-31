Feature('ENGAGEMENT RINGS - BUY LOOSE DIAMONDS');

Scenario('BUY LOOSE DIAMONDS', async ({ I }) => {    

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
    const waitResponseAndtext = () => {
        I.waitForText('Detail', waitTime, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    }
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
    const compareDiamonds = () => {
        I.click('//*[@id="body_table_results"]/tr[1]/td[9]/div/span[1]/img');
        I.click('//*[@id="body_table_results"]/tr[2]/td[9]/div/span[1]/img');
        I.click("#to_compare_diamonds_from_diamond_list");
    };
    // Check the option video
    const checkVideo = async () => {
        // return await I.grabCssPropertyFrom('#diamond_detail_section .diamond_detail_tabs .video_tab', 'display');
        I.click('#diamond_detail_section .diamond_detail_tabs .video_tab');
        I.waitForText('Actual video of the diamond');
        I.see('Actual video of the diamond');
    };
    // SORT TABLE FOR PRICE
    const sortByPrice = async (order) => {
        const prices = await I.grabTextFromAll('tbody tr td:nth-child(1)');
        let previousNumber = 0;
        if (order == "higher") {
            previousNumber = Number.MAX_SAFE_INTEGER;
        }
        for (const elem of prices) {
            let actualNumber = Number(elem.slice((elem.indexOf('$')+1)).replace(',', ''));
            if(!isNaN(actualNumber)) {
                if(order == "higher") {
                    if(actualNumber > previousNumber) {
                        console.log("Error in the values obtained when organizing the list by major price.");
                    }
                }else if(order == "smaller") {
                    if(actualNumber < previousNumber) {
                        console.log("Error in the values obtained when organizing the list by minor price.");
                    }
                }
            }
            previousNumber = actualNumber;
        };
    };
    // SORT TABLE FOR CARAT
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
    // SORT TABLE FOR REPORT
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
    // Check URL of certificate
    const checkURLcertificate = async () => {
        let url =  await I.grabCurrentUrl();
        if(!(url.includes('https://www.gcalusa.com/certificate-search.html')) && !(url.includes('https://www.igi.org/reports/'))) {
            console.log('Error in current URL of certificate.');
        }
    };
    // SELECT DIAMOND
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


    // ----------------------------------------------------
    // ----------------------------------------------------
    I.say('TEST - BUY LOOSE DIAMOND');
    I.amOnPage("/");
    I.forceClick("BUY LOOSE DIAMONDS");
    I.seeInCurrentUrl("/buy-loose-diamond-start-buying");
    waitResponseAndtext();
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

    // SORT RESULTS
    //------------------------------------------------------------------------------
    I.say('SORT RESULTS');
    waitResponseAndtext();
    I.click('#price_table_header_img');
    waitResponseAndtext();
    sortByPrice('higher');
    I.click('#price_table_header_img');
    waitResponseAndtext();
    sortByPrice('smaller');
    I.click('#carat_table_header');
    waitResponseAndtext();
    sortByCarat('higher');
    I.click('#carat_table_header');
    waitResponseAndtext();
    sortByCarat('smaller');
    I.click('#report_table_header');
    waitResponseAndtext();
    sortByReport('higher');
    I.click('#report_table_header');
    waitResponseAndtext();
    sortByReport('smaller');
    waitResponseAndtext();

    // OPTION COMPARE DIAMONDS
    I.say('OPTION COMPARE DIAMONDS');
    compareDiamonds();
    // Select Results options form the table
    I.click('#to_diamond_list_from_compare_diamonds');

    // Select one diamond (Click on detail)
    I.say('SELECT ONE DIAMOND');
    const video = await selectDiamond();
    I.wait(4);
    I.click(`//*[@id="body_table_results"]/tr[${video}]/td[10]/a/div`);
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');

    I.say('CHECKING BACK BUTTON');
    I.click('#diamond_detail_section .to_diamond_list_from_diamond_detail');
    I.click(`//*[@id="body_table_results"]/tr[${video}]/td[10]/a/div`);
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');

    // Check if diamond has Video option
    checkVideo();
    // Check the Certificate option
    I.click('#diamond_detail_section .diamond_detail_tabs .certificate_tab');
    I.wait(10);
    I.switchToNextTab();
    checkURLcertificate();
    I.closeCurrentTab();
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');
    // Image
    I.click('#tab_diamond_image');
    // IGI Certified
    I.click('#diamond_detail_section .diamond_detail_content_features .er_details_column_one a');
    I.wait(10);
    I.switchToNextTab();
    checkURLcertificate();
    I.closeCurrentTab();
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');

    // 20% Deposit Available
    I.click('20% Deposit Available');
    I.wait(10);
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');
    
    // TO CHOOSE 'ADD LOOSE DIAMOND TO CART' OPTION
    I.say('TO CHOOSE "ADD LOOSE DIAMOND TO CART" OPTION');
    I.click('#add_loose_diamond_to_cart_submit');
    I.waitForText('SHOPPING CART', 30);

    I.checkOption('#loose_diamond_option_false');
    I.checkOption('#loose_diamond_option_true');
    I.wait(5);
    I.fillField('#cart .custom-control p .name-input', 'Name member');
    I.selectOption('#select_ring_size', '3/4');

    I.say('PAY DEPOSIT OPTION');
    I.click('table tbody .deposit_row .checkbox_label');
    I.click('#accept_deposit_policy');
    I.click('table tbody .total_row .checkbox_label');
    
    I.say('CLICK IN CHECKOUT');
    I.click('#cart table tbody .order_summary_checkout_button a');
    I.wait(2);
    I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', 30, 'h2');

    I.say('SHIP TO MY ADDRESS FORM');
    I.fillField('#shipping_billing_information_form_shippingFirstName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_shippingLastName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_shippingAddressLineOne', 'Test Address');
    I.selectOption('#shipping_billing_information_form_billingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_shippingState', 'Testing');
    I.fillField('#shipping_billing_information_form_shippingSuburb', 'Testing');
    I.fillField('#shipping_billing_information_form_shippingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_shippingPhone', '1234567');
    I.fillField('#shipping_billing_information_form_deliveryInstructions', 'Test form, please ignore this request.');
    I.fillField('#shipping_billing_information_form_customerNotesProposalDate', 'Test form, please ignore this request.');
    I.fillField('#shipping_billing_information_form_shippingEmail', 'testing@testing.com');

    // Use the same address for billing and shipping
    I.click('#cart_shipping_content .same_shipping_billing_fields label .form-check');

    I.say('USE THE SAME ADDRESS FOR BILLING AND SHIPPING FORM');
    I.fillField('#shipping_billing_information_form_billingFirstName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_billingLastName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_billingAddressLineOne', 'Test Address');
    I.selectOption('#shipping_billing_information_form_billingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_billingState', 'Testing');
    I.fillField('#shipping_billing_information_form_billingSuburb', 'Testing');
    I.fillField('#shipping_billing_information_form_billingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_billingPhone', '123456');
    I.click('#cart_shipping_content .last_row .right_submit input');
    I.waitForText('PAYMENT METHOD', 30, 'h2');
    pause()

    // I.click('#checkbox_bank_wire_description');
    // I.say('PLEASE, ACTIVATE THE CAPTCHA THEN TYPE "exit" IN THE CONSOLE AND PRESS ENTER TO CONTINUE');
    // pause();
    // I.click('#bank_wire_submit')
    // I.waitForText('Your order is confirmed!', 10);
    // I.see('Your order is confirmed!');
});


