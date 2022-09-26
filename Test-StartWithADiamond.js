Feature('Start with a Diamond');

Scenario('Buy a diamond', ({ I }) => {

    // Functions of metal types filters
    // Option All
    async function checkAllMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== '18ct White Gold' && elem !== '18ct Yellow Gold' && elem !== '18ct Rose Gold' && elem !== 'Platinum') {
                I.dontSee(elem);
                console.log('Error in values obtained from metal type filter option All');
            }else {
                I.see(elem);
            };
        };
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
    async function searchInputRingDesign() {
        I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', 'Allegro accent');
        I.pressKey('Enter');
        const results = await I.grabTextFromAll('#ring_list_section .ring_item .name');
        for (const elem of results) {
            if(!(elem.includes('Allegro Accent'))) {
                console.log('Error in values obtained from input search in Ring Design.');
            }
        }
    };
    // Check personalise your ring
    function checkPersonaliseYourRing() {
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
    }
    // Form drop a Hint
    function formDropAHint() {
        I.see('DROP A HINT', 'h3');
        I.fillField('#drop_hint_recipientName', 'Recipient example');
        I.fillField('#drop_hint_recipientEmail', 'Recipient@example.com');
        I.fillField('#drop_hint_message', 'Message here.');
        I.fillField('#drop_hint_yourName', 'Your name here.');
        I.fillField('#drop_hint_yourEmail', 'email@example.com');
        I.checkOption('#drop_hint_newStyleOfferUpdate');
        I.say('PLEASE, ACTIVATE THE CAPTCHA AND WRITE "exit" IN THE CONSOLE AND PRESS ENTER');
        pause();
        I.click('#drop_hint_send');
        I.see('MESSAGE SENT');
        I.click('.modal-content .modal-body button');
    }
    // Check Price sort by
    async function checkPriceLowToHigh() {
        let price = await I.grabTextFromAll('#ring_list_section .ring_detail_link .price');
        let previousValue = 0;
        price.forEach(elem => {
            // We remove the text up to the '$', then remove the ',' and convert it to a number
            if(previousValue > Number((elem.slice(elem.indexOf('$')+1)).replace(',', ''))) {
                console.log('Error in ordering from lowest to highest price');
            }
            previousValue = Number((elem.slice(elem.indexOf('$')+1)).replace(',', ''));
        });
    };
    async function checkPriceHighToLow() {
        let price = await I.grabTextFromAll('#ring_list_section .ring_detail_link .price');
        // We remove the text up to the '$', then remove the ',' and convert it to a number
        let previousNumber = (Number((price[0].slice(price[0].indexOf('$')+1).replace(',', ''))));
        price.forEach(elem => {
            if(previousNumber < Number((elem.slice(elem.indexOf('$')+1).replace(',', '')))) {
                console.log('Error in ordering from highest to lowest price');
            };
            previousNumber = Number((elem.slice(elem.indexOf('$')+1).replace(',', '')));
        });
    };

    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    I.amOnPage("/");
    I.forceClick("Start With a Diamond");
    I.seeInCurrentUrl("/engagement-ring/create/diamond");
    I.wait(6);
    //  SELECT A DIAMOND
    //------------------------------------------------------------------------------
    I.say('I SELECT A DIAMOND');
    I.wait(5);
    I.click('Detail', '#body_table_results tr td a');
    I.see('Choose this diamond', 'a');    
    
    // CHOOSE DIAMOND
    I.say('CHOOSE DIAMOND');
    I.click('Choose this diamond');
    I.see('CREATE YOUR RING');

    // Bar when start the process in this page
    I.say('BAR WHEN START THE PROCESS IN THIS PAGE');
    // I.forceClick('#diamond_list_section .container_steps_title .step_2 .description_2 a');
    // I.forceClick('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a');

    
    // Check Sort by
    I.say('FILTER SORT BY')
    I.see('Sort by: Best Sellers', '#dropdownMenuButton');
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Price (Low to High)');
    I.see('Sort by: Price (Low to High)', '#dropdownMenuButton');
    checkPriceLowToHigh();
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Price (High to Low)');
    I.see('Sort by: Price (High to Low)', '#dropdownMenuButton');
    checkPriceHighToLow();
    pause();
    
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Newest');
    I.see('Sort by: Newest', '#dropdownMenuButton');
    // I.see('#ring_list_section .ring_detail_link .isNew');



    // Filter metal type
    I.say('FILTER METAL TYPE');
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
    I.say('FILTER PRICE');
    // I.forceClick('#setting_price_range_2');
    // checkPrice1000andUnder();
    // I.forceClick('#setting_price_range_2');
    // I.forceClick('#setting_price_range_3');
    // checkPrice1000To2000();
    // I.forceClick('#setting_price_range_3');
    // I.forceClick('#setting_price_range_4');
    // checkPrice2000andOver();
    // I.forceClick('#setting_price_range_4');

    // Text Search input
    I.say('TEXT SEARCH INPUT');
    // searchInputRingDesign();
    // I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', '');
    // I.pressKey('Enter');
    

    // Click in the first
    I.say('FIRST ITEM SELECTED');
    I.click('#ring_list_section .ring_item .ring_detail_link');

    // pause();

    // Delivery time
    // I.checkOption('#include_express_job_id .pink_checkbox_icon');
    // I.checkOption('#dont_include_express_job_id .pink_checkbox_icon');

    // Personalise your ring
    // I.say('PERSONALISE YOUR RING');
    // I.click('#personalise_ring_link .pink_checkbox_icon');
    // Claw Style
    // checkPersonaliseYourRing();
    
    // Button cancel
    // I.say('PERSONALISE YOUR RING, BUTTON CANCEL');
    // I.click('Personalise your ring');
    // I.click('#cancel_store_personalisation');

    // 20% Deposit Available
    // I.say('20% DEPOSIT AVAILABLE');
    // I.click('#express_job_option .pink_checkbox_box_legend a');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('/deposit');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('/engagement-ring/create/');
    
    // More information
    // I.say('MORE INFORMATION');
    // I.click('#more_info_link');
    // I.see('PRODUCT DETAILS', 'h2');
    // I.click('#ring_more_details_box button');

    I.say('CHOOSE THIS DIAMOND');
    I.click('Choose this design');
    I.see('Review Your Ring', 'h2');

    // I.say('OPTIONS "CHANGE"');
    // I.click('#engagement_ring_summary .to_diamond_list_from_summary');
    // I.wait(5);
    // I.seeInCurrentUrl('/engagement-ring/create/');
    // I.click('//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    // I.click('Choose this diamond');
    // I.see('Review Your Ring', 'h2');
    // I.click('#selection_summary_section .to_setting_list_from_summary');
    // I.seeInCurrentUrl('/engagement-ring/create/');
    // I.click('#ring_list_section .ring_item .ring_detail_link');
    // I.click('Choose this design');
    // I.see('Review Your Ring', 'h2');
    // I.click('#selection_summary_section .summary_personalise_link');
    // checkPersonaliseYourRing();


    // Option Drop a hint
    // I.say('OPTION DROP A HINT');
    // I.click('.social_network_icons .drop_a_hint a');
