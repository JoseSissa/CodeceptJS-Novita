Feature("WEDDING RINGS - MEN's WEDDING RINGS");

Scenario("MEN's WEDDING RINGS", ({ I }) => {

    const waitTime = 300; //Seconds
    const waitResponseMetalType = (metalType) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {      
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;      
                    // Analize the first 10 elements from response
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].metal_name === metalType)) {
                            console.log(`>>> Error in values obtained from METAL TYPE filter: ${metalType.toUpperCase()} expected, but ${results[0].response.items[i].metal_name.toUpperCase()} was found.`);
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: METAL TYPE, option ${metalType.toUpperCase()}`);
                    return true
                }
                return true;
            }
        }, waitTime);
    }
    const waitResponseStyleRing = (ringStyle) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        let style = results[0].response.items[i].ring_styles.some(elem => elem.style_slug === ringStyle);
                        if(!style) {
                            console.log(`>>> Error in values obtained from STYLE filter: ${ringStyle.toUpperCase()} expected, but it was not found.`);
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: STYLE, option ${ringStyle.toUpperCase()}`);
                    return true
                }
                return true;             
            }
        }, waitTime);
    }
    const waitResponseRingWidth = (ringWidth, option) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(ringWidth == 'minimum') {
                            if(!(results[0].response.items[i].width >= 5 && results[0].response.items[i].width < 7)) {
                                console.log(`>>> Error in values obtained from WIDTH filter: option ${option} expected, but ${results[0].response.items[i].width} was found.`);
                            }
                        }else if(ringWidth == 'medium') {
                            if(!(results[0].response.items[i].width >= 7 && results[0].response.items[0].width < 9)) {
                                console.log(`>>> Error in values obtained from WIDTH filter: option ${option} expected, but ${results[0].response.items[i].width} was found.`);
                            }
                        }else if(ringWidth == 'high') {
                            if(!(results[0].response.items[i].width >= 9)) {
                                console.log(`>>> Error in values obtained from WIDTH filter: option ${option} expected, but ${results[0].response.items[i].width} was found.`);
                            }
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: WIDTH, option ${option}.`);
                    return true
                }
                return true;
            }
        }, waitTime);
    }
    const waitResponseRingsPrice = (ringPrice, option) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        if(ringPrice == 'under') {
                            if(!(results[0].response.items[i].price <= 1000)) {
                                console.log(`>>> Error in values obtained from PRICE filter: option ${option} expected, but ${results[0].response.items[i].price} was found.`);
                            }
                        }else if(ringPrice == 'between') {
                            if(!(results[0].response.items[i].price > 1000 && results[0].response.items[0].width <= 1500)) {
                                console.log(`>>> Error in values obtained from PRICE filter: option ${option} expected, but ${results[0].response.items[i].price} was found.`);
                            }
                        }else if(ringPrice == 'over') {
                            if(!(results[0].response.items[i].price > 1500)) {
                                console.log(`>>> Error in values obtained from PRICE filter: option ${option} expected, but ${results[0].response.items[i].price} was found.`);
                            }
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: PRICE, option ${option}.`);
                    return true
                }
                return true;
            }
        }, waitTime);
    }

    I.amOnPage('/');
    I.forceClick("MEN's WEDDING RINGS");
    I.seeInCurrentUrl('/mens-wedding-bands-mens-wedding-rings-wedding-bands-for-men');
    I.waitForElement('.jewellery_detail_link', 30);

    // ------------------------ METAL FILTER -----------------------------------
    // METAL: 18ct White Gold
    I.say('FILTER METAL: 18ct White Gold');
    I.forceClick('#metal_type_2');
    I.seeCheckboxIsChecked('#metal_type_2');
    waitResponseMetalType('18ct White Gold');
    I.forceClick('#metal_type_2');

    // FILTER METAL: 18ct Yellow Gold
    I.say('FILTER METAL: 18ct Yellow Gold');
    I.forceClick('#metal_type_3');
    I.seeCheckboxIsChecked('#metal_type_3');
    waitResponseMetalType('18ct Yellow Gold');
    I.forceClick('#metal_type_3');

    // FILTER METAL: 18ct Rose Gold
    I.say('FILTER METAL: 18ct Rose Gold');
    I.forceClick('#metal_type_4');
    I.seeCheckboxIsChecked('#metal_type_4');
    waitResponseMetalType('18ct Rose Gold');
    I.forceClick('#metal_type_4');

    // FILTER METAL: Platinum
    I.say('FILTER METAL: Platinum');
    I.forceClick('#metal_type_5');
    I.seeCheckboxIsChecked('#metal_type_5');
    waitResponseMetalType('Platinum');
    I.forceClick('#metal_type_5');

    // FILTER METAL: Platinum
    I.say('FILTER METAL: Platinum');
    I.forceClick('#metal_type_6');
    I.seeCheckboxIsChecked('#metal_type_6');
    waitResponseMetalType('Multi-Tone');
    I.forceClick('#metal_type_6');

    I.forceClick('#metal_type_1');

    // ------------------------ STYLE FILTER -----------------------------------
    // Style Pave
    I.say('STYLE PAVE');
    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseStyleRing('plain');
    I.forceClick('#jewellery_category_2');

    // Style Pattern
    I.say('STYLE PATTERN')
    I.forceClick('#jewellery_category_4');
    I.seeCheckboxIsChecked('#jewellery_category_4');
    waitResponseStyleRing('pattern');
    I.forceClick('#jewellery_category_4');
    
    // Style Diamonds
    I.say('STYLE DIAMONDS')
    I.forceClick('#jewellery_category_6');
    I.seeCheckboxIsChecked('#jewellery_category_6');
    waitResponseStyleRing('diamonds');
    I.forceClick('#jewellery_category_6');

    I.forceClick('#jewellery_category_1');

    // ------------------------ WIDTH FILTER -----------------------------------
    // Width 5 to 6mm
    I.say('WIDTH BETWEEN 5 to 6MM')
    I.forceClick('#jewellery_width_range_2');
    I.seeCheckboxIsChecked('#jewellery_width_range_2');
    waitResponseRingWidth('minimum', '5 TO 6 MM');
    I.forceClick('#jewellery_width_range_2');

    // Width between 2 to 2.5mm
    I.say('WIDTH BETWEEN 7 TO 8MM')
    I.forceClick('#jewellery_width_range_3');
    I.seeCheckboxIsChecked('#jewellery_width_range_3');
    waitResponseRingWidth('medium', '7 TO 8 MM');
    I.forceClick('#jewellery_width_range_3');

    // Width above 2.6mm
    I.say('WIDTH OVER 9MM')
    I.forceClick('#jewellery_width_range_4');
    I.seeCheckboxIsChecked('#jewellery_width_range_4');
    waitResponseRingWidth('high', '9 MM +');
    I.forceClick('#jewellery_width_range_4');

    I.forceClick('#jewellery_width_range_1');

    // ------------------------ PRICE FILTER -----------------------------------
    // PRICE $1000 and Under
    I.say('PRICE $1000 and Under');
    I.forceClick('#jewellery_price_range_2');
    I.seeCheckboxIsChecked('#jewellery_price_range_2');
    waitResponseRingsPrice('under', '$1000 AND UNDER');
    I.forceClick('#jewellery_price_range_2');

    // PRICE BETWEEN $1000 to $1500
    I.say('PRICE BETWEEN $1000 to $1500');
    I.forceClick('#jewellery_price_range_3');
    I.seeCheckboxIsChecked('#jewellery_price_range_3');
    waitResponseRingsPrice('between', '$1000 TO $1500');
    I.forceClick('#jewellery_price_range_3');

    // PRICE Over $1500
    I.say('PRICE OVER $1500');
    I.forceClick('#jewellery_price_range_4');
    I.seeCheckboxIsChecked('#jewellery_price_range_4');
    waitResponseRingsPrice('over', 'OVER $1500');
    I.forceClick('#jewellery_price_range_4');
    
    I.forceClick('#jewellery_price_range_1');

    // -------------------------------------------- SELECT FIRST ITEM/ELEMENT --------------------------------------------
    I.say('FIRST ITEM SELECTED');
    I.waitForElement('#jewellery_list_section .jewellery_list .jewellery_detail_link', waitTime)
    I.click('#jewellery_list_section .jewellery_list .jewellery_detail_link')
    // 15 days express
    I.click('//*[@id="express_included_col"]/div[1]/label/div/img[1]')
    // 20% Deposit Available
    I.say('20% DEPOSIT AVAILABLE');
    I.click('//*[@id="pay_deposit_box"]/div/a')
    I.wait(5)
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('/mens-wedding-bands-mens-wedding-rings-wedding-bands-for-men');
    // Add Engraving
    I.click('//*[@id="add_engraving"]/div/a')
    I.see('Add Engraving(+$50)')
    // Font
    I.click('#fontdropdown')
    I.click('#font_trebuchet')
    I.fillField('#engraving_textarea', 'Jose Testing')
    I.click('//*[@id="engraving_form_container"]/div[3]/a/div/label/div/img[1]')
    I.click('#save_engraving_message_link')

    // Test of cancel button
    I.click('//*[@id="add_engraving"]/div/a')
    I.see('Add Engraving(+$50)')
    I.click('#cancel_engraving_message_link')
    // Ring Size
    I.selectOption('#select_ring_size', '2')
    // More info
    I.click('#more_info_link')
    I.waitForText('PRODUCT DETAILS', 30)
    I.see('PRODUCT DETAILS')
    I.click('//*[@id="jewellery_more_details_box"]/button')
    // Add to Cart
    I.say('ADD TO CART')
    I.click('#add_product_to_cart_submit')
    I.waitForText('SHOPPING CART', 30)
    I.see('SHOPPING CART')
    // Jewellery Personalisation - Change
    I.say('JEWELLERY PERSONALISATION')
    I.waitForElement('//*[@id="cart"]/div/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[2]/div/a', 30)
    I.wait(5)
    I.forceClick('//*[@id="cart"]/div/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[2]/div/a')
    I.waitForText('PERSONALISE YOUR JEWELLERY', 30)
    I.see('PERSONALISE YOUR JEWELLERY')
    I.click('//*[@id="personalised_jewellery_select_engraving"]')
    I.click('#jewellery_engraving_font_type')
    I.click('//*[@id="change_jewellery_engraving_font_select"]/a[2]')
    I.fillField('#jewellery_engraving_textarea', 'Jose Testing')
    I.click('#save_jewellery_engraving_message_link')
    I.click('#save_jewellery_store_personalisation')
    I.wait(5)
    // Pay deposit
    I.say('PAY DEPOSIT')
    I.click('//*[@id="cart"]/div/div[2]/div[2]/table/tbody/tr[2]/td[1]/label')
    I.click('#accept_deposit_policy')
    I.click('//*[@id="cart"]/div/div[2]/div[2]/table/tbody/tr[4]/td/a')
    // Checkout
    I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', 30)
    I.see('WHERE DO YOU WANT THESE ITEMS SENT?')
    // WHERE DO YOU WANT THESE ITEMS SENT? - FORM
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
    
});

