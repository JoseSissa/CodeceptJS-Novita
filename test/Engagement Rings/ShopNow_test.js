Feature('ENGAGEMENT RINGS - SHOP NOW');

Scenario('SHOP NOW', async ({ I }) => {

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
                            console.log(`>>> Error in values obtained from METAL TYPE filter: option ${typeMetal.toUpperCase()} expected, but ${results[0].response.items[i].metal_name.toUpperCase()} was found.`);
                        }                        
                    }
                }else{
                    console.log(`>>> No record was found according to the filter: METAL TYPE, option ${typeMetal.toUpperCase()}.`);
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondShape = () => {
        const shapes = ["2", "7", "5", "6", "4", "3", "8", "9"]
        const names = ["round", "pear", "oval", "emerald", "cushion", "princess", "radiant", "asscher"]
        for (let i = 0; i < shapes.length; i++) {
            I.forceClick(`#diamond_shape_${shapes[i]}`);
            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings')) {
                    results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let j = 0; j < total; j++) {
                            if(results[0].response.items[j].shape_slug != names[i]) {
                                console.log(`>>> Error in values obtained from SHAPE filter: option ${names[i].toUpperCase()} expected, but ${results[0].response.items[i].shape_slug.toUpperCase()} was found.`);                                
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: SHAPE, option ${names[i].toUpperCase()}.`);
                        return true;
                    }
                    return true;                    
                }
            }, waitTime)

            I.forceClick(`#diamond_shape_${shapes[i]}`);
        }
    };
    const checkDiamondStyle = (style) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        const condition = results[0].response.items[i].engagement_ring_styles.find(elem => elem.style_name == style)
                        if(condition === undefined) {
                            console.log(`>>> Error in values obtained from DIAMOND STYLE filter: option ${style.toUpperCase()} expected, but ${results[0].response.items[i].engagement_ring_styles[0].style_name} was found.`);
                        }
                    }
                }else{
                    console.log(`>>> No record was found according to the filter: STYLE, option ${style.toUpperCase()}.`);
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondPrice = (typePrice, option) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        if(typePrice == 'under') {
                            if(!(results[0].response.items[i].price <= 1000)) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option $1000 and Under, ${results[0].response.items[i].price} was found.`);
                            }
                        }else if(typePrice == 'between') {
                            if(!(results[0].response.items[i].price >= 1000 && results[0].response.items[0].price <= 2000)) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option $1000 to $2000, ${results[0].response.items[i].price} was found.`);
                            }
                        }else if(typePrice == 'over') {
                            if(!(results[0].response.items[i].price > 2000)) {
                                console.log(`>>> Error in values obtained from DIAMOND PRICE filter: option over $2000, ${results[0].response.items[i].price} was found.`);
                            }
                        }
                    }
                }else {
                    console.log(`No record was found according to the filter: DIAMOND PRICE, option ${option.toUpperCase()}.`);
                    return true;
                }
                return true;
            }
        }, waitTime);
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

    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    I.say('TEST - CUSTOM ENGAGEMENT RINGS');
    I.amOnPage("/");
    I.forceClick('//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[2]/div/div/div/a');
    I.waitForText('CREATE YOUR RING', waitTime);
    I.seeInCurrentUrl("/engagement-ring/create/ring");
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

    I.say('METAL TYPE - PLATINUM')
    I.forceClick('#metal_type_2');
    I.seeCheckboxIsChecked('#metal_type_2')
    checkTypeMetal('platinum')
    I.forceClick('#metal_type_2')

    I.forceClick('#metal_type_1')
    // ----------------------------------------------- SHAPE FILTER ------------------------------------------------
    I.say('CHECKING SHAPE FILTER');
    checkDiamondShape();
    //------------------------------------------------ DIAMOND STYLE ------------------------------------------------
    I.say('CHECKING STYLE FILTER');

    I.say('DIAMOND STYLE - SOLITAIRE')
    // I.moveCursorTo('//*[@id="settings_search_form"]/div/div[3]/div[1]/div')
    I.forceClick('#engagement_ring_style_2')
    I.seeCheckboxIsChecked('#engagement_ring_style_2')
    checkDiamondStyle('Solitaire')
    I.forceClick('#engagement_ring_style_2')

    I.say('METAL STYLE - SIDE STONE')
    I.forceClick('#engagement_ring_style_4')
    I.seeCheckboxIsChecked('#engagement_ring_style_4')
    checkDiamondStyle('Side Stone')
    I.forceClick('#engagement_ring_style_4')

    I.say('METAL STYLE - HALO')
    I.forceClick('#engagement_ring_style_3')
    I.seeCheckboxIsChecked('#engagement_ring_style_3')
    checkDiamondStyle('Halo')
    I.forceClick('#engagement_ring_style_3')

    I.say('METAL STYLE - THREE STONE')
    I.forceClick('#engagement_ring_style_5')
    I.seeCheckboxIsChecked('#engagement_ring_style_5')
    checkDiamondStyle('Three Stone')
    I.forceClick('#engagement_ring_style_5')

    I.forceClick('#engagement_ring_style_1')
    // -------------------------------------------- DIAMOND PRICE FILTER --------------------------------------------
    I.say('DIAMOND PRICE FILTER')
    I.say('PRICE - $1000 and Under');
    I.forceClick('#setting_price_range_2');
    I.seeCheckboxIsChecked('#setting_price_range_2');
    checkDiamondPrice('under', '$1000 and Under');
    I.forceClick('#setting_price_range_2');

    I.say('PRICE - BETWEEN $1000 to $2000');
    I.forceClick('#setting_price_range_3');
    I.seeCheckboxIsChecked('#setting_price_range_3');
    checkDiamondPrice('between', '$1000 to $2000');
    I.forceClick('#setting_price_range_3');

    I.say('PRICE - OVER $2000');
    I.forceClick('#setting_price_range_4');
    I.seeCheckboxIsChecked('#setting_price_range_4');
    checkDiamondPrice('over', 'OVER $2000');
    I.forceClick('#setting_price_range_4');
    
    I.forceClick('#setting_price_range_1');
    // // -------------------------------------------- I SELECT FIRST ITEM/ELEMENT --------------------------------------------
    I.say('FIRST ITEM SELECTED');
    I.waitForElement('#ring_list_section .ring_item .ring_detail_link', waitTime)
    I.click('//*[@id="ring_list_section"]/div/div[1]/a')
    // I.click('#ring_list_section .ring_item .ring_detail_link');

    // 20 days express (+$150)
    I.forceClick('#include_express_job_id .pink_checkbox_icon');

    // 20% Deposit Available
    I.click('#pay_deposit_box .pink_checkbox_box_legend a');
    
    // Personalise your ring
    I.say('PERSONALISE YOUR RING');
    I.click('#personalise_ring_link .pink_checkbox_box_legend a');
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
    I.click('//*[@id="ring_more_details_box"]/button');

    // Choose this diamond
    I.say('CHOOSE THIS DIAMOND');
    I.click('//*[@id="ring_list_section"]/div/div[2]/a');
    I.click('Choose this design');
    I.seeInCurrentUrl('/engagement-ring/create/ring')

    // -------------------------------------------- I SELECT FIRST ITEM/ELEMENT ------------------------------------------------
    waitResponseInTable()
    I.click('//*[@id="body_table_results"]/tr[1]/td[10]/a')
    I.waitForText('CREATE YOUR RING', waitTime, '.title')
    I.click('Choose this diamond', '//*[@id="diamond_detail_section"]/div[2]/div[2]/div[6]/a[2]')
    I.waitForText('Review Your Ring', waitTime, 'h2')
    I.see('Review Your Ring', 'h2');
    // // -------------------------------------------- ADD TO CART --------------------------------------------
    I.say('ADD TO CART');
    I.click('#add_to_cart_submit');
    I.waitForText('SHOPPING CART', waitTime)
    I.wait(2)
    I.see('SHOPPING CART');
    I.selectOption('.summary_setting_size .select_ring_size', '3/4');

    I.say('CHECKOUT');
    I.click('CHECKOUT');
    I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', waitTime, 'h2')
    I.wait(4)
    I.see('WHERE DO YOU WANT THESE ITEMS SENT?', 'h2');
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
})