//    formDropAHint();

    // Option free shipping
    // I.say('OPTION FREE SHIPPING');
    // I.click('.free_shipping a');
    // I.see('FREE SHIPPING');
    // I.click('> LEARN MORE');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('/free-shipping');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('/engagement-ring/create/diamond');
    // I.click('.modal-content .modal-body button');

    // Option free returns
    // I.say('OPTION FREE RETURNS');
    // I.click('.free_returns a');
    // I.see('FREE 30 DAYS RETURN POLICY', 'h3');
    // I.click('> LEARN MORE');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('/free-return');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('/engagement-ring/create/diamond');
    // I.click('.modal-content .modal-body button');
    
    // check the socialmedia
    I.say('OPTION SHARE AND SOCIALMEDIA');
    I.click('.share a');
    // I.see('SHARE THIS');
    // I.click('.modal-content .modal-body button');
    // I.click('.share a');
    // I.click('Facebook');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('facebook.com');
    // I.closeCurrentTab();
    // I.click('Twitter');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('twitter.com');
    // I.closeCurrentTab();
    // I.click('Pinterest');
    // I.switchToNextTab();
    // I.see('Pinterest', 'h2');
    // I.closeCurrentTab();
    // I.click('#link_drop_hint');
    // formDropAHint();
    I.click('.modal-content .modal-body button');
    I.click('Share');
    I.click('Copy Link');
    I.see('LINK COPIED TO THE CLIPBOARD');
    I.click('.modal-content .modal-body button');

    I.say('ADD TO CART');
    I.click('#add_to_cart_submit');

    // Select Ring Size
    I.say('SELECT RING SIZE');
    I.see('SHOPPING CART');
    I.click('Help', '.link_to_ring_size a');
    I.wait(8);
    I.switchToNextTab();
    I.see('HOW TO FIND YOUR RING SIZE');
    I.closeCurrentTab();
    I.see('SHOPPING CART');
    I.selectOption('.summary_setting_size .select_ring_size', '3/4');

    // pause();
    I.say('TERMS AND CODITIONS');
    I.click('*Conditions apply');
    I.switchToNextTab();
    I.seeInCurrentUrl('/terms-conditions-promo-voucher');
    I.closeCurrentTab();

    I.say('CHECKOUT');
    I.click('CHECKOUT');
    I.wait(2);
    // pause();
    // FORM WHERE DO YOU WANT THESE ITEMS SENT?
    I.say('FORM WHERE DO YOU WANT THESE ITEMS SENT?');
    I.see('WHERE DO YOU WANT THESE ITEMS SENT?', 'h2');
    I.fillField('#shipping_billing_information_form_shippingFirstName', 'FirstName');
    I.fillField('#shipping_billing_information_form_shippingLastName', 'LastName');
    I.fillField('#shipping_billing_information_form_shippingAddressLineOne', 'Suite 56-58, New House');
    I.click('#shipping_billing_information_form_shippingCountry');
    I.selectOption('#shipping_billing_information_form_shippingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_shippingState', 'State example');
    I.fillField('#shipping_billing_information_form_shippingSuburb', 'Suburb example');
    I.fillField('#shipping_billing_information_form_shippingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_shippingPhone', '1234567');
    I.fillField('#shipping_billing_information_form_deliveryInstructions', 'Delivery Instructions Example');
    I.fillField('#shipping_billing_information_form_customerNotesProposalDate', 'Additional notes example');
    I.fillField('#shipping_billing_information_form_shippingEmail', 'Email@example.com');

    // Use the same address for billing and shipping
    I.say('USE THE SAME ADDRESS FOR BILLING AND SHIPPING');
    I.click('#cart_shipping_content .same_shipping_billing_fields label .form-check');

    // pause()

    I.fillField('#shipping_billing_information_form_billingFirstName', 'FisrtName example');
    I.fillField('#shipping_billing_information_form_billingLastName', 'LastName example');
    I.fillField('#shipping_billing_information_form_billingAddressLineOne', 'Address example');
    I.click('#shipping_billing_information_form_billingCountry');
    I.selectOption('#shipping_billing_information_form_billingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_billingState', 'State example');
    I.fillField('#shipping_billing_information_form_billingSuburb', 'Suburb example');
    I.fillField('#shipping_billing_information_form_billingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_billingPhone', '123456');
    I.click('#cart_shipping_content .last_row .right_submit input');
    I.seeInCurrentUrl('/cart/payment-information');

    
    I.say('PAYMENT FOR BANK TRANSFER');
    // I.click('#checkbox_bank_wire_description');
    // I.see('Paying By Bank Transfer');
    // I.say('please active the captcha and continue');
    // I.click('#bank_wire_submit');
    // I.see('Your order is confirmed!');

    I.say('PAYMENT FOR POLIPAYMENT');
    I.click('#checkbox_polipayment_description');
    I.click('#polipayment_submit');
    I.click('#proceed-button');
    I.click('Cancel');
    I.checkOption('#loginother');
    I.fillField('#label_loginother', 'Testing');
    I.click('Submit');
    I.see('YOUR PAYMENT TRANSACTION WAS CANCELLED.', 'h3');
    I.click('click here');
    // I.click('#checkbox_paypal_description');
    // I.click('#paypal-button-container, #buttons-container');
    pause();

});















// INPUTS TYPE RANGE
// I.dragSlider("#search_form .diamond_filter_color_content .from", 100)