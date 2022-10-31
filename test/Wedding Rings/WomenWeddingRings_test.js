Feature("WEDDING RINGS - WOMEN's WEDDING RINGS");

Scenario("WOMEN's WEDDING RINGS", ({ I }) => {

    const waitTime = 300; //Seconds
    const waitResponseMetalType = (metalType) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].metal_name === metalType)) {
                            console.log(`>>> Error in values obtained from METAL TYPE filter: ${metalType.toUpperCase()} expected, but ${results[0].response.items[i].metal_name.toUpperCase()} was found.`);
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: METAL TYPE, option ${metalType.toUpperCase()}`);
                    return true;
                }return true
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
                    return true;
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
                        if(ringWidth == 'under') {
                            if(!(results[0].response.items[i].width < 2.0)) {
                                console.log(`>>> Error in values obtained from WIDTH filter: option ${option} expected, but ${results[0].response.items[i].width} was found.`);
                            }
                        }else if(ringWidth == 'between') {
                            if(!(results[0].response.items[i].width >= 2.0 && results[0].response.items[0].width <= 2.5)) {
                                console.log(`>>> Error in values obtained from WIDTH filter: option ${option} expected, but ${results[0].response.items[i].width} was found.`);
                            }
                        }else if(ringWidth == 'over') {
                            if(!(results[0].response.items[i].width > 2.5)) {
                                console.log(`>>> Error in values obtained from WIDTH filter: option ${option} expected, but ${results[0].response.items[i].width} was found.`);
                            }
                        }
                    }
                }else {
                    console.log(`>>> No record was found according to the filter: WIDTH, option ${option}.`);
                    return true;
                }
                return true
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
                            if(!(results[0].response.items[i].price > 1000 && results[0].response.items[0].price <= 1500)) {
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
                    return true;
                }
                return true
            }
        }, waitTime);
    }

    I.amOnPage('/');
    I.forceClick("WOMEN's WEDDING RINGS");
    I.seeInCurrentUrl('/lab-grown-diamond-wedding-band-lab-diamond-wedding-band-lab-created-diamond-wedding-band');
    I.waitForElement('.jewellery_detail_link', waitTime);

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

    I.forceClick('#metal_type_1');

    // ------------------------ STYLE FILTER -----------------------------------
    // Style Pave
    I.say('STYLE PAVE');
    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseStyleRing('pave');
    I.forceClick('#jewellery_category_2');

    // Style Eternity
    I.say('STYLE ETERNITY')
    I.forceClick('#jewellery_category_3');
    I.seeCheckboxIsChecked('#jewellery_category_3');
    waitResponseStyleRing('eternity');
    I.forceClick('#jewellery_category_3');

    // Style Plain
    I.say('STYLE PLAIN')
    I.forceClick('#jewellery_category_4');
    I.seeCheckboxIsChecked('#jewellery_category_4');
    waitResponseStyleRing('plain');
    I.forceClick('#jewellery_category_4');

    // Style Modern
    I.say('STYLE MODERN')
    I.forceClick('#jewellery_category_5');
    I.seeCheckboxIsChecked('#jewellery_category_5');
    waitResponseStyleRing('modern');
    I.forceClick('#jewellery_category_5');
    
    // Style Vintage
    I.say('STYLE VINTAGE')
    I.forceClick('#jewellery_category_6');
    I.seeCheckboxIsChecked('#jewellery_category_6');
    waitResponseStyleRing('vintage');
    I.forceClick('#jewellery_category_6');

    I.forceClick('#jewellery_category_1');

    // ------------------------ WIDTH FILTER -----------------------------------
    // Width under 2mm
    I.say('WIDTH UNDER 2MM')
    I.forceClick('#jewellery_width_range_2');
    I.seeCheckboxIsChecked('#jewellery_width_range_2');
    waitResponseRingWidth('under', 'UNDER 2 MM');
    I.forceClick('#jewellery_width_range_2');

    // Width between 2 to 2.5mm
    I.say('WIDTH BETWEEN 2 TO 2.5MM')
    I.forceClick('#jewellery_width_range_3');
    I.seeCheckboxIsChecked('#jewellery_width_range_3');
    waitResponseRingWidth('between', '2 TO 2.5 MM');
    I.forceClick('#jewellery_width_range_3');

    // Width above 2.6mm
    I.say('WIDTH over 2.6MM')
    I.forceClick('#jewellery_width_range_4');
    I.seeCheckboxIsChecked('#jewellery_width_range_4');
    waitResponseRingWidth('over', 'OVER 2.6 MM');
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


});