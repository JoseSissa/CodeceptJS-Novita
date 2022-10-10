Feature("Men's Wedding Rings");

Scenario("Men's Wedding Rings", ({ I }) => {

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
                            console.log(`Error in response, Metal filter, expected elements with Metal Name: ${metalType} but not found.`);
                            return false;
                        }
                    }
                }            
                return true;
            }
        }, 20);
    }
    const waitResponseStyleRing = (ringStyle) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;
                    // Analize the first 10 elements from response
                    for (let i = 0; i < total; i++) {
                        console.log('>>>>>', ringStyle);
                        console.log(results[0].response.items[i].ring_styles);
                        // let style = results[0].response.items[i].ring_styles.some(elem => elem.style_slug === ringStyle);
                        // if(!style) {
                        //     console.log(`Error in response, Style filter, expected elements with Ring styles: ${ringStyle} but not found.`);
                        //     return false;
                        // }
                    }
                }
                return true;             
            }
        }, 20);
    }

    I.amOnPage('/');
    I.forceClick("MEN's WEDDING RINGS");
    I.seeInCurrentUrl('/mens-wedding-bands-mens-wedding-rings-wedding-bands-for-men');
    I.waitForElement('.jewellery_detail_link', 10);

    // ------------------------ METAL FILTER -----------------------------------
    // METAL: 18ct White Gold
    // I.say('FILTER METAL: 18ct White Gold');
    // I.forceClick('#metal_type_2');
    // I.seeCheckboxIsChecked('#metal_type_2');
    // waitResponseMetalType('18ct White Gold');
    // I.forceClick('#metal_type_2');

    // // FILTER METAL: 18ct Yellow Gold
    // I.say('FILTER METAL: 18ct Yellow Gold');
    // I.forceClick('#metal_type_3');
    // I.seeCheckboxIsChecked('#metal_type_3');
    // waitResponseMetalType('18ct Yellow Gold');
    // I.forceClick('#metal_type_3');

    // // FILTER METAL: 18ct Rose Gold
    // I.say('FILTER METAL: 18ct Rose Gold');
    // I.forceClick('#metal_type_4');
    // I.seeCheckboxIsChecked('#metal_type_4');
    // waitResponseMetalType('18ct Rose Gold');
    // I.forceClick('#metal_type_4');

    // // FILTER METAL: Platinum
    // I.say('FILTER METAL: Platinum');
    // I.forceClick('#metal_type_5');
    // I.seeCheckboxIsChecked('#metal_type_5');
    // waitResponseMetalType('Platinum');
    // I.forceClick('#metal_type_5');

    // // FILTER METAL: Platinum
    // I.say('FILTER METAL: Platinum');
    // I.forceClick('#metal_type_6');
    // I.seeCheckboxIsChecked('#metal_type_6');
    // waitResponseMetalType('Multi-Tone');
    // I.forceClick('#metal_type_6');

    // I.forceClick('#metal_type_1');

    // ------------------------ STYLE FILTER -----------------------------------
    // Style Pave
    I.say('STYLE PAVE');
    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseStyleRing('pave');
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
    
});

