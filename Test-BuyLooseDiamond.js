Feature('Buy loose diamond');

Scenario('Buy a loose diamond', async ({ I }) => {    

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
            "ID/EX":[100, -500],
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
    // Wait for response and text
    function waitResponseAndtext() {
        I.waitForText('Detail', 40, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    }
    // Checking the shape filter.
    function checkShape() {
        for(const shape of params.shapes) {
            I.click(`.${shape.toLocaleLowerCase()}-shape`);
            waitResponseAndtext();
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
        waitResponseAndtext();
        const carat = await I.grabTextFromAll('tbody tr td:nth-child(3)');
        for (const elem of carat) {
            if(parseFloat(elem) < parseFloat(params.caratFrom) || parseFloat(elem) > parseFloat(params.caratTo)) {
                console.log('Error in the values obtained from the Carat filter');
                I.dontSee(elem);
            }
        };
    };
    // Check the color filter
    async function checkColour(option) {
        // I.wait(1);
        I.dragSlider("#search_form .diamond_filter_color_content .from", params.colour[option][0]);
        I.dragSlider("#search_form .diamond_filter_color_content .to", params.colour[option][1]);
        // waitResponseAndtext();
        const colors = await I.grabTextFromAll('tbody tr td:nth-child(4)');
        if(colors.length > 0) {
            for (const elem of colors) {
                if(elem !== option) {
                    I.see(option, 'td');
                    console.log('Error in the values obtained from the Colour filter');
                }
            };
        }
    };
    // Check the price filter
    async function checkPrice() {
        I.fillField("#from_price_value_input", params.priceFrom);
        I.pressKey('Enter');
        I.fillField("#to_price_value_input", params.priceTo);
        I.pressKey('Enter');
        waitResponseAndtext();
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
    async function checkCut(option) {
        I.dragSlider("#search_form .diamond_filter_cut_content .from", params.cut[option][0]);
        I.dragSlider("#search_form .diamond_filter_cut_content .to", params.cut[option][1]);
        waitResponseAndtext();        
        const cut = await I.grabTextFromAll('tbody tr td:nth-child(6)');
        for (const elem of cut) {
            if(option === 'ID/EX') {
                if(elem !== "Excellent" && elem !== 'ID/EX' && elem !== '-') {
                    console.log('Error in the values obtained from the Cut filter');
                }
            }else {
                if(elem !== option && elem !== '-') {
                    console.log('Error in the values obtained from the Cut filter');
                }
            }
        };
    };
    // Check the clarity option
    async function checkClarity(option) {
        I.dragSlider("#search_form .diamond_filter_clarity_content .from", params.clarity[option][0]);
        I.dragSlider("#search_form .diamond_filter_clarity_content .to", params.clarity[option][1]);
        waitResponseAndtext();
        const clarity = await I.grabTextFromAll('tbody tr td:nth-child(5)');
        for (const elem of clarity) {
            if(elem !== option) {
                console.log('Error in the values obtained from the Clarity filter');
            }
        }
    };
    // Check the polish option
    function checkPolish(option) {
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .from", params.polish[option][0]);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .to", params.polish[option][1]);       
        let results = [];
        I.waitForResponse(async res => {
            res.url().includes('/api/product/diamonds') ? results.push(await res.json()) : null;
            if(results.length >= 2) {
                results[0] = results[0].response.total > results[1].response.total ? results[0] : results[1];
                if (results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].polish == option)) {
                            console.log(`Error in response, Polish filter, expected elements with Polish Filter: ${metalType} but not found.`);
                            return false;
                        }
                    }
                }
                return true;
            }
        }, 40);
    };
    // Check the Report filter
    async function checkReport(report) {
        let results = [];
        I.waitForResponse(async res => {
            res.url().includes('/api/product/diamonds') ? results.push(await res.json()) : null;
            if(results.length >= 2) {
                results[0] = results[0].response.total > results[1].response.total ? results[0] : results[1];
                if (results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].certificate_laboratory == report)) {
                            console.log(`Error in response, Report filter, expected elements with Report Filter: ${report} but not found.`);
                            return false;
                        }
                    }
                }
                return true;
            }
        }, 40);

    };
    // Check the Symmetry filter
    function checkSymmetry(option) {
        I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .from", params.symmetry[option][0]);
        I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .to", params.symmetry[option][1]);
        
        let results = [];
        I.waitForResponse(async res => {
            res.url().includes('/api/product/diamonds') ? results.push(await res.json()) : null;
            if(results.length >= 2) {
                results[0] = results[0].response.total > results[1].response.total ? results[0] : results[1];
                if (results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].symmetry == option)) {
                            console.log(`Error in response, Symmetry filter, expected elements with Symmetry Filter: ${metalType} but not found.`);
                            return false;
                        }
                    }
                }
                return true;
            }
        }, 40);
    };
    // Check the Ratio filter 
    function checkRatio() {
        I.wait(1);
        I.fillField('#from_ratio_value_input', 1.5);
        I.pressKey('Enter');
        I.fillField('#to_ratio_value_input', 2);
        I.pressKey('Enter');
        waitResponseAndtext();
    };
    // Check the compare option
    function compareDiamonds() {
        I.click('//*[@id="body_table_results"]/tr[1]/td[9]/div/span[1]/img');
        I.click('//*[@id="body_table_results"]/tr[2]/td[9]/div/span[1]/img');
        I.click("#to_compare_diamonds_from_diamond_list");
    };
    // Check the option video
    async function checkVideo() {
        // return await I.grabCssPropertyFrom('#diamond_detail_section .diamond_detail_tabs .video_tab', 'display');
        I.click('#diamond_detail_section .diamond_detail_tabs .video_tab');
        I.waitForText('Actual video of the diamond');
        I.see('Actual video of the diamond');
    };
    // SORT TABLE FOR PRICE
    async function sortByPrice(order) {
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
    async function sortByCarat(order) {
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
    async function sortByReport(order) {
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
    async function checkURLcertificate() {
        let url =  await I.grabCurrentUrl();
        if(!(url.includes('https://www.gcalusa.com/certificate-search.html')) && !(url.includes('https://www.igi.org/reports/'))) {
            console.log('Error in current URL of certificate.');
        }
    };
    // SELECT DIAMOND
    async function selectDiamond() {
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

    //------------------------------------------------------------------------------
    // CHECKING SHAPE FILTER
    I.say('CHECKING SHAPE FILTER');
    checkShape();

    // CHECKING CARAT FILTER
    I.say('CHECKING CARAT FILTER');
    checkCarat();
    // reset carat filter
    I.fillField("#from_carat_value_input", 0.30);
    I.pressKey("Enter");
    I.fillField("#to_carat_value_input", 6);
    I.pressKey("Enter");

    // CHECKING COLOUR FILTER
    I.say('CHECKING COLOUR FILTER');
    for (const elem of Object.keys(params.colour)) {
        checkColour(elem);
        I.dragSlider("#search_form .diamond_filter_color_content .from", -500);
        I.dragSlider("#search_form .diamond_filter_color_content .to", 500);
    };

    // CHECKING PRICE FILTER
    I.say('CHECKING PRICE FILTER');
    checkPrice();
    I.fillField("#from_price_value_input", 250);
    I.pressKey('Enter');
    I.fillField("#to_price_value_input", 70000);
    I.pressKey('Enter');
    waitResponseAndtext();

    // CHECKING CUT FILTER
    I.say('CHECKING CUT FILTER');
    for (const elem of Object.keys(params.cut)) {
        checkCut(elem);
        I.dragSlider("#search_form .diamond_filter_cut_content .from", -500);
        I.dragSlider("#search_form .diamond_filter_cut_content .to", 500);
    };

    // CHECKING CLARUTY FILTER
    I.say('CHECKING CLARITY FILTER');
    for (const elem of Object.keys(params.clarity)) {
        checkClarity(elem);
        I.dragSlider("#search_form .diamond_filter_clarity_content .from", -500);
        I.dragSlider("#search_form .diamond_filter_clarity_content .to", 500);
    };


    // BUTTON ADVANCED FILTERS
    //------------------------------------------------------------------------------
    I.say('BUTTON ADVANCED FILTERS');
    I.click("#advanced_filters_button");

    // CHECKING ADVANCED FILTERS
    //------------------------------------------------------------------------------
    I.say('CHECKING ADVANCED FILTERS');
    I.wait(2);
    I.say('CHECKING POLISH FILTER');
    for (const elem of Object.keys(params.polish)) {
        checkPolish(elem);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .from", -500);
        I.dragSlider("#advanced_filters_content .diamond_filter_polish_content .to", 500);
    }
    I.say('CHECKING SYMMETRY FILTER');
    for (const elem of Object.keys(params.symmetry)) {
        checkSymmetry(elem);
        I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .from", -500);
        I.dragSlider("#advanced_filters_content .diamond_filter_symmetry_content .to", 500);
    }
    I.say('CHECKING REPORT FILTER');
    for (let i = 0; i < params.reports.length; i++) {
        I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
        checkReport(params.reports[i]);
        I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    }
    I.say('CHECKING RATIO FILTER');
    checkRatio();
    I.fillField('#from_ratio_value_input', 1);
    I.pressKey('Enter');
    I.fillField('#to_ratio_value_input', 3);
    I.pressKey('Enter');
    waitResponseAndtext();

    // SORT RESULTS
    //------------------------------------------------------------------------------
    I.say('SORT RESULTS');
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
    I.wait(1);
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
    I.wait(2);
    I.switchToNextTab();
    checkURLcertificate();
    I.closeCurrentTab();
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');
    // Image
    I.click('#tab_diamond_image');
    // IGI Certified
    I.click('#diamond_detail_section .diamond_detail_content_features .er_details_column_one a');
    I.wait(2);
    I.switchToNextTab();
    checkURLcertificate();
    I.closeCurrentTab();
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');

    // 20% Deposit Available
    I.click('20% Deposit Available');
    I.wait(2);
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying');
    
    // TO CHOOSE 'ADD LOOSE DIAMOND TO CART' OPTION
    I.say('TO CHOOSE "ADD LOOSE DIAMOND TO CART" OPTION');
    I.click('#add_loose_diamond_to_cart_submit');
    I.waitForText('SHOPPING CART', 10);

    I.checkOption('#loose_diamond_option_false');
    I.checkOption('#loose_diamond_option_true');
    I.wait(1);
    I.fillField('#cart .custom-control p .name-input', 'Name member');
    I.selectOption('#select_ring_size', '3/4');

    I.say('PAY DEPOSIT OPTION');
    I.click('table tbody .deposit_row .checkbox_label');
    I.click('#accept_deposit_policy');
    I.click('table tbody .total_row .checkbox_label');
    
    I.say('CLICK IN CHECKOUT');
    I.click('#cart table tbody .order_summary_checkout_button a');
    I.wait(2);
    I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', 10, 'h2');

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
    I.waitForText('PAYMENT METHOD', 10, 'h2');
    I.click('#checkbox_bank_wire_description');
    I.say('PLEASE, ACTIVATE THE CAPTCHA THEN TYPE "exit" IN THE CONSOLE AND PRESS ENTER TO CONTINUE');
    pause();
    // I.click('#bank_wire_submit')
    // I.waitForText('Your order is confirmed!', 10);
    // I.see('Your order is confirmed!');
});