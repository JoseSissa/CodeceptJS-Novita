Feature('DIAMOND JEWELLERY - DRESS RINGS');

Scenario('DRESS RINGS', async ({ I }) => {

    const waitTime = 300; //Seconds
    const waitResponseMetalType = (metalType) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].metal_name.includes(metalType))) {
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
    };
    const waitResponseType = (type) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].type.toLowerCase().includes(type) || results[0].response.items[i].category_slug.toLowerCase().includes(type))) {
                            console.log(`>>> Error in values obtained from TYPE filter: ${type.toUpperCase()} expected, but it was found.`);
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: TYPE, option ${type.toUpperCase()}`);
                    return true
                }
                return true;
            }
        }, waitTime);
    };
    const waitResponseRingsPrice = (ringPrice, option) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        if(ringPrice == 'under') {
                            if(!(results[0].response.items[i].price <= 1000)) {
                                console.log(`>>> Error in values obtained from PRICE filter: option ${option} expected, but ${results[0].response.items[i].price} was found.`);
                            }
                        }else if(ringPrice == 'between') {
                            if(!(results[0].response.items[i].price > 1000 && results[0].response.items[0].width <= 2000)) {
                                console.log(`>>> Error in values obtained from PRICE filter: option ${option} expected, but ${results[0].response.items[i].price} was found.`);
                            }
                        }else if(ringPrice == 'over') {
                            if(!(results[0].response.items[i].price > 2000)) {
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
    };
    const searchInputRingDesign = (name) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    if(!(results[0].response.items[0].name.toLowerCase().includes(name))) {
                        console.log(`>>> Error in values obtained from SEARCH PRODUCT filter: ${name.toUpperCase()} expected.`)
                    }
                }else{
                    console.log(`No record was found according to the filter SEARCH PRODUCT INPUT, option ${name}.`);
                    return true;
                }
                return true;
            }
        }, waitTime)
    };

    I.amOnPage('/');
    I.forceClick("DRESS RINGS");
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.waitForElement('.jewellery_detail_link', waitTime);
    I.forceClick('#jewellery_category_1')
    I.waitForElement('.jewellery_detail_link', waitTime);
    
    // ------------------------ METAL FILTER -----------------------------------
    // METAL: 18ct White Gold
    I.say('FILTER METAL: 18ct White Gold');
    I.forceClick('#metal_type_3');
    I.seeCheckboxIsChecked('#metal_type_3');
    waitResponseMetalType('18ct White Gold');
    I.forceClick('#metal_type_3');

    // FILTER METAL: 18ct Yellow Gold
    I.say('FILTER METAL: 18ct Yellow Gold');
    I.forceClick('#metal_type_5');
    I.seeCheckboxIsChecked('#metal_type_5');
    waitResponseMetalType('18ct Yellow Gold');
    I.forceClick('#metal_type_5');   

    // FILTER METAL: Rose Gold
    I.say('FILTER METAL: Rose Gold');
    I.forceClick('#metal_type_4');
    I.seeCheckboxIsChecked('#metal_type_4');
    waitResponseMetalType('Rose Gold');
    I.forceClick('#metal_type_4');

    // FILTER METAL: Platinum
    I.say('FILTER METAL: Platinum');
    I.forceClick('#metal_type_6');
    I.seeCheckboxIsChecked('#metal_type_6');
    waitResponseMetalType('Platinum');
    I.forceClick('#metal_type_6');

    I.forceClick('#metal_type_1');

    // ------------------------ TYPE FILTER -----------------------------------
    // TYPE: RINGS
    I.forceClick('#jewellery_category_1')

    // FILTER TYPE: RINGS
    I.say('TYPE METAL: RINGS');
    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseType('ring');
    I.forceClick('#jewellery_category_2');
    // FILTER TYPE: STUDS
    I.say('TYPE METAL: STUDS');
    I.forceClick('#earring_style_slug_1');
    I.seeCheckboxIsChecked('#earring_style_slug_1');
    waitResponseType('stud');
    I.forceClick('#earring_style_slug_1');
    // FILTER TYPE: EARRINGS
    I.say('TYPE METAL: EARRINGS');
    I.forceClick('#jewellery_category_3');
    I.seeCheckboxIsChecked('#jewellery_category_3');
    waitResponseType('earring');
    I.forceClick('#jewellery_category_3');
    // FILTER TYPE: BRACELETS
    I.say('TYPE METAL: BRACELETS');
    I.forceClick('#jewellery_category_4');
    I.seeCheckboxIsChecked('#jewellery_category_4');
    waitResponseType('bracelet');
    I.forceClick('#jewellery_category_4');
    // FILTER TYPE: NECKLACES
    I.say('TYPE METAL: NECKLACES');
    I.forceClick('#jewellery_category_5');
    I.seeCheckboxIsChecked('#jewellery_category_5');
    waitResponseType('necklace');
    I.forceClick('#jewellery_category_5');

    I.forceClick('#jewellery_category_1')

    // ------------------------ PRICE FILTER -----------------------------------
    // PRICE $1000 and Under
    I.say('PRICE $1000 and Under');
    I.forceClick('#jewellery_price_range_2');
    I.seeCheckboxIsChecked('#jewellery_price_range_2');
    waitResponseRingsPrice('under', '$1000 AND UNDER');
    I.forceClick('#jewellery_price_range_2');

    // PRICE BETWEEN $1000 to $2000
    I.say('PRICE BETWEEN $1000 to $2000');
    I.forceClick('#jewellery_price_range_3');
    I.seeCheckboxIsChecked('#jewellery_price_range_3');
    waitResponseRingsPrice('between', '$1000 TO $2000');
    I.forceClick('#jewellery_price_range_3');

    // PRICE Over $2000
    I.say('PRICE OVER $2000');
    I.forceClick('#jewellery_price_range_4');
    I.seeCheckboxIsChecked('#jewellery_price_range_4');
    waitResponseRingsPrice('over', 'OVER $2000');
    I.forceClick('#jewellery_price_range_4');
    
    I.forceClick('#jewellery_price_range_1');
    // ------------------------ PRICE FILTER -----------------------------------
    I.say('TEXT SEARCH INPUT');
    I.fillField('//*[@id="jewellery_order_section"]/div[2]/div/input', 'white')
    I.pressKey('Enter')
    searchInputRingDesign('white')
    I.fillField('//*[@id="jewellery_order_section"]/div[2]/div/input', '')
    I.pressKey('Enter')
    I.wait(4)
     // -------------------------------------------- SELECT FIRST ITEM/ELEMENT --------------------------------------------
     I.say('FIRST ITEM SELECTED');
     I.waitForElement('#jewellery_list_section .jewellery_list .jewellery_detail_link', waitTime)
     I.wait(2)
     I.click('#jewellery_list_section .jewellery_list .jewellery_detail_link')
     // More Info
     I.click('#more_info_link')
     I.waitForText('PRODUCT DESCRIPTION', waitTime)
     I.see('PRODUCT DESCRIPTION')
     I.click('//*[@id="jewellery_more_details_box"]/button')
     // 20% Deposit Available
     I.click('//*[@id="pay_deposit_box"]/div/a')
     I.wait(5)
     I.switchToNextTab()
     I.seeInCurrentUrl('/deposit')
     I.closeCurrentTab()
     I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
     // Add to cart
     I.click('#add_product_to_cart_submit')
     I.waitForText('SHOPPING CART', waitTime)
     I.see('SHOPPING CART')
     I.wait(2)
     // Pay Deposit
     I.forceClick('//*[@id="cart"]/div/div[2]/div[2]/table/tbody/tr[2]/td[1]/label')
     I.click('#accept_deposit_policy')
     // Checkout
     I.click('//*[@id="cart"]/div/div[2]/div[2]/table/tbody/tr[4]/td/a')
     I.waitForText('WHERE DO YOU WANT THESE ITEMS SENT?', waitTime)
     I.see('CHECKOUT')
     I.wait(4)
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
     I.waitForText('PAYMENT METHOD', waitTime)
     I.see('PAYMENT METHOD')
     I.seeInCurrentUrl('/cart/payment-information');
})