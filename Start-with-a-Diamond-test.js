Feature('Start with a Diamond');

Scenario('Buy a diamond', ({ I }) => {

    // Check the compare option
    function compareDiamonds() {
        I.click('//*[@id="body_table_results"]/tr[1]/td[9]/div/span[1]/img');
        I.click('//*[@id="body_table_results"]/tr[2]/td[9]/div/span[1]/img');
        I.click("#to_compare_diamonds_from_diamond_list");
    };

    function checkVideo() {
        if(I.seeElement('#diamond_detail_section .diamond_detail_tabs .video_tab', {'display':"none"})) {
            I.click('#diamond_detail_section .diamond_detail_tabs .video_tab');
            I.see('Actual video of the diamond');
        }
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


    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    I.amOnPage("/");
    I.forceClick("Start With a Diamond");
    I.seeInCurrentUrl("/engagement-ring/create/diamond");

    // I.scrollTo("#body_table_results", 0, 100);
    
    // TO COMPARE DIAMONDS
    //------------------------------------------------------------------------------
    I.wait(5);
    compareDiamonds();

    // Choose Diamond
    I.click('//*[@id="body_table_comparison"]/tr[1]/td[9]/a/div'); //Select a diamond from the results table
    // I.click('//*[@id="body_table_results"]/tr[1]/td[10]/a/div');//Select a diamond from the comparison table
    
    // Diamond detail
    I.see('Choose this diamond', 'a');
    // Video
    checkVideo();
    
    
    // Certificate
    I.click('#diamond_detail_section .diamond_detail_tabs .certificate_tab');
    I.switchToNextTab();
    I.seeInCurrentUrl('https://www.igi.org/reports/');
    I.closeCurrentTab();
    I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/'); // Real version
    // I.seeInCurrentUrl('https://manmadediamonds.com.au/engagement-ring/create/'); // Testing version
    I.click('#diamond_detail_section .diamond_detail_tabs .diamond_picture_tab');
    
    I.click('#diamond_detail_section .diamond_detail_content_features .er_details_column_one a');
    I.switchToNextTab();
    I.seeInCurrentUrl('https://www.igi.org/reports/');
    I.closeCurrentTab();
    I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/'); // Real version
    // I.seeInCurrentUrl('https://manmadediamonds.com.au/engagement-ring/create/'); // Testing version
    I.click('20% Deposit Available');
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/'); // Real version
    // I.seeInCurrentUrl('https://manmadediamonds.com.au/engagement-ring/create/'); // Testing version
    I.click('Choose this diamond');
    I.see('CREATE YOUR RING');

    // Select Ring Design
    // I.forceClick('#diamond_list_section .container_steps_title .step_2 .description_2 a');
    // I.forceClick('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a');

    // Filter metal type
    I.forceClick('#metal_type_1');
    checkAllMetal();
    I.forceClick('#metal_type_3');
    checkWhiteMetal();
    I.forceClick('#metal_type_3');
    I.forceClick('#metal_type_5');
    checkYellowMetal();
    I.forceClick('#metal_type_5');
    I.forceClick('#metal_type_4');
    checkRoseMetal();
    I.forceClick('#metal_type_4');
    I.forceClick('#metal_type_2');
    checkPlatinumMetal();
    I.forceClick('#metal_type_2');
    

    // Filter Price
    I.forceClick('#setting_price_range_2');
    checkPrice1000andUnder();
    I.forceClick('#setting_price_range_2');
    I.forceClick('#setting_price_range_3');
    checkPrice1000To2000();
    I.forceClick('#setting_price_range_3');
    I.forceClick('#setting_price_range_4');
    checkPrice2000andOver();
    I.forceClick('#setting_price_range_4');

    // Text Search input
    searchInputRingDesign();
    
    // Click in the first
    I.click('#ring_list_section .ring_item .ring_detail_link');


    // Delivery time
    I.checkOption('#include_express_job_id .pink_checkbox_icon');
    I.checkOption('#dont_include_express_job_id .pink_checkbox_icon');

    // Personalise your ring
    I.click('#personalise_ring_link .pink_checkbox_icon');
    I.see('PERSONALISE YOUR RING');
    // Claw Style
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
    
    // Button cancel
    I.click('Personalise your ring');
    I.see('PERSONALISE YOUR RING');
    I.click('#cancel_store_personalisation');

    // 20% Deposit Available
    I.click('#express_job_option .pink_checkbox_box_legend a');
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/'); // Real version
    // I.seeInCurrentUrl('https://manmadediamonds.com.au/engagement-ring/create/'); // Testing version
    
    // More information
    I.click('#more_info_link');
    I.see('PRODUCT DETAILS', 'h2');
    I.click('#ring_more_details_box button')

    I.click('Choose this design');
    I.see('Review Your Ring', 'h2');


    // Option Drop a hint
    I.click('.social_network_icons .drop_a_hint a');
    I.see('DROP A HINT', 'h3');
    I.fillField('#drop_hint_recipientName', 'Recipient example');
    I.fillField('#drop_hint_recipientEmail', 'Recipient@example.com');
    I.fillField('#drop_hint_message', 'Message here.');
    I.fillField('#drop_hint_yourName', 'Your name here.');
    I.fillField('#drop_hint_yourEmail', 'email@example.com');
    I.checkOption('#drop_hint_newStyleOfferUpdate');
    I.say('PLEASE, ACTIVATE THE CAPTCHA.');
    pause();
    I.click('#drop_hint_send');
    I.see('MESSAGE SENT');
    I.click('.modal-content .modal-body button');

    // Option free shipping
    I.click('.free_shipping a');
    I.see('FREE SHIPPING');
    I.click('> LEARN MORE');
    I.switchToNextTab();
    I.seeInCurrentUrl('/free-shipping');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/diamond');
    I.click('.modal-content .modal-body button');

    // Option free returns
    I.click('.free_returns a');
    I.see('FREE 30 DAYS RETURN POLICY', 'h3');
    I.click('> LEARN MORE');
    I.switchToNextTab();
    I.seeInCurrentUrl('/free-return');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/diamond');
    I.click('.modal-content .modal-body button');

    // Option free returns
    I.click('.share a');
    I.see('SHARE THIS');
    // check the socialmedia
    I.click('.modal-content .modal-body button');
    I.click('Facebook');
    I.switchToNextTab();
    I.seeInCurrentUrl('facebook.com');
    I.closeCurrentTab();
    I.click('Twitter');
    I.switchToNextTab();
    I.seeInCurrentUrl('twitter.com');
    I.closeCurrentTab();
    I.click('Pinterest');
    I.switchToNextTab();
    I.see('Pinterest', 'h2');
    I.closeCurrentTab();
    I.click('Drop a Hint');
    I.see('DROP A HINT');
    I.click('.modal-content .modal-body button');
    I.click('Share');
    I.click('Copy Link');
    I.see('LINK COPIED TO THE CLIPBOARD');
    I.click('.modal-content .modal-body button');
    I.click('#add_to_cart_submit');

    // Select Ring Size
    I.see('SHOPPING CART');
    I.click('Help', '.link_to_ring_size a');
    I.switchToNextTab();
    I.seeInCurrentUrl('HOW TO FIND YOUR RING SIZE');
    I.closeCurrentTab();
    I.selectOption('.summary_setting_size .select_ring_size', '3/4');
    I.click('CHECKOUT');

    // FORM WHERE DO YOU WANT THESE ITEMS SENT?
    I.see('WHERE DO YOU WANT THESE ITEMS SENT?', 'h2');
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
    I.see('PAYMENT METHOD', 'h2');

    pause();

});















// INPUTS TYPE RANGE
// I.dragSlider("#search_form .diamond_filter_color_content .from", 100)