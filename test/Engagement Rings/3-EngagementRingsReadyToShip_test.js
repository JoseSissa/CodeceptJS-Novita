Feature('ENGAGEMENT RINGS - ENGAGEMENT READY TO SHIP');

Scenario('ENGAGEMENT READY TO SHIP', async ({ I }) => {

    const waitTime = 300; //Seconds
    const checkTypeMetal = (typeMetal) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(!results[0].response.items[i].engring_metal_name.toLowerCase().includes(typeMetal)) {
                            console.log(`>>> Error in values obtained from METAL TYPE filter: option ${typeMetal.toUpperCase()} expected, but ${results[0].response.items[i].engring_metal_name.toUpperCase()} was found.`);
                        }                        
                    }
                }else{
                    console.log(`>>> No record was found according to the filter: METAL TYPE, option ${typeMetal.toUpperCase()}`);
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondCarat = () => {
        I.fillField('#from_carat_value_input', 2)
        I.pressKey('Enter')
        I.fillField('#to_carat_value_input', 3)
        I.pressKey('Enter')
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(results[0].response.items[i].diamond_carat < 2 || results[0].response.items[i].diamond_carat > 3) {
                            console.log(`>>> Error in values obtained from DIAMOND CARAT filter: option 2 to 3 expected, but ${results[0].response.items[i].diamond_carat} was found.`);
                        }
                    }
                }else{
                    console.log(`>>> No record was found according to the filter: DIAMOND CARAT, option 2 to 3.`);
                    return true;
                }
                return true;
                
            }
        }, waitTime)
        I.fillField("#from_carat_value_input", 0.30);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", 6);
        I.pressKey("Enter");
    };
    const checkDiamondShape = () => {
        const shapes = ["2", "7", "5", "6", "4", "3", "8", "9"]
        const names = ["round", "pear", "oval", "emerald", "cushion", "princess", "radiant", "asscher"]
        for (let i = 0; i < shapes.length; i++) {
            I.forceClick(`#diamond_shape_${shapes[i]}`);
            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                    results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let j = 0; j < total; j++) {
                            if(results[0].response.items[j].diamond_shape_slug != names[i]) {
                                console.log(`>>> Error in values obtained from DIAMOND SHAPE filter: option ${names[i].toUpperCase()} expected, but ${results[0].response.items[i].diamond_shape_slug.toUpperCase()} was found.`);
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: DIAMOND SHAPE, option ${names[i].toUpperCase()}`);
                        return true;
                    }
                    return true;                    
                }
            }, waitTime)

            I.forceClick(`#diamond_shape_${shapes[i]}`);
        }
    };
    const checkDiamondColour = () => {
        const colour = {
            "D" : [0, -700],
            "E" : [80, -700],
            "F" : [100, -700],
            "G" : [180, -700],
            "H" : [230, -700],
            "I" : [280, -700],
            "J" : [330, -700],
            "K" : [400, -700],
            "L" : [450, -700],
            "M" : [600, 0],
        }
        for (const elem of Object.keys(colour)) {
            I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', colour[elem][0]);
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]', colour[elem][1]);
            if(elem == 'M') {
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', -700);
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', 700);
            }

            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                    results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            if(results[0].response.items[i].diamond_colour_name != elem) {
                                console.log(`>>> Error in values obtained from DIAMOND COLOUR filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].diamond_colour_name} was found.`);
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: DIAMOND COLOUR, option ${elem.toUpperCase()}.`);
                        return true;
                    }
                    return true;
                }                
            }, waitTime)
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', -700);
        };
    };
    const checkDiamondClarity = () => {
        const clarity = {
            "FL" : [0, -700],
            "IF" : [80, -700],
            "VVS1" : [150, -700],
            "VVS2" : [200, -700],
            "VS1" : [250, -700],
            "VS2" : [350, -700],
            "SI1" : [400, -700],
            "SI2" : [450, -700],
            "I1" : [500, 0],
        }
        for (const elem of Object.keys(clarity)) {

            I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', clarity[elem][0]);
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]', clarity[elem][1]);
            if(elem == 'I1') {
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', -700);
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', 700);
            }
            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            if(results[0].response.items[i].diamond_clarity_name != elem) {
                                console.log(`>>> Error in values obtained from DIAMOND CLARITY filter: option ${elem.toUpperCase()} expected, but ${results[0].response.items[i].diamond_clarity_name} was found.`);
                            }
                        }
                    }else{
                        console.log(`>>> No record was found according to the filter: DIAMOND CLARITY, option ${elem.toUpperCase()}.`);
                        return true;
                    }
                    return true;
                }                
            }, waitTime)

            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', -700);
        };
    };
    const checkDiamondStyle = (style) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(results[0].response.items[i].engring_style_name != style) {
                            console.log(`>>> Error in values obtained from STYLE filter: option ${style.toUpperCase()} expected, but ${results[0].response.items[i].engring_style_name} was found.`);
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
    const checkDiamondPrice = () => {
        I.fillField('#from_price_value_input', 10000)
        I.pressKey('Enter')
        I.fillField('#to_price_value_input', 40000)
        I.pressKey('Enter')
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(results[0].response.items[i].price < 10000 || results[0].response.items[i].price > 40000) {
                            console.log(`>>> Error in values obtained from PRICE filter: option 10000 to 40000 expected, but ${results[0].response.items[i].price} was found.`);
                        }
                    }
                }else{
                    console.log(`>>> No record was found according to the filter: PRICE, option option 10000 to 40000.`);
                    return true;
                }
                return true;                
            }
        }, waitTime)
        I.fillField("#from_price_value_input", 1000);
        I.pressKey("Enter");
        I.fillField("#to_price_value_input", 60000);
        I.pressKey("Enter"); 
    };

    // ==========================================================================================================

    I.say('TEST - CUSTOM ENGAGEMENT RINGS');
    I.amOnPage("/");
    I.forceClick("ENGAGEMENT RINGS READY TO SHIP");
    I.waitForText('ENGAGEMENT RINGS READY TO SHIP', 30);
    I.seeInCurrentUrl("/engagement-ring/ready-to-ship");

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
    // ----------------------------------------------- CARAT FILTER -----------------------------------------------
    I.say('FILTER CHECK - DIAMOND CARAT')
    I.moveCursorTo('//*[@id="settings_search_form"]/div/div[2]/div[1]/div/div')
    checkDiamondCarat();
    I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')

    // ----------------------------------------------- SHAPE FILTER ------------------------------------------------
    I.say('CHECKING SHAPE FILTER');
    checkDiamondShape();
    // ----------------------------------------------- COLOUR FILTER -----------------------------------------------
    I.say('CHECKING COLOUR FILTER');
    checkDiamondColour();
    //------------------------------------------------ CLARITY FILTER -----------------------------------------------
    I.say('CHECKING CLARITY FILTER');
    checkDiamondClarity();
    //------------------------------------------------ RING SIZE ----------------------------------------------------
    I.moveCursorTo('//*[@id="settings_search_form"]/div/div[6]/div[1]/div/div')
    I.fillField('#react-select-2-input', 'J')
    I.pressKey('Enter')
    //------------------------------------------------ DIAMOND STYLE ------------------------------------------------
    I.say('CHECKING STYLE FILTER');

    I.say('DIAMOND STYLE - SOLITAIRE')
    I.moveCursorTo('//*[@id="settings_search_form"]/div/div[7]/div[1]/div/div')
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

    //----------------------------------------------- DIAMOND PRICE -----------------------------------------------
    I.say('FILTER CHECK - DIAMOND PRICE')
    I.moveCursorTo('//*[@id="settings_search_form"]/div/div[8]/div[1]/div/div')
    I.wait(4)
    checkDiamondPrice();
    I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')
    
    //----------------------------------------------- SELECT OPTION -----------------------------------------------
    I.wait(4)
    I.say('SELECT FIRST OPTION')
    I.click('//*[@id="ring_list_section"]/div/div/div/div[1]/a')
    // Select Ring Size
    I.wait(4)
    I.selectOption('#select_ring_size', 'J')
    I.wait(4)
    I.forceClick('#add_product_to_cart_submit')

    I.waitForText('SHOPPING CART', waitTime)
    I.seeInCurrentUrl('/cart')
    I.click('//*[@id="cart"]/div/div[2]/div[2]/table/tbody/tr[4]/td/a')

    // // ----------------------------------- WHERE DO YOU WANT THESE ITEMS SENT?-----------------------------------------

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
    I.waitInUrl('/cart/payment-information', waitTime);

    // I.waitForText('PAYMENT METHOD', waitTime)
    // I.forceClick('#checkbox_bank_wire')
    // I.say('PLEASE, ACTIVATE THE CAPTCHA AND WRITE "exit" IN THE CONSOLE AND PRESS ENTER');
    // pause()
    // I.click('#bank_wire_submit')
    // I.waitForText('Your order is confirmed!', 30);
    // I.see('Your order is confirmed!');

});