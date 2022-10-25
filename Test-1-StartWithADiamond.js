Feature('Start with a Diamond');

Scenario('Buy a diamond', async ({ I }) => {

    const waitTime = 300; //Seconds
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
    };
    const searchInputRingDesign = (name) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    if(!(results[0].response.items[0].name.toLowerCase().includes(name))) {
                        console.log(`>>> No record was found with the SEARCH TEXT entered`)
                        return false;
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime)
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
    const formDropAHint = () => {
        I.fillField('#drop_hint_recipientName', 'Jose Testing');
        I.fillField('#drop_hint_recipientEmail', 'testing@testing.com');
        I.fillField('#drop_hint_message', 'Test form, please ignore this request.');
        I.fillField('#drop_hint_yourName', 'Jose Testing');
        I.fillField('#drop_hint_yourEmail', 'testing@testing.com');
        I.checkOption('#drop_hint_newStyleOfferUpdate');
        I.say('PLEASE, ACTIVATE THE CAPTCHA AND WRITE "exit" IN THE CONSOLE AND PRESS ENTER');
        pause();
        I.click('#drop_hint_send');
        I.waitForText('MESSAGE SENT', waitTime)
        I.see('MESSAGE SENT');
        I.click('.modal-content .modal-body button');
    };

    // ----------------------------------------------------
    // ----------------------------------------------------
    I.amOnPage("/")
    I.forceClick("Start With a Diamond")
    I.seeInCurrentUrl("/engagement-ring/create/diamond")
    waitResponseInTable()

    // CHECKING RING GUIDE BAR
    //------------------------------------------------------------------------------
    I.say('CHECKING RING GUIDE BAR')
    I.say('STEP - RING DESIGN')
    I.waitForElement('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a', waitTime)
    I.forceClick('Browse settings', '//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a')
    I.seeInCurrentUrl('/engagement-ring/create/ring')
    I.waitForElement('//*[@id="create_engage_ring_container"]/section[3]/div[1]/div[1]/div[3]/div[2]/a', waitTime)
    I.say('STEP - SELECT DIAMOND')
    I.forceClick('Browse diamonds', '//*[@id="create_engage_ring_container"]/section[3]/div[1]/div[1]/div[3]/div[2]/a')
    I.seeInCurrentUrl('/engagement-ring/create/diamond')
    waitResponseInTable()

    //  SELECT A DIAMOND
    //----------------------------------------------------------------------------------------------------------
    I.say('SELECT ONE DIAMOND')
    waitResponseInTable()
    I.see('Detail', '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.forceClick('Detail', '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.waitForElement('//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]/a[1]', waitTime)
    I.click('Choose this diamond', '//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]/a[1]')
    I.waitForText('CREATE YOUR RING', waitTime, '//*[@id="select_ring_instructions"]/section/div/div/div[1]')    

    // -------------------------------------------- METAL TYPE FILTER --------------------------------------------
    I.say('FILTER CHECK - METAL TYPE')
    I.forceClick('#metal_type_1')

    I.say('METAL TYPE - WHITE GOLD')
    I.forceClick('#metal_type_3')
    I.seeCheckboxIsChecked('#metal_type_3')
    checkTypeMetal('white gold')
    I.forceClick('#metal_type_3')

    I.say('METAL TYPE - YELLOW GOLD')
    I.forceClick('#metal_type_5')
    I.seeCheckboxIsChecked('#metal_type_5')
    checkTypeMetal('yellow gold')
    I.forceClick('#metal_type_5')

    I.say('METAL TYPE - ROSE GOLD')
    I.forceClick('#metal_type_4')
    I.seeCheckboxIsChecked('#metal_type_4')
    checkTypeMetal('rose gold')
    I.forceClick('#metal_type_4')

    I.say('METAL TYPE - ROSE GOLD')
    I.forceClick('#metal_type_2');
    I.seeCheckboxIsChecked('#metal_type_2')
    checkTypeMetal('platinum')
    I.forceClick('#metal_type_2')

    // -------------------------------------------- DIAMOND SHAPE FILTER --------------------------------------------
    I.say('DIAMOND SHAPE FILTER')
    I.forceClick('#diamond_shape_1')

    I.say('DIAMOND SHAPE - ROUND')
    I.forceClick('#diamond_shape_2')
    checkDiamondShape('round')
    I.forceClick('#diamond_shape_2')

    I.say('DIAMOND SHAPE - PEAR')
    I.forceClick('#diamond_shape_7')
    checkDiamondShape('pear')
    I.forceClick('#diamond_shape_7')

    I.say('DIAMOND SHAPE - OVAL')
    I.forceClick('#diamond_shape_5')
    checkDiamondShape('oval')
    I.forceClick('#diamond_shape_5')

    I.say('DIAMOND SHAPE - EMERALD')
    I.forceClick('#diamond_shape_6')
    checkDiamondShape('emerald')
    I.forceClick('#diamond_shape_6')

    I.say('DIAMOND SHAPE - CUSHION')
    I.forceClick('#diamond_shape_4')
    checkDiamondShape('cushion')
    I.forceClick('#diamond_shape_4')

    I.say('DIAMOND SHAPE - PRINCESS')
    I.forceClick('#diamond_shape_3')
    checkDiamondShape('princess')
    I.forceClick('#diamond_shape_3')

    I.say('DIAMOND SHAPE - RADIANT')
    I.forceClick('#diamond_shape_8')
    checkDiamondShape('radiant')
    I.forceClick('#diamond_shape_8')

    I.say('DIAMOND SHAPE - ASSCHER')
    I.forceClick('#diamond_shape_9')
    checkDiamondShape('asscher')
    I.forceClick('#diamond_shape_9')

    I.forceClick('#diamond_shape_1')

    // -------------------------------------------- DIAMOND STYLE FILTER --------------------------------------------
    I.say('DIAMOND STYLE FILTER')
    I.forceClick('#engagement_ring_style_1')

    I.say('DIAMOND STYLE - SOLITAIRE')
    I.forceClick('#engagement_ring_style_2')
    checkDiamondStyle('solitaire')
    I.forceClick('#engagement_ring_style_2')

    I.say('DIAMOND STYLE - SIDE STONE')
    I.forceClick('#engagement_ring_style_4')
    checkDiamondStyle('side-stone')
    I.forceClick('#engagement_ring_style_4')

    I.say('DIAMOND STYLE - HALO')
    I.forceClick('#engagement_ring_style_3')
    checkDiamondStyle('halo')
    I.forceClick('#engagement_ring_style_3')

    I.say('DIAMOND STYLE - THREE STONE')
    I.forceClick('#engagement_ring_style_5')
    checkDiamondStyle('three-stone')
    I.forceClick('#engagement_ring_style_5')

    I.forceClick('#engagement_ring_style_1')

    // -------------------------------------------- DIAMOND PRICE FILTER --------------------------------------------
    I.say('DIAMOND PRICE FILTER')
    I.say('PRICE - $1000 and Under');
    I.forceClick('#setting_price_range_2');
    I.seeCheckboxIsChecked('#setting_price_range_2');
    checkDiamondPrice('under');
    I.forceClick('#setting_price_range_2');

    I.say('PRICE - BETWEEN $1000 to $2000');
    I.forceClick('#setting_price_range_3');
    I.seeCheckboxIsChecked('#setting_price_range_3');
    checkDiamondPrice('between');
    I.forceClick('#setting_price_range_3');

    I.say('PRICE - OVER $2000');
    I.forceClick('#setting_price_range_4');
    I.seeCheckboxIsChecked('#setting_price_range_4');
    checkDiamondPrice('over');
    I.forceClick('#setting_price_range_4');
    
    I.forceClick('#setting_price_range_1');

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

    I.say('SORT BY: BEST SELLERS');
    I.click('#jewellery_order_section #dropdownMenuButton');
    I.click('Best Sellers');
    I.see('Sort by: Best Sellers', '#dropdownMenuButton');

    // -------------------------------------------- SEARCH INPUT FILTER --------------------------------------------
    I.say('TEXT SEARCH INPUT');
    I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', 'Allegro accent');
    I.pressKey('Enter');
    searchInputRingDesign('allegro accent');
    I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', '');
    I.pressKey('Enter');

    // -------------------------------------------- I SELECT FIRST ITEM/ELEMENT --------------------------------------------
    I.say('FIRST ITEM SELECTED');
    I.waitForElement('#ring_list_section .ring_item .ring_detail_link', waitTime)
    I.click('#ring_list_section .ring_item .ring_detail_link');
    // 20 days express (+$150)
    I.checkOption('#include_express_job_id .pink_checkbox_icon');

    // 20% Deposit Available
    I.click('#express_job_option .pink_checkbox_box_legend a');
    
    // Personalise your ring
    I.say('PERSONALISE YOUR RING');
    I.click('#personalise_ring_link .pink_checkbox_icon');
    checkPersonaliseYourRing();
    // Button cancel
    I.say('PERSONALISE YOUR RING, BUTTON CANCEL');
    I.click('Personalise your ring');
    I.click('#cancel_store_personalisation');

    // 20% Deposit Available
    I.say('20% DEPOSIT AVAILABLE');
    I.wait(5)
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');

    // More information
    I.say('MORE INFORMATION');
    I.click('#more_info_link');
    I.waitForText('PRODUCT DETAILS', waitTime, 'h2')
    I.see('PRODUCT DETAILS', 'h2');
    I.click('#ring_more_details_box button');

    // Choose this diamond
    I.say('CHOOSE THIS DIAMOND');
    I.click('//*[@id="ring_list_section"]/div/div[2]/a');
    I.click('Choose this design');
    I.waitForText('Review Your Ring', waitTime, 'h2')
    I.see('Review Your Ring', 'h2');

    // -------------------------------------------- CHANGE DIAMOND --------------------------------------------
    I.say('CHANGE - DIAMOND')
    I.forceClick('Change', '.to_diamond_list_from_summary')
    waitResponseInTable()
    I.see('Detail', '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.forceClick('Detail', '//*[@id="body_table_results"]/tr[1]/td[10]/a/div')
    I.seeElement('//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]')
    I.click('Choose this diamond');
    I.waitForText('Review Your Ring', waitTime, 'h2')
    I.see('Review Your Ring', 'h2');

    // -------------------------------------------- CHANGE RING --------------------------------------------
    I.say('CHANGE - RING')
    I.forceClick('Change', '.to_setting_list_from_summary')
    I.waitForElement('//*[@id="ring_list_section"]/div/div[1]/a', waitTime)
    I.wait(1)
    I.seeElement('//*[@id="ring_list_section"]/div/div[1]/a')
    I.forceClick('//*[@id="ring_list_section"]/div/div[1]/a')
    I.click('Choose this design');
    I.waitForText('Review Your Ring', waitTime, 'h2')
    I.see('Review Your Ring', 'h2');

    I.say('CHANGE - RING PERSONALISATION')
    I.click('#selection_summary_section .summary_personalise_link');
    checkPersonaliseYourRing();

    // -------------------------------------------- RING SIZE --------------------------------------------
    I.say('RING SIZE')
    I.seeElement('//*[@id="engagement_ring_summary"]/div[2]/div[2]/div[9]/div[4]/a')
    I.selectOption('#select_ring_size', '1')
    // -------------------------------------------- DROP A HINT --------------------------------------------
    I.say('OPTION DROP A HINT');
    I.click('.social_network_icons .drop_a_hint a');
    I.waitForText('Drop a hint', waitTime, 'h3')
    I.see('DROP A HINT', 'h3')
    formDropAHint();

    I.say('OPTION FREE SHIPPING');
    I.forceClick('.free_shipping a');
    I.waitForText('FREE SHIPPING', waitTime, 'h2')
    I.see('FREE SHIPPING');
    I.click('> LEARN MORE');
    I.wait(5);
    I.switchToNextTab();
    I.seeInCurrentUrl('/free-shipping');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    I.click('.modal-content .modal-body button');

    I.say('OPTION FREE RETURNS');
    I.click('.free_returns a');
    I.waitForText('FREE 30 DAYS RETURN POLICY', waitTime, 'h3')
    I.see('FREE 30 DAYS RETURN POLICY', 'h3');
    I.click('> LEARN MORE');
    I.wait(5);
    I.switchToNextTab();
    I.seeInCurrentUrl('/free-return');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/engagement-ring/create/');
    I.click('.modal-content .modal-body button');

    // -------------------------------------------- SOCIALMEDIA --------------------------------------------
    I.say('OPTION SHARE AND SOCIALMEDIA');
    I.click('.share a');
    I.waitForText('SHARE THIS', waitTime, 'h3')
    I.see('SHARE THIS');
    I.click('Facebook');
    I.wait(5);
    I.switchToNextTab();
    I.seeInCurrentUrl('facebook.com');
    I.closeCurrentTab();
    I.click('Twitter');
    I.wait(5);
    I.switchToNextTab();
    I.seeInCurrentUrl('twitter.com');
    I.closeCurrentTab();
    I.click('Pinterest');
    I.wait(5);
    I.switchToNextTab();
    I.see('Pinterest', 'h2');
    I.closeCurrentTab();
    I.say('COPY LINK')
    I.click('Copy Link');
    I.see('LINK COPIED TO THE CLIPBOARD');
    I.click('.modal-content .modal-body button');

    // FALTA LA OPTION DROP A HINT

    // -------------------------------------------- ADD TO CART --------------------------------------------
    I.say('ADD TO CART');
    I.click('#add_to_cart_submit');
    I.waitForText('SHOPPING CART', waitTime)
    I.see('SHOPPING CART');
    I.waitForElement('.link_to_ring_size a', waitTime)
    I.click('Help', '.link_to_ring_size a');
    I.wait(20);
    I.switchToNextTab();
    I.see('HOW TO FIND YOUR RING SIZE');
    I.closeCurrentTab();
    I.see('SHOPPING CART');
    I.selectOption('.summary_setting_size .select_ring_size', '3/4');

    I.say('CHECKOUT');
    I.click('CHECKOUT');
    I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', waitTime, 'h2')
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

    // -------------------------------------------- PAYMENT METHOD --------------------------------------------
    I.say('PAYMENT METHOD');
    I.waitForText('PAYMENT METHOD', waitTime)
    I.see('PAYMENT METHOD', 'h2')

    I.say('PAYMENT FOR BANK TRANSFER');
    I.click('#checkbox_bank_wire_description');
    I.waitForText('Paying By Bank Transfer', waitTime)
    I.see('Paying By Bank Transfer');
    I.say('PLEASE, ACTIVATE THE CAPTCHA THEN TYPE "exit" IN THE CONSOLE AND PRESS ENTER TO CONTINUE');
    pause()

    I.click('PLACE YOUR ORDER', '#bank_wire_submit')
    I.waitForText('Your order is confirmed!', waitTime)
    I.see('Your order is confirmed')
});