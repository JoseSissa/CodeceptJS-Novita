Feature('Diamond Jewellery - Diamond Studs');

Scenario('Diamond Jewellery - Diamond Studs', async ({ I }) => {

    const waitResponseMetalType = (metalType) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;                 
                    // Analize the first 10 elements from response
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].metal_name.includes(metalType))) {
                            console.log(`Error in response, Metal filter, expected elements with Metal Name: ${metalType} but not found.`);
                            return false;
                        }
                    }
                }else {
                    console.log('No record was found according to the filter in the response.');
                    return true
                }   
                return true;
            }
        }, 40);
    }
    const waitResponseType = (type) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;                 
                    // Analize the first 10 elements from response
                    for (let i = 0; i < total; i++) {
                        console.log(results[0].response.items[i].type);
                        if(!(results[0].response.items[i].type.toLowerCase().includes(type) || results[0].response.items[i].category_slug.toLowerCase().includes(type))) {
                            console.log(`Error in response, Type filter, expected elements with Type: ${metalType}, but not found.`);
                            return false;
                        }
                    }                    
                }else {
                    console.log('No record was found according to the filter in the response.');
                    return true
                }
                return true;
            }
        }, 20);
    }
    const waitResponseRingsPrice = (ringPrice) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        if(ringPrice == 'under') {
                            if(!(results[0].response.items[i].price <= 1000)) {
                                console.log(`Error in response, expected elements with price under $1000 but not found.`);
                                return false;
                            }
                        }else if(ringPrice == 'between') {
                            if(!(results[0].response.items[i].price > 1000 && results[0].response.items[0].width <= 2000)) {
                                console.log(`Error in response, expected elements with price between $1000 to $1500 but not found.`);
                                return false;
                            }
                        }else if(ringPrice == 'over') {
                            if(!(results[0].response.items[i].price > 2000)) {
                                console.log(`Error in response, expected elements with price above $1500 but not found.`);
                                return false;
                            }
                        }
                    }
                }else {
                    console.log('No record was found according to the filter in the response.');
                    return true
                }
                return true;
            }
        }, 20);
    }

    I.amOnPage('/');
    I.forceClick("DIAMOND STUDS");
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    
    waitResponseType('earring');

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

    // ------------------------ PRICE FILTER -----------------------------------
    // PRICE $1000 and Under
    I.say('PRICE $1000 and Under');
    I.forceClick('#jewellery_price_range_2');
    I.seeCheckboxIsChecked('#jewellery_price_range_2');
    waitResponseRingsPrice('under');
    I.forceClick('#jewellery_price_range_2');

    // PRICE BETWEEN $1000 to $2000
    I.say('PRICE BETWEEN $1000 to $2000');
    I.forceClick('#jewellery_price_range_3');
    I.seeCheckboxIsChecked('#jewellery_price_range_3');
    waitResponseRingsPrice('between');
    I.forceClick('#jewellery_price_range_3');

    // PRICE Over $2000
    I.say('PRICE OVER $2000');
    I.forceClick('#jewellery_price_range_4');
    I.seeCheckboxIsChecked('#jewellery_price_range_4');
    waitResponseRingsPrice('over');
    I.forceClick('#jewellery_price_range_4');
    
    I.forceClick('#jewellery_price_range_1');

});