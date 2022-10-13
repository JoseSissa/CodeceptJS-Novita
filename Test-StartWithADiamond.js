Feature('Start with a Diamond');

Scenario('Buy a diamond', async ({ I }) => {

    const waitTime = 300; //Seconds

    // WAIT FOR TEXT IN THE TABLE
    const waitResponseInTable = () => {
        I.waitForText('Detail', waitTime, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    };
    const checkTypeMetal = (typeMetal) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(!results[0].response.items[i].metal_name.toLowerCase().includes(typeMetal)) {
                            console.log(`>>> Error in values obtained from METAL TYPE filter: option ${typeMetal.toUpperCase()}`);
                            return false;
                        }                        
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondShape = (shape) => {
        let results = []
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].shape_slug == shape)) {
                            console.log(`>>> Error in values obtained from DIAMOND SHAPE filter: option ${typeMetal.toUpperCase()}`);
                            return false;
                        }
                    }
                }else {
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;             
            }
        }, waitTime);
    };
    const checkDiamondStyle = (typeStyle) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        let style = results[0].response.items[i].engagement_ring_styles.some(elem => elem.style_slug === typeStyle)
                        if(!style) {
                            console.log(`>>> Error in values obtained from DIAMOND STYLE filter: option ${typeStyle.toUpperCase()}`);
                            return false;
                        }
                    }
                }else {
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;             
            }
        }, waitTime);
    };
    const checkDiamondPrice = (typePrice) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        if(typePrice == 'under') {
                            if(!(results[0].response.items[i].price <= 1000)) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option $1000 and Under`);
                                return false;
                            }
                        }else if(typePrice == 'between') {
                            if(!(results[0].response.items[i].price >= 1000 && results[0].response.items[0].price <= 2000)) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option $1000 to $2000.`);
                                return false;
                            }
                        }else if(typePrice == 'over') {
                            if(!(results[0].response.items[i].price > 2000)) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option over $2000`);
                                return false;
                            }
                        }
                    }
                }else {
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime);
    };
    const checkPriceLowToHigh = () => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    let previousValue = 0;
                    for (let i = 0; i < total; i++) {
                        if(!(previousValue <= results[0].response.items[i].price)) {
                            console.log(`>>> Error in values obtained from SORT BY filter: option LOW TO HIGH`)
                            return false;
                        }
                        previousValue = results[0].response.items[i].price                      
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkPriceHighToLow = () => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    let previousValue = Number.MAX_SAFE_INTEGER;
                    for (let i = 0; i < total; i++) {          
                        console.log('Previous', previousValue);            
                        console.log('Value response', results[0].response.items[i].price);            
                        if(!(previousValue >= results[0].response.items[i].price)) {
                            console.log(`>>> Error in values obtained from SORT BY filter: option LOW TO HIGH`)
                            return false;
                        }
                        previousValue = results[0].response.items[i].price
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkSortByNewest = () => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    if(!(results[0].response.items[0].is_new)) {
                        console.log(`>>> No record found with the tag NEW`)
                        return false;
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime)
    }
    





    
    // Search input Ring design
    async function searchInputRingDesign() {
        I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', 'Allegro accent');
        I.pressKey('Enter');
        I.wait(3);
        const results = await I.grabTextFromAll('#ring_list_section .ring_item .name');
        for (const elem of results) {
            if(!(elem.includes('Allegro Accent'))) {
                console.log('Error in values obtained from input search in Ring Design.');
            }
        }
    };
    // Check personalise your ring
    function checkPersonaliseYourRing() {
        I.wait(3);
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
        I.see('DROP A HINT');
        I.fillField('#drop_hint_recipientName', 'Jose Testing');
        I.fillField('#drop_hint_recipientEmail', 'testing@testing.com');
        I.fillField('#drop_hint_message', 'Test form, please ignore this request.');
        I.fillField('#drop_hint_yourName', 'Jose Testing');
        I.fillField('#drop_hint_yourEmail', 'testing@testing.com');
        I.checkOption('#drop_hint_newStyleOfferUpdate');
        I.say('PLEASE, ACTIVATE THE CAPTCHA AND WRITE "exit" IN THE CONSOLE AND PRESS ENTER');
        pause();
        I.click('#drop_hint_send');
        I.wait(3);
        I.see('MESSAGE SENT');
        I.click('.modal-content .modal-body button');
    }
    // Check Price sort by (high to low, low to high)
    
    
    
    
    

    
    // ----------------------------------------------------
    // ----------------------------------------------------
    I.amOnPage("/")
    I.forceClick("Start With a Diamond")
    I.seeInCurrentUrl("/engagement-ring/create/diamond")
    waitResponseInTable()

    // CHECKING RING GUIDE BAR
    //------------------------------------------------------------------------------
    // I.say('CHECKING RING GUIDE BAR')
    // I.say('STEP - RING DESIGN')
    // I.waitForElement('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a', waitTime)
    // I.forceClick('Browse settings', '//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a')
    // I.seeInCurrentUrl('/engagement-ring/create/ring')
    // I.waitForElement('//*[@id="create_engage_ring_container"]/section[3]/div[1]/div[1]/div[3]/div[2]/a', waitTime)
    // I.say('STEP - SELECT DIAMOND')
    // I.forceClick('Browse diamonds', '//*[@id="create_engage_ring_container"]/section[3]/div[1]/div[1]/div[3]/div[2]/a')
    // I.seeInCurrentUrl('/engagement-ring/create/diamond')
    // waitResponseInTable()

    //  SELECT A DIAMOND
    //----------------------------------------------------------------------------------------------------------
    I.say('SELECT ONE DIAMOND')
    I.waitForText('Detail', waitTime, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.see('Detail', '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.click('Detail', '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.waitForElement('//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]/a[1]', waitTime)
    I.click('Choose this diamond', '//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]/a[1]')
    I.waitForText('CREATE YOUR RING', waitTime, '//*[@id="select_ring_instructions"]/section/div/div/div[1]')    

    // -------------------------------------------- METAL TYPE FILTER --------------------------------------------
    // I.say('FILTER CHECK - METAL TYPE')
    // I.forceClick('#metal_type_1')

    // I.say('METAL TYPE - WHITE GOLD')
    // I.forceClick('#metal_type_3')
    // I.seeCheckboxIsChecked('#metal_type_3')
    // checkTypeMetal('white gold')
    // I.forceClick('#metal_type_3')

    // I.say('METAL TYPE - YELLOW GOLD')
    // I.forceClick('#metal_type_5')
    // I.seeCheckboxIsChecked('#metal_type_5')
    // checkTypeMetal('yellow gold')
    // I.forceClick('#metal_type_5');

    // I.say('METAL TYPE - ROSE GOLD')
    // I.forceClick('#metal_type_4');
    // I.seeCheckboxIsChecked('#metal_type_4')
    // checkTypeMetal('rose gold')
    // I.forceClick('#metal_type_4');

    // I.say('METAL TYPE - ROSE GOLD')
    // I.forceClick('#metal_type_2');
    // I.seeCheckboxIsChecked('#metal_type_2')
    // checkTypeMetal('platinum')
    // I.forceClick('#metal_type_2');

    // -------------------------------------------- DIAMOND SHAPE FILTER --------------------------------------------
    // I.say('DIAMOND SHAPE FILTER')
    // I.forceClick('#diamond_shape_1')

    // I.say('DIAMOND SHAPE - ROUND')
    // I.forceClick('#diamond_shape_2')
    // checkDiamondShape('round')
    // I.forceClick('#diamond_shape_2')

    // I.say('DIAMOND SHAPE - PEAR')
    // I.forceClick('#diamond_shape_7')
    // checkDiamondShape('pear')
    // I.forceClick('#diamond_shape_7')

    // I.say('DIAMOND SHAPE - OVAL')
    // I.forceClick('#diamond_shape_5')
    // checkDiamondShape('oval')
    // I.forceClick('#diamond_shape_5')

    // I.say('DIAMOND SHAPE - EMERALD')
    // I.forceClick('#diamond_shape_6')
    // checkDiamondShape('emerald')
    // I.forceClick('#diamond_shape_6')

    // I.say('DIAMOND SHAPE - CUSHION')
    // I.forceClick('#diamond_shape_4')
    // checkDiamondShape('cushion')
    // I.forceClick('#diamond_shape_4')

    // I.say('DIAMOND SHAPE - PRINCESS')
    // I.forceClick('#diamond_shape_3')
    // checkDiamondShape('princess')
    // I.forceClick('#diamond_shape_3')

    // I.say('DIAMOND SHAPE - RADIANT')
    // I.forceClick('#diamond_shape_8')
    // checkDiamondShape('radiant')
    // I.forceClick('#diamond_shape_8')

    // I.say('DIAMOND SHAPE - ASSCHER')
    // I.forceClick('#diamond_shape_9')
    // checkDiamondShape('asscher')
    // I.forceClick('#diamond_shape_9')

    // I.forceClick('#diamond_shape_1')

    // -------------------------------------------- DIAMOND STYLE FILTER --------------------------------------------
    // I.say('DIAMOND STYLE FILTER')
    // I.forceClick('#engagement_ring_style_1')

    // I.say('DIAMOND STYLE - SOLITAIRE')
    // I.forceClick('#engagement_ring_style_2')
    // checkDiamondStyle('solitaire')
    // I.forceClick('#engagement_ring_style_2')

    // I.say('DIAMOND STYLE - SIDE STONE')
    // I.forceClick('#engagement_ring_style_4')
    // checkDiamondStyle('side-stone')
    // I.forceClick('#engagement_ring_style_4')

    // I.say('DIAMOND STYLE - HALO')
    // I.forceClick('#engagement_ring_style_3')
    // checkDiamondStyle('halo')
    // I.forceClick('#engagement_ring_style_3')

    // I.say('DIAMOND STYLE - THREE STONE')
    // I.forceClick('#engagement_ring_style_5')
    // checkDiamondStyle('three-stone')
    // I.forceClick('#engagement_ring_style_5')

    // I.forceClick('#engagement_ring_style_1')

    // -------------------------------------------- DIAMOND PRICE FILTER --------------------------------------------
    // I.say('DIAMOND PRICE FILTER')
    // I.say('PRICE - $1000 and Under');
    // I.forceClick('#setting_price_range_2');
    // I.seeCheckboxIsChecked('#setting_price_range_2');
    // checkDiamondPrice('under');
    // I.forceClick('#setting_price_range_2');

    // I.say('PRICE - BETWEEN $1000 to $2000');
    // I.forceClick('#setting_price_range_3');
    // I.seeCheckboxIsChecked('#setting_price_range_3');
    // checkDiamondPrice('between');
    // I.forceClick('#setting_price_range_3');

    // I.say('PRICE - OVER $2000');
    // I.forceClick('#setting_price_range_4');
    // I.seeCheckboxIsChecked('#setting_price_range_4');
    // checkDiamondPrice('over');
    // I.forceClick('#setting_price_range_4');
    
    // I.forceClick('#setting_price_range_1');

    // -------------------------------------------- SORT BY --------------------------------------------
    I.say('CHECK - SORT BY')
    I.see('Sort by: Best Sellers', '#dropdownMenuButton');

    I.say('SORT BY - LOW TO HIGH');
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Price (Low to High)');
    I.see('Sort by: Price (Low to High)', '#dropdownMenuButton');
    checkPriceLowToHigh();

    I.say('SORT BY - HIGH TO LOW');
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Price (High to Low)');
    I.see('Sort by: Price (High to Low)', '#dropdownMenuButton');
    checkPriceHighToLow();

    I.say('SORT BY: NEWEST');
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Newest');
    I.see('Sort by: Newest', '#dropdownMenuButton');
    checkSortByNewest()



    pause()

    





    const isNew = await I.grabCssPropertyFrom('//*[@id="ring_list_section"]/div/div[1]/a/div[1]', 'background-image');
    if(!isNew.includes('icon_new')) {
        console.log('Error to sort from newest');
    };

    I.say('SORT BY: BEST SELLERS');
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Best Sellers');
    I.wait(3);
    I.see('Sort by: Best Sellers', '#dropdownMenuButton');

    
    // Text Search input
    I.say('TEXT SEARCH INPUT');
    searchInputRingDesign();
    I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', '');
    I.pressKey('Enter');
    
    // Click in the first
    I.say('FIRST ITEM SELECTED');
    I.wait(5)
    I.click('#ring_list_section .ring_item .ring_detail_link');
    I.wait(3);

    // Delivery time
    I.checkOption('#include_express_job_id .pink_checkbox_icon');
    I.checkOption('#dont_include_express_job_id .pink_checkbox_icon');

    // Personalise your ring
    I.say('PERSONALISE YOUR RING');
    I.click('#personalise_ring_link .pink_checkbox_icon');
    // Claw Style
    checkPersonaliseYourRing();
    
    // Button cancel
    I.say('PERSONALISE YOUR RING, BUTTON CANCEL');
    I.click('Personalise your ring');
    I.click('#cancel_store_personalisation');

    // 20% Deposit Available
    I.say('20% DEPOSIT AVAILABLE');
    I.click('#express_job_option .pink_checkbox_box_legend a');
    I.wait(3);
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    
    // More information
    I.say('MORE INFORMATION');
    I.click('#more_info_link');
    I.wait(3);
    I.see('PRODUCT DETAILS', 'h2');
    I.click('#ring_more_details_box button');

    I.say('CHOOSE THIS DIAMOND');
    I.click('Choose this design');
    I.wait(3);
    I.see('Review Your Ring', 'h2');

    // I.say('SELECT A DIAMOND');
    // I.seeInCurrentUrl('/engagement-ring/create/');
    // I.wait(3);
    // I.waitForText('Detail', 40, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    // I.click('//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
    // I.wait(3);
    // I.click('Choose this diamond');
    // I.wait(4);
    // I.see('Review Your Ring', 'h2');
    // I.click('#selection_summary_section .to_setting_list_from_summary');
    // I.wait(4);
    // I.seeInCurrentUrl('/engagement-ring/create/');
    // I.click('#ring_list_section .ring_item .ring_detail_link');
    // I.wait(3);
    // I.click('Choose this design');
    // I.wait(3);
    // I.see('Review Your Ring', 'h2');
    // I.click('#selection_summary_section .summary_personalise_link');
    // checkPersonaliseYourRing();


    // Option Drop a hint
    // I.wait(3);
    // I.say('OPTION DROP A HINT');
    // I.wait(3);
    // I.click('.social_network_icons .drop_a_hint a');
    // I.wait(3);
    // formDropAHint();

    // Option free shipping
    I.say('OPTION FREE SHIPPING');
    I.forceClick('.free_shipping a');
    I.wait(3);
    I.see('FREE SHIPPING');
    I.click('> LEARN MORE');
    I.wait(4);
    I.switchToNextTab();
    I.seeInCurrentUrl('/free-shipping');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    I.click('.modal-content .modal-body button');

    // Option free returns
    I.say('OPTION FREE RETURNS');
    I.click('.free_returns a');
    I.wait(4);
    I.see('FREE 30 DAYS RETURN POLICY', 'h3');
    I.click('> LEARN MORE');
    I.wait(4);
    I.switchToNextTab();
    I.seeInCurrentUrl('/free-return');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    I.click('.modal-content .modal-body button');
    I.wait(3);
    
    // check the socialmedia
    I.say('OPTION SHARE AND SOCIALMEDIA');
    I.click('.share a');
    I.wait(3);
    I.see('SHARE THIS');
    I.click('.modal-content .modal-body button');
    I.click('.share a');
    I.wait(3);
    I.click('Facebook');
    I.wait(4);
    I.switchToNextTab();
    I.seeInCurrentUrl('facebook.com');
    I.closeCurrentTab();
    I.click('Twitter');
    I.wait(4);
    I.switchToNextTab();
    I.seeInCurrentUrl('twitter.com');
    I.closeCurrentTab();
    I.click('Pinterest');
    I.wait(4);
    I.switchToNextTab();
    I.see('Pinterest', 'h2');
    I.closeCurrentTab();
    I.wait(3);
    I.click('//*[@id="share_info"]/div[1]/div/div/button')
    // I.click('#link_drop_hint');
    // I.wait(3);
    // formDropAHint();
    I.click('Share');
    I.wait(3);
    I.click('Copy Link');
    I.see('LINK COPIED TO THE CLIPBOARD');
    I.click('.modal-content .modal-body button');
    I.wait(3);

    I.say('ADD TO CART');
    I.click('#add_to_cart_submit');
    I.wait(3);

    // Select Ring Size
    I.say('SELECT RING SIZE');
    I.see('SHOPPING CART');
    I.click('Help', '.link_to_ring_size a');
    I.wait(20);
    I.switchToNextTab();
    I.see('HOW TO FIND YOUR RING SIZE');
    I.closeCurrentTab();
    I.see('SHOPPING CART');
    I.selectOption('.summary_setting_size .select_ring_size', '3/4');
    I.wait(3);

    I.say('TERMS AND CODITIONS');
    I.click('*Conditions apply');
    I.wait(4);
    I.switchToNextTab();
    // I.seeInCurrentUrl('/terms-conditions-promo-voucher');
    I.closeCurrentTab();

    I.say('CHECKOUT');
    I.click('CHECKOUT');
    I.wait(3);
    
    // FORM WHERE DO YOU WANT THESE ITEMS SENT?
    I.say('FORM WHERE DO YOU WANT THESE ITEMS SENT?');
    I.see('WHERE DO YOU WANT THESE ITEMS SENT?', 'h2');
    I.fillField('#shipping_billing_information_form_shippingFirstName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_shippingLastName', 'Jose Testing');
    I.fillField('#shipping_billing_information_form_shippingAddressLineOne', 'Test Address');
    I.click('#shipping_billing_information_form_shippingCountry');
    I.selectOption('#shipping_billing_information_form_shippingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_shippingState', 'Testing');
    I.fillField('#shipping_billing_information_form_shippingSuburb', 'Testing');
    I.fillField('#shipping_billing_information_form_shippingPostcode', 'AA9A9AA');
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
    I.selectOption('#shipping_billing_information_form_billingCountry', 'United Kingdom');
    I.fillField('#shipping_billing_information_form_billingState', 'Testing');
    I.fillField('#shipping_billing_information_form_billingSuburb', 'Testing');
    I.fillField('#shipping_billing_information_form_billingPostcode', 'AA9A9AA');
    I.fillField('#shipping_billing_information_form_billingPhone', '123456');
    I.click('#cart_shipping_content .last_row .right_submit input');
    I.seeInCurrentUrl('/cart/payment-information');
    I.wait(3);

    // PAYMENT METHOD
    I.say('PAYMENT FOR POLIPAYMENT');
    I.click('#checkbox_polipayment_description');
    I.click('#polipayment_submit');
    I.click('#proceed-button');
    I.click('Cancel');
    I.checkOption('#loginother');
    I.fillField('#label_loginother', 'Testing');
    I.click('Submit');
    I.wait(3);
    I.see('YOUR PAYMENT TRANSACTION WAS CANCELLED.', 'h3');
    I.click('click here');

    I.say('PAYMENT FOR PAYPAL');
    I.click('#checkbox_paypal_description');
    I.wait(3);
    I.click('#paypal-button-container iframe');
    I.wait(3);
    I.switchTo('iframe');
    I.seeInCurrentUrl('https://www.sandbox.paypal.com/');
    I.switchTo();
    I.closeOtherTabs();

    I.say('PAYMENT FOR BANK TRANSFER');
    I.click('#checkbox_bank_wire_description');
    I.see('Paying By Bank Transfer');
    I.say('PLEASE, ACTIVATE THE CAPTCHA THEN TYPE "exit" IN THE CONSOLE AND PRESS ENTER TO CONTINUE');
    pause();
    // I.click('#bank_wire_submit');
    // I.see('Your order is confirmed!');
});