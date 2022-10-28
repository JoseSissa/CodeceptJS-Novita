Feature('ENGAGEMENT RINGS');

Scenario('SHOP NOW', async ({ I }) => {

    const waitTime = 300; //Seconds
    const checkTypeMetal = (typeMetal) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        console.log(results[0].response.items[i].metal_name.toLowerCase());
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
                            console.log(results[0].response.items[j].shape_slug);
                            if(results[0].response.items[j].shape_slug != names[i]) {
                                console.log(`>>> Error in values obtained from SHAPE filter: option ${names[i].toUpperCase()}`);
                                return false;
                            }
                        }
                    }else{
                        console.log(`No record was found according to the filter DIAMOND SHAPE ${names[i].toUpperCase()} in the response.`);
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
                        if(results[0].response.items[i].engagement_ring_styles[0].style_name != style) {
                            console.log(`>>> Error in values obtained from DIAMOND STYLE filter: option ${style.toUpperCase()}, the response is: ${results[0].response.items[i].engagement_ring_styles[0].style_name}.`);
                        }
                    }
                }else{
                    console.log(`No record was found according to the filter DIAMOND STYLE OPTION: ${style.toUpperCase()} in the response.`);
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondPrice = (typePrice) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        console.log(results[0].response.items[i].price);
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

    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    I.say('TEST - CUSTOM ENGAGEMENT RINGS');
    I.amOnPage("/");
    I.forceClick("SHOP NOW");
    I.waitForText('CREATE YOUR RING', 30);
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
    // I.moveCursorTo('//*[@id="settings_search_form"]/div/div[7]/div[1]/div/div')
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


})