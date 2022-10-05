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
        "clarity" : {
            "IF" : [0, -500],
            "VVS1" : [50, -500],
            "VVS2" : [100, -500],
            "VS1" : [150, -500],
            "VS2" : [200, -500],
            "SI1" : [270, -500],
            "SI2" : [320, -500],
            "I1" : [380, 0]
        },
        "reports" : ["IGI", "GIA", "GCAL"],
        "ratioFrom" : 1.26,
        "ratioTo" : 2.00
    }
    // Wait for response and text
    function waitResponseAndtext() {
        // I.waitForResponse('https://manmadediamonds.com.au/api/product/diamonds', 10);
        I.waitForResponse('https://novitadiamonds.com/api/product/diamonds', 10);
        I.waitForText('Detail', 10, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
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
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_color_content .from", params.colour[option][0]);
        I.dragSlider("#search_form .diamond_filter_color_content .to", params.colour[option][1]);
        waitResponseAndtext();
        const colors = await I.grabTextFromAll('tbody tr td:nth-child(4)');
        for (const elem of colors) {
            if(elem !== option) {
                I.see(option, 'td');
                console.log('Error in the values obtained from the Colour filter');
            }
        };
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
    async function checkClarity(option) {
        I.wait(1);
        I.dragSlider("#search_form .diamond_filter_clarity_content .from", params.clarity[option][0]);
        I.dragSlider("#search_form .diamond_filter_clarity_content .to", params.clarity[option][1]);
        I.wait(1);
        const clarity = await I.grabTextFromAll('tbody tr td:nth-child(5)');
        for (const elem of clarity) {
            if(elem !== option) {
                console.log('Error in the values obtained from the Clarity filter');
            }
        }
    };
    // Check the Polish filter
    async function checkPolish() {
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
    // Check the option video
    async function checkVideo() {
        // return await I.grabCssPropertyFrom('#diamond_detail_section .diamond_detail_tabs .video_tab', 'display');
        I.click('#diamond_detail_section .diamond_detail_tabs .video_tab');
        I.see('Actual video of the diamond');
    };
    // SORT TABLE FOR PRICE
    async function sortByPrice(order) {
        const prices = await I.grabTextFromAll('tbody tr td:nth-child(1)');
        let previousNumber;
        if (order == "higher") {
            previousNumber = Number.MAX_SAFE_INTEGER;
        }else if(order == "smaller") {
            previousNumber = 0;
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
        let previousNumber;
        if (order == "higher") {
            previousNumber = Number.MAX_SAFE_INTEGER;
        }else if(order == "smaller") {
            previousNumber = 0;
        };
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
    

    // CHECKING MAIN FILTERS
    //------------------------------------------------------------------------------
    I.say('CHECKING MAIN FILTERS');
    checkShape();
    checkCarat();
    I.fillField("#from_carat_value_input", 0.30);
    I.pressKey("Enter");
    I.fillField("#to_carat_value_input", 6);
    I.pressKey("Enter");
    for (const elem of Object.keys(params.colour)) {
        checkColour(elem);
        I.dragSlider("#search_form .diamond_filter_color_content .from", -500);
        I.dragSlider("#search_form .diamond_filter_color_content .to", 500);
    };
    pause();
    checkPrice();
    checkCut();
    for (const elem of Object.keys(params.clarity)) {
        checkClarity(elem);
        I.click('#search_form .container_advanced_filters_button .clear-filter-btn');
    };

    pause();

    // RESET FILTERS
    //------------------------------------------------------------------------------
    // I.say('RESET FILTERS');
    // I.click('//*[@id="search_form"]/div[5]/a[2]');

    // BUTTON ADVANCED FILTERS
    //------------------------------------------------------------------------------
    I.say('BUTTON ADVANCED FILTERS');
    I.click("#advanced_filters_button");

    // CHECKING ADVANCED FILTERS
    //------------------------------------------------------------------------------
    I.say('CHECKING ADVANCED FILTERS');
    checkPolish();
    pause();
    checkSymmetry();
    for (let i = 0; i < params.reports.length; i++) {
        I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
        checkReport(params.reports[i]);
        I.click(params.reports[i], `#advanced_filters_content .diamond_filter_certificate_content ul li:nth-child(${i+1}) label`);
    };
    checkRatio();
    pause();
    

    // RESET FILTERS
    //------------------------------------------------------------------------------
    // I.say('RESET FILTERS');
    // I.click('//*[@id="search_form"]/div[5]/a[2]');

    // SORT RESULTS
    //------------------------------------------------------------------------------
    // I.say('SORT RESULTS');
    // I.click('#price_table_header_img');
    // sortByPrice('higher');
    // I.click('#price_table_header_img');
    // sortByPrice('smaller');
    // I.click('#carat_table_header');
    // sortByCarat('higher');
    // I.click('#carat_table_header');
    // sortByCarat('smaller');
    // I.click('#report_table_header');
    // sortByReport('higher');
    // I.click('#report_table_header');
    // sortByReport('smaller');

    // OPTION COMPARE DIAMONDS
    // I.wait(3);
    // compareDiamonds();
    
    // RESET FILTERS
    //------------------------------------------------------------------------------
    // I.say('RESET FILTERS');
    // I.click('//*[@id="search_form"]/div[5]/a[2]');
    // Select Results options form the table
    // I.click('#to_diamond_list_from_compare_diamonds');

    // Select one diamond (Click on detail)
    I.say('SELECT ONE DIAMOND')
    const video = await selectDiamond();
    I.click(`//*[@id="body_table_results"]/tr[${video}]/td[10]/a/div`);
    I.see('CHOOSE THIS DIAMOND');

    // Check if diamond has Video option
    checkVideo();
    // Check the Certificate option
    I.click('#diamond_detail_section .diamond_detail_tabs .certificate_tab');
    I.switchToNextTab();
    checkURLcertificate();
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    // Image
    I.click('#tab_diamond_image');
    // IGI Certified
    I.click('#diamond_detail_section .diamond_detail_content_features .er_details_column_one a');
    I.switchToNextTab();
    checkURLcertificate();
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');

    // 20% Deposit Available
    I.click('20% Deposit Available');
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    
    // TO CHOOSE 'ADD LOOSE DIAMOND TO CART' OPTION
    I.say('TO CHOOSE "ADD LOOSE DIAMOND TO CART" OPTION');
    I.click('#add_loose_diamond_to_cart_submit');
    I.see('SHOPPING CART');

    I.checkOption('#loose_diamond_option_false');
    I.checkOption('#loose_diamond_option_true');
    I.fillField('#cart .custom-control p .name-input', 'Name member');
    I.selectOption('#select_ring_size', '3/4');

    I.say('PAY DEPOSIT OPTION');
    I.click('table tbody .deposit_row .checkbox_label');
    I.click('#accept_deposit_policy');
    I.click('table tbody .total_row .checkbox_label');
    
    I.say('CLICK IN CHECKOUT');
    I.click('#cart table tbody .order_summary_checkout_button a');
    I.wait(2);
    I.seeInCurrentUrl('/cart/shipping-information');

    I.say('SHIP TO MY ADDRESS FORM');
    I.fillField('#shipping_billing_information_form_shippingFirstName', 'FirstName');
    I.fillField('#shipping_billing_information_form_shippingLastName', 'LastName');
    I.fillField('#shipping_billing_information_form_shippingAddressLineOne', 'Suite 56-58, New House');
    I.selectOption('#shipping_billing_information_form_billingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_shippingState', 'State example');
    I.fillField('#shipping_billing_information_form_shippingSuburb', 'Suburb example');
    I.fillField('#shipping_billing_information_form_shippingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_shippingPhone', '1234567');
    I.fillField('#shipping_billing_information_form_deliveryInstructions', 'Delivery Instructions Example');
    I.fillField('#shipping_billing_information_form_customerNotesProposalDate', 'Additional notes example');
    I.fillField('#shipping_billing_information_form_shippingEmail', 'Email@example.com');

    // Use the same address for billing and shipping
    I.click('#cart_shipping_content .same_shipping_billing_fields label .form-check');

    I.say('USE THE SAME ADDRESS FOR BILLING AND SHIPPING FORM');
    I.fillField('#shipping_billing_information_form_billingFirstName', 'FisrtName example');
    I.fillField('#shipping_billing_information_form_billingLastName', 'LastName example');
    I.fillField('#shipping_billing_information_form_billingAddressLineOne', 'Address example');
    I.selectOption('#shipping_billing_information_form_billingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_billingState', 'State example');
    I.fillField('#shipping_billing_information_form_billingSuburb', 'Suburb example');
    I.fillField('#shipping_billing_information_form_billingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_billingPhone', '123456');
    I.click('#cart_shipping_content .last_row .right_submit input');
    I.seeInCurrentUrl('/cart/payment-information');

    pause();

    // I.click('#checkbox_bank_wire_description');
    // I.say('ACTIVATED THE CAPTCHA.');
    // I.click('#bank_wire_submit');
    // I.seeInCurrentUrl('/cart/review');
    // I.see('Your order is confirmed!');
});